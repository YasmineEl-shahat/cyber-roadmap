"use client";
import { useState } from "react";
import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";
import SearchBox from "@/components/SearchBox";
import Filters from "@/components/Filters";
import CertificationModal from "@/components/CertificationModal";
import { Certification } from "@/lib/types";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ type: "blue", level: "" });
  const [selected, setSelected] = useState<Certification | null>(null);

  const filtered = certifications.filter((certification) => {
    return (
      (!filters.type || certification.cert_type === filters.type) &&
      (!filters.level.length ||
        filters.level.includes(certification.skill_level)) &&
      (certification.title.toLowerCase().includes(search.toLowerCase()) ||
        certification.abbreviation.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <main className="p-6 space-y-4 min-h-screen">
      <div className="p-4 h-[600px] max-w-4xl mx-auto space-y-4">
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
