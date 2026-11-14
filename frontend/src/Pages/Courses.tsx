import { WelcomeSection } from "../Component/courses/welcome-section";
import { CourseGrid } from "../Component/courses/course-grid";
import { CTABanner } from "../Component/courses/cta-banner";
import { CategoriesSection } from "../Component/courses/categories-section";
import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";

const Courses = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 overflow-x-hidden">
        {/* Hero / Welcome */}
        <WelcomeSection />

        {/* Categories */}
        <CategoriesSection />

        {/* Recommended Courses */}
        <div className="bg-[#9dccff58]">
          <CourseGrid title="Recommended for you" />
        </div>

        {/* All Courses */}
        <CourseGrid title="Get choice of your course" />

        {/* CTA */}
        <CTABanner />

        {/* Personal Development */}
        <CourseGrid title="The course in personal development" />

        {/* Trending */}
        <div className="bg-[#9dccff58]">
          <CourseGrid title="Students are viewing" />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Courses;
