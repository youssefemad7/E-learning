import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  hasEvent: boolean;
}

interface MiniCalendarProps {
  month: string;
  days: CalendarDay[];
  selectedDate: number;
  onDateSelect: (day: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
}

export function MiniCalendar({
  month,
  days,
  selectedDate,
  onDateSelect,
  onPrev,
  onNext,
}: MiniCalendarProps) {
  return (
    <div className="p-5 lg:p-6">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-5">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrev}
          aria-label="Previous month"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <h3 className="text-base font-semibold text-[#2D3E50]">{month}</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          aria-label="Next month"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Week Day Labels */}
      <div className="grid grid-cols-7 mb-1">
        {WEEK_DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-xs font-medium text-muted-foreground py-1.5"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      <div className="grid grid-cols-7 gap-0.5">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => onDateSelect(day.day)}
            aria-label={`Select day ${day.day}`}
            aria-pressed={selectedDate === day.day}
            className={cn(
              "aspect-square flex items-center justify-center text-sm rounded-full transition-all duration-150",
              selectedDate === day.day
                ? "bg-[#49BBBD] text-white font-semibold shadow-sm"
                : day.hasEvent
                  ? "bg-[#49BBBD]/15 text-[#49BBBD] font-semibold hover:bg-[#49BBBD]/25"
                  : "text-foreground hover:bg-muted",
            )}
          >
            {day.day}
          </button>
        ))}
      </div>
    </div>
  );
}
