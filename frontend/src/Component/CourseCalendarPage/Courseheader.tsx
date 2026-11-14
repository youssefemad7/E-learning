import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";

interface CourseHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  backTo: string;
}

export function CourseHeader({
  title,
  subtitle,
  duration,
  backTo,
}: CourseHeaderProps) {
  return (
    <header className="bg-[#49BBBD] text-white px-4 py-4 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to={backTo}
            aria-label="Go back"
            className="h-10 w-10 rounded-lg bg-white/10 backdrop-blur flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-lg lg:text-2xl font-bold leading-tight truncate">
              {title}
            </h1>
            <p className="text-white/75 text-sm mt-0.5">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-white/90 shrink-0">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
      </div>
    </header>
  );
}
