import { useAuth } from "@/hooks/useAuth";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface PricingPlan {
  name: string;
  price: string;
  features: string[];
  href: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  const { user } = useAuth();
  const handlePlanClick = (url: string) => {
    if (user?.email) {
      url += `?prefilled_email=${user.email}`;
    }
    window.open(url, "_blank");
  };
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{plan.price}</span>
        {plan.price !== "Custom" && (
          <span className="text-gray-600">/month</span>
        )}
      </div>
      <ul className="space-y-4 mb-8">
        {plan.features.map((feature, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      {plan.name === "Enterprise" ? (
        <Link
          to="/contact"
          className="block w-full text-center bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Contact Sales
        </Link>
      ) : (
        <button
          onClick={() => handlePlanClick(plan.href)}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          Choose Plan
        </button>
      )}
    </div>
  );
}
