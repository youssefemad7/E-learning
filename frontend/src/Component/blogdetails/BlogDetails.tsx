const tags = ["Affordable", "Stunning", "Making", "Madbrawns"];

const bodyText = `TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.

TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place. TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.

TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.`;

export function BlogDetails() {
  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl text-[#2F327D] font-semibold mb-6 leading-snug">
          Why Swift UI Should Be on the Radar of Every Mobile Developer
        </h1>

        {/* Body */}
        <div className="space-y-4 text-[#696984] text-sm sm:text-base leading-relaxed">
          {bodyText.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tags.map((tag) => (
            <button
              key={tag}
              className="bg-[#49BBBD]/20 hover:bg-[#49BBBD]/40 text-[#2D3E50] text-sm rounded-full px-4 py-1.5 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        <hr className="my-6 border-border" />

        {/* Author + Follow */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Author Avatar — fixed: local path → Unsplash, h-17 w-17 مش موجودة */}
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
              alt="Lina"
              className="h-12 w-12 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-xs text-[#696984]">Written by</p>
              <p className="text-base font-semibold text-foreground">Lina</p>
            </div>
          </div>

          {/* Follow Button */}
          <button className="px-6 py-2 text-sm font-medium rounded-lg border border-[#49BBBD] text-[#49BBBD] hover:bg-[#49BBBD] hover:text-white transition-all duration-200 cursor-pointer">
            Follow
          </button>
        </div>
      </div>
    </section>
  );
}
