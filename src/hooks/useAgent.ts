import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';
import type { Agent } from '@/lib/supabase/agents';

export function useAgent(id: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAgent() {
      if (!id) {
        setError('Agent ID is required');
        setLoading(false);
        return;
      }

      try {
        const { data, error: supabaseError } = await supabase
          .from('agents')
          .select('*')
          .eq('id', id)
          .single();

        if (supabaseError) throw supabaseError;
        setAgent(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch agent');
      } finally {
        setLoading(false);
      }
    }

    fetchAgent();
  }, [id]);

  return { agent, loading, error };
}