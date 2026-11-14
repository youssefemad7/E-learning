import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import Navbar from "../Component/layout/Navbar";

import { ViewSidebar } from "../Component/CourseViewPage/Viewsidebar";
import { VideoPlayer } from "../Component/CourseViewPage/Videoplayer";
import { CourseContentSections } from "../Component/CourseViewPage/Coursecontentsections";
import { InstructorCard } from "../Component/CourseViewPage/Instructorcard";
import { RelatedCoursesCarousel } from "../Component/CourseViewPage/Relatedcoursescarousel";
import type { Lesson } from "../Component/CourseViewPage/Viewsidebar";

// ─── Static Data ──────────────────────────────────────────────────────────────

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Lesson 01 : Introduction about XD",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "2",
    title: "Lesson 02 : Interface & Workspace",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "3",
    title: "Lesson 03 : Artboards & Layout",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "4",
    title: "Lesson 04 : Components & Symbols",
    duration: "30 mins",
    completed: false,
  },
];

const practiceQuizLessons: Lesson[] = [
  {
    id: "5",
    title: "Quiz 01 : XD Basics",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "6",
    title: "Quiz 02 : Workspace Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "7",
    title: "Quiz 03 : Artboard Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "8",
    title: "Quiz 04 : Components Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "9",
    title: "Quiz 05 : Prototyping Quiz",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "10",
    title: "Quiz 06 : Advanced Concepts",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "11",
    title: "Quiz 07 : Sharing & Handoff",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "12",
    title: "Quiz 08 : Final Assessment",
    duration: "30 mins",
    completed: false,
  },
];

const contentSections = [
  {
    title: "06 Super Coins on the Way",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Who This Course Is For",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.",
  },
  {
    title: "What You Will Achieve",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.",
  },
];

const relatedCourses = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop",
    category: "Design",
    duration: "3 Month",
    price: 80,
    originalPrice: 100,
    instructor: {
      name: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
  {
    id: "2",
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop",
    category: "Design",
    duration: "3 Month",
    price: 80,
    originalPrice: 100,
    instructor: {
      name: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
  {
    id: "3",
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
    category: "Design",
    duration: "3 Month",
    price: 80,
    originalPrice: 100,
    instructor: {
      name: "Lina",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseViewPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLesson, setCurrentLesson] = useState("1");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Teal Course Header */}
      <header className="bg-[#49BBBD] text-white px-4 py-4 lg:px-8 shrink-0">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to="/courses/1"
              aria-label="Back to course"
              className="h-10 w-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="min-w-0">
              <h1 className="text-lg lg:text-2xl font-bold truncate">
                Learn about Adobe XD & Prototyping
              </h1>
              <p className="text-white/75 text-sm mt-0.5">
                Introduction about XD
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-white/90 shrink-0">
            <Clock className="h-4 w-4" />
            <span>1 hour</span>
          </div>
        </div>
      </header>

      {/* Body: Sidebar + Main */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <ViewSidebar
          lessons={lessons}
          practiceQuizLessons={practiceQuizLessons}
          currentLesson={currentLesson}
          onLessonSelect={setCurrentLesson}
        />

        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <VideoPlayer
            thumbnailUrl="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&h=675&fit=crop"
            isPlaying={isPlaying}
            onTogglePlay={() => setIsPlaying((p) => !p)}
          />

          <div className="space-y-10">
            <CourseContentSections sections={contentSections} />

            <InstructorCard
              name="Bulkin Simons"
              avatar="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
              rating={5}
              bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            />

            <RelatedCoursesCarousel
              courses={relatedCourses}
              onPrev={() => console.log("prev")}
              onNext={() => console.log("next")}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
