import { useEffect, useState } from 'react';
import { getUserSubscription } from '@/lib/stripe/subscription';
import { useAgents } from './useAgents';
import { useAuth } from './useAuth';

/**
 * Custom hook to check agent limits based on user subscription
 * Uses localStorage to cache subscription data and minimize API calls
 */
export function useAgentLimit() {
  const { agents } = useAgents();
  const { user } = useAuth();
  
  const [subscriptionData, setSubscriptionData] = useState(() => {
    // Try to load from localStorage on initial render
    try {
      const cachedData = localStorage.getItem("subscription");
      return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
      console.error("Error parsing cached subscription:", error);
      return null;
    }
  });
  
  const [isLoading, setIsLoading] = useState(!subscriptionData);

  useEffect(() => {
    async function fetchSubscription() {
      if (!user?.email) {
        setIsLoading(false);
        return;
      }

      // If we already have subscription data, no need to fetch again
      if (subscriptionData && subscriptionData.subscription_status === "active") {
        setIsLoading(false);
        return;
      }

      try {
        const subscription = await getUserSubscription(user.email);
        if (subscription?.subscription_status === "active") {
          localStorage.setItem("subscription", JSON.stringify(subscription));
          setSubscriptionData(subscription);
        } else {
          // Clear invalid subscription data
          localStorage.removeItem("subscription");
          setSubscriptionData(null);
        }
      } catch (error) {
        console.error("Error fetching subscription:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchSubscription();
  }, [user?.email, subscriptionData?.subscription_status]);

  // Determine tier limit
  const subscription_type = subscriptionData?.subscription_tier || null;
  let FREE_TIER_LIMIT = 2; // Default free tier

  if (subscription_type === "Monthly Pro") {
    FREE_TIER_LIMIT = 10;
  }
  const privateAgents = agents.filter((el)=>!el.is_public);
  const hasReachedLimit = privateAgents.length >= FREE_TIER_LIMIT;
  const remainingAgents = Math.max(0, FREE_TIER_LIMIT - privateAgents.length);

  return {
    hasReachedLimit,
    remainingAgents,
    totalAgents: privateAgents.length,
    limit: FREE_TIER_LIMIT,
    isChecking : isLoading,
    subscriptionType : subscription_type
  };
}