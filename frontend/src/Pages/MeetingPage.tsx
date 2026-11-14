import { useState } from "react";
import { MeetingHeader } from "../Component/MeetingPage/Meetingheader";
import { VideoConference } from "../Component/MeetingPage/Videoconference";
import { CourseContentsPanel } from "../Component/MeetingPage/Coursecontentspanel";
import { BookRecommendations } from "../Component/MeetingPage/Bookrecommendations";

// ─── Static Data ──────────────────────────────────────────────────────────────

const participants = [
  {
    id: "1",
    name: "Jane",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Sarah",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Mike",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
];

const courseModules = [
  { id: "1", title: "Get Started", duration: "1 Hour", lessons: 5 },
  {
    id: "2",
    title: "Illustrator Structures",
    duration: "2 Hours",
    lessons: 3,
    items: [
      {
        id: "2-1",
        title: "Lorem ipsum dolor sit amet",
        duration: "65:00",
        locked: false,
        current: true,
      },
      {
        id: "2-2",
        title: "Lorem ipsum dolor",
        duration: "25:00",
        locked: true,
      },
      {
        id: "2-3",
        title: "Lorem ipsum dolor sit amet",
        duration: "30:00",
        locked: true,
      },
    ],
  },
  { id: "3", title: "Using Illustrator", duration: "1 Hour", lessons: 4 },
  { id: "4", title: "What is Pandas?", duration: "12:54", lessons: 5 },
  { id: "5", title: "Work with NumPy", duration: "59:00", lessons: 3 },
];

const books = [
  {
    id: "1",
    title: "All Benefits of PLUS",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=150&fit=crop",
  },
  {
    id: "2",
    title: "All Benefits of PLUS",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=200&h=150&fit=crop",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MeetingPage() {
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [expandedModules, setExpandedModules] = useState<string[]>(["2"]);

  const toggleModule = (id: string) =>
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );

  return (
    <div className="min-h-screen bg-[#E8F6F6]">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:py-10 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* ── Left: Video Conference ── */}
          <div className="lg:col-span-2 space-y-5">
            <MeetingHeader
              title="UX/UI Design Conference Meeting"
              subtitle="9 Lessons · 6h 30min"
              backTo="/courses/1/view"
            />
            <VideoConference
              mainImageUrl="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1200&h=800&fit=crop"
              participants={participants}
              videoEnabled={videoEnabled}
              micEnabled={micEnabled}
              onToggleVideo={() => setVideoEnabled((v) => !v)}
              onToggleMic={() => setMicEnabled((m) => !m)}
              onHangUp={() => console.log("hang up")}
              onShareScreen={() => console.log("share screen")}
              onLeave={() => console.log("leave")}
            />
          </div>

          {/* ── Right: Course Contents + Books ── */}
          <div className="space-y-5">
            <CourseContentsPanel
              modules={courseModules}
              expandedModules={expandedModules}
              completedCount={2}
              totalCount={5}
              onToggleModule={toggleModule}
            />
            <BookRecommendations books={books} />
          </div>
        </div>
      </div>
    </div>
  );
}
