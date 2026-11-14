import { cn } from "../../../lib/utils";

interface ScheduleItem {
  time: string;
  event: string | null;
  color?: string;
}

interface DayScheduleProps {
  selectedDate: number;
  month: string;
  dayName: string;
  items: ScheduleItem[];
}

export function DaySchedule({
  selectedDate,
  month,
  dayName,
  items,
}: DayScheduleProps) {
  return (
    <div className="p-5 lg:p-6">
      <h3 className="text-base font-semibold text-[#2D3E50] mb-5">
        {month} {selectedDate},{" "}
        <span className="text-muted-foreground font-normal">{dayName}</span>
      </h3>

      <div className="space-y-0">
        {items.map((item, index) => (
          <div key={index} className="flex gap-3 min-h-[56px]">
            {/* Time Label */}
            <span className="text-xs text-muted-foreground w-10 pt-1 shrink-0 text-right">
              {item.time}
            </span>

            {/* Time Slot */}
            <div className="flex-1 border-t border-border pt-1 pb-2">
              {item.event && (
                <div
                  className={cn(
                    "px-3 py-2 rounded-lg border-l-4 text-sm font-medium",
                    item.color ?? "bg-red-50 text-red-600 border-l-red-500",
                  )}
                >
                  {item.event}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
