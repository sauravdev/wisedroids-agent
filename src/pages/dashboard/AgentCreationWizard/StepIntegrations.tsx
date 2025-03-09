import React from 'react';

interface StepIntegrationsProps {
  selectedIntegrations: string[];
  setSelectedIntegrations: (integrations: string[]) => void;
}

export function StepIntegrations({ selectedIntegrations, setSelectedIntegrations }: StepIntegrationsProps) {
  const handleIntegrationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const integrations = e.target.value.split('\n').filter(int => int.trim() !== '');
    setSelectedIntegrations(integrations);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Integrations</h2>
      <p className="text-gray-600">List the platforms and tools your agent should integrate with, one per line.</p>
      
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
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
}