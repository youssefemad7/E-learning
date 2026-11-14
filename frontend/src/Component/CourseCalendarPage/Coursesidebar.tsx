import { LessonItem, type Lesson } from "./Lessonitem";

interface CourseSidebarProps {
  lessons: Lesson[];
  practiceQuizLessons: Lesson[];
  currentLesson: string;
  onLessonSelect: (id: string) => void;
}

export function CourseSidebar({
  lessons,
  practiceQuizLessons,
  currentLesson,
  onLessonSelect,
}: CourseSidebarProps) {
  return (
    <aside className="w-full lg:w-72 xl:w-80 bg-card border-r border-border shrink-0 overflow-y-auto max-h-[45vh] lg:max-h-[calc(100vh-72px)] lg:sticky lg:top-0">
      {/* Lessons Section */}
      <div className="p-4 border-b border-border">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Course Lessons
        </h2>
        <div className="space-y-1.5">
          {lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              isActive={currentLesson === lesson.id}
              onClick={onLessonSelect}
            />
          ))}
        </div>
      </div>

      {/* Practice Quiz Section */}
      <div className="p-4">
        <h2 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3">
          Practice Quiz
        </h2>
        <div className="space-y-1.5">
          {practiceQuizLessons.map((lesson) => (
            <LessonItem
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
