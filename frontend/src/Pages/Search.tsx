import { useState } from "react";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { CourseCard } from "../Component/course/CourseCard";
import { OfferCard } from "../Component/course/OfferCard";
import { InstructorCard } from "../Component/search/instructor-card";

import { HeroSearch } from "../Component/search/Herosearch";
import { PlatformBanner } from "../Component/search/Platformbanner";
import { TestimonialsSlider } from "../Component/search/Testimonialsslider";
import { HomeSection } from "../Component/search/Homesection";

// ─── Static Data ──────────────────────────────────────────────────────────────

const courses = [
  {
    id: "1",
    title: "AWS Certified Solutions Architect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
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
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
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
    title: "UI/UX Design Fundamentals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
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
  {
    id: "4",
    title: "Python for Data Science",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image:
      "https://images.unsplash.com/photo-1587440871875-191322ee64b0?w=400&h=300&fit=crop",
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
    id: "5",
    title: "Digital Marketing Essentials",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
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
    id: "6",
    title: "Machine Learning Bootcamp",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
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
    id: "7",
    title: "Graphic Design Masterclass",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
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
    id: "8",
    title: "Node.js Backend Development",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop",
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

const instructors = [
  {
    id: "1",
    name: "Jane Cooper",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "Adam",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  },
  {
    id: "3",
    name: "Tamara",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  },
  {
    id: "4",
    name: "Maya",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
  },
  {
    id: "5",
    name: "Sarah",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&h=200&fit=crop",
  },
  {
    id: "6",
    name: "Alex",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop",
  },
];

const offers = [
  {
    id: "1",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=500&fit=crop",
    discount: "50%",
  },
  {
    id: "2",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=500&fit=crop",
    discount: "10%",
  },
  {
    id: "3",
    title: "Lorem ipsum dolor",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=500&fit=crop",
    discount: "50%",
  },
];

const filters = [
  { name: "Subject", options: ["All", "Design", "Development", "Marketing"] },
  { name: "Partner", options: ["All", "Coursera", "Udemy", "edX"] },
  { name: "Program", options: ["All", "Certificate", "Degree", "Course"] },
  { name: "Language", options: ["All", "English", "Spanish", "French"] },
  { name: "Availability", options: ["All", "Available", "Coming Soon"] },
  { name: "Learning Type", options: ["All", "Self-Paced", "Instructor-Led"] },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Search() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // TODO: navigate to /courses?q=searchQuery
    console.log("Search:", searchQuery);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* Hero + Search + Filters */}
      <HeroSearch
        title="Find Your Perfect Course"
        subtitle="Discover courses taught by expert instructors from around the world"
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearch={handleSearch}
        filters={filters}
      />

      {/* All Courses Grid */}
      <HomeSection title="All Courses">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </HomeSection>

      {/* Platform Banner */}
      <PlatformBanner onStartLearning={() => console.log("start learning")} />

      {/* Recommended For You */}
      <HomeSection
        title="Recommended for You"
        onSeeAll={() => console.log("see all recommended")}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.slice(0, 4).map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>
      </HomeSection>

      {/* Instructors */}
      <HomeSection
        title="Classes Taught by Real Creators"
        onSeeAll={() => console.log("see all instructors")}
        bg="bg-muted/30"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {instructors.map((instructor) => (
            <InstructorCard key={instructor.id} {...instructor} />
          ))}
        </div>
      </HomeSection>

      {/* Testimonials */}
      <TestimonialsSlider />

      {/* Offers */}
      <HomeSection
        title="Top Education Offers & Deals"
        onSeeAll={() => console.log("see all offers")}
        bg="bg-muted/30"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <OfferCard key={offer.id} {...offer} />
          ))}
        </div>
      </HomeSection>

      <Footer />
    </div>
  );
}
