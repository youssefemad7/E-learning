import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-12">
      {/* Prev */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="rounded-full h-9 w-9"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          size="icon"
          onClick={() => onPageChange(page)}
          aria-label={`Page ${page}`}
          aria-current={page === currentPage ? "page" : undefined}
          className={cn(
            "rounded-full h-9 w-9 text-sm font-medium transition-all",
            page === currentPage
              ? "bg-[#49BBBD] hover:bg-[#3da9ab] text-white border-[#49BBBD] shadow-sm"
              : "hover:border-[#49BBBD]/50 hover:text-[#49BBBD]",
          )}
        >
          {page}
        </Button>
      ))}

      {/* Next */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="rounded-full h-9 w-9"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
