import { Star } from "lucide-react";

interface InstructorCardProps {
  name: string;
  avatar: string;
  rating: number;
  bio: string;
}

export function InstructorCard({
  name,
  avatar,
  rating,
  bio,
}: InstructorCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-start gap-4">
        <img
          src={avatar}
          alt={name}
          className="h-14 w-14 rounded-full object-cover shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground">{name}</h3>
          <div className="flex items-center gap-1 mt-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < rating
                    ? "fill-[#F5B963] text-[#F5B963]"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">
              ({rating}.0)
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{bio}</p>
        </div>
      </div>
    </div>
  );
}
