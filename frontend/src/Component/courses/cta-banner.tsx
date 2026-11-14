import { Button } from "../ui/button";

export function CTABanner() {
  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="bg-[#252641] rounded-2xl px-6 py-10 lg:px-16 lg:py-16 text-center relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-[#49BBBD]/10 pointer-events-none" />
          <div className="absolute -bottom-10 -right-10 w-56 h-56 rounded-full bg-[#49BBBD]/10 pointer-events-none" />

          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 max-w-2xl mx-auto leading-tight">
              Online coaching lessons for remote learning.
            </h2>
            <p className="text-white/75 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor.
            </p>
            <Button className="bg-[#49BBBD] text-white hover:bg-white hover:text-[#49BBBD] transition-colors rounded-xl px-8 py-3 text-base font-medium h-auto">
              Start learning now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
