import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/client';

export function useAgentMetrics(agentId: string) {
  const [metrics, setMetrics] = useState({
    requests: 0,
    success_rate: 0,
    avg_response_time: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const { data, error } = await supabase
          .from('agent_metrics')
          .select('*')
          .eq('agent_id', agentId)
          .single();

        if (error) throw error;
        
        if (data) {
          setMetrics({
            requests: data.total_requests,
            success_rate: (data.successful_requests / data.total_requests) * 100,
            avg_response_time: data.total_response_time / data.total_requests,
          });
        }
      } catch (err) {
        console.error('Error fetching metrics:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
    
    // Set up real-time subscription
    const subscription = supabase
      .channel(`agent-metrics-${agentId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'agent_metrics',
        filter: `agent_id=eq.${agentId}` 
      }, (payload) => {
        const newData = payload.new;
        setMetrics({
          requests: newData.total_requests,
          success_rate: (newData.successful_requests / newData.total_requests) * 100,
          avg_response_time: newData.total_response_time / newData.total_requests,
        });
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [agentId]);

  return { metrics, loading };
}