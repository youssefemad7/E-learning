import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { CourseCard } from "../course/CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  originalPrice: number;
  instructor: { name: string; avatar: string };
}

interface RelatedCoursesCarouselProps {
  courses: Course[];
  onPrev?: () => void;
  onNext?: () => void;
}

export function RelatedCoursesCarousel({
  courses,
  onPrev,
  onNext,
}: RelatedCoursesCarouselProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#2D3E50]">
          Students also bought
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onPrev}
            aria-label="Previous"
            className="rounded-full border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white transition-colors h-9 w-9"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNext}
            aria-label="Next"
            className="rounded-full bg-[#F5B963] border-[#F5B963] text-white hover:bg-[#e5a953] transition-colors h-9 w-9"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {courses.map((course) => (
          <CourseCard key={course.id} {...course} />
        ))}
      </div>
    </div>
  );
}
