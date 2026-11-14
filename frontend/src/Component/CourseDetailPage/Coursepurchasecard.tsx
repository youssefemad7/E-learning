import { Check, FileText, Users, Share2 } from "lucide-react";
import { Button } from "../ui/button";

interface CourseInclude {
  icon: "check" | "file" | "users";
  text: string;
}

const iconMap = {
  check: Check,
  file: FileText,
  users: Users,
};

interface CoursePurchaseCardProps {
  previewImage: string;
  price: number;
  originalPrice: number;
  discountLabel: string;
  urgencyText: string;
  includes: CourseInclude[];
  onBuy?: () => void;
}

const socialLinks = [
  "twitter",
  "facebook",
  "youtube",
  "instagram",
  "linkedin",
  "pinterest",
];

export function CoursePurchaseCard({
  previewImage,
  price,
  originalPrice,
  discountLabel,
  urgencyText,
  includes,
  onBuy,
}: CoursePurchaseCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm lg:sticky lg:top-6">
      {/* Preview Image */}
      <div className="relative aspect-video rounded-lg overflow-hidden mb-5">
        <img
          src={previewImage}
          alt="Course preview"
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-white/90 flex items-center justify-center shadow-md">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[14px] border-l-[#49BBBD] ml-1" />
          </div>
        </div>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-bold text-[#2D3E50]">
          ${price.toFixed(2)}
        </span>
        <span className="text-base text-muted-foreground line-through">
          ${originalPrice.toFixed(2)}
        </span>
        <span className="text-sm font-semibold text-[#49BBBD]">
          {discountLabel}
        </span>
      </div>
      <p className="text-sm text-destructive mb-4">{urgencyText}</p>

      {/* Buy Button */}
      <Button
        onClick={onBuy}
        className="w-full bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-[0.98] text-white font-semibold h-11 rounded-xl mb-6 shadow-sm transition-all"
      >
        Buy Now
      </Button>

      {/* Course Includes */}
      <div className="space-y-3 pb-6 border-b border-border">
        <h3 className="font-semibold text-foreground text-sm">
          This course includes
        </h3>
        {includes.map((item, index) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={index}
              className="flex items-center gap-3 text-sm text-muted-foreground"
            >
              <Icon className="h-4 w-4 text-[#49BBBD] shrink-0" />
              <span>{item.text}</span>
            </div>
          );
        })}
      </div>

      {/* Group Training */}
      <div className="py-6 border-b border-border">
        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-[#49BBBD] shrink-0" />
          Training 5 or more people?
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Get your team access to top courses anytime, anywhere. Contact us for
          group pricing.
        </p>
      </div>

      {/* Share */}
      <div className="pt-6">
        <h3 className="font-semibold text-foreground mb-3 text-sm">
          Share this course
        </h3>
        <div className="flex items-center flex-wrap gap-2">
          {socialLinks.map((social) => (
            <button
              key={social}
              aria-label={`Share on ${social}`}
              className="h-8 w-8 rounded-full bg-muted flex items-center justify-center hover:bg-[#49BBBD] hover:text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
