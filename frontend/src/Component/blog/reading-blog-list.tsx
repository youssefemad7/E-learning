import { Link } from "react-router-dom";

const categories = [
  {
    name: "UX/UI",
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop",
    href: "#",
  },
  {
    name: "React",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop",
    href: "#",
  },
  {
    name: "PHP",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    href: "#",
  },
  {
    name: "JavaScript",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=400&h=300&fit=crop",
    href: "#",
  },
];

export function ReadingBlogList() {
  return (
    <section className="py-8 md:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-foreground mb-6">
          Reading Blog List
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl block"
            >
              {/* fixed: added w-full h-full to img */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3">
                <span className="inline-block rounded-lg bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                  {category.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
