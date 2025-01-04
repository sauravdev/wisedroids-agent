import { useAgents } from './useAgents';

const FREE_TIER_LIMIT = 2;

export function useAgentLimit() {
  const { agents } = useAgents();

  const hasReachedLimit = agents.length >= FREE_TIER_LIMIT;
  const remainingAgents = Math.max(0, FREE_TIER_LIMIT - agents.length);

  return {
    hasReachedLimit,
    remainingAgents,
    totalAgents: agents.length,
    limit: FREE_TIER_LIMIT
  };
}