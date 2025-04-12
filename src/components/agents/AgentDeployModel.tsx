import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import axios from 'axios';

interface AgentDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agentId: string, name: string, repoUrl: string,repoName:string,code:string,buildCommand:string,startCommand:string) => void;
  agent: {
    id: string;
    name: string;
    code:string;
  };
  isLoading: boolean;
}

export function AgentDeployModal({ isOpen, onClose, onDeploy, agent, isLoading }: AgentDeployModalProps) {
  const [name, setName] = useState(agent.name);
  const [repoUrl, setRepoUrl] = useState('');
  const [repoList, setRepoList] = useState([]);
  const [buildCommand, setBuildCommand] = useState('pip install -r requirements.txt');
  const [startCommand, setStartCommand] = useState('streamlit run main.py');
  const [branch, setBranch] = useState('main');
  const [errors, setErrors] = useState<{
    name?: string;
    repoUrl?: string;
    branch?: string;
    buildCommand?: string;
    startCommand?: string;
  }>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors: {
      name?: string;
      repoUrl?: string;
      branch?: string;
      buildCommand?: string;
      startCommand?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!`https://github.com/${repoUrl}`.trim()) {
      newErrors.repoUrl = 'GitHub repo URL is required';
    } else if (!/^https:\/\/github\.com\/[\w-]+\/[\w-]+/.test(`https://github.com/${repoUrl}`)) {
      newErrors.repoUrl = 'Please enter a valid GitHub repository URL';
    }
    if (!branch.trim()) {
      newErrors.branch = 'Branch is required';
    }
    if (!startCommand.trim()) {
      newErrors.startCommand = 'Start Command is required';
    }
    if (!buildCommand.trim()) {
      newErrors.buildCommand = 'Build Command is required';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, call onDeploy
    // await createFile();
    onDeploy(agent.id, name, `https://github.com/${repoUrl}`,repoUrl,agent.code,buildCommand,startCommand);
  };
 


  const fetchUsersRepo = async () => { 
    const options = { 
      headers: {
        Authorization: `token ${localStorage.getItem('githubToken')}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
    const response = await axios.get(`https://api.github.com/user/repos`,options);
    if (!response.data) {
      throw new Error('Failed to fetch repository');
    }
    const data = await response.data;
    setRepoList(data)
  }
  useEffect(() => {
    fetchUsersRepo()
  },[])

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isLoading}
        >
          <X className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">Deploy Agent</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Agent Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
                Select Repository
              </label>
              <select
                id="repoUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              >
                <option value="">Select a repository</option>
                {repoList.map((repo: { id: string; name: string; full_name: string }) => (
                  <option key={repo.id} value={repo.full_name}>
                    {repo.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
                GitHub Repository URL
              </label>
              <input
                type="text"
                id="repoUrl"
                value={repoUrl ? `https://github.com/${repoUrl}` : ''}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.repoUrl ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.repoUrl && <p className="text-red-500 text-xs mt-1">{errors.repoUrl}</p>}
            </div>
            <div>
              <label htmlFor="repoUrl" className="block text-sm font-medium text-gray-700">
                GitHub Branch Name
              </label>
              <input
                type="text"
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="main"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.branch ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.branch && <p className="text-red-500 text-xs mt-1">{errors.branch}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Build Command
              </label>
              <input
                type="text"
                id="buildCommand"
                value={buildCommand}
                onChange={(e) => setBuildCommand(e.target.value)}
                placeholder='pip install -r requirements.txt'
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.buildCommand ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.buildCommand && <p className="text-red-500 text-xs mt-1">{errors.buildCommand}</p>}
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Start Command
              </label>
              <input
                type="text"
                id="startCommand"
                value={startCommand}
                placeholder='uvicorn app.main:app --reload --host 0.0.0.0 --port 8080'
                onChange={(e) => setStartCommand(e.target.value)}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.startCommand ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.startCommand && <p className="text-red-500 text-xs mt-1">{errors.startCommand}</p>}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 mr-2"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
              disabled={isLoading}
            >
              {isLoading ? 'Deploying...' : 'Deploy'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}