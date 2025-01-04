import React from 'react';
import { Link } from 'react-router-dom';
import { Bot } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Bot className="w-12 h-12 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">WiseDroids</h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Text-to-AI Agent Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Transform your ideas into powerful AI agents with just a text description. WiseDroids leverages cutting-edge research and technology to create the most accurate and high-performing AI agents on the market.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              to="/signup"
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/demo"
              className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
            >
              View Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}