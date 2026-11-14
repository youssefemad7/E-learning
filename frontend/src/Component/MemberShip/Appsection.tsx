import { Button } from "../ui/button";

export function Appsection() {
  return (
    <section className="py-12 lg:py-16 px-4 sm:px-6 lg:px-8 relative grid">
      <div className="w-[90%] sm:w-[80%] md:w-[80%] lg:w-[80%] absolute left-1/2 transform -translate-x-1/2  -translate-y-1/2 ">
        <div className="bg-[#252641] rounded-2xl px-6 py-10 lg:px-16 lg:py-12 flex flex-row items-center justify-between gap-6 text-center sm:text-left">
          <h2 className="text-xl lg:text-3xl font-bold text-white">
            APP is available for free
          </h2>

          <div className="flex flex-col md:flex-row gap-4 shrink-0">
            <Button className="bg-[#29B9E7] text-white hover:bg-white hover:text-[#29B9E7] rounded-xl px-6 h-12 transition-colors">
              Android APP
            </Button>
            <Button className="bg-[#49BBBD] text-white hover:bg-white hover:text-[#49BBBD] rounded-xl px-6 h-12 transition-colors">
              iOS APP
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
