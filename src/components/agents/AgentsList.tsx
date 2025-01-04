import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { AgentCard } from './AgentCard';
import { useAgents } from '@/hooks/useAgents';
import { useAgentActions } from '@/hooks/useAgentActions';
import { useAgentLimit } from '@/hooks/useAgentLimit';

export function AgentsList() {
  const navigate = useNavigate();
  const { agents, loading, error } = useAgents();
  const { handleDelete, handleEdit, handleAnalytics } = useAgentActions();
  const { hasReachedLimit, remainingAgents } = useAgentLimit();

  const handleCreateAgent = () => {
    if (hasReachedLimit) {
      navigate('/pricing');
    } else {
      navigate('/dashboard/create-agent');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading agents...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">Failed to load agents</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your AI Agents</h2>
        <button
          onClick={handleCreateAgent}
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5" />
          Create New Agent
        </button>
      </div>

      {!hasReachedLimit && remainingAgents > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-700">
            You can create {remainingAgents} more agent{remainingAgents !== 1 ? 's' : ''} on the free plan
          </p>
        </div>
      )}

      {hasReachedLimit && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            You've reached the free plan limit. 
            <Link to="/pricing" className="ml-2 font-medium underline">
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
          {agents.map((agent) => (
            <AgentCard
              key={agent.id}
              agent={agent}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onAnalytics={handleAnalytics}
            />
          ))}
        </div>
      )}
    </div>
  );
}