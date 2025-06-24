import React from 'react';

interface StepIntegrationsProps {
  selectedIntegrations: string[];
  setSelectedIntegrations: (integrations: string[]) => void;
  errors?: {
    integrations?: string;
  };
}

export function StepIntegrations({ selectedIntegrations, setSelectedIntegrations, errors }: StepIntegrationsProps) {
  const handleIntegrationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const integrations = e.target.value.split('\n').filter(int => int.trim() !== '');
    setSelectedIntegrations(integrations);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
      <p className="text-gray-600">What are and how will the agents integrate with external tools, APIs, or data sources, or MCP servers?</p>
      
      <div>
        <label htmlFor="integrations" className="block text-sm font-medium text-gray-700 mb-2">
          Integrations
        </label>
        <textarea
          id="integrations"
          value={selectedIntegrations.join('\n')}
          onChange={handleIntegrationsChange}
          rows={6}
          placeholder="Example:
Slack
Discord
GitHub
Zapier
Custom API endpoint: https://api.example.com"
          className={`w-full rounded-md shadow-sm focus:ring-indigo-200 focus:ring-opacity-50 ${
            errors?.integrations ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-300'
          }`}
        />
        {errors?.integrations && <p className="mt-1 text-sm text-red-600">{errors.integrations}</p>}
      </div>
    </div>
  );
}