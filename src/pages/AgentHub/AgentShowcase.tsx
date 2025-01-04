import React from 'react';
import { useAgents } from '@/hooks/useAgents';
import { AgentCard } from '@/components/agents/AgentCard';

export function AgentShowcase() {
  const { agents, loading, error } = useAgents();
  const featuredAgents = agents.filter(agent => agent.is_public).slice(0, 3);

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Agents</h2>
          <p className="text-xl text-gray-600">Explore our most popular AI agents</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading featured agents...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">Failed to load agents</div>
        ) : featuredAgents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900">No featured agents yet</h3>
            <p className="mt-2 text-gray-500">Check back soon for featured agents!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAgents.map((agent) => (
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