import React from 'react';
import { Bot, Users, Zap, Activity } from 'lucide-react';

interface Stat {
  name: string;
  value: string;
  icon: React.ElementType;
  change: string;
  trend: 'up' | 'down';
}

const stats: Stat[] = [
  { name: 'Total Agents', value: '12', icon: Bot, change: '+20%', trend: 'up' },
  { name: 'Active Users', value: '2,451', icon: Users, change: '+15%', trend: 'up' },
  { name: 'API Calls', value: '45.2k', icon: Zap, change: '+12%', trend: 'up' },
  { name: 'Avg Response Time', value: '120ms', icon: Activity, change: '-8%', trend: 'down' },
];

export function DashboardHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-500">Overview of your AI agents and performance metrics</p>
      
      <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white overflow-hidden rounded-lg shadow">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <stat.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                      <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}