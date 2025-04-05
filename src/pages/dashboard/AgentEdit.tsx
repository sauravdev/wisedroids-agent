import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAgent } from '@/hooks/useAgent';
import { updateAgent } from '@/lib/supabase/agents';
import { StepCodeGeneration } from './AgentCreationWizard/StepCodeGeneration';

export function AgentEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { agent, loading: loadingAgent } = useAgent(id!);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    capabilities: [] as string[],
    personality: {} as Record<string, number>,
    integrations: [] as string[],
    isPublic: false,
    code: '',
  });

  useEffect(() => {
    if (agent) {
      setFormData({
        name: agent.name,
        description: agent.description,
        capabilities: agent.capabilities,
        personality: agent.personality as Record<string, number>,
        integrations: agent.integrations,
        isPublic: agent.is_public,
        code: agent.code || '',
      });
    }
  }, [agent]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agent) return;

    try {
      await updateAgent(agent.id, {
        name: formData.name,
        description: formData.description,
        capabilities: formData.capabilities,
        personality: formData.personality,
        integrations: formData.integrations,
        is_public: formData.isPublic,
        code: formData.code,
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update agent:', error);
    }
  };

  if (loadingAgent) {
    return <div>Loading...</div>;
  }

  if (!agent) {
    return <div>Agent not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Edit Agent</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <StepCodeGeneration
            agentDescription={formData.description}
            agentCapabilities={formData.capabilities}
            agentPersonality={formData.personality}
            agentIntegrations={formData.integrations}
            agentName={formData.name}
            code={formData.code}
            onSaveCode={(code) => setFormData({ ...formData, code })}
          />

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}