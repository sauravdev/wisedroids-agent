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
  const [isLoading,setLoading] = useState(false);
  const loginWithGitHub = () => {
    const clientID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectURI = 'https://www.wisedroids.ai/dashboard';
    const scope = 'repo'; // Grants write access to repositories
    
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scope}`;
};

  const updateAgentStatus = async (id:string,service_id:string,api_endpoint:string) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'deployed',  // Update status from 'draft' to 'deploy'
          service_id : service_id,
          api_endpoint : api_endpoint
        })
        .eq('id', id);      // Filter by id
      
      if (error) {
        console.error('Error updating agent status:', error);
        return { success: false, error };
      }
      setLoading(false)
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error('Exception updating agent status:', error);
      return { success: false, error };
    }
  }
  const updateReDeployAgentStatus = async (id:string) => {
    try {
      const { data, error } = await supabase
        .from('agents')
        .update({
          status: 'deployed',  // Update status from 'draft' to 'deploy'
        })
        .eq('id', id);      // Filter by id
      
      if (error) {
        console.error('Error updating agent status:', error);
        return { success: false, error };
      }
      setLoading(false)
      window.location.reload();
      return { success: true, data };
    } catch (error) {
      console.error('Exception updating agent status:', error);
      return { success: false, error };
    }
  }
  const handleDeploy = async (agent_id : string,name:string,repoURL:string,repoName:string,code:string,buildCommand:string,startCommand:string) => {
    setLoading(true)
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
      setLoading(false)
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
      
      const payload = {
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
        <Link
          to="/dashboard/create-agent"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Create New Agent
        </Link>
        </div>
      </div>

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
          <Link
            to="/dashboard/create-agent"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="h-5 w-5" />
            Create New Agent
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => {
            if(!agent.is_public) { 
              return <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onAnalytics={handleAnalytics}
              onDeploy={(id,name,repoURL,repoName,code,buildCommand,startCommand)=>handleDeploy(id,name,repoURL,repoName,code,buildCommand,startCommand)}
              isLoading={isLoading}
            />
            }
})}
        </div>
      )}
    </div>
  );
}