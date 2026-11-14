import { useState } from "react";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { Classroom } from "../Component/landing/classroom";
import { CourseCard } from "../Component/course/CourseCard";
import { OfferCard } from "../Component/course/OfferCard";
import { CourseHero } from "../Component/CourseDetailPage/Coursehero";
import { CourseTabs } from "../Component/CourseDetailPage/Coursetabs";
import { RatingSummary } from "../Component/CourseDetailPage/Ratingsummary";
import { ReviewList } from "../Component/CourseDetailPage/Reviewlist";
import { CoursePurchaseCard } from "../Component/CourseDetailPage/Coursepurchasecard";
import { SectionHeader } from "../Component/CourseDetailPage/Sectionheader";

// ─── Static Data ──────────────────────────────────────────────────────────────

const tabs = ["Overview", "Curriculum", "Instructor", "Reviews"];

const ratingBars = [
  { stars: 5, percentage: 90 },
  { stars: 4, percentage: 75 },
  { stars: 3, percentage: 60 },
  { stars: 2, percentage: 40 },
  { stars: 1, percentage: 20 },
];

const reviews = [
  {
    name: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    date: "3 months ago",
    content:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom for virtual classes and has raised $30 million in funding.",
  },
  {
    name: "Lina",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    rating: 5,
    date: "3 months ago",
    content:
      "Class, launched less than a year ago by Blackboard co-founder Michael Chasen, integrates exclusively with Zoom for virtual classes and has raised $30 million in funding.",
  },
];

const courseIncludes = [
  { icon: "check" as const, text: "Money Back Guarantee" },
  { icon: "check" as const, text: "Access on all devices" },
  { icon: "file" as const, text: "Certification of completion" },
  { icon: "file" as const, text: "32 Modules" },
];

const relatedCourses = [
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
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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
    title: "AWS Certified Solutions Architect",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
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

// ─── Sidebar JSX (reused in mobile & desktop) ─────────────────────────────────

function Sidebar() {
  return (
    <CoursePurchaseCard
      previewImage="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=250&fit=crop"
      price={49.65}
      originalPrice={99.99}
      discountLabel="50% Off"
      urgencyText="11 hours left at this price!"
      includes={courseIncludes}
      onBuy={() => console.log("Buy now clicked")}
    />
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CourseDetailPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      {/* ── Hero section ──
          On lg+: position:relative so the sidebar can anchor to it.
          The sidebar sits absolute at bottom-right, sticking out ~50% below.
      */}
      <div className="relative">
        <CourseHero
          imageUrl="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=400&fit=crop"
          alt="Course hero"
        />

        {/* Desktop sidebar – anchored to bottom-right of hero */}
        <div className="hidden lg:block absolute -bottom-40 right-0 w-full pointer-events-none">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-end">
            <div className="w-80 xl:w-96 translate-y-1/2 pointer-events-auto">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ──
          On lg+: the right column is a spacer that matches the sidebar width.
          lg:pt-[calc()] pushes content down so it doesn't hide under the sidebar.
      */}
      <section className="flex-1 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* ── Left Column ── */}
            <div className="w-full lg:flex-1 space-y-6">
              {/* Mobile/tablet sidebar – in normal flow above tabs */}
              <div className="lg:hidden">
                <Sidebar />
              </div>

              <CourseTabs
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />

              <RatingSummary
                score={4}
                maxScore={5}
                label="Top Rating"
                ratingBars={ratingBars}
              />

              <ReviewList reviews={reviews} />

              {/* Marketing Articles */}
            </div>

            {/* ── Right spacer (desktop only) – keeps layout width ── */}
            <div className="hidden lg:block w-80 xl:w-96 shrink-0" />
          </div>
          <div className="mt-20">
            <SectionHeader
              title="Marketing Articles"
              onSeeAll={() => console.log("See all articles")}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {relatedCourses.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          </div>
          <Classroom />
        </div>
      </section>

      {/* Offers Section */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Top Education Offers & Deals"
            onSeeAll={() => console.log("See all offers")}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {offers.map((offer) => (
              <OfferCard key={offer.id} {...offer} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
