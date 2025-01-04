import React from 'react';
import { Check } from 'lucide-react';

interface Capability {
  id: string;
  name: string;
  description: string;
}

interface StepCapabilitiesProps {
  selectedCapabilities: string[];
  setSelectedCapabilities: (capabilities: string[]) => void;
}

const capabilities: Capability[] = [
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    description: 'Understand and process human language naturally'
  },
  {
    id: 'data-analysis',
    name: 'Data Analysis',
    description: 'Process and analyze large datasets'
  },
  {
    id: 'automation',
    name: 'Task Automation',
    description: 'Automate repetitive tasks and workflows'
  },
  {
    id: 'integration',
    name: 'API Integration',
    description: 'Connect with external services and APIs'
  },
  {
    id: 'learning',
    name: 'Machine Learning',
    description: 'Learn and improve from interactions'
  }
];

export function StepCapabilities({ selectedCapabilities, setSelectedCapabilities }: StepCapabilitiesProps) {
  const toggleCapability = (id: string) => {
    if (selectedCapabilities.includes(id)) {
      setSelectedCapabilities(selectedCapabilities.filter(c => c !== id));
    } else {
      setSelectedCapabilities([...selectedCapabilities, id]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Select Capabilities</h2>
      <p className="text-gray-600">Choose the capabilities your AI agent needs.</p>
      
      <div className="grid gap-4 mt-4">
        {capabilities.map((capability) => (
          <div
            key={capability.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedCapabilities.includes(capability.id)
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
            onClick={() => toggleCapability(capability.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                selectedCapabilities.includes(capability.id)
                  ? 'bg-indigo-500 border-indigo-500'
                  : 'border-gray-300'
              }`}>
                {selectedCapabilities.includes(capability.id) && (
                  <Check className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{capability.name}</h3>
                <p className="text-sm text-gray-500">{capability.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}