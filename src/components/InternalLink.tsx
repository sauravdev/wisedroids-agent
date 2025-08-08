import React from 'react';
import { Link } from 'react-router-dom';

interface InternalLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  external?: boolean;
}

export function InternalLink({ 
  to, 
  children, 
  className = '', 
  onClick,
  external = false 
}: InternalLinkProps) {
  const baseClasses = 'text-indigo-600 hover:text-indigo-800 transition-colors duration-200';
  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (external || to.startsWith('http')) {
    return (
      <a 
        href={to} 
        className={combinedClasses}
        target="_blank" 
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className={combinedClasses}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}

// Predefined link configurations for common internal links
export const InternalLinks = {
  createAgent: '/create-agent',
  pricing: '/pricing',
  agentHub: '/agent-hub',
  features: '/features',
  blog: '/blog',
  docs: '/docs',
  contact: '/contact'
};

// Helper function for creating contextual internal links
export function createContextualLink(text: string, href: string, className?: string) {
  return (
    <InternalLink to={href} className={className}>
      {text}
    </InternalLink>
  );
}
