import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full text-indigo-700">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">AI Agent Marketplace</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Cultivate Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600"> AI Garden</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Transform your ideas into powerful AI agents. Create, deploy, and monetize intelligent agents in our thriving ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Creating
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#showcase"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-indigo-600 bg-white border-2 border-indigo-100 hover:bg-indigo-50 transition-colors"
              >
                Explore Agents
              </a>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative bg-white rounded-2xl shadow-xl p-8">
              <div className="aspect-square rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
                <Bot className="w-32 h-32 text-indigo-600" />
              </div>
              <div className="mt-8 space-y-4">
                <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full"></div>
                <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}