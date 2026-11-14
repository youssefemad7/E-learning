export function Classroom() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="relative">
          {/* Accent circle */}
          <div className="bg-[#33EFA0] w-8 h-8 md:w-10 md:h-10 rounded-full absolute -left-2 top-0 md:top-1 opacity-80" />

          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl text-[#2F327D] mb-5 relative z-10 leading-snug max-w-lg">
            Everything you can do in a physical classroom,{" "}
            <span className="text-[#00CBB8]">you can do with TOTC</span>
          </h2>

          <p className="text-[#696984] text-sm sm:text-base leading-relaxed max-w-md">
            TOTC's school management software helps traditional and online
            schools manage scheduling, attendance, payments and virtual
            classrooms all in one secure cloud-based system.
          </p>
        </div>

        {/* Image with decorative shapes */}
        <div className="relative flex justify-center  mt-6 md:mt-0 ">
          {/* Top-left shape */}
          <div className="bg-[#23BDEE] w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-xl absolute -top-4 -left-4 z-0 " />
          {/* Bottom-right shape */}
          <div className="bg-[#33EFA0] w-20 h-20 sm:w-28 sm:h-28 lg:w-36 lg:h-36 rounded-xl absolute -bottom-4 -right-4 z-0" />

          <img
            src="/confident-teacher-explaining-lesson-pupils 1.png"
            alt="Confident Teacher Explaining Lesson"
            className="w-full sm:max-w-md lg:max-w-lg object-cover relative z-10 rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
