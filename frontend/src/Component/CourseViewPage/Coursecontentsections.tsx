interface ContentSection {
  title: string;
  body: string;
}

interface CourseContentSectionsProps {
  sections: ContentSection[];
}

export function CourseContentSections({
  sections,
}: CourseContentSectionsProps) {
  return (
    <div className="space-y-8">
      {sections.map((section, index) => (
        <div key={index}>
          <h2 className="text-xl font-bold text-[#2D3E50] mb-3">
            {section.title}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {section.body}
          </p>
        </div>
      ))}
    </div>
  );
}
