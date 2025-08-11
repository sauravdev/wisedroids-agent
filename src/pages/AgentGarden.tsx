import React from 'react';
import { useAgents } from '@/hooks/useAgents';
import { AgentCard } from '@/components/agents/AgentCard';

export function AgentGarden() {
  const { agents, loading, error } = useAgents();
  const publicAgents = agents.filter(agent => agent.is_public);

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agent Garden</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cultivate, Experience, and Monetize AI Agents
          </p>
        </div>

        <div className="prose prose-lg mx-auto mb-16">
          <p>
            Welcome to Agent Garden, your one-stop platform for hosting, experiencing, and monetizing AI agents. 
            Our intuitive interface allows you to nurture your AI creations and share them with the world.
          </p>

          <h2>Cultivate Your Agents</h2>
          <p>Bring your AI agents to life in our virtual garden:</p>
          <ul>
            <li>Plant an Agent: Upload your AI model or use our text-to-agent wizard</li>
            <li>Nurture Growth: Fine-tune your agent's capabilities</li>
            <li>Prune and Optimize: Monitor performance metrics</li>
          </ul>

          <h2>Experience the Garden</h2>
          <p>Explore a diverse ecosystem of AI agents:</p>
          <ul>
            <li>Agent Showcase: Browse through curated AI agents</li>
            <li>Interactive Demos: Test agents in real-time</li>
            <li>Collaborative Spaces: Create multi-agent environments</li>
          </ul>

          <h2>Harvest Your Success</h2>
          <p>Monetize your AI agents with ease:</p>
          <ul>
            <li>Flexible Pricing Models: Subscription plans and pay-per-use options</li>
            <li>API Marketplace: Offer your agent's capabilities as APIs</li>
            <li>Usage Analytics: Track revenue and performance metrics</li>
          </ul>
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Public Agents Showcase</h2>
          {loading ? (
            <div className="text-center">Loading agents...</div>
          ) : error ? (
            <div className="text-center text-red-600">Failed to load agents</div>
          ) : publicAgents.length === 0 ? (
            <div className="text-center text-gray-500">No public agents available yet</div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {publicAgents.map((agent) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  onDelete={() => {}}
                  onDeploy={() => {}}
                  onReDeploy={() => {}}
                  onEdit={() => {}}
                  onAnalytics={() => {}}
                  onTogglePublic={() => {}}
                  isLoading={false}
                  deploymentStatus="deployed"
                  readOnly
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}