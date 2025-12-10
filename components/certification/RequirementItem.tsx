import { LucideIcon } from "lucide-react";

interface RequirementItemProps {
  icon: LucideIcon;
  label: string;
  value: string | undefined;
}

export default function RequirementItem({
  icon: Icon,
  label,
  value,
}: RequirementItemProps) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
      <div>
        <p className="text-muted-foreground text-xs">{label}:</p>
        <p className="text-foreground text-sm">{value || "None"}</p>
      </div>
    </div>
  );
}
