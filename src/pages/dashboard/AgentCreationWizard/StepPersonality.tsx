import React from 'react';

interface StepPersonalityProps {
  traits: Record<string, number>;
  setTraits: (traits: Record<string, number>) => void;
}

export function StepPersonality({ traits, setTraits }: StepPersonalityProps) {
  const handleTraitsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    const newTraits: Record<string, number> = {};
    
    lines.forEach(line => {
      const [trait, value] = line.split(':').map(s => s.trim());
      if (trait && !isNaN(Number(value))) {
        newTraits[trait] = Number(value);
      }
    });
    
    setTraits(newTraits);
  };

  const traitsText = Object.entries(traits)
    .map(([trait, value]) => `${trait}: ${value}`)
    .join('\n');

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Agent Personality</h2>
      <p className="text-gray-600">
        Describe your agent's personality traits using a scale from 0 to 100.
        Format: Trait: Value (one per line)
      </p>
      
      <div>
        <label htmlFor="personality" className="block text-sm font-medium text-gray-700 mb-2">
          Personality Traits
        </label>
        <textarea
          id="personality"
          value={traitsText}
          onChange={handleTraitsChange}
          rows={6}
          placeholder="Example:
Formality: 80
Friendliness: 90
Conciseness: 70
Creativity: 85"
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
    </div>
  );
}