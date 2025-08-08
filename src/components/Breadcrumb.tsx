import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
      <Link 
        to="/" 
        className="flex items-center hover:text-indigo-600 transition-colors"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {item.href ? (
            <Link 
              to={item.href}
              className="hover:text-indigo-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// Predefined breadcrumb configurations
export const BreadcrumbConfigs = {
  features: [
    { label: 'Features', href: '/features' }
  ],
  pricing: [
    { label: 'Pricing', href: '/pricing' }
  ],
  agentHub: [
    { label: 'Agent Hub', href: '/agent-hub' }
  ],
  createAgent: [
    { label: 'Create Agent', href: '/create-agent' }
  ],
  blog: [
    { label: 'Blog', href: '/blog' }
  ],
  blogPost: (title: string) => [
    { label: 'Blog', href: '/blog' },
    { label: title }
  ]
};
