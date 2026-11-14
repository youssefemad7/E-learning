import { Clock } from "lucide-react";

export interface CourseCardProps {
  image: string;
  category: string;
  duration: string;
  title: string;
  description: string;
  author: string;
  authorImage: string;
  originalPrice: number;
  salePrice: number;
}

export function CourseCard({
  image,
  category,
  duration,
  title,
  description,
  author,
  authorImage,
  originalPrice,
  salePrice,
}: CourseCardProps) {
  return (
    <div className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-40">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#49BBBD] shrink-0" />
            <span className="text-xs text-muted-foreground">{category}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Clock className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs">{duration}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-foreground line-clamp-2 text-sm sm:text-base leading-snug">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Footer: author + price */}
        <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-7 w-7 rounded-full overflow-hidden shrink-0">
              <img
                src={authorImage}
                alt={author}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-sm text-muted-foreground truncate">
              {author}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice}
            </span>
            <span className="text-sm font-bold text-[#49BBBD]">
              ${salePrice}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
