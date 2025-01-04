import { stripe } from './client';
import { supabase } from '../supabase/client';

export async function createCheckoutSession(priceId: string) {
  try {
    const { data: { session } } = await supabase.functions.invoke('create-checkout-session', {
      body: { priceId }
    });

    const stripeInstance = await stripe;
    if (!stripeInstance) throw new Error('Stripe not initialized');

    const result = await stripeInstance.redirectToCheckout({
      sessionId: session.id
    });

    if (result.error) {
      throw result.error;
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}