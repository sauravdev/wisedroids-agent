import React from 'react';
import { Users, Brain, Shield } from 'lucide-react';

export function About() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">About WiseDroids</h2>
          <p className="mt-4 text-lg text-gray-500">
            Empowering businesses with intelligent AI solutions
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="text-center">
              <div className="flex justify-center">
                <Users className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Team</h3>
              <p className="mt-2 text-base text-gray-500">
                A diverse group of AI experts, engineers, and researchers working together to push the boundaries of AI technology.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Brain className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Mission</h3>
              <p className="mt-2 text-base text-gray-500">
                To democratize AI technology and make it accessible to businesses of all sizes through our innovative platform.
              </p>
            </div>

            <div className="text-center">
              <div className="flex justify-center">
                <Shield className="h-12 w-12 text-indigo-600" />
              </div>
              <h3 className="mt-6 text-lg font-medium text-gray-900">Our Values</h3>
              <p className="mt-2 text-base text-gray-500">
                We believe in transparency, security, and ethical AI development that benefits humanity.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Story</h3>
          <div className="prose prose-lg mx-auto">
            <p>
              Founded in 2024, WiseDroids emerged from a simple yet powerful idea: making AI accessible to everyone. Our founders recognized that while AI technology was advancing rapidly, many businesses struggled to harness its potential due to technical barriers and complexity.
            </p>
            <p className="mt-4">
              Today, WiseDroids is at the forefront of AI innovation, helping businesses across the globe transform their operations with intelligent AI solutions. Our platform has processed millions of requests and powers thousands of AI agents across various industries.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}