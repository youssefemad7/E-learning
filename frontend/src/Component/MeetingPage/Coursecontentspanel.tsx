import {
  Clock,
  FileText,
  ChevronDown,
  ChevronUp,
  Lock,
  Calendar,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  locked?: boolean;
  current?: boolean;
}

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  lessons: number;
  items?: LessonItem[];
}

interface CourseContentsPanelProps {
  modules: CourseModule[];
  expandedModules: string[];
  completedCount: number;
  totalCount: number;
  onToggleModule: (id: string) => void;
  onCalendar?: () => void;
}

export function CourseContentsPanel({
  modules,
  expandedModules,
  completedCount,
  totalCount,
  onToggleModule,
  onCalendar,
}: CourseContentsPanelProps) {
  return (
    <div className="bg-card rounded-2xl p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-[#2D3E50]">Course Contents</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCalendar}
          aria-label="Calendar"
        >
          <Calendar className="h-5 w-5 text-[#49BBBD]" />
        </Button>
      </div>

      {/* Progress */}
      <div className="mb-5">
        <span className="text-sm text-[#49BBBD] font-semibold">
          {completedCount}/{totalCount} COMPLETED
        </span>
        <div className="flex gap-1 mt-2">
          {Array.from({ length: totalCount }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                i < completedCount ? "bg-[#49BBBD]" : "bg-muted",
              )}
            />
          ))}
        </div>
      </div>

      {/* Modules Accordion */}
      <div className="space-y-2">
        {modules.map((module) => {
          const isExpanded = expandedModules.includes(module.id);
          return (
            <div
              key={module.id}
              className="border border-border rounded-xl overflow-hidden"
            >
              {/* Module Row */}
              <button
                onClick={() => onToggleModule(module.id)}
                className={cn(
                  "w-full flex items-center justify-between p-4 text-left transition-colors",
                  isExpanded ? "bg-muted/50" : "hover:bg-muted/30",
                )}
              >
                <div className="min-w-0 flex-1">
                  <h3
                    className={cn(
                      "font-semibold text-sm truncate",
                      isExpanded ? "text-[#49BBBD]" : "text-foreground",
                    )}
                  >
                    {module.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {module.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {module.lessons} Lessons
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                )}
              </button>

              {/* Lesson Items */}
              {isExpanded && module.items && (
                <div className="border-t border-border">
                  {module.items.map((item, idx) => (
                    <div
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 gap-3",
                        idx < module.items!.length - 1 &&
                          "border-b border-border",
                        item.current && "bg-[#49BBBD]/5",
                      )}
                    >
                      <span
                        className={cn(
                          "text-xs flex-1 min-w-0 truncate",
                          item.current
                            ? "text-[#49BBBD] font-medium"
                            : "text-foreground",
                        )}
                      >
                        {idx + 1}. {item.title}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={cn(
                            "text-xs",
                            item.current
                              ? "text-[#49BBBD] font-medium"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.duration}
                        </span>
                        {item.locked && (
                          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
