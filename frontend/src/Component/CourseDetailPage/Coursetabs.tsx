import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface CourseTabsProps {
  tabs: string[];
  activeTab: number;
  onTabChange: (index: number) => void;
}

export function CourseTabs({ tabs, activeTab, onTabChange }: CourseTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
      {tabs.map((tab, index) => (
        <Button
          key={index}
          variant={activeTab === index ? "default" : "outline"}
          onClick={() => onTabChange(index)}
          className={cn(
            "rounded-full text-sm font-medium transition-all",
            activeTab === index
              ? "bg-[#49BBBD] hover:bg-[#3da9ab] text-white shadow-sm"
              : "border-border hover:border-[#49BBBD]/50 hover:text-[#49BBBD]",
          )}
        >
          {tab}
        </Button>
      ))}
    </div>
  );
}
