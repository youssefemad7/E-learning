import { Bookmark } from "lucide-react";
import { cn } from "../../../lib/utils";

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

interface LessonRowProps {
  lesson: Lesson;
  isActive: boolean;
  onClick: (id: string) => void;
}

function LessonRow({ lesson, isActive, onClick }: LessonRowProps) {
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

interface ViewSidebarProps {
  lessons: Lesson[];
  practiceQuizLessons: Lesson[];
  currentLesson: string;
  onLessonSelect: (id: string) => void;
}

export function ViewSidebar({
  lessons,
  practiceQuizLessons,
  currentLesson,
  onLessonSelect,
}: ViewSidebarProps) {
  return (
    <aside className="w-full lg:w-72 xl:w-80 bg-card border-r border-border shrink-0 overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-136px)] lg:sticky lg:top-0">
      {/* Course Lessons */}
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Course Lessons
        </h2>
        <div className="space-y-1.5">
          {lessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              isActive={currentLesson === lesson.id}
              onClick={onLessonSelect}
            />
          ))}
        </div>
      </div>

      {/* Practice Quiz */}
      <div className="p-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Practice Quiz
        </h2>
        <div className="space-y-1.5">
          {practiceQuizLessons.map((lesson) => (
            <LessonRow
              key={lesson.id}
              lesson={lesson}
              isActive={currentLesson === lesson.id}
              onClick={onLessonSelect}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
