import React from 'react';
import { Users, MessageSquare, GitBranch, Award } from 'lucide-react';

const communityFeatures = [
  {
    icon: Users,
    title: "Connect with Creators",
    description: "Join a community of innovative AI developers and creators"
  },
  {
    icon: MessageSquare,
    title: "Knowledge Sharing",
    description: "Learn from experts and share your experiences with others"
  },
  {
    icon: GitBranch,
    title: "Collaborative Development",
    description: "Fork, modify, and contribute to existing agents"
  },
  {
    icon: Award,
    title: "Recognition & Rewards",
    description: "Earn reputation and rewards for your contributions"
  }
];

export function Community() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our Community</h2>
          <p className="text-xl text-gray-600">Connect, collaborate, and grow with fellow AI enthusiasts</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {communityFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-100 hover:shadow-lg transition-all duration-200"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-6">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}