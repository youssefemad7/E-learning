import { Search, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface Filter {
  name: string;
  options: string[];
}

interface HeroSearchProps {
  title: string;
  subtitle: string;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  filters: Filter[];
}

export function HeroSearch({
  title,
  subtitle,
  searchQuery,
  onSearchChange,
  onSearch,
  filters,
}: HeroSearchProps) {
  return (
    <section className="bg-gradient-to-br from-[#E8F6F6] to-[#D5EFEF] py-12 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#2D3E50] mb-3">
            {title}
          </h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            {subtitle}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Input
              type="search"
              placeholder="Search your favorite course..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && onSearch()}
              className="w-full h-14 pl-6 pr-36 rounded-full border-2 border-white bg-white shadow-lg focus:border-[#49BBBD] text-base"
            />
            <Button
              onClick={onSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 rounded-full bg-[#49BBBD] hover:bg-[#3da9ab] text-white font-medium"
            >
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
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
