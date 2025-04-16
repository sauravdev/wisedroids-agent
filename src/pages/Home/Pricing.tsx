import { PricingCard } from '@/components/PricingCard';

const plans = [
  {
    name: "Starter",
    price: "199",
    priceId: "starter",
    features: [
      "Up to 10 agents",
      "Basic integrations",
      "Community support"
    ],
    href : "https://buy.stripe.com/test_fZe289bpHgl3cSIaEH",
  },
  {
    name: "Professional",
    price: "599",
    priceId: "professional",
    features: [
      "Up to 50 agents",
      "Advanced integrations",
      "Priority support",
      "Custom agent training"
    ],
    href : "https://buy.stripe.com/test_dR6145bpHfgZ6ukdQU",
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "Unlimited agents",
      "Dedicated account manager",
      "On-premises deployment",
      "Advanced security features"
    ]
  }
];

export function Pricing() {

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
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </div>
  );
}