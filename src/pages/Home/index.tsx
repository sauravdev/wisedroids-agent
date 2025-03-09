import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Hero } from './Hero';
import { Features } from './Features';
import { HowItWorks } from './HowItWorks';
import { UseCases } from './UseCases';
import { Pricing } from './Pricing';

export function Home() {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a scrollTo parameter in the URL
    const searchParams = new URLSearchParams(location.search);
    const scrollTo = searchParams.get('scrollTo');
    if (scrollTo === 'pricing') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      // Clean up the URL
      window.history.replaceState({}, '', '/');
    }
  }, [location]);

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