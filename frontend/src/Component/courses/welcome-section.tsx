import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LessonCard {
  id: number;
  title: string;
  author: string;
  authorImage: string;
  image: string;
  progress: number;
  lesson: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const lessonCards: LessonCard[] = [
  {
    id: 1,
    title: "AWS Certified Solutions Architect",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=200&fit=crop",
    progress: 60,
    lesson: "Lesson 5 of 7",
  },
  {
    id: 2,
    title: "AWS Certified Solutions Architect",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    progress: 40,
    lesson: "Lesson 3 of 7",
  },
  {
    id: 3,
    title: "AWS Certified Solutions Architect",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop",
    progress: 80,
    lesson: "Lesson 6 of 7",
  },
  {
    id: 4,
    title: "React & TypeScript Masterclass",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=200&fit=crop",
    progress: 25,
    lesson: "Lesson 2 of 8",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Progress bar inside a lesson card */
function ProgressBar({
  progress,
  lesson,
}: {
  progress: number;
  lesson: string;
}) {
  return (
    <div className="space-y-1.5">
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-[#49BBBD] rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">{lesson}</p>
    </div>
  );
}

/** Single lesson card */
function LessonCard({ card }: { card: LessonCard }) {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={card.image}
          alt={card.title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="font-semibold text-foreground text-sm sm:text-base line-clamp-2 leading-snug">
          {card.title}
        </h3>

        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full overflow-hidden shrink-0">
            <img
              src={card.authorImage}
              alt={card.author}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="text-sm text-muted-foreground">{card.author}</span>
        </div>

        {/* Progress */}
        <ProgressBar progress={card.progress} lesson={card.lesson} />
      </div>
    </div>
  );
}

/** Pagination controls */
function PaginationControls({
  onPrev,
  onNext,
  canPrev,
  canNext,
}: {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}) {
  return (
    <div className="flex justify-end gap-2 mt-6">
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="p-2 rounded-md bg-[#49BBBD] text-white hover:bg-[#3da9ab] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button
        onClick={onNext}
        disabled={!canNext}
        className="p-2 rounded-md bg-[#49BBBD] text-white hover:bg-[#3da9ab] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

const PAGE_SIZE = 3;

export function WelcomeSection() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(lessonCards.length / PAGE_SIZE);
  const visibleCards = lessonCards.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE,
  );

  return (
    <section className="py-8 lg:py-12 bg-[#9dccff3f]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground">
            Welcome back, ready for your next lesson?
          </h2>
          <Link
            to="#"
            className="text-sm font-medium text-[#49BBBD] hover:underline whitespace-nowrap ml-4"
          >
            View history
          </Link>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {visibleCards.map((card) => (
            <LessonCard key={card.id} card={card} />
          ))}
        </div>

        {/* Pagination */}
        <PaginationControls
          onPrev={() => setPage((p) => Math.max(0, p - 1))}
          onNext={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
          canPrev={page > 0}
          canNext={page < totalPages - 1}
        />
      </div>
    </section>
  );
}
