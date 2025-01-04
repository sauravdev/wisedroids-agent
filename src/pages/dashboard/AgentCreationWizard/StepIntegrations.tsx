import React from 'react';
import { Check } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
}

interface StepIntegrationsProps {
  selectedIntegrations: string[];
  setSelectedIntegrations: (integrations: string[]) => void;
}

const integrations: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Connect with Slack for team communications',
    category: 'Communication'
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Integrate with Discord servers',
    category: 'Communication'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with thousands of apps',
    category: 'Automation'
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Integrate with GitHub repositories',
    category: 'Development'
  }
];

export function StepIntegrations({ selectedIntegrations, setSelectedIntegrations }: StepIntegrationsProps) {
  const toggleIntegration = (id: string) => {
    if (selectedIntegrations.includes(id)) {
      setSelectedIntegrations(selectedIntegrations.filter(i => i !== id));
    } else {
      setSelectedIntegrations([...selectedIntegrations, id]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Choose Integrations</h2>
      <p className="text-gray-600">Select the platforms you want your AI agent to integrate with.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {integrations.map((integration) => (
          <div
            key={integration.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedIntegrations.includes(integration.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => toggleIntegration(integration.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                selectedIntegrations.includes(integration.id)
                  ? 'bg-indigo-500 border-indigo-500'
                  : 'border-gray-300'
              }`}>
                {selectedIntegrations.includes(integration.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{integration.name}</h3>
                <p className="text-sm text-gray-500">{integration.description}</p>
                <span className="text-xs text-indigo-600 mt-1 inline-block">
                  {integration.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}