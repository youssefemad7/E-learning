import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { TestimonialCard } from "./TestimonialCard";

const testimonials = [
  {
    name: "Savannah Nguyen",
    email: "tonya.hill@example.com",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
    rating: 5,
  },
];

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(testimonials.length - 1, i + 1));

  const navBtnClass =
    "rounded-full border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white transition-colors";

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-[#2D3E50] mb-8">
          What our students have to say
        </h2>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={prev}
            disabled={index === 0}
            aria-label="Previous testimonial"
            className={navBtnClass}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1 overflow-hidden">
            <TestimonialCard {...testimonials[index]} className="w-full" />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={next}
            disabled={index === testimonials.length - 1}
            aria-label="Next testimonial"
            className={navBtnClass}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        {/* Dots */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-6 bg-[#49BBBD]" : "w-2 bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
