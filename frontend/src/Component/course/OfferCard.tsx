import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

interface OfferCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  className?: string;
}

export function OfferCard({
  id,
  title,
  description,
  image,
  discount,
  className,
}: OfferCardProps) {
  return (
    <Link
      to={`/courses/${id}`}
      className={cn(
        "group relative block rounded-2xl overflow-hidden aspect-[3/4] hover:shadow-xl transition-all duration-300",
        className,
      )}
    >
      {/* Background Image */}
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-5">
        {/* Discount Badge */}
        <div className="inline-flex">
          <span className="bg-[#49BBBD] text-white text-xl font-bold px-4 py-2 rounded-lg">
            {discount}
          </span>
        </div>

        {/* Text Content */}
        <div className="text-white">
          <h3 className="font-bold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-sm text-white/80 line-clamp-4">{description}</p>
        </div>
      </div>
    </Link>
  );
}
