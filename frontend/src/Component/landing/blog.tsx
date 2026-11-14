import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Create a Better Online Classroom",
    excerpt:
      "Tips and tricks for making your virtual classroom more engaging and interactive for students.",
    category: "Teaching Tips",
    date: "March 15, 2024",
    image: "bg-gradient-to-br from-[#23BDEE] to-[#2F327D]",
  },
  {
    id: 2,
    title: "5 Best Techniques for Online Classes",
    excerpt:
      "Learn the most effective techniques that successful online educators use daily.",
    category: "Best Practices",
    date: "March 12, 2024",
    image: "bg-gradient-to-br from-[#F48C06] to-[#ff6b6b]",
  },
  {
    id: 3,
    title: "Quick Guide to Online Learning",
    excerpt:
      "Everything you need to know to get started with online education as a student.",
    category: "Getting Started",
    date: "March 10, 2024",
    image: "bg-gradient-to-br from-[#2BD17E] to-[#23BDEE]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group flex flex-col">
      {/* Thumbnail */}
      <div className={`h-48 ${post.image} relative shrink-0`}>
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm text-[#2F327D] text-xs font-medium px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <p className="text-[#696984] text-sm mb-2">{post.date}</p>
        <h3 className="text-lg font-semibold text-[#2F327D] mb-3 group-hover:text-[#23BDEE] transition-colors leading-snug flex-1">
          {post.title}
        </h3>
        <p className="text-[#696984] text-sm leading-relaxed mb-4">
          {post.excerpt}
        </p>
        <Link
          to="#"
          className="inline-flex items-center gap-2 text-[#00CBB8] font-medium text-sm hover:gap-3 transition-all duration-200 mt-auto"
        >
          Read More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Blog() {
  return (
    <section className="bg-[#F7F8FC] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[#00CBB8] text-xl font-bold uppercase tracking-wide">
            Blog
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F327D] mt-2 mb-4">
            Latest News and Resources
          </h2>
          <p className="text-[#696984] max-w-2xl mx-auto">
            See the developments that have occurred to TOTC in the world
          </p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
