import { Bookmark } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface LessonItemProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: (id: string) => void;
}

export function LessonItem({ lesson, isActive, onClick }: LessonItemProps) {
  return (
    <button
      onClick={() => onClick(lesson.id)}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150",
        isActive
          ? "bg-[#49BBBD] text-white shadow-sm"
          : lesson.completed
            ? "bg-[#49BBBD]/10 text-foreground hover:bg-[#49BBBD]/20"
            : "bg-muted/50 text-muted-foreground hover:bg-muted",
      )}
    >
      <div
        className={cn(
          "h-6 w-6 rounded flex items-center justify-center shrink-0",
          isActive || lesson.completed ? "bg-[#F5B963]" : "bg-muted",
        )}
      >
        <Bookmark className="h-3 w-3 text-white" />
      </div>
      <span className="text-xs flex-1 truncate">{lesson.title}</span>
      <span className="text-xs opacity-70 shrink-0">{lesson.duration}</span>
    </button>
  );
}
