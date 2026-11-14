import { ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

interface CoursesToolbarProps {
  count: number;
  sortLabel?: string;
  onSort?: () => void;
}

export function CoursesToolbar({
  count,
  sortLabel = "Popular",
  onSort,
}: CoursesToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">{count}</span>{" "}
        {count === 1 ? "course" : "courses"} found
      </p>
      <Button
        variant="outline"
        onClick={onSort}
        className="gap-2 text-sm rounded-full hover:border-[#49BBBD]/50 hover:text-[#49BBBD] transition-colors"
      >
        Sort by: {sortLabel}
        <ChevronDown className="h-4 w-4" />
      </Button>
    </div>
  );
}
