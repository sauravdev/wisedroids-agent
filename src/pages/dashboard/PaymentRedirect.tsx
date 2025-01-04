import React from 'react';
import { createCheckoutSession } from '@/lib/stripe/checkout';

const plans = [
  {
    name: "Starter",
    price: "199",
    priceId: "price_starter",
    features: [
      "Up to 10 agents",
      "Basic integrations",
      "Community support"
    ]
  },
  {
    name: "Professional",
    price: "599",
    priceId: "price_professional",
    features: [
      "Up to 50 agents",
      "Advanced integrations",
      "Priority support",
      "Custom agent training"
    ]
  },
  {
    name: "Enterprise",
    price: "Custom",
    priceId: "price_enterprise",
    features: [
      "Unlimited agents",
      "Dedicated account manager",
      "On-premises deployment",
      "Advanced security features"
    ]
  }
];

export function PaymentRedirect() {
  const handlePurchase = async (priceId: string) => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Upgrade Your Plan</h2>
        <p className="text-lg text-gray-600 mb-8">
          You've reached the limit of free agents. Choose a plan to continue creating more agents.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-4">
                ${plan.price}
                {plan.price !== "Custom" && <span className="text-lg">/mo</span>}
              </p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handlePurchase(plan.priceId)}
                className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                {plan.price === "Custom" ? "Contact Sales" : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}