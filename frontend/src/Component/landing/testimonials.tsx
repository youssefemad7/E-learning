import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarColor: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Gloria Rose",
    role: "Student at Harvard",
    content:
      "Thank you so much for your help. It's exactly what I've been looking for. I would be lost without TOTC. The best part is the flexibility — I can learn at my own pace while still getting personalized feedback from instructors.",
    avatarColor: "bg-[#F48C06]",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Business Professional",
    content:
      "TOTC has transformed the way I approach learning. The interactive classes and supportive community have helped me acquire new skills faster than I ever thought possible.",
    avatarColor: "bg-[#23BDEE]",
  },
  {
    id: 3,
    name: "Sarah Williams",
    role: "High School Teacher",
    content:
      "As an educator, TOTC has given me incredible tools to reach students beyond the traditional classroom. The platform is intuitive and my students love it!",
    avatarColor: "bg-[#2BD17E]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex gap-1 mt-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <button
          key={i}
          className="w-8 h-8 text-[#00CBB8] hover:scale-110 transition-transform"
          aria-label={`Rate ${i + 1} stars`}
        >
          <Star className="w-full h-full fill-[#00CBB8]" />
        </button>
      ))}
    </div>
  );
}

function TestimonialsLeftPanel() {
  return (
    <div>
      <span className="text-[#00CBB8] font-medium text-sm uppercase tracking-wide">
        Testimonials
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#2F327D] mt-2 mb-6">
        What They Say?
      </h2>
      <p className="text-[#696984] mb-4 leading-relaxed">
        TOTC has got more than 100k positive ratings from our users around the
        world. Some of the students and teachers were greatly helped by TOTC.
      </p>
      <p className="text-[#696984]">
        Are you too? Please give your assessment.
      </p>
      <StarRating />
    </div>
  );
}

function TestimonialDots({
  total,
  current,
  onChange,
}: {
  total: number;
  current: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex justify-center gap-2 mt-12">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-3 h-3 rounded-full transition-colors duration-200 ${
            i === current ? "bg-[#00CBB8]" : "bg-[#23BDEE]/30"
          }`}
          aria-label={`Go to testimonial ${i + 1}`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({
  testimonial,
  onPrev,
  onNext,
}: {
  testimonial: Testimonial;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="relative pb-8 ">
      <div className="bg-white rounded-2xl shadow-xl p-8 relative">
        {/* Quote icon */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-[#00CBB8] rounded-full flex items-center justify-center shadow-md">
          <Quote className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <p className="text-[#696984] leading-relaxed text-base lg:text-lg pt-4 mb-8">
          &ldquo;{testimonial.content}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 ${testimonial.avatarColor} rounded-full shrink-0`}
          />
          <div>
            <p className="font-semibold text-[#2F327D]">{testimonial.name}</p>
            <p className="text-[#696984] text-sm">{testimonial.role}</p>
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute -bottom-6 right-8 flex gap-2">
          <button
            onClick={onPrev}
            className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00CBB8] hover:text-white transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={onNext}
            className="w-12 h-12 bg-[#00CBB8] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#00CBB8] transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const goPrev = () =>
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );

  return (
    <section className="bg-white py-16 lg:py-24 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 ">
          <TestimonialsLeftPanel />

          <div>
            <TestimonialCard
              testimonial={testimonials[currentIndex]}
              onPrev={goPrev}
              onNext={goNext}
            />
            <TestimonialDots
              total={testimonials.length}
              current={currentIndex}
              onChange={setCurrentIndex}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
