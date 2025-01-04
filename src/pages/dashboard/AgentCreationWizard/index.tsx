import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAgentLimit } from '@/hooks/useAgentLimit';
import { createAgent, updateAgent } from '@/lib/supabase/agents';
import { useAgent } from '@/hooks/useAgent';
// ... other imports remain the same

export function AgentCreationWizard() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { hasReachedLimit } = useAgentLimit();
  const { agent: existingAgent, loading: loadingAgent } = useAgent(id);
  
  // Redirect to pricing if limit reached and not editing
  useEffect(() => {
    if (hasReachedLimit && !id) {
      navigate('/pricing');
    }
  }, [hasReachedLimit, id, navigate]);

  // ... rest of the component remains the same
}