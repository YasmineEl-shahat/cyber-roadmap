import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";

export default function Home() {
  return (
    <main className="p-6 space-y-4">
      <div className="p-4 bg-neutral-900 rounded-lg">
        <ChartComponent data={certifications} />
      </div>
    </main>
  );
}
