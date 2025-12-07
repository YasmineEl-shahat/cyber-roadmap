import { Input } from "@/components/ui/input";

export default function SearchBox({
  onChange,
}: {
  onChange: (value: string) => void;
}) {
  return (
    <Input
      placeholder="Search certifications…"
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
    />
  );
}
