import { Link } from "react-router-dom";
import { CourseCard, type CourseCardProps } from "./CourseCard";

interface CourseGridProps {
  title: string;
  courses?: CourseCardProps[];
}

const defaultCourses: CourseCardProps[] = [
  {
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=200&fit=crop",
    category: "Design",
    duration: "3 Months",
    title: "AWS Certified Solutions Architect",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    originalPrice: 100,
    salePrice: 80,
  },
  {
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=200&fit=crop",
    category: "Development",
    duration: "2 Months",
    title: "React & TypeScript Masterclass",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    originalPrice: 120,
    salePrice: 90,
  },
  {
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=200&fit=crop",
    category: "Business",
    duration: "1 Month",
    title: "Digital Marketing Fundamentals",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    originalPrice: 80,
    salePrice: 60,
  },
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
    category: "Design",
    duration: "3 Months",
    title: "UI/UX Design Principles",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
    author: "Lina",
    authorImage:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop&crop=face",
    originalPrice: 100,
    salePrice: 75,
  },
];

export function CourseGrid({
  title,
  courses = defaultCourses,
}: CourseGridProps) {
  return (
    <section className="py-8 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground">
            {title}
          </h2>
          <Link
            to="#"
            className="text-sm font-medium text-[#49BBBD] hover:underline whitespace-nowrap"
          >
            See all
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
}
