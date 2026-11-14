import { Button } from "../ui/button";

export function BlogHero() {
  return (
    <section className="py-10 md:py-14 lg:py-20 bg-[#9dccff56]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <p className="text-sm text-muted-foreground">
              By Themadbrains in{" "}
              <span className="text-[#49BBBD] font-medium">Inspiration</span>
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
              Why Swift UI Should Be on the Radar of Every Mobile Developer
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed text-sm lg:text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <Button className="mt-6 bg-[#49BBBD] hover:bg-[#3da9ab] active:scale-95 text-white px-8 rounded-full font-medium transition-all">
              Start learning now
            </Button>
          </div>

          {/* Right Image — fixed: added w-full h-full to img */}
          <div className="order-1 lg:order-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-md">
              <img
                src="https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=800&h=600&fit=crop"
                alt="Learning platform"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
