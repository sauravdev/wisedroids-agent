import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { AgentsList } from '@/components/agents/AgentsList';
import { AgentCreationWizard } from './AgentCreationWizard';
import { AgentTestInterface } from '@/components/agents/AgentTestInterface';
import { AgentAnalytics } from './AgentAnalytics';

// Wrapper component to extract agent ID from URL params
function AgentTestWrapper() {
  const { id } = useParams<{ id: string }>();
  return <AgentTestInterface agentId={id!} />;
}

export function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if the URL has the logout parameter
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('logout') === 'true') {
      // Clear localStorage
      localStorage.clear();
      
      // Redirect to login page
      navigate('/login', { replace: true });
    }
  }, [location.search, navigate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Routes>
        <Route index element={<AgentsList />} />
        <Route path="create-agent" element={<AgentCreationWizard />} />
        <Route path="edit-agent/:id" element={<AgentCreationWizard />} />
        <Route path="agents/:id/test" element={<AgentTestWrapper />} />
        <Route path="agents/:id/analytics" element={<AgentAnalytics />} />
      </Routes>
    </div>
  );
}