import React from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Play, BarChart2, Rocket } from 'lucide-react';
import type { Agent } from '@/lib/supabase/agents';

interface AgentCardProps {
  agent: Agent;
  onDelete: (id: string) => void;
  onDeploy: (id: string) => void;
  onEdit: (id: string) => void;
  onAnalytics: (id: string) => void;
  readOnly?: boolean;
}

export function AgentCard({ agent, onDelete, onDeploy, onEdit, onAnalytics, readOnly }: AgentCardProps) {
  const metrics = agent.metrics as { requests: number; success_rate: number; avg_response_time: number };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{agent.description}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          agent.status === 'deployed' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {agent.status}
        </span>
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
              onClick={() => onDelete(agent.id)}
              className="p-2 text-red-400 hover:text-red-600"
              title="Delete Agent"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
          
          {agent.status !== 'deployed' ? (
            <button
              onClick={() => onDeploy(agent.id)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              <Rocket className="h-4 w-4" />
              Deploy
            </button>
          ) : (
            <Link
              to={`/dashboard/agents/${agent.id}/test`}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Play className="h-4 w-4" />
              Test Agent
            </Link>
          )}
        </div>
      )}
    </div>
  );
}