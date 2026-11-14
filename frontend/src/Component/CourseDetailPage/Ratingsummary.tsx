import { Star } from "lucide-react";
import { cn } from "../../../lib/utils";

interface RatingBar {
  stars: number;
  percentage: number;
}

interface RatingSummaryProps {
  score: number;
  maxScore?: number;
  label?: string;
  ratingBars: RatingBar[];
}

export function RatingSummary({
  score,
  maxScore = 5,
  label = "Top Rating",
  ratingBars,
}: RatingSummaryProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-8">
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
        {/* Score */}
        <div className="text-center sm:text-left shrink-0">
          <div className="text-4xl font-bold text-[#2D3E50]">
            {score} out of {maxScore}
          </div>
          <div className="flex items-center justify-center sm:justify-start gap-1 mt-2">
            {Array.from({ length: maxScore }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-5 w-5",
                  i < score
                    ? "fill-[#F5B963] text-[#F5B963]"
                    : "fill-muted text-muted",
                )}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{label}</div>
        </div>

        {/* Bars */}
        <div className="flex-1 space-y-2.5">
          {ratingBars.map((bar) => (
            <div key={bar.stars} className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground w-14 shrink-0">
                {bar.stars} Stars
              </span>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#49BBBD] rounded-full transition-all duration-500"
                  style={{ width: `${bar.percentage}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground w-8 text-right shrink-0">
                {bar.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
