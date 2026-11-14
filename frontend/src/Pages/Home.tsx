import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import { Studying } from "../Component/landing/studying";
import { Success } from "../Component/landing/success";
import { CloudSoftware } from "../Component/landing/cloud-software";
import { WhatIsTotc } from "../Component/landing/what-is-totc";
import { Classroom } from "../Component/landing/classroom";
import { Features } from "../Component/landing/features";
import { ClassManagement } from "../Component/landing/class-management";
import { Courses } from "../Component/landing/courses";
import { Testimonials } from "../Component/landing/testimonials";
import { Blog } from "../Component/landing/blog";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* 1. Hero */}
        <Studying />

        {/* 2. Stats */}
        <Success />

        {/* 3. All-in-one cloud */}
        <CloudSoftware />

        {/* 4. What is TOTC */}
        <WhatIsTotc />

        {/* 5. Classroom section */}
        <Classroom />
        {/* 6. Features */}
        <Features />
        {/* not with me */}

        {/* 7. Class Management */}
        <ClassManagement />

        {/* 8. Courses */}
        <Courses />

        {/* 9. Testimonials */}
        <Testimonials />
        {/* not with me */}
        {/*  i will build it with my self  */}

        {/* 10. Blog */}
        <Blog />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
