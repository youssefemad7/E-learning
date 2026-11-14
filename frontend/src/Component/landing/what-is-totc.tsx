// ─── Types ────────────────────────────────────────────────────────────────────

interface AudienceCard {
  label: string;
  buttonLabel: string;
  buttonColor: string;
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const audienceCards: AudienceCard[] = [
  {
    label: "FOR INSTRUCTORS",
    buttonLabel: "Start a class today",
    buttonColor: "bg-[#D8587E] hover:bg-indigo-600",
    image: "/confident-teacher-explaining-lesson-pupils 1.png",
  },
  {
    label: "FOR STUDENTS",
    buttonLabel: "Enter access code",
    buttonColor: "bg-[#23BDEE] hover:bg-indigo-600",
    image: "/istockphoto-2160439321-1024x1024.jpg",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function AudienceCard({
  label,
  buttonLabel,
  buttonColor,
  image,
}: AudienceCard) {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-md h-80 sm:h-96 w-full">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url('${image}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full p-8">
        <h3 className="font-bold text-2xl sm:text-3xl text-white mb-4">
          {label}
        </h3>
        <button
          className={`cursor-pointer ${buttonColor} transition-colors text-white rounded-full text-base font-medium px-8 py-3 w-fit`}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function WhatIsTotc() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-bold text-2xl sm:text-3xl mb-5 text-[#2F327D]">
            What is <span className="text-[#00CBB8]">TOTC?</span>
          </h2>
          <p className="text-[#696984] max-w-2xl mx-auto leading-relaxed">
            TOTC is a platform that allows educators to create online classes
            whereby they can store the course materials online; manage
            assignments, quizzes and exams; monitor due dates; grade results and
            provide students with feedback all in one place.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {audienceCards.map((card) => (
            <AudienceCard key={card.label} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
