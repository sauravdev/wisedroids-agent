import React from 'react';
import { DollarSign, Gauge, Users, BarChart2 } from 'lucide-react';

const monetizationFeatures = [
  {
    icon: DollarSign,
    title: "Flexible Pricing",
    description: "Set up subscription plans or pay-per-use models for your agents"
  },
  {
    icon: Gauge,
    title: "API Access",
    description: "Offer your agent's capabilities through secure API endpoints"
  },
  {
    icon: Users,
    title: "User Management",
    description: "Track usage and manage customer access to your agents"
  },
  {
    icon: BarChart2,
    title: "Revenue Analytics",
    description: "Monitor earnings and performance metrics in real-time"
  }
];

export function Monetization() {
  return (
    <section className="py-16 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Monetize Your AI Agents
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Turn your AI innovations into revenue streams with our comprehensive monetization tools
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {monetizationFeatures.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition duration-300">
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