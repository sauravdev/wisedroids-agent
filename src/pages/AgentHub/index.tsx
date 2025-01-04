import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { Marketplace } from './Marketplace';
import { Community } from './Community';
import { AgentShowcase } from './AgentShowcase';

export function AgentHub() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Marketplace />
      <Community />
      <AgentShowcase />
    </div>
  );
}