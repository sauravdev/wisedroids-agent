import React from 'react';
import { DollarSign, Code, BarChart2 } from 'lucide-react';

const features = [
  {
    icon: DollarSign,
    title: "Flexible Pricing Models",
    description: "Set up subscription plans and pay-per-use options for your agents",
    color: "from-green-400 to-emerald-600"
  },
  {
    icon: Code,
    title: "API Marketplace",
    description: "Offer your agent's capabilities as APIs for developers",
    color: "from-blue-400 to-indigo-600"
  },
  {
    icon: BarChart2,
    title: "Usage Analytics",
    description: "Track revenue and performance metrics in real-time",
    color: "from-purple-400 to-pink-600"
  }
];

export function Success() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Harvest Your Success</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Monetize your AI agents with ease
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative overflow-hidden rounded-xl p-8 group hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-10 group-hover:opacity-15 transition-opacity`} />
              <div className="relative">
                <feature.icon className="w-12 h-12 text-indigo-600 mb-6" />
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}