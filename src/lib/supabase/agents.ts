import { supabase } from './client';
import type { Database } from './database.types';

export type Agent = Database['public']['Tables']['agents']['Row'];

export async function createAgent(agentData: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('agents')
    .insert([agentData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getUserAgents() {
  const { data, error } = await supabase
    .from('agents')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function updateAgent(id: string, updates: Partial<Agent>) {
  const { data, error } = await supabase
    .from('agents')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAgent(id: string) {
  const { error } = await supabase
    .from('agents')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function deployAgent(id: string) {
  // Simulate deployment process
  const apiKey = `agent_${Math.random().toString(36).substring(7)}`;
  const apiEndpoint = `https://api.wisedroids.com/v1/agents/${id}`;
  
  const { data, error } = await supabase
    .from('agents')
    .update({
      status: 'deployed',
      api_key: apiKey,
      api_endpoint: apiEndpoint
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}