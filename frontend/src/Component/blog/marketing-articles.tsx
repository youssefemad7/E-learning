import { Link } from "react-router-dom";
import { Clock, Bookmark } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    category: "Design",
    duration: "3 Month",
    author: {
      name: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    originalPrice: 100,
    salePrice: 80,
    href: "#",
  },
  {
    id: 2,
    title: "React Development Masterclass",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    category: "Development",
    duration: "4 Month",
    author: {
      name: "Adam",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop",
    originalPrice: 120,
    salePrice: 90,
    href: "#",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    category: "Design",
    duration: "2 Month",
    author: {
      name: "Sarah",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop",
    originalPrice: 90,
    salePrice: 70,
    href: "#",
  },
  {
    id: 4,
    title: "Python for Data Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    category: "Development",
    duration: "5 Month",
    author: {
      name: "Mike",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    },
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    originalPrice: 150,
    salePrice: 100,
    href: "#",
  },
];

export function MarketingArticles() {
  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">
            Marketing Articles
          </h2>
          <Link
            to="#"
            className="text-sm font-medium text-[#49BBBD] hover:text-[#3da9ab] transition-colors"
          >
            See all →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {articles.map((article) => (
            <article
              key={article.id}
              className="bg-white rounded-xl overflow-hidden border border-border hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Image — fixed: added w-full h-full to the img */}
              <Link to={article.href} className="block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </Link>

              {/* Body */}
              <div className="p-4 flex flex-col flex-1">
                {/* Meta */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1">
                    <Bookmark className="h-3 w-3 text-[#49BBBD]" />
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.duration}
                  </span>
                </div>

                {/* Title */}
                <Link to={article.href}>
                  <h3 className="text-sm font-semibold text-foreground hover:text-[#49BBBD] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>
                </Link>

                {/* Description */}
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex-1">
                  {article.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
                  <div className="flex items-center gap-2">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                      loading="lazy"
                    />
                    <span className="text-xs text-muted-foreground">
                      {article.author.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs text-muted-foreground line-through">
                      ${article.originalPrice}
                    </span>
                    <span className="text-sm font-bold text-[#49BBBD]">
                      ${article.salePrice}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
