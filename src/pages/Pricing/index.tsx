import React from 'react';
import { Check } from 'lucide-react';
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

export function Pricing() {
  const handlePurchase = async (priceId: string) => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Failed to initiate checkout:', error);
      alert('Failed to initiate checkout. Please try again.');
    }
  };

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your business needs
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
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
              <button
                onClick={() => handlePurchase(plan.priceId)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
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