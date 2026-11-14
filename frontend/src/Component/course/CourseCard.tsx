import { Link } from "react-router-dom";
import { Clock, Bookmark } from "lucide-react";
import { cn } from "../../lib/utils";

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  duration: string;
  price: number;
  originalPrice?: number;
  instructor: {
    name: string;
    avatar: string;
  };
  className?: string;
}

export function CourseCard({
  id,
  title,
  description,
  image,
  category,
  duration,
  price,
  originalPrice,
  instructor,
  className,
}: CourseCardProps) {
  return (
    <Link
      to={`/courses/${id}`}
      className={cn(
        "group block bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
        className,
      )}
    >
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Bookmark className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
          <div className="flex items-center gap-1">
            <Bookmark className="h-3 w-3" />
            <span>{category}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-[#49BBBD] transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <img
              src={instructor.avatar}
              alt={instructor.name}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="text-xs text-muted-foreground">
              {instructor.name}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${originalPrice}
              </span>
            )}
            <span className="text-sm font-bold text-[#49BBBD]">${price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
