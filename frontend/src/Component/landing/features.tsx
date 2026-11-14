import { MessageSquare, Users, Lightbulb, Check } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const classroomFeatures = [
  "Real-time video conferencing with up to 100 participants",
  "Interactive whiteboard and screen sharing",
  "Breakout rooms for group activities",
  "Live Q&A and polling tools",
];

const progressItems = [
  {
    label: "Quiz Progress",
    value: 85,
    color: "bg-[#23BDEE]",
    textColor: "text-[#23BDEE]",
  },
  {
    label: "Assignment",
    value: 60,
    color: "bg-[#F48C06]",
    textColor: "text-[#F48C06]",
  },
  {
    label: "Test Score",
    value: 92,
    color: "bg-[#2BD17E]",
    textColor: "text-[#2BD17E]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Feature 1 – Classroom Interface mockup */
function ClassroomMockup() {
  return (
    <div className="relative">
      <div className="bg-white rounded-2xl shadow-xl p-4">
        <div className="bg-[#2F327D] rounded-xl p-4">
          {/* Video grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="aspect-video bg-gradient-to-br from-[#3a3d7d] to-[#4a4d8d] rounded-lg flex items-center justify-center"
              >
                <div className="w-8 h-8 bg-[#00CBB8] rounded-full" />
              </div>
            ))}
          </div>
          {/* Controls */}
          <div className="flex justify-center gap-4">
            <div className="w-10 h-10 bg-red-500 rounded-full" />
            <div className="w-10 h-10 bg-[#2BD17E] rounded-full" />
            <div className="w-10 h-10 bg-[#23BDEE] rounded-full" />
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-[#00CBB8] rounded-full flex items-center justify-center shrink-0">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-[#2F327D]">Live Chat</p>
          <p className="text-xs text-[#696984]">Active now</p>
        </div>
      </div>
    </div>
  );
}

/** Feature 1 – text side */
function ClassroomContent() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-6">
        A <span className="text-[#00CBB8]">user interface</span> designed for
        the classroom
      </h3>
      <ul className="space-y-4">
        {classroomFeatures.map((feature, i) => (
          <li key={i} className="flex items-start gap-3">
            <div className="w-6 h-6 bg-[#2BD17E]/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-4 h-4 text-[#2BD17E]" />
            </div>
            <span className="text-[#696984]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Feature 2 – Tools illustration */
function ToolsIllustration() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#E8F5FC] to-[#FFF5E8] rounded-2xl p-8 aspect-square flex items-center justify-center">
        <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-full h-20 bg-[#23BDEE]/20 rounded-lg mb-2" />
            <div className="h-2 bg-[#2F327D]/20 rounded w-3/4" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-full h-20 bg-[#F48C06]/20 rounded-lg mb-2" />
            <div className="h-2 bg-[#2F327D]/20 rounded w-2/3" />
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-[#00CBB8] rounded-full shrink-0" />
              <div className="flex-1">
                <div className="h-2 bg-[#2F327D]/20 rounded w-full mb-2" />
                <div className="h-2 bg-[#2F327D]/10 rounded w-2/3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating quiz card */}
      <div className="absolute top-4 right-4 bg-white rounded-xl shadow-lg p-3">
        <p className="text-xs font-semibold text-[#2F327D]">
          True or false? This play
        </p>
        <p className="text-xs text-[#696984]">takes place in Italy</p>
        <div className="flex gap-2 mt-2">
          <span className="bg-[#2BD17E]/20 text-[#2BD17E] text-xs px-2 py-1 rounded">
            True
          </span>
          <span className="bg-red-100 text-red-500 text-xs px-2 py-1 rounded">
            False
          </span>
        </div>
      </div>
    </div>
  );
}

/** Feature 2 – text side */
function ToolsContent() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-6">
        <span className="text-[#00CBB8]">Tools</span> For Teachers And Learners
      </h3>
      <p className="text-[#696984] mb-6 leading-relaxed">
        Class has a dynamic set of teaching tools built to be deployed and used
        during class. Teachers can handout assignments in real-time for students
        to complete and submit.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Users className="w-8 h-8 text-[#23BDEE] mb-2" />
          <p className="font-semibold text-[#2F327D]">Class Management</p>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <Lightbulb className="w-8 h-8 text-[#F48C06] mb-2" />
          <p className="font-semibold text-[#2F327D]">Smart Content</p>
        </div>
      </div>
    </div>
  );
}

/** Feature 3 – Progress bar illustration */
function AssessmentsIllustration() {
  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-[#FFF5E8] to-[#E8FCF0] rounded-2xl p-8 flex items-center justify-center min-h-[220px]">
        <div className="w-full max-w-md space-y-5">
          {progressItems.map(({ label, value, color, textColor }) => (
            <div key={label}>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#2F327D]">{label}</span>
                <span className={`text-sm font-medium ${textColor}`}>
                  {value}%
                </span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden">
                <div
                  className={`h-full ${color} rounded-full transition-all duration-700`}
                  style={{ width: `${value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Feature 3 – text side */
function AssessmentsContent() {
  return (
    <div>
      <h3 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-6">
        <span className="text-[#00CBB8]">Assessments,</span> Quizzes, Tests
      </h3>
      <p className="text-[#696984] leading-relaxed">
        Easily launch live assignments, quizzes, and tests. Student results are
        automatically entered in the online gradebook. Easily track student
        performance with our comprehensive analytics dashboard.
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Features() {
  return (
    <section className="bg-[#F7F8FC] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F327D]">
            Our Features
          </h2>
          <p className="text-[#696984] mt-4 max-w-2xl mx-auto">
            These professional and amazing features will make learning easier
          </p>
        </div>

        {/* Feature 1 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <ClassroomMockup />
          <ClassroomContent />
        </div>

        {/* Feature 2 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 lg:order-1">
            <ToolsContent />
          </div>
          <div className="order-1 lg:order-2">
            <ToolsIllustration />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AssessmentsIllustration />
          <AssessmentsContent />
        </div>
      </div>
    </section>
  );
}
