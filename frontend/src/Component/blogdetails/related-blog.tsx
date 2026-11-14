import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Eye } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "Why Swift UI Should Be on Every Developer's Radar",
    excerpt:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with modern learning tools...",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
    views: 1000,
    authorAvatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    author: "Lina",
  },
  {
    id: 2,
    title: "Getting Started with React Native in 2024",
    excerpt:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with modern learning tools...",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
    views: 2000,
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    author: "Adam",
  },
  {
    id: 3,
    title: "Mastering UI/UX Principles for Modern Apps",
    excerpt:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with modern learning tools...",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop",
    views: 3000,
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    author: "Sarah",
  },
];

export function RelatedBlog() {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect breakpoint
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Reset index when layout switches
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndex(0);
  }, [isMobile]);

  const visibleCount = isMobile ? 1 : 2;
  const cardWidth = isMobile ? 100 : 50; // percent
  const maxIndex = blogPosts.length - visibleCount;

  const next = () => setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () => setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  return (
    <section className="py-10 lg:py-14 bg-[#9dccff34]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-foreground">Related Blog</h2>
          <Link
            to="#"
            className="text-sm font-medium text-[#49BBBD] hover:text-[#3da9ab] transition-colors"
          >
            See all →
          </Link>
        </div>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${index * cardWidth}%)` }}
          >
            {blogPosts.map((post) => (
              <div
                key={post.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${cardWidth}%` }}
              >
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
                  {/* Image */}
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-foreground mb-3 line-clamp-2 leading-snug">
                      {post.title}
                    </h3>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="h-8 w-8 rounded-full object-cover shrink-0"
                        loading="lazy"
                      />
                      <span className="text-sm text-muted-foreground font-medium">
                        {post.author}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                      <Link
                        to="#"
                        className="text-sm font-medium text-[#49BBBD] hover:text-[#3da9ab] transition-colors"
                      >
                        Read more →
                      </Link>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Eye className="h-3.5 w-3.5" />
                        {post.views.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots + Arrows */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-6 bg-[#49BBBD]" : "w-2.5 bg-[#49BBBD]/30"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous"
              className="h-10 w-10 rounded-lg bg-[#49BBBD] text-white flex items-center justify-center hover:bg-[#3da9ab] active:scale-95 transition-all"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              aria-label="Next"
              className="h-10 w-10 rounded-lg bg-[#49BBBD] text-white flex items-center justify-center hover:bg-[#3da9ab] active:scale-95 transition-all"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
