import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AgentsList } from '@/components/agents/AgentsList';
import { AgentCreationWizard } from './AgentCreationWizard';
import { AgentTestInterface } from '@/components/agents/AgentTestInterface';
import { AgentAnalytics } from './AgentAnalytics';

export function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route index element={<AgentsList />} />
        <Route path="create-agent" element={<AgentCreationWizard />} />
        <Route path="edit-agent/:id" element={<AgentCreationWizard />} />
        <Route path="agents/:id/test" element={<AgentTestInterface agentId="" apiEndpoint="" apiKey="" />} />
        <Route path="agents/:id/analytics" element={<AgentAnalytics />} />
      </Routes>
    </div>
  );
}