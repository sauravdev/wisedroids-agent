import React from 'react';
import { useAgents } from '@/hooks/useAgents';
import { Bot, Star, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Marketplace() {
  const { agents, loading } = useAgents();
  const publicAgents = agents.filter(agent => agent.is_public);

  return (
    <section id="marketplace" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Agent Marketplace</h2>
          <p className="text-xl text-gray-600">Discover and deploy production-ready AI agents</p>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading agents...</div>
        ) : publicAgents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <Bot className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No agents available</h3>
            <p className="mt-2 text-gray-500">Be the first to publish your agent!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicAgents.map((agent) => (
              <Link to={`/dashboard`} key={agent.id}>
              <div key={agent.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <p className="mt-2 text-gray-600">{agent.description}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {agent.status}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="mr-1.5 h-4 w-4 text-yellow-400" />
                    {(agent.metrics as any).success_rate}% Success
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="mr-1.5 h-4 w-4 text-blue-400" />
                    {(agent.metrics as any).requests} Uses
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Deploy Agent
                  </button>
                </div>
              </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}