import Navbar from "../Component/layout/Navbar";
import Footer from "../Component/layout/Footer";
import PricingCard from "../Component/MemberShip/PricingCard";
import { CTABanner } from "../Component/courses/cta-banner";
import { AccordionDemo } from "../Component/MemberShip/Accordion";
import { Students } from "../Component/MemberShip/Students";
import { Appsection } from "../Component/MemberShip/Appsection";
import { Final } from "../Component/MemberShip/Final";

const MemberShip = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        {/* Hero title */}
        <div className="text-center py-16 px-4">
          <h1 className="text-4xl font-bold text-[#49BBBD]">
            Affordable Pricing
          </h1>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            Choose the plan that works best for you and start learning today.
          </p>
        </div>

        {/* Pricing cards */}
        <PricingCard />

        {/* CTA */}
        <CTABanner />

        {/* FAQ Accordion */}
        <section className="py-16 px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-500 mt-3">
              Everything you need to know about our platform.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <AccordionDemo />
          </div>
        </section>

        {/* Student testimonials */}
        <Students title="What our students have to say" />

        {/* App download banner */}
        <Appsection />

        {/* Become teacher / coursector */}
        <Final />
      </main>

      <Footer />
    </div>
  );
};

export default MemberShip;
