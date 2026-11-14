import { useState } from "react";
import { Star, Clock, Users } from "lucide-react";
import { Button } from "../ui/button";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  price: number;
  image: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const categories: Category[] = [
  { id: "design", label: "Design", icon: "🎨" },
  { id: "development", label: "Development", icon: "💻" },
  { id: "business", label: "Business", icon: "📊" },
  { id: "marketing", label: "Marketing", icon: "📱" },
];

const courses: Course[] = [
  {
    id: 1,
    title: "Introduction to User Experience Design",
    category: "design",
    instructor: "John Doe",
    rating: 4.8,
    students: 1200,
    duration: "22 hours",
    price: 49,
    image: "bg-gradient-to-br from-[#23BDEE] to-[#2F327D]",
  },
  {
    id: 2,
    title: "Web Development Bootcamp 2024",
    category: "development",
    instructor: "Jane Smith",
    rating: 4.9,
    students: 2500,
    duration: "40 hours",
    price: 79,
    image: "bg-gradient-to-br from-[#F48C06] to-[#ff6b6b]",
  },
  {
    id: 3,
    title: "Digital Marketing Mastery",
    category: "marketing",
    instructor: "Alex Johnson",
    rating: 4.7,
    students: 890,
    duration: "18 hours",
    price: 39,
    image: "bg-gradient-to-br from-[#2BD17E] to-[#23BDEE]",
  },
  {
    id: 4,
    title: "Business Strategy Fundamentals",
    category: "business",
    instructor: "Sarah Lee",
    rating: 4.6,
    students: 640,
    duration: "15 hours",
    price: 59,
    image: "bg-gradient-to-br from-[#2F327D] to-[#5B72EE]",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 ${
            active === cat.id
              ? "bg-[#00CBB8] text-white shadow-md"
              : "bg-white text-[#696984] hover:bg-[#23BDEE]/10"
          }`}
        >
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      className="w-8 h-8 text-white"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function CourseCard({ course }: { course: Course }) {
  const categoryLabel = categories.find((c) => c.id === course.category)?.label;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
      {/* Thumbnail */}
      <div className={`h-48 ${course.image} flex items-center justify-center`}>
        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
          <PlayIcon />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Category badge */}
        <span className="bg-[#23BDEE]/10 text-[#23BDEE] text-xs font-medium px-3 py-1 rounded-full self-start mb-3">
          {categoryLabel}
        </span>

        <h3 className="text-base font-semibold text-[#2F327D] mb-2 line-clamp-2 flex-1">
          {course.title}
        </h3>
        <p className="text-[#696984] text-sm mb-4">by {course.instructor}</p>

        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#696984] mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-[#F48C06] fill-[#F48C06]" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-2xl font-bold text-[#2F327D]">
            ${course.price}
          </span>
          <Button className="bg-[#23BDEE] hover:bg-[#1ea8d4] text-white rounded-full px-5 py-2 h-auto text-sm">
            Enroll Now
          </Button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="col-span-full text-center py-16">
      <p className="text-[#696984] text-lg">
        No courses found in this category.
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function Courses() {
  const [activeCategory, setActiveCategory] = useState("design");

  const filteredCourses = courses.filter(
    (c) => c.category === activeCategory || activeCategory === "all",
  );

  return (
    <section className="bg-[#F7F8FC] py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2F327D] mb-4">
            Explore Courses
          </h2>
          <p className="text-[#696984] max-w-2xl mx-auto">
            Browse our collection of courses and start learning today
          </p>
        </div>

        {/* Tabs */}
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>

        {/* View all */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="rounded-full px-8 py-3 h-auto border-2 border-[#23BDEE] text-[#23BDEE] hover:bg-[#23BDEE] hover:text-white transition-colors"
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
