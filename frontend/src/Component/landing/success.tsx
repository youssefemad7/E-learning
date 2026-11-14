// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  value: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const stats: StatItem[] = [
  { value: "15K+", label: "Students" },
  { value: "75%", label: "Total success" },
  { value: "35", label: "Main questions" },
  { value: "26", label: "Chief experts" },
  { value: "16", label: "Years of experience" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ value, label }: StatItem) {
  return (
    <div className="flex flex-col items-center text-center px-4">
      <span className="bg-gradient-to-r from-[#136CB5] to-[#49BBBD] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold mb-2">
        {value}
      </span>
      <p className="text-gray-600 text-base sm:text-lg">{label}</p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Success() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="font-bold text-3xl sm:text-4xl mb-5">Our Success</h2>
        <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae
          sollicitudin at nec nam et pharetra gravida. Adipiscing a quis
          ultrices eu ornare tristique vel nisl orci.
        </p>
      </div>

      {/* Stats grid – 2 cols on mobile, 5 on lg */}
      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        {stats.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
