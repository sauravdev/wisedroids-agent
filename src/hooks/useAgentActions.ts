import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteAgent } from '@/lib/supabase/agents';
import { deleteDeployedAgent } from '@/lib/render/deploy';

export function useAgentActions() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDelete = async (id: string,service_id:string| null) => {
    if (!window.confirm('Are you sure you want to delete this agent?')) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await deleteAgent(id);
      await deleteDeployedAgent(service_id)
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete agent');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/dashboard/edit-agent/${id}`);
  };

  const handleAnalytics = (id: string) => {
    navigate(`/dashboard/agents/${id}/analytics`);
  };

  return {
    handleDelete,
    handleEdit,
    handleAnalytics,
    loading,
    error
  };
}