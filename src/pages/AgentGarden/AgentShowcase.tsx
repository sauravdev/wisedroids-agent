import React from 'react';
import { useAgents } from '@/hooks/useAgents';
import { AgentCard } from '@/components/agents/AgentCard';

export function AgentShowcase() {
  const { agents, loading } = useAgents();
  const publicAgents = agents.filter(agent => agent.is_public);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Agents</h2>
        
        {loading ? (
          <div className="text-center py-12">Loading agents...</div>
        ) : publicAgents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">No public agents available yet</h3>
            <p className="mt-2 text-gray-500">Be the first to share your AI agent with the community!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {publicAgents.map((agent) => (
              <AgentCard
                key={agent.id}
                agent={agent}
                onDelete={() => {}}
                onDeploy={() => {}}
                onEdit={() => {}}
                onAnalytics={() => {}}
                readOnly
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}