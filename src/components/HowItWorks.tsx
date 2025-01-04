import React from 'react';
import { MessageSquare, Cpu, PlayCircle, Rocket } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Describe Your Agent",
    description: "Use our text-to-agent wizard to outline your agent's purpose and capabilities."
  },
  {
    icon: Cpu,
    title: "AI-Powered Generation",
    description: "Our advanced algorithms interpret your description and create a custom AI agent."
  },
  {
    icon: PlayCircle,
    title: "Refine and Test",
    description: "Interact with your agent in real-time, making adjustments as needed."
  },
  {
    icon: Rocket,
    title: "Deploy",
    description: "Launch your agent across desired platforms with a single click."
  }
];

export function HowItWorks() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Creating an AI agent with WiseDroids is simple and straightforward
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <step.icon className="w-16 h-16 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}