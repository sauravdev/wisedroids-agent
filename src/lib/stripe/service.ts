export const STRIPE_PRICE_IDS = {
  starter: 'https://buy.stripe.com/test_28ocP7aBv4XM0rmdQQ',
  professional: 'https://buy.stripe.com/test_00g3ex7pjai67TO7st'
} as const;

export const redirectToCheckout = async (checkoutUrl: string) => {
  try {
    window.location.href = checkoutUrl;
  } catch (err) {
    console.error('Error redirecting to checkout:', err);
    throw new Error(
      err instanceof Error 
        ? err.message 
        : 'Failed to initiate checkout. Please try again.'
    );
  }
};