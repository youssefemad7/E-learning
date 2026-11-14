import { faSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Component() {
  return (
    <section className="bg-[#252641] w-full py-10 md:py-16 flex flex-col items-center">
      {/* LOGO */}
      <div className="flex relative items-center gap-4 mb-6">
        <FontAwesomeIcon
          icon={faSquare}
          className="rotate-45 text-[#00FFF0] absolute top-0 -left-4 "
          size="2x"
        />

        <h1 className="text-white font-bold text-xl md:text-2xl z-10">TOTC</h1>

        <div className="bg-[#626381] w-px h-6 md:h-8"></div>

        <h1 className="text-white font-semibold text-sm sm:text-base md:text-xl text-center">
          Virtual Class for Zoom
        </h1>
      </div>

      {/* TEXT */}
      <h2 className="text-[#B2B3CF] text-sm sm:text-base md:text-xl text-center mb-6 px-4">
        Subscribe to get our Newsletter
      </h2>

      {/* INPUT + BUTTON */}
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-xl px-4">
        <input
          placeholder="Your Email"
          type="email"
          className="border-2 border-[#83839A] rounded-full px-4 py-2 w-full 
          focus:outline-none focus:ring-2 focus:ring-[#49BBBD] focus:border-transparent transition"
        />

        <button className="bg-[#49BBBD] hover:bg-indigo-600 text-white font-bold rounded-full px-6 py-2 w-full sm:w-auto">
          Subscribe
        </button>
      </div>

      {/* LINKS */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 text-[#B2B3CF] text-sm sm:text-base">
        <span>Careers</span>

        <div className="w-px h-5 bg-[#626381]"></div>

        <span>Privacy Policy</span>

        <div className="w-px h-5 bg-[#626381]"></div>

        <span>Terms & Conditions</span>
      </div>

      {/* COPYRIGHT */}
      <p className="text-[#B2B3CF] text-xs sm:text-sm mt-6 text-center">
        © 2021 Class Technologies Inc.
      </p>
    </section>
  );
}
