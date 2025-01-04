import React from 'react';
import { Hero } from './Hero';
import { Cultivation } from './Cultivation';
import { Experience } from './Experience';
import { Success } from './Success';
import { AgentShowcase } from './AgentShowcase';

export function AgentGarden() {
  return (
    <div className="min-h-screen">
      <Hero />
      <div id="cultivation">
        <Cultivation />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="success">
        <Success />
      </div>
      <div id="showcase">
        <AgentShowcase />
      </div>
    </div>
  );
}