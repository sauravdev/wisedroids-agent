import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Play, BarChart2, Rocket, Loader, ActivityIcon } from 'lucide-react';
import type { Agent } from '@/lib/supabase/agents';
import { AgentDeployModal } from './AgentDeployModel';
import { AgentLogsModal } from './AgentLogsModal';

interface AgentCardProps {
  agent: {
    id: string;
    name: string;
    description: string;
    status: string;
    is_public: boolean;
    metrics?: {
      requests: number;
      success_rate: number;
      avg_response_time: number;
    };
    api_endpoint?: string;
    service_id?: string;
    repo_url?: string;
    code?: string;
    build_command?: string;
    start_command?: string;
  };
  onDelete: (id: string, service_id: string | null, repoUrl: string) => void;
  onEdit: (id: string) => void;
  onAnalytics: (id: string) => void;
  onDeploy: (id: string, name: string, repoURL: string, repoName: string, code: string, buildCommand: string, startCommand: string) => void;
  onTogglePublic: (id: string, is_public: boolean) => void;
  isLoading: boolean;
  deploymentStatus: 'deployed' | 'deploying' | 'failed' | 'draft';
  readOnly?: boolean;
}

export function AgentCard({ agent, onDelete, onEdit, onAnalytics, onDeploy, onTogglePublic, isLoading, deploymentStatus, readOnly }: AgentCardProps) {
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const metrics = agent.metrics || { requests: 0, success_rate: 0, avg_response_time: 0 };

  const handleDeployClick = () => {
    setIsDeployModalOpen(true);
  };

  const handleDeploySubmit = (agentId: string, name: string, repoUrl: string,repoName:string,code:string,buildCommand:string,startCommand:string) => {
    onDeploy(agentId, name, repoUrl,repoName,code,buildCommand,startCommand);
    setIsDeployModalOpen(false);
  };

  const getStatusBadge = () => {
    switch (deploymentStatus) {
      case 'deployed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Deployed
          </span>
        );
      case 'deploying':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Deploying...
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Failed
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-800">
            Draft
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
            {!readOnly && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onTogglePublic(agent.id, !agent.is_public)}
                  className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${agent.is_public ? 'bg-indigo-600' : 'bg-gray-200'}`}
                  title={agent.is_public ? 'Make private' : 'Make public'}
                >
                  <span
                    aria-hidden="true"
                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${agent.is_public ? 'translate-x-5' : 'translate-x-0'}`}
                  />
                </button>
                <span className="text-sm text-gray-500">{agent.is_public ? 'Public' : 'Private'}</span>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
        </div>
        {getStatusBadge()}
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div className="text-sm">
          <span className="text-gray-500">Requests</span>
          <p className="font-medium">{metrics.requests.toLocaleString()}</p>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Success Rate</span>
          <p className="font-medium">{metrics.success_rate}%</p>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Avg Response</span>
          <p className="font-medium">{metrics.avg_response_time}ms</p>
        </div>
      </div>
      
      {!readOnly && (
        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(agent.id)}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="Edit Agent"
            >
              <Edit2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onAnalytics(agent.id)}
              className="p-2 text-gray-400 hover:text-gray-600"
              title="View Analytics"
            >
              <BarChart2 className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(agent.id, agent.service_id || null, agent.repo_url || '')}
              className="p-2 text-red-400 hover:text-red-600"
              title="Delete Agent"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            {agent.service_id && (
              <button
                onClick={() => setIsLogsModalOpen(true)}
                className="p-2 text-blue-400 hover:text-blue-600"
                title="View Live Logs"
              >
                <ActivityIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {agent.status !== 'deployed' ? (
            <button
              onClick={handleDeployClick}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}
              {isLoading ? 'Deploying...' : 'Deploy'}
            </button>
          ) : (
            <div>
            <button
              onClick={handleDeployClick}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="h-4 w-4" /> : <Rocket className="h-4 w-4" />}
              {isLoading ? 'Deploying...' : 'Re Deploy'}
            </button>
            <a
              href={agent.api_endpoint}
              target='_blank'
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mt-2"
            >
              <Play className="h-4 w-4" />
              Test Agent
            </a>
            </div>
          )}
        </div>
      )}

      <AgentDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onDeploy={handleDeploySubmit}
        agent={{ ...agent, code: agent.code || '' }}
        isLoading={isLoading}
      />
      {agent.service_id && (
        <AgentLogsModal
          serviceId={agent.service_id}
          isOpen={isLogsModalOpen}
          onClose={() => setIsLogsModalOpen(false)}
        />
      )}
    </div>
  );
}