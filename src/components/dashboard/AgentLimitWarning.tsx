import React from 'react';
import { Link } from 'react-router-dom';

interface AgentLimitWarningProps {
  agentCount: number;
  maxFreeAgents?: number;
}

export function AgentLimitWarning({ agentCount, maxFreeAgents = 2 }: AgentLimitWarningProps) {
  if (agentCount < maxFreeAgents) {
    return (
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <p className="text-sm text-blue-700">
              You can create {maxFreeAgents - agentCount} more agent{maxFreeAgents - agentCount !== 1 ? 's' : ''} for free
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <p className="text-sm text-yellow-700">
            You've reached the free agent limit. 
            <Link to="/pricing" className="ml-2 font-medium underline">
              Upgrade your plan
            </Link>
            {' '}to create more agents.
          </p>
        </div>
      </div>
    </div>
  );
}