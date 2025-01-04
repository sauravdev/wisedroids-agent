import React from 'react';

interface PersonalityTrait {
  id: string;
  name: string;
  min: string;
  max: string;
}

interface StepPersonalityProps {
  traits: Record<string, number>;
  setTraits: (traits: Record<string, number>) => void;
}

const personalityTraits: PersonalityTrait[] = [
  {
    id: 'formality',
    name: 'Communication Style',
    min: 'Casual',
    max: 'Formal'
  },
  {
    id: 'detail',
    name: 'Response Detail',
    min: 'Concise',
    max: 'Detailed'
  },
  {
    id: 'proactivity',
    name: 'Initiative Level',
    min: 'Reactive',
    max: 'Proactive'
  }
];

export function StepPersonality({ traits, setTraits }: StepPersonalityProps) {
  const handleTraitChange = (id: string, value: number) => {
    setTraits({ ...traits, [id]: value });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Personality Traits</h2>
      <p className="text-gray-600">Customize how your AI agent interacts and communicates.</p>
      
      <div className="space-y-6 mt-4">
        {personalityTraits.map((trait) => (
          <div key={trait.id} className="space-y-2">
            <div className="flex justify-between">
              <label className="font-medium text-gray-700">{trait.name}</label>
              <span className="text-sm text-gray-500">
                {trait.min} - {trait.max}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={traits[trait.id] || 50}
              onChange={(e) => handleTraitChange(trait.id, parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{trait.min}</span>
              <span>{trait.max}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}