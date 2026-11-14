interface PageHeaderProps {
  title: string;
  description?: string;
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 text-sm mt-2 leading-relaxed max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
}
