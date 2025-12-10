interface TagsFieldProps {
  label: string;
  items: string[];
  className?: string;
}

export default function TagsField({
  label,
  items,
  className = "",
}: TagsFieldProps) {
  return (
    <div className={className}>
      <p className="text-muted-foreground">{label}:</p>
      <div className="flex flex-wrap gap-2 mt-2">
        {items && items.length > 0 ? (
          items.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-muted text-muted-foreground rounded text-xs"
            >
              {item}
            </span>
          ))
        ) : (
          <p className="text-foreground">None</p>
        )}
      </div>
    </div>
  );
}
