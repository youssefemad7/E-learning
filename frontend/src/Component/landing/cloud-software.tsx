import { faCalendar, faFile, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ─── Types ────────────────────────────────────────────────────────────────────

interface SoftwareFeature {
  icon: IconDefinition;
  iconBg: string;
  title: string;
  description: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const features: SoftwareFeature[] = [
  {
    icon: faFile,
    iconBg: "bg-[#5B72EE]",
    title: "Online Billing, Invoicing, & Contracts",
    description:
      "Simple and secure control of your organization's financial and legal transactions. Send customized invoices and contracts.",
  },
  {
    icon: faCalendar,
    iconBg: "bg-[#00CBB8]",
    title: "Easy Scheduling & Attendance Tracking",
    description:
      "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance.",
  },
  {
    icon: faUsers,
    iconBg: "bg-[#29B9E7]",
    title: "Customer Tracking",
    description:
      "Automate and track emails to individuals or groups. TOTC's built-in system helps organize your organization.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCard({ icon, iconBg, title, description }: SoftwareFeature) {
  return (
    <div className="relative flex flex-col items-center text-center bg-white rounded-xl shadow-md px-6 pt-14 pb-8 mt-10">
      {/* Icon bubble */}
      <div
        className={`${iconBg} w-16 h-16 flex items-center justify-center rounded-full absolute -top-8 left-1/2 -translate-x-1/2`}
      >
        <FontAwesomeIcon icon={icon} size="2x" style={{ color: "#fff" }} />
      </div>

      <h3 className="font-semibold text-lg md:text-xl mb-3 leading-snug">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export function CloudSoftware() {
  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#F7F8FC]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-bold text-2xl sm:text-3xl mb-4">
            All-In-One <span className="text-[#00CBB8]">Cloud Software.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
            TOTC is one powerful online software suite that combines all the
            tools needed to run a successful school or office.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
