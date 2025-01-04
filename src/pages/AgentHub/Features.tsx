import React from 'react';
import { Search, Zap, Users, Shield } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: "Smart Discovery",
    description: "Find the perfect AI agents using our intelligent search and recommendation system"
  },
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Deploy and integrate agents into your workflow with just a few clicks"
  },
  {
    icon: Users,
    title: "Collaborative Platform",
    description: "Connect with creators and collaborate on agent development"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security and performance monitoring for all agents"
  }
];

export function Features() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            The Ultimate AI Agent Platform
          </h2>
          <p className="text-xl text-gray-600">
            Everything you need to discover, deploy, and manage AI agents
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
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