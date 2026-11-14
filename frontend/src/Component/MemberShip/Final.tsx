// ─── Types ────────────────────────────────────────────────────────────────────

interface FinalCardProps {
  image: string;
  title: string;
  description: string;
  btn: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const defaultCards: FinalCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
    title: "Become a Teacher",
    description:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom for video.",
    btn: "Apply as Teacher",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=200&fit=crop",
    title: "Become a Coursector",
    description:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom for video.",
    btn: "Apply as Coursector",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FinalCard({ image, title, description, btn }: FinalCardProps) {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image – fixed: removed p-5 padding that was breaking the crop */}
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-6">
        <h3 className="font-semibold text-foreground mb-2 text-lg">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed line-clamp-3">
          {description}
        </p>
        <button className="px-5 py-2.5 rounded-lg bg-[#49BBBD] hover:bg-[#3da9ab] text-white text-sm font-medium transition-colors cursor-pointer">
          {btn}
        </button>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface FinalProps {
  cards?: FinalCardProps[];
}

export function Final({ cards = defaultCards }: FinalProps) {
  return (
    <section className="py-25 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {cards.map((card, index) => (
            <FinalCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
