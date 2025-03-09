import React from 'react';

interface StepDescriptionProps {
  name: string;
  description: string;
  setName: (name: string) => void;
  setDescription: (description: string) => void;
}

export function StepDescription({ name, description, setName, setDescription }: StepDescriptionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Describe Your Agent</h2>
      <p className="text-gray-600">Provide a name and detailed description of what you want your AI agent to do.</p>
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Agent Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter a name for your agent"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Describe what you want your agent to do in detail..."
        />
      </div>
    </div>
  );
}