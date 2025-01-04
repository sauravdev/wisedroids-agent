import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Book, Settings, HelpCircle } from 'lucide-react';

const actions = [
  {
    name: 'Create Agent',
    description: 'Start building a new AI agent',
    href: '/dashboard/create-agent',
    icon: Plus,
    color: 'bg-indigo-500',
  },
  {
    name: 'Documentation',
    description: 'Learn about agent creation',
    href: '/docs',
    icon: Book,
    color: 'bg-purple-500',
  },
  {
    name: 'Settings',
    description: 'Configure your workspace',
    href: '/dashboard/settings',
    icon: Settings,
    color: 'bg-gray-500',
  },
  {
    name: 'Support',
    description: 'Get help with your agents',
    href: '/support',
    icon: HelpCircle,
    color: 'bg-blue-500',
  },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      {actions.map((action) => (
        <Link
          key={action.name}
          to={action.href}
          className="relative rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`inline-flex rounded-lg p-3 ${action.color} bg-opacity-10`}>
            <action.icon className={`h-6 w-6 ${action.color.replace('bg-', 'text-')}`} />
          </div>
          <h3 className="mt-4 text-base font-medium text-gray-900">{action.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{action.description}</p>
        </Link>
      ))}
    </div>
  );
}