import { Button } from "../ui/button";

const features = [
  "Free E-book, video & consultation",
  "Top instructors from around the world",
  "Top courses from your team",
];

interface PlatformBannerProps {
  onStartLearning?: () => void;
}

export function PlatformBanner({ onStartLearning }: PlatformBannerProps) {
  return (
    <section className="py-12 lg:py-16 bg-[#E8F6F6]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            {/* Text */}
            <div className="lg:max-w-md">
              <h2 className="text-2xl lg:text-3xl font-bold text-[#2D3E50] mb-4 leading-snug">
                Know about our <br className="hidden lg:block" />
                learning platform
              </h2>
              <ul className="space-y-3 text-muted-foreground text-sm mb-6">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-[#49BBBD] shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                onClick={onStartLearning}
                className="bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-95 text-white px-8 rounded-full font-medium transition-all"
              >
                Start learning now
              </Button>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="rounded-full px-6">
                Free
              </Button>
              <Button
                variant="outline"
                className="rounded-full px-6 border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white transition-colors"
              >
                3 Courses
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
