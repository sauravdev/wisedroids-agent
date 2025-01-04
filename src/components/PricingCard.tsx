import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { redirectToCheckout, STRIPE_PRICE_IDS } from '@/lib/stripe/service';

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  priceId?: keyof typeof STRIPE_PRICE_IDS;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handlePurchase = async () => {
    if (!plan.priceId) return;
    
    setLoading(true);
    setError(null);

    try {
      await redirectToCheckout(STRIPE_PRICE_IDS[plan.priceId]);
    } catch (err) {
      setError(
        err instanceof Error 
          ? err.message 
          : 'Failed to initiate checkout. Please try again.'
      );
      console.error('Purchase error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${plan.price}</span>
        {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-600">
          {error}
        </div>
      )}
      {plan.name === "Enterprise" ? (
        <Link
          to="/contact"
          className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Contact Sales
        </Link>
      ) : (
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Choose Plan'
          )}
        </button>
      )}
    </div>
  );
}