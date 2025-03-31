import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AgentDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDeploy: (agentId: string, name: string, repoUrl: string) => void;
  agent: {
    id: string;
    name: string;
  };
  isLoading: boolean;
}

export function AgentDeployModal({ isOpen, onClose, onDeploy, agent, isLoading }: AgentDeployModalProps) {
  const [name, setName] = useState(agent.name);
  const [repoUrl, setRepoUrl] = useState('');
  const [errors, setErrors] = useState<{
    name?: string;
    repoUrl?: string;
  }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    const newErrors: {
      name?: string;
      repoUrl?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!repoUrl.trim()) {
      newErrors.repoUrl = 'GitHub repo URL is required';
    } else if (!/^https:\/\/github\.com\/[\w-]+\/[\w-]+/.test(repoUrl)) {
      newErrors.repoUrl = 'Please enter a valid GitHub repository URL';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // If validation passes, call onDeploy
    onDeploy(agent.id, name, repoUrl);
  };

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
                GitHub Repository URL
              </label>
              <input
                type="text"
                id="repoUrl"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/username/repo"
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.repoUrl ? 'border-red-500' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                disabled={isLoading}
              />
              {errors.repoUrl && <p className="text-red-500 text-xs mt-1">{errors.repoUrl}</p>}
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