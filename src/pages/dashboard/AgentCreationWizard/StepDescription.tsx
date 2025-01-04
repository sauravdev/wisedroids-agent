import React from 'react';

interface StepDescriptionProps {
  name: string;
  description: string;
  setName: (value: string) => void;
  setDescription: (value: string) => void;
}

export function StepDescription({ name, description, setName, setDescription }: StepDescriptionProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Describe Your AI Agent</h2>
      <p className="text-gray-600">Tell us what you want your AI agent to do and its primary purpose.</p>
      
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
          required
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
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          rows={4}
          placeholder="Example: I need an AI agent that can analyze customer feedback from multiple sources, categorize sentiments, and generate detailed reports with actionable insights..."
          required
        />
      </div>
    </div>
  );
}