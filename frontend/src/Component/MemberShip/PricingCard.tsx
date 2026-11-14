// ─── Types ────────────────────────────────────────────────────────────────────

interface PricingPlan {
  label: string;
  price: string;
  priceSuffix: string;
  features: string[];
  buttonLabel: string;
  featured?: boolean;
  checkColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const plans: PricingPlan[] = [
  {
    label: "🎓 Starter",
    price: "Free",
    priceSuffix: "/ forever",
    checkColor: "#49BBBD",
    features: [
      "Components-driven system",
      "Sales-boosting landing pages",
      "Awesome Feather icons pack",
    ],
    buttonLabel: "Try for free",
  },
  {
    label: "👤 Individual",
    price: "$24",
    priceSuffix: "/ month",
    checkColor: "#1a1a1a",
    featured: true,
    features: [
      "Components-driven system",
      "Sales-boosting landing pages",
      "Awesome Feather icons pack",
      "Themed into 3 different styles",
      "Will help to learn Figma",
    ],
    buttonLabel: "Regular license",
  },
  {
    label: "👥 Corporate",
    price: "$12",
    priceSuffix: "/ editor",
    checkColor: "#6366F1",
    features: [
      "Components-driven system",
      "Sales-boosting landing pages",
      "Awesome Feather icons pack",
      "Themed into 3 different styles",
    ],
    buttonLabel: "Extended license",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Checkmark SVG icon */
function CheckIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0"
    >
      <path
        d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z"
        fill={color}
      />
    </svg>
  );
}

/** Single pricing card */
function PlanCard({ plan }: { plan: PricingPlan }) {
  const {
    label,
    price,
    priceSuffix,
    features,
    buttonLabel,
    featured,
    checkColor,
  } = plan;

  return (
    <div
      className={`relative w-72 rounded-xl p-6 text-left flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? "bg-white shadow-2xl border-2 border-[#49BBBD]/30"
          : "bg-white border border-gray-200 shadow-sm hover:shadow-md"
      }`}
    >
      {/* "Most Popular" badge */}
      {featured && (
        <span className="absolute -top-3.5 left-4 px-3 py-1 bg-[#49BBBD] text-white text-xs font-semibold rounded-full">
          Most Popular
        </span>
      )}

      {/* Plan label */}
      <p
        className={`font-semibold text-sm pt-1 ${featured ? "text-gray-800" : "text-[#49BBBD]"}`}
      >
        {label}
      </p>

      {/* Price */}
      <h2 className="text-3xl font-bold mt-1 text-gray-800">
        {price}
        <span className="text-gray-400 text-sm font-normal ml-1">
          {priceSuffix}
        </span>
      </h2>

      {/* Divider */}
      <div className="w-full h-px bg-gray-100 my-5" />

      {/* Features list */}
      <ul className="flex flex-col gap-3 flex-1">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-sm text-gray-600"
          >
            <CheckIcon color={checkColor} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA button */}
      <button
        type="button"
        className={`mt-8 w-full py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer border ${
          featured
            ? "bg-[#49BBBD] text-white border-[#49BBBD] hover:bg-white hover:text-[#49BBBD]"
            : "bg-white text-[#49BBBD] border-[#49BBBD] hover:bg-[#49BBBD] hover:text-white"
        }`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export default function PricingCard() {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6 px-4 pb-12">
      {plans.map((plan) => (
        <PlanCard key={plan.label} plan={plan} />
      ))}
    </div>
  );
}
