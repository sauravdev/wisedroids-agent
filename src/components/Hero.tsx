import React from 'react';
import { Bot, Sparkles, Zap } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">WiseDroids</h1>
          </div>
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Text-to-AI Agent Platform
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mb-8">
            Transform your ideas into powerful AI agents with just a text description. WiseDroids leverages cutting-edge research and technology to create the most accurate and high-performing AI agents on the market.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">
              Get Started Free
            </button>
            <button className="border border-gray-300 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}