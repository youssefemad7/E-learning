import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface TestimonialCardProps {
  name: string;
  email?: string;
  avatar: string;
  content: string;
  rating?: number;
  className?: string;
}

export function TestimonialCard({
  name,
  email,
  avatar,
  content,
  rating = 5,
  className,
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-2xl p-6 shadow-sm border border-border",
        className,
      )}
    >
      {/* Avatar and Info */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-[#49BBBD]/20">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-foreground">{name}</h4>
          {email && <p className="text-sm text-muted-foreground">{email}</p>}
        </div>
      </div>

      {/* Content */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {content}
      </p>

      {/* Rating */}
      {rating > 0 && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-4 w-4",
                i < rating
                  ? "fill-[#F5B963] text-[#F5B963]"
                  : "fill-muted text-muted",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
