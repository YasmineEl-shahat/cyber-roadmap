"use client";
import { useState, useRef, useEffect } from "react";
import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";
import SearchBox from "@/components/SearchBox";
import Filters from "@/components/Filters";
import CertificationModal from "@/components/CertificationModal";
import { Certification } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "blue", level: "" });
  const [selected, setSelected] = useState<Certification | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = certifications.filter((certification) => {
    return (
      (!filters.type || certification.cert_type === filters.type) &&
      (!filters.level.length ||
        filters.level.includes(certification.skill_level)) &&
      (certification.title.toLowerCase().includes(search.toLowerCase()) ||
        certification.abbreviation.toLowerCase().includes(search.toLowerCase()))
    );
  });

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await containerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
    }
  };

  return (
    <main className="space-y-4 min-h-screen">
      <div
        ref={containerRef}
        className={`p-4 max-w-4xl mx-auto space-y-4 relative h-[600px] ${
          fullscreen ? "h-screen w-screen max-w-full" : "h-[600px]"
        }`}
      >
        <Button
          onClick={toggleFullscreen}
          className="absolute top-20 right-4 z-10 cursor-pointer bg-forground"
        >
          {fullscreen ? (
            <Minimize2 className="h-4 w-4" />
          ) : (
            <Maximize2 className="h-4 w-4" />
          )}
        </Button>
        <SearchBox onChange={setSearch} />
        <Filters
          onFilter={(key, val) => setFilters((p) => ({ ...p, [key]: val }))}
        />
        <ChartComponent data={filtered} onSelect={setSelected} />
      </div>
      <CertificationModal
        cert={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </main>
  );
}
