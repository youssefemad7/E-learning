import {
  Pen,
  MessageSquare,
  Briefcase,
  TrendingUp,
  Camera,
  Theater,
  Building2,
  Code2,
} from "lucide-react";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  icon: ElementType;
  title: string;
  description: string;
  count?: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  {
    icon: Pen,
    title: "Design",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 42,
  },
  {
    icon: Code2,
    title: "Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 85,
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 30,
  },
  {
    icon: Briefcase,
    title: "Business",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 56,
  },
  {
    icon: TrendingUp,
    title: "Marketing",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 38,
  },
  {
    icon: Camera,
    title: "Photography",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 24,
  },
  {
    icon: Theater,
    title: "Acting",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 18,
  },
  {
    icon: Building2,
    title: "Architecture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    count: 21,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Single category card */
function CategoryCard({
  category,
  featured = false,
}: {
  category: Category;
  featured?: boolean;
}) {
  const Icon = category.icon;

  return (
    <div
      className={`p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
        featured
          ? "bg-[#49BBBD] text-white"
          : "bg-[#F7F7F7] text-foreground hover:bg-[#E8F5F5]"
      }`}
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
          featured ? "bg-white/20" : "bg-white shadow-sm"
        }`}
      >
        <Icon
          className={`h-6 w-6 ${featured ? "text-white" : "text-[#49BBBD]"}`}
        />
      </div>

      {/* Title + count */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-lg">{category.title}</h3>
        {category.count !== undefined && (
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              featured
                ? "bg-white/20 text-white"
                : "bg-[#49BBBD]/10 text-[#49BBBD]"
            }`}
          >
            {category.count}
          </span>
        )}
      </div>

      {/* Description */}
      <p
        className={`text-sm leading-relaxed ${
          featured ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {category.description}
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function CategoriesSection() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-8">
          Choose your favourite course from top categories
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {categories.map((category, index) => (
            <CategoryCard
              key={index}
              category={category}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
