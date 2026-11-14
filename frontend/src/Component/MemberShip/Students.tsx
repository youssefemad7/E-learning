// ─── Types ────────────────────────────────────────────────────────────────────

interface StudentCardProps {
  image: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const defaultStudents: StudentCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
    title: "Bulkin Simons",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=200&fit=crop",
    title: "Bulkin Simons",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop",
    title: "Bulkin Simons",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    title: "Bulkin Simons",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StudentCard({ image, title, description }: StudentCardProps) {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
      {/* Fixed image height */}
      <div className="h-44 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

interface StudentsProps {
  title: string;
  students?: StudentCardProps[];
}

export function Students({ title, students = defaultStudents }: StudentsProps) {
  return (
    <section className="py-35 bg-[#9dccff60]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-semibold text-foreground mb-8">
          {title}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {students.map((student, index) => (
            <StudentCard key={index} {...student} />
          ))}
        </div>
      </div>
    </section>
  );
}
