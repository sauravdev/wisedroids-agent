import React from 'react';

interface StepCapabilitiesProps {
  selectedCapabilities: string[];
  setSelectedCapabilities: (capabilities: string[]) => void;
}

export function StepCapabilities({ selectedCapabilities, setSelectedCapabilities }: StepCapabilitiesProps) {
  const handleCapabilitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const capabilities = e.target.value.split('\n').filter(cap => cap.trim() !== '');
    setSelectedCapabilities(capabilities);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Agent Capabilities</h2>
      <p className="text-gray-600">Describe your agent's capabilities, one per line.</p>
      
      <div>
        <label htmlFor="capabilities" className="block text-sm font-medium text-gray-700 mb-2">
          Capabilities
        </label>
        <textarea
          id="capabilities"
          value={selectedCapabilities.join('\n')}
          onChange={handleCapabilitiesChange}
          rows={6}
          placeholder="Example:
Natural language processing
Data analysis and visualization
Task automation
API integration
Real-time monitoring"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
}