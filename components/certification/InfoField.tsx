interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

export default function InfoField({
  label,
  value,
  className = "",
  valueClassName = "",
}: InfoFieldProps) {
  return (
    <div className={className}>
      <p className="text-muted-foreground">{label}:</p>
      <p className={`text-foreground ${valueClassName}`}>{value}</p>
    </div>
  );
}
