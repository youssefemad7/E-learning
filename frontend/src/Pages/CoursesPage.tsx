import { useState, useMemo } from "react";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { CoursesHero } from "../Component/CoursesPage/Courseshero";
import { CoursesToolbar } from "../Component/CoursesPage/Coursestoolbar";
import { CourseGrid } from "../Component/CoursesPage/Coursegrid";
import { Pagination } from "../Component/CoursesPage/Pagination";

// ─── Static Data ──────────────────────────────────────────────────────────────

const allCourses = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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
    title: "React Development Masterclass",
    description: "Learn React from beginner to advanced level",
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    category: "Development",
    duration: "4 Month",
    price: 90,
    originalPrice: 120,
    instructor: {
      name: "John",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  },
  {
    id: "3",
    title: "UI/UX Design Fundamentals",
    description: "Master the principles of user interface design",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    category: "Design",
    duration: "2 Month",
    price: 70,
    originalPrice: 90,
    instructor: {
      name: "Sarah",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  },
  {
    id: "4",
    title: "Python for Data Science",
    description: "Comprehensive Python course for data analysis",
    image:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    category: "Development",
    duration: "5 Month",
    price: 100,
    originalPrice: 150,
    instructor: {
      name: "Mike",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
  },
  {
    id: "5",
    title: "Digital Marketing Essentials",
    description: "Learn modern digital marketing strategies",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
    category: "Marketing",
    duration: "3 Month",
    price: 75,
    originalPrice: 95,
    instructor: {
      name: "Emma",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
  },
  {
    id: "6",
    title: "Machine Learning Bootcamp",
    description: "Deep dive into ML algorithms and applications",
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop",
    category: "Development",
    duration: "6 Month",
    price: 150,
    originalPrice: 200,
    instructor: {
      name: "David",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
  },
  {
    id: "7",
    title: "Graphic Design Masterclass",
    description: "Create stunning visuals with professional tools",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=300&fit=crop",
    category: "Design",
    duration: "3 Month",
    price: 85,
    originalPrice: 110,
    instructor: {
      name: "Lisa",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    },
  },
  {
    id: "8",
    title: "Node.js Backend Development",
    description: "Build scalable backend applications with Node",
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop",
    category: "Development",
    duration: "4 Month",
    price: 95,
    originalPrice: 130,
    instructor: {
      name: "Alex",
      avatar:
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
    },
  },
];

const filters = [
  { name: "Subject", options: ["All", "Design", "Development", "Marketing"] },
  { name: "Level", options: ["All", "Beginner", "Intermediate", "Advanced"] },
  {
    name: "Duration",
    options: ["All", "1-2 Months", "3-4 Months", "5+ Months"],
  },
  {
    name: "Price",
    options: ["All", "Free", "Under $50", "$50-$100", "Over $100"],
  },
];

const PAGE_SIZE = 8;

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Live search filtering
  const filteredCourses = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return allCourses;
    return allCourses.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.instructor.name.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  // Pagination slice
  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // Reset page on new search
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero + Search + Filters */}
      <CoursesHero
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        filters={filters}
      />

      {/* Course Listing */}
      <section className="py-10 lg:py-14 flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CoursesToolbar count={filteredCourses.length} />
          <CourseGrid courses={paginatedCourses} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
