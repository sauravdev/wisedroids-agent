import React from 'react';
import { Brain, Zap, Shield, BarChart } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "Unparalleled Ease of Use",
    description: "Simply describe your desired AI agent in natural language, and WiseDroids does the rest."
  },
  {
    icon: Zap,
    title: "State-of-the-Art Performance",
    description: "Built on the latest advancements in AI research with top-tier language model integration."
  },
  {
    icon: Shield,
    title: "Enterprise-Ready Features",
    description: "Deploy with confidence using our enterprise-grade solutions and seamless integrations."
  },
  {
    icon: BarChart,
    title: "Optimized for Accuracy",
    description: "Advanced techniques ensure the highest level of accuracy with context-aware decision making."
  }
];

export function Features() {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern AI Development
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to create, deploy, and scale AI agents effectively
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-xl border border-gray-200 hover:shadow-lg transition">
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}