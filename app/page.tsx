"use client";

import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";
import SearchBox from "@/components/SearchBox";
import Filters from "@/components/Filters";
import CertificationModal from "@/components/CertificationModal";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2 } from "lucide-react";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useCertificationFiltering } from "@/hooks/useCertificationFiltering";

export default function Home() {
  const { fullscreen, containerRef, toggleFullscreen } = useFullscreen();
  const { setSearch, updateFilter, selected, setSelected, filtered } =
    useCertificationFiltering({ certifications });

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
        <Filters onFilter={updateFilter} />
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
