import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

export async function getUserSubscription(userEmail: string | undefined) {
    try {
      if (!userEmail) {
        console.log('Email is required to fetch the subscription.');
        return null;
      }
  
      // Step 1: Get the customer by email
      const customers = await stripe.customers.list({
        email: userEmail,
        limit: 1,
      });
      if (!customers.data.length) {
        console.log('No customer found with this email.');
        return null;
      }
  
      const customer = customers.data[0]; // First matching customer
      const customerId = customer.id;
  
      // Step 2: Fetch active subscription for the customer
      const subscriptions = await stripe.subscriptions.list({
        customer: customerId,
        status: 'active',
        limit: 1,
      });
      if (!subscriptions.data.length) {
        console.log('No active subscription found for this customer.');
        return {
          subscription_status: 'expired',
          subscription_type: 'free',
          expires_on: new Date().toISOString(),
        };
      }
  
      const subscription = subscriptions.data[0];
  
      // Step 3: Extract subscription details
      const productId = subscription.items.data[0].price.product;
      const status = subscription.status;
      const currentPeriodEnd = new Date(subscription.items.data[0].current_period_end * 1000).toISOString(); // Expiry date
  
      let planType = 'free';
      if (productId === 'prod_S8gUAiFJsHyKn9') {
        planType = 'WiseDroids Starter'; // WiseDroids Starter
      } else if (productId === 'prod_S8gV9jVWsVIUfS') {
        planType = 'WiseDroids Professional'; // WiseDroids Professional
      }
  
      return {
        subscription_status: status === 'active' ? 'active' : 'expired',
        subscription_type: planType,
        expires_on: currentPeriodEnd,
      };
    } catch (error) {
      console.error('Error fetching subscription:', error);
      return null;
    }
  }