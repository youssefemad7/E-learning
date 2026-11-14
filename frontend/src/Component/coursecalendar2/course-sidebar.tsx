import { courseData, type Lesson } from "../../lib/course-data";
import { cn } from "../../lib/utils";

const getLessonTypeColor = (type: Lesson["type"], completed: boolean) => {
  if (completed) return "bg-[#f9c846]";
  switch (type) {
    case "video":
      return "bg-[#f9c846]";
    case "reading":
      return "bg-[#e85a71]";
    case "quiz":
      return "bg-[#6ec5b8]";
    case "assignment":
      return "bg-[#3bb3bd]";
    default:
      return "bg-gray-400";
  }
};

// Fixed: removed empty destructure that caused eslint warning
function LessonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="text-white"
    >
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
    </svg>
  );
}

interface CourseSidebarProps {
  selectedLesson: string | null;
  onSelectLesson: (lessonId: string) => void;
}

export function CourseSidebar({
  selectedLesson,
  onSelectLesson,
}: CourseSidebarProps) {
  return (
    <div className="w-full h-full overflow-y-auto p-4 bg-white">
      {courseData.map((section) => (
        <div key={section.id} className="mb-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 px-1">
            {section.title}
          </h3>
          <div className="space-y-1.5">
            {section.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                  selectedLesson === lesson.id
                    ? "bg-[#3bb3bd]/10 border border-[#3bb3bd]/30"
                    : "hover:bg-gray-50 border border-transparent",
                )}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-8 h-8 rounded flex items-center justify-center shrink-0",
                    getLessonTypeColor(lesson.type, lesson.completed),
                  )}
                >
                  <LessonIcon />
                </div>

                {/* Title */}
                <span
                  className={cn(
                    "text-sm text-left flex-1 truncate",
                    selectedLesson === lesson.id
                      ? "text-[#3bb3bd] font-medium"
                      : "text-gray-700",
                  )}
                >
                  {lesson.title}
                </span>

                {/* Duration */}
                <span className="text-xs text-gray-400 shrink-0">
                  {lesson.duration}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
