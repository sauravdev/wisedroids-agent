import React, { useState, useEffect } from "react";

interface StepPersonalityProps {
  traits: string;
  setTraits: (traits: string) => void;
  errors?: {
    personality?: string;
  };
}

export function StepPersonality({
  traits,
  setTraits,
  errors,
}: StepPersonalityProps) {
  const [inputValue, setInputValue] = useState(traits);

  // Initialize input value when component mounts or traits change

  const handleTraitsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    setTraits(newValue);
    // // Only update traits when the input is valid
    // const lines = newValue.split('\n').filter(line => line.trim() !== '');
    // const newTraits: Record<string, number> = {};

    // lines.forEach(line => {
    //   const [trait, value] = line.split(':').map(s => s.trim());
    //   if (trait && !isNaN(Number(value))) {
    //     newTraits[trait] = Number(value);
    //   }
    // });

    // // Only update if we have valid traits
    // if (Object.keys(newTraits).length > 0) {
    //   setTraits(newTraits);
    // }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">Agent Security</h2>
      <p className="text-gray-600">
        What are the ethical and safety constraints for the agents’ behavior,
        and how will they be enforced?
      </p>

      <div>
        <label
          htmlFor="personality"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Security and Guardrails
        </label>
        <textarea
          id="personality"
          value={inputValue}
          onChange={handleTraitsChange}
          rows={6}
          placeholder="Describe what are the ethical and safety constraints for the agents"
          className={`w-full rounded-md shadow-sm focus:ring-indigo-200 focus:ring-opacity-50 ${
            errors?.personality
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-indigo-300"
          }`}
        />
        {errors?.personality && (
          <p className="mt-1 text-sm text-red-600">{errors.personality}</p>
        )}
      </div>
    </div>
  );
}
