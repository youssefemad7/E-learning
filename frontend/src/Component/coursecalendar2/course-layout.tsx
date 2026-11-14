import { useState } from "react";
import { CourseSidebar } from "./course-sidebar";
import { CourseHeader } from "./course-header";
import { Menu, X } from "lucide-react";

interface CourseLayoutProps {
  children: React.ReactNode;
}

export function CourseLayout({ children }: CourseLayoutProps) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>("1");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Mobile toggle — fixed: moved to top-right to avoid overlap with content */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
        className="lg:hidden fixed top-4 right-4 z-50 bg-[#3bb3bd] text-white p-2 rounded-lg shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div className="flex flex-1 flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-40
            w-72 lg:w-80 bg-white shadow-xl lg:shadow-none
            transform transition-transform duration-300 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            flex-shrink-0 flex flex-col
          `}
        >
          <CourseSidebar
            selectedLesson={selectedLesson}
            onSelectLesson={(id) => {
              setSelectedLesson(id);
              setSidebarOpen(false);
            }}
          />
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <CourseHeader />
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
