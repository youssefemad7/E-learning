import { useState } from "react";
import { CourseHeader } from "../Component/CourseCalendarPage/Courseheader";
import { CourseSidebar } from "../Component/CourseCalendarPage/Coursesidebar";
import { MiniCalendar } from "../Component/CourseCalendarPage/Minicalendar";
import { DaySchedule } from "../Component/CourseCalendarPage/Dayschedule";
import type { Lesson } from "../Component/CourseCalendarPage/Lessonitem";

// ─── Data ────────────────────────────────────────────────────────────────────

const lessons: Lesson[] = [
  {
    id: "1",
    title: "Lesson 01 : Introduction about XD",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "2",
    title: "Lesson 02 : Interface Overview",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "3",
    title: "Lesson 03 : Working with Artboards",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "4",
    title: "Lesson 04 : Components & Assets",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "5",
    title: "Lesson 05 : Prototyping Basics",
    duration: "30 mins",
    completed: false,
  },
];

const practiceQuizLessons: Lesson[] = [
  {
    id: "6",
    title: "Quiz 01 : XD Basics",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "7",
    title: "Quiz 02 : Interface Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "8",
    title: "Quiz 03 : Artboard Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "9",
    title: "Quiz 04 : Components Quiz",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "10",
    title: "Quiz 05 : Prototype Quiz",
    duration: "30 mins",
    completed: false,
  },
  {
    id: "11",
    title: "Quiz 06 : Advanced XD",
    duration: "30 mins",
    completed: true,
  },
  {
    id: "12",
    title: "Quiz 07 : Final Assessment",
    duration: "30 mins",
    completed: false,
  },
];

const calendarDays = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  isCurrentMonth: true,
  hasEvent: i + 1 === 12,
}));

const scheduleItems = [
  {
    time: "2 PM",
    event: "Adobe XD Live Class",
    color: "bg-red-50 text-red-600 border-l-red-500",
  },
  { time: "3 PM", event: null },
  { time: "4 PM", event: null },
  { time: "5 PM", event: null },
  { time: "6 PM", event: null },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseCalendarPage() {
  const [currentLesson, setCurrentLesson] = useState("1");
  const [selectedDate, setSelectedDate] = useState(12);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <CourseHeader
        title="Learn about Adobe XD & Prototyping"
        subtitle="Introduction about XD"
        duration="1 hour"
        backTo="/courses/1"
      />

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Sidebar */}
        <CourseSidebar
          lessons={lessons}
          practiceQuizLessons={practiceQuizLessons}
          currentLesson={currentLesson}
          onLessonSelect={setCurrentLesson}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {/* Section Description */}
          <div className="mb-8 max-w-2xl">
            <h2 className="text-2xl font-bold text-[#2D3E50] mb-3">
              Share and Refer
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
          </div>

          {/* Calendar Card */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
              <MiniCalendar
                month="September 2021"
                days={calendarDays}
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
              <DaySchedule
                selectedDate={selectedDate}
                month="Sep"
                dayName="Monday"
                items={scheduleItems}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
