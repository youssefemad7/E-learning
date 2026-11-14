import { Star, Clock } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface Review {
  name: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
}

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <div className="space-y-6 mb-8">
      {reviews.map((review, index) => (
        <div key={index} className="flex gap-4">
          <img
            src={review.avatar}
            alt={review.name}
            className="h-11 w-11 rounded-full object-cover shrink-0"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-sm">
                  {review.name}
                </span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3 w-3",
                        i < review.rating
                          ? "fill-[#F5B963] text-[#F5B963]"
                          : "fill-muted text-muted",
                      )}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {review.date}
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {review.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
