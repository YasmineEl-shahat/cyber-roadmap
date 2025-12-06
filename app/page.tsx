import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";

export default function Home() {
  return (
    <main className="p-6 space-y-4 min-h-screen">
      <div className="p-4 h-[600px] max-w-4xl mx-auto">
        <ChartComponent data={certifications} />
      </div>
    </main>
  );
}
