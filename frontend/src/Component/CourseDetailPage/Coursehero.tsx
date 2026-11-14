interface CourseHeroProps {
  imageUrl: string;
  alt?: string;
}

export function CourseHero({ imageUrl, alt = "Course hero" }: CourseHeroProps) {
  return (
    <section className="relative h-56 sm:h-64 lg:h-80 w-full overflow-hidden">
      <img
        src={imageUrl}
        alt={alt}
        className="h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
    </section>
  );
}
