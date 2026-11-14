import { Button } from "../ui/button";

interface HomeSectionProps {
  title: string;
  onSeeAll?: () => void;
  bg?: string;
  children: React.ReactNode;
}

export function HomeSection({
  title,
  onSeeAll,
  bg = "",
  children,
}: HomeSectionProps) {
  return (
    <section className={`py-12 lg:py-16 ${bg}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="text-2xl font-bold text-[#2D3E50]">{title}</h2>
          {onSeeAll && (
            <Button
              variant="link"
              onClick={onSeeAll}
              className="text-[#49BBBD] font-semibold px-0 sm:px-4 self-start sm:self-auto"
            >
              See all →
            </Button>
          )}
        </div>
        {children}
      </div>
    </section>
  );
}
