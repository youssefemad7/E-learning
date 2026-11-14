import { FileText, Calendar, MessageCircle, Video } from "lucide-react";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Tool {
  icon: ElementType;
  label: string;
  color: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const tools: Tool[] = [
  { icon: FileText, label: "File Manager", color: "bg-[#23BDEE]" },
  { icon: Calendar, label: "Schedule", color: "bg-[#F48C06]" },
  { icon: MessageCircle, label: "Messages", color: "bg-[#2BD17E]" },
  { icon: Video, label: "Live Class", color: "bg-[#2F327D]" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ToolIcon({ icon: Icon, label, color }: Tool) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center`}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>
      <p className="text-xs text-[#696984] text-center">{label}</p>
    </div>
  );
}

function EducatorsContent() {
  return (
    <div>
      <span className="text-[#00CBB8] font-medium text-2xl uppercase tracking-wide">
        Class Management
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-[#2F327D] mb-4 mt-2">
        Tools for Educators
      </h3>
      <p className="text-[#696984] mb-8 leading-relaxed">
        Teachers and learners have access to numerous helpful tools such as the
        ability to record live sessions, share screens, chat with participants,
        and more. All from a single dashboard.
      </p>

      <div className="grid grid-cols-4 gap-4">
        {tools.map((tool) => (
          <ToolIcon key={tool.label} {...tool} />
        ))}
      </div>
    </div>
  );
}

function EducatorsIllustration() {
  return (
    <div className="bg-gradient-to-br from-[#E8F5FC] to-[#E8FCF0] rounded-2xl p-6">
      <div className="grid grid-cols-2 gap-4">
        {/* Dashboard */}
        <div className="bg-white rounded-xl p-4 shadow-sm col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#00CBB8] rounded-full shrink-0" />
            <div>
              <div className="h-2 bg-[#2F327D]/20 rounded w-24 mb-1" />
              <div className="h-2 bg-[#2F327D]/10 rounded w-16" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 bg-[#23BDEE]/10 rounded-lg" />
            <div className="h-14 bg-[#F48C06]/10 rounded-lg" />
            <div className="h-14 bg-[#2BD17E]/10 rounded-lg" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="w-full h-20 bg-[#2F327D]/5 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-[#2F327D]/30" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="space-y-2">
            <div className="h-2 bg-[#23BDEE]/30 rounded w-full" />
            <div className="h-2 bg-[#F48C06]/30 rounded w-4/5" />
            <div className="h-2 bg-[#2BD17E]/30 rounded w-3/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Chat bubbles illustration */
function ChatIllustration() {
  const messages = [
    {
      fromTeacher: true,
      text: "Hello! How can I help you with today's lesson?",
    },
    {
      fromTeacher: false,
      text: "I have a question about the assignment.",
    },
    {
      fromTeacher: true,
      text: "Sure! Let me schedule a call with you.",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#FFF5E8] to-[#E8F5FC] rounded-2xl p-8">
      <div className="space-y-4 max-w-sm mx-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${!msg.fromTeacher ? "flex-row-reverse" : ""}`}
          >
            <div
              className={`w-10 h-10 rounded-full shrink-0 ${
                msg.fromTeacher ? "bg-[#23BDEE]" : "bg-[#00CBB8]"
              }`}
            />
            <div
              className={`rounded-2xl p-4 shadow-sm max-w-[75%] ${
                msg.fromTeacher
                  ? "bg-white rounded-tl-none"
                  : "bg-[#23BDEE] rounded-tr-none"
              }`}
            >
              <p
                className={`text-sm ${
                  msg.fromTeacher ? "text-[#696984]" : "text-white"
                }`}
              >
                {msg.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DiscussionsContent() {
  return (
    <div>
      <span className="text-[#2F327D] font-medium text-xl uppercase tracking-wide">
        One-on-One
      </span>
      <h3 className="text-2xl md:text-3xl font-bold text-[#00CBB8]  mb-4 mt-2">
        Discussions
      </h3>
      <p className="text-[#696984] leading-relaxed">
        Teachers and students can have private discussions. Teachers can provide
        individual feedback and students can ask questions in a safe space.
        Schedule one-on-one sessions for personalized learning.
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function ClassManagement() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Educators tools */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <EducatorsContent />
          <EducatorsIllustration />
        </div>

        {/* Discussions */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <ChatIllustration />
          </div>
          <div className="order-1 lg:order-2">
            <DiscussionsContent />
          </div>
        </div>
      </div>
    </section>
  );
}
