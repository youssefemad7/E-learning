import { Button } from "../ui/button";
import { OfferCard } from "../course/OfferCard";

const offers = [
  {
    id: "1",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
    discount: "50%",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop",
    discount: "10%",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop",
    discount: "50%",
  },
];

interface OffersSectionProps {
  onSeeAll?: () => void;
}

export function OffersSection({ onSeeAll }: OffersSectionProps) {
  return (
    <section className="mt-12 lg:mt-20">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-[#2D3E50] leading-tight">
            Top Education Offers & Deals
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Exclusive discounts curated just for you
          </p>
        </div>
        <Button
          variant="link"
          onClick={onSeeAll}
          className="text-[#49BBBD] hover:text-[#3da9ab] font-semibold shrink-0 px-0 sm:px-4"
        >
          See all →
        </Button>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <OfferCard key={offer.id} {...offer} />
        ))}
      </div>
    </section>
  );
}
