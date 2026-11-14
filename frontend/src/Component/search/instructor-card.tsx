"use client";

import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface InstructorCardProps {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  className?: string;
}

export function InstructorCard({
  id,
  name,
  bio,
  avatar,
  className,
}: InstructorCardProps) {
  return (
    <Link
      to={`/profile/${id}`}
      className={cn(
        "group flex flex-col items-center text-center p-4 rounded-xl hover:bg-muted/50 transition-colors",
        className,
      )}
    >
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-xl transition-shadow">
          <img src={avatar} alt={name} className="h-full w-full object-cover" />
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-1 -left-1 h-4 w-4 rounded-full bg-[#49BBBD]" />
        <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-[#F5B963]" />
      </div>

      {/* Name */}
      <h3 className="font-semibold text-foreground group-hover:text-[#49BBBD] transition-colors">
        {name}
      </h3>

      {/* Bio */}
      <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{bio}</p>
    </Link>
  );
}
