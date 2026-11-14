import { Search, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";

interface Filter {
  name: string;
  options: string[];
}

interface CoursesHeroProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filters: Filter[];
  onFilterSelect?: (filter: string, option: string) => void;
}

export function CoursesHero({
  searchQuery,
  onSearchChange,
  filters,
}: CoursesHeroProps) {
  return (
    <section className="bg-gradient-to-br from-[#E8F6F6] to-[#D5EFEF] py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-[#2D3E50] text-center mb-3">
          Explore Our Courses
        </h1>
        <p className="text-center text-muted-foreground text-sm mb-8">
          Discover top-rated courses taught by expert instructors
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-7">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder="Search courses, topics, or instructors..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-full border-2 border-white bg-white shadow-lg focus:ring-2 focus:ring-[#49BBBD]/40"
            />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {filters.map((filter) => (
            <button
              key={filter.name}
              aria-haspopup="listbox"
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-muted-foreground hover:text-[#49BBBD] hover:border-[#49BBBD]/40 hover:shadow-md transition-all border border-border"
            >
              {filter.name}
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
