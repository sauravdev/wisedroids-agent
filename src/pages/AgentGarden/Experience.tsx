import React from 'react';
import { Search, PlayCircle, Users } from 'lucide-react';

const experiences = [
  {
    icon: Search,
    title: "Agent Showcase",
    description: "Browse through curated AI agents, categorized by functionality and industry"
  },
  {
    icon: PlayCircle,
    title: "Interactive Demos",
    description: "Test agents in real-time with our user-friendly chat interface"
  },
  {
    icon: Users,
    title: "Collaborative Spaces",
    description: "Create multi-agent environments to solve complex problems"
  }
];

export function Experience() {
  return (
    <section className="py-20 bg-indigo-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Experience the Garden</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore a diverse ecosystem of AI agents
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {experiences.map((item, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <item.icon className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}