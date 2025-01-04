import React from 'react';
import { Sprout, Brain, Zap, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Sprout,
    title: "Plant Your Agent",
    description: "Start with a simple description of your AI agent's purpose"
  },
  {
    icon: Brain,
    title: "Train & Nurture",
    description: "Customize behavior and capabilities through our intuitive interface"
  },
  {
    icon: Zap,
    title: "Optimize Performance",
    description: "Fine-tune your agent with real-world testing and analytics"
  },
  {
    icon: Rocket,
    title: "Deploy & Scale",
    description: "Launch your agent and scale across multiple platforms"
  }
];

export function Cultivation() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Grow Your AI Ecosystem
          </h2>
          <p className="text-xl text-gray-600">
            Follow our proven process to create and nurture successful AI agents
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
                  <step.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}