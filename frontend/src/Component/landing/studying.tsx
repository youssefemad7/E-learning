import {
  faCirclePlay,
  faCalendar,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ─── Sub-components ───────────────────────────────────────────────────────────

function HeroText() {
  return (
    <div className="col-span-12 md:col-span-6 flex flex-col px-6 md:pl-[8%] md:pr-4 mt-10 lg:mt-[7%] md:mt-[0%] text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-10 md:mt-20 md:w-[75%] leading-tight">
        <span className="text-[#F48C06]">Studying </span>
        Online is now much easier
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-white/90 mt-4 md:mt-6 md:w-[55%] mx-auto md:mx-0 leading-relaxed">
        TOTC is an interesting platform that will teach you in more an
        interactive way
      </p>

      <HeroCTA />
    </div>
  );
}

function HeroCTA() {
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-center gap-4 sm:gap-6 mt-6 md:mt-8">
      <button className="cursor-pointer px-8 py-2.5 bg-white/30 hover:bg-indigo-600 transition-colors duration-200 font-bold rounded-full text-white border border-white/40 w-full sm:w-auto">
        Join for free
      </button>

      <button className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity">
        <FontAwesomeIcon icon={faCirclePlay} size="2x" />
        <span className="text-base font-medium">Watch how it works</span>
      </button>
    </div>
  );
}

/** Floating badge – "250K Assisted Students" */
function StatsBadge() {
  return (
    <div className="absolute hidden md:flex top-[8%] -left-[5%] xl:-left-[8%] md:-left-[15%] z-10 bg-white/90 rounded-2xl shadow-lg px-4 py-3 items-center gap-3 min-w-[160px]">
      <div className="bg-[#23BDEE] p-2 rounded-md shrink-0">
        <FontAwesomeIcon
          icon={faCalendar}
          size="lg"
          style={{ color: "#fff" }}
        />
      </div>
      <div>
        <p className="font-bold text-[#2F327D]">250K+</p>
        <p className="text-xs text-gray-500">Assisted Students</p>
      </div>
    </div>
  );
}

/** Floating badge – "Congratulations" */
function CongratsBadge() {
  return (
    <div className="absolute hidden md:flex top-[38%] -right-[2%] xl:-right-[1%] z-10 bg-white/90 rounded-2xl shadow-lg px-4 py-3 items-center gap-3 min-w-[190px]">
      <div className="bg-[#F88C3D] p-2 rounded-md shrink-0">
        <FontAwesomeIcon
          icon={faEnvelope}
          size="lg"
          style={{ color: "#fff" }}
        />
      </div>
      <div>
        <p className="font-bold text-sm text-[#2F327D]">Congratulations</p>
        <p className="text-xs text-gray-500">Your admission completed</p>
      </div>
    </div>
  );
}

/** Floating badge – "User Experience Class / Join Now" */
function ClassBadge() {
  return (
    <div className="absolute hidden md:flex bottom-[40%]  xl:-left-[10%] md:-left-[15%] z-10 bg-white/90 rounded-2xl shadow-lg px-4 py-3 items-center gap-4 min-w-[220px]">
      <div className="relative shrink-0 ">
        <img
          className="h-12 w-12 rounded-full object-cover"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
          alt="User"
        />
        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
      </div>
      <div>
        <p className="font-bold text-sm text-[#2F327D]">
          User Experience Class
        </p>
        <p className="text-xs text-gray-500 mb-2">Today at 12:00 PM</p>
        <button className="cursor-pointer px-4 py-1 bg-[#D8587E] hover:bg-indigo-600 transition-colors text-white rounded-full text-xs font-medium">
          Join Now
        </button>
      </div>
    </div>
  );
}

function HeroImage() {
  return (
    <div className="col-span-12 md:col-span-6 relative flex justify-center px-6 mt-8 md:mt-[8%] pb-12 md:pb-0">
      <div className="relative  w-full max-w-sm md:max-w-none">
        <img
          src="/istockphoto-2160439321-1024x1024.jpg"
          alt="Student studying online"
          className="w-full md:w-[88%] h-110 object-cover rounded-2xl mx-auto"
        />
        <StatsBadge />
        <CongratsBadge />
        <ClassBadge />
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Studying() {
  return (
    <section className="bg-[#00CBB8] [clip-path:ellipse(100%_55%_at_50%_28%)] min-h-[85vh] md:min-h-[90vh] grid grid-cols-12 overflow-visible pb-20 md:pb-0">
      <HeroText />
      <HeroImage />
    </section>
  );
}
