import React from 'react';
import { HeadphonesIcon, BarChart2, Paintbrush, Cog, MessageSquare, PenTool } from 'lucide-react';

const useCases = [
  {
    icon: HeadphonesIcon,
    title: "Customer Service",
    description: "24/7 support with human-like interactions"
  },
  {
    icon: BarChart2,
    title: "Data Analysis",
    description: "Extract insights from complex datasets"
  },
  {
    icon: PenTool,
    title: "Content Generation",
    description: "Create engaging blog posts, articles, and marketing copy automatically"
  },
  {
    icon: Paintbrush,
    title: "Creative Tasks",
    description: "Generate content, designs, and ideas"
  },
  {
    icon: Cog,
    title: "Process Automation",
    description: "Streamline workflows across departments"
  },
  {
    icon: MessageSquare,
    title: "Sales and Marketing",
    description: "Qualify leads and personalize outreach"
  }
];

export function UseCases() {
  return (
    <div className="py-20 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Use Cases
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how businesses across industries are leveraging WiseDroids
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition">
              <useCase.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}