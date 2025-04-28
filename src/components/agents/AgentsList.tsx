import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { Github } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { useAgents } from '@/hooks/useAgents';
import { useAgentActions } from '@/hooks/useAgentActions';
import { useAgentLimit } from '@/hooks/useAgentLimit';
import axios from 'axios';
import { deployAgent, redeployAgent } from '@/lib/render/deploy';
import { supabase } from '@/lib/supabase/client';
import { convertCodeToWebAPP } from '@/lib/openai/client';

export function AgentsList() {
  const { agents, loading, error } = useAgents();
  const { handleDelete, handleEdit, handleAnalytics } = useAgentActions();
  const { hasReachedLimit, remainingAgents,isChecking,subscriptionType } = useAgentLimit();
  const [isConnected, setIsConnected] = useState(false);
  const [loadingAgents, setLoadingAgents] = useState<Map<string, boolean>>(new Map());
  const [showGitHubError, setShowGitHubError] = useState(false);

  // Function to check if deployment is still in progress
  const isDeploymentInProgress = (updatedAt: string) => {
    const lastUpdate = new Date(updatedAt);
    const now = new Date();
    const diffInMinutes = (now.getTime() - lastUpdate.getTime()) / (1000 * 60);
    return diffInMinutes < 3;
  };

  // Function to get deployment status
  const getDeploymentStatus = (agent: any) => {
    if (agent.status === "deployed" && isDeploymentInProgress(agent.updated_at)) {
      return 'deploying';
    }
    return agent.status
  };

  const loginWithGitHub = () => {
    if(isConnected) {
      localStorage.removeItem('githubToken');
      setIsConnected(false);
      window.location.reload();
    } else {
      const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
      const redirectURI = 'https://www.wisedroids.ai/dashboard';
      const scope = 'repo'; // Grants write access to repositories
      
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`;
    }
  };

  const handleCreateAgent = () => {
    if (!isConnected) {
      setShowGitHubError(true);
      return;
    }
    window.location.href = '/dashboard/create-agent';
  };

  const updateAgentStatus = async (id:string,service_id:string,api_endpoint:string) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'deployed',  // Set initial status as deploying
          service_id : service_id,
          api_endpoint : api_endpoint,
          updated_at: new Date().toISOString() // Update the timestamp
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating agent status:', error);
        return { success: false, error };
      }
      setLoadingAgents(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error('Exception updating agent status:', error);
      setLoadingAgents(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return { success: false, error };
    }
  }

  const updateReDeployAgentStatus = async (id:string) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'deployed',  // Set initial status as deploying
          updated_at: new Date().toISOString() // Update the timestamp
        })
        .eq('id', id);
      
      if (error) {
        console.error('Error updating agent status:', error);
        return { success: false, error };
      }
      setLoadingAgents(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error('Exception updating agent status:', error);
      setLoadingAgents(prev => {
        const newMap = new Map(prev);
        newMap.delete(id);
        return newMap;
      });
      return { success: false, error };
    }
  }

  const handleDeploy = async (agent_id : string,name:string,repoURL:string,repoName:string,code:string,buildCommand:string,startCommand:string) => {
    setLoadingAgents(prev => {
      const newMap = new Map(prev);
      newMap.set(agent_id, true);
      return newMap;
    });
    
    try {
      const payload = {
        name : name,
        repo : repoURL,
        buildCommand : buildCommand,
        startCommand : startCommand,
      }
      await createFile(repoName,code);
      const existingAgent = agents.find((agent) => agent.id === agent_id);
      if (existingAgent?.service_id) { 
        const response = await redeployAgent({service_id: existingAgent?.service_id});
        if(response.data.success) {
          updateReDeployAgentStatus(agent_id);
        }
      }
      const response = await deployAgent(payload);
      if(response.data.success) {
        updateAgentStatus(agent_id,response?.data?.data?.service?.id,response?.data?.data?.service?.serviceDetails?.url)
      }
    } catch (error) {
      setLoadingAgents(prev => {
        const newMap = new Map(prev);
        newMap.delete(agent_id);
        return newMap;
      });
      console.log(error)
    }
  }

  const createFile = async (repoUrl: string, code: string) => {
    try {
      const options = {
        headers: {
          Authorization: `token ${localStorage.getItem('githubToken')}`,
          Accept: 'application/vnd.github.v3+json',
        },
      };
      
      const enhancedCode = await convertCodeToWebAPP(code);
      const base64Content = btoa(enhancedCode);
      
      interface GitHubPayload {
        message: string;
        content: string;
        branch: string;
        sha?: string;
      }
      
      const payload: GitHubPayload = {
        "message": "wisedroid created a file main.py",
        "content": base64Content,
        "branch": "main"
      };
      
      // Try to check if file exists, but handle the case where it doesn't
      try {
        const checkExistingFile = await axios.get(`https://api.github.com/repos/${repoUrl}/contents/main.py`, options);
        if (checkExistingFile.status === 200 && checkExistingFile.data && checkExistingFile.data.sha) {
          payload.sha = checkExistingFile.data.sha;
        }
      } catch (fileError) {
        // File doesn't exist, which is fine - we'll create it
        console.log('File does not exist yet, will create new one');
      }
      
      // Create or update the file
      const response = await axios.put(
        `https://api.github.com/repos/${repoUrl}/contents/main.py`,
        payload, 
        options
      );
      
      if (!response || !response.data) {
        throw new Error('Failed to create file');
      }
      
      console.log('File created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating file:', error);
      throw error; // Re-throw to allow calling function to handle the error
    }
  };

  const checkGithubConnection = async () => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      if (code) {
          // Send code to backend
          const url = import.meta.env.VITE_API || 'http://localhost:5002/api/v1';
          const response = await axios.post(`${url}/candidate/github-login`, { code });
          if (response.data.success) {
              setIsConnected(true);
              localStorage.setItem('githubToken', response.data.data);
          } else {
              setIsConnected(false);
          }
          window.location.href = '/dashboard';
      }
        
    } catch (error) { 
      console.error('Error during GitHub login:', error);
      setIsConnected(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('githubToken');
    if (token) {
      setIsConnected(true);
    } else {
      setIsConnected(false);
      checkGithubConnection();
    }
 
  }, []);

  if (loading || isChecking) {
    return <div className="text-center py-8">Loading agents...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Failed to load agents</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your AI Agents</h2>
        <div className='flex items-center gap-4'>
          <button 
            onClick={loginWithGitHub} 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
              isConnected 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <Github className="h-5 w-5" /> {isConnected ? 'Disconnect GitHub' : 'Connect GitHub'}
          </button>
          <button
            onClick={handleCreateAgent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create New Agent
          </button>
        </div>
      </div>

      {showGitHubError && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                Please connect your GitHub account to create an agent. This is required for deployment.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowGitHubError(false)}
                  className="inline-flex rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!hasReachedLimit && remainingAgents > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-700">
            You can create {remainingAgents} more agent{remainingAgents !== 1 ? 's' : ''} on the {subscriptionType} plan
          </p>
        </div>
      )}

      {hasReachedLimit && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            You've reached the free plan limit. 
            <Link to="/?scrollTo=pricing" className="ml-2 font-medium underline">
              Upgrade your plan
            </Link>
            {' '}to create more agents.
          </p>
        </div>
      )}

      {agents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No agents yet</h3>
          <p className="text-gray-500 mb-4">Create your first AI agent to get started</p>
          <button
            onClick={handleCreateAgent}
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create New Agent
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            if(!agent.is_public) { 
              const deploymentStatus = getDeploymentStatus(agent);
              return <AgentCard
                key={agent.id}
                agent={agent}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onAnalytics={handleAnalytics}
                onDeploy={(id,name,repoURL,repoName,code,buildCommand,startCommand)=>handleDeploy(id,name,repoURL,repoName,code,buildCommand,startCommand)}
                isLoading={loadingAgents.get(agent.id) || deploymentStatus === 'deploying'}
                deploymentStatus={deploymentStatus}
              />
            }
          })}
        </div>
      )}
    </div>
  );
}