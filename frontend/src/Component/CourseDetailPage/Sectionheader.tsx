import { Button } from "../ui/button";

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
      <h2 className="text-xl font-bold text-[#2D3E50] leading-snug">{title}</h2>
      {onSeeAll && (
        <Button
          variant="link"
          onClick={onSeeAll}
          className="text-[#49BBBD] hover:text-[#3da9ab] font-semibold px-0 sm:px-4 self-start sm:self-auto"
        >
          See all →
        </Button>
      )}
    </div>
  );
}
