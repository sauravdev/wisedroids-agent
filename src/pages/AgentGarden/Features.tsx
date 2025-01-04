import React from 'react';
import { Brain, Zap, Shield, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: "AI Model Integration",
    description: "Seamlessly integrate your existing AI models or create new ones using our wizard"
  },
  {
    icon: Zap,
    title: "Real-time Training",
    description: "Train and fine-tune your agents with our interactive interface"
  },
  {
    icon: Shield,
    title: "Secure Deployment",
    description: "Deploy your agents with enterprise-grade security and monitoring"
  },
  {
    icon: BarChart2,
    title: "Advanced Analytics",
    description: "Track performance metrics and optimize your agents' behavior"
  }
];

export function Features() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Powerful Features for AI Development
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition duration-300">
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
    </section>
  );
}