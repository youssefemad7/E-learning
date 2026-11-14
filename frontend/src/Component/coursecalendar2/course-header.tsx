import { Clock } from "lucide-react";

interface CourseHeaderProps {
  title?: string;
  subtitle?: string;
  duration?: string;
}

export function CourseHeader({
  title = "Learn about Adobe XD & Prototyping",
  subtitle = "Introduction about XD",
  duration = "1 hour",
}: CourseHeaderProps) {
  return (
    <div className="bg-[#3bb3bd] text-white shrink-0">
      <div className="px-4 sm:px-6 py-4 md:py-5">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-1 leading-tight">
          {title}
        </h1>
        <div className="flex items-center justify-between mt-1">
          <p className="text-white/80 text-sm">{subtitle}</p>
          <div className="flex items-center gap-1.5 text-sm text-white/90 shrink-0">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
