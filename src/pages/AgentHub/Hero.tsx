import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, ArrowRight, Sparkles, Globe } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-blue-50 via-white to-indigo-50 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">Global AI Marketplace</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900">
              Welcome to the
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> Agent Hub</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Discover, deploy, and collaborate with AI agents from creators worldwide. Your gateway to the future of AI innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Join the Hub
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#marketplace"
                className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white border-2 border-blue-100 hover:bg-blue-50 transition-colors"
              >
                Browse Agents
              </a>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-3xl blur-3xl opacity-30"></div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-float"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <Bot className={`w-8 h-8 ${i % 2 === 0 ? 'text-blue-600' : 'text-indigo-600'}`} />
                    <div className="mt-4 space-y-2">
                      <div className="h-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full"></div>
                      <div className="h-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}