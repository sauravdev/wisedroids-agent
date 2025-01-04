import React from 'react';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { UseCases } from './UseCases';
import { Pricing } from './Pricing';

export function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div id="features">
        <Features />
      </div>
      <div id="how-it-works">
        <HowItWorks />
      </div>
      <div id="use-cases">
        <UseCases />
      </div>
      <div id="pricing">
        <Pricing />
      </div>
    </div>
  );
}