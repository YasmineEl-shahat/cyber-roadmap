"use client";
import { useState } from "react";
import { certifications } from "@/lib/mock-data";
import ChartComponent from "@/components/Chart";
import SearchBox from "@/components/SearchBox";

export default function Home() {
  const [search, setSearch] = useState("");
  const filtered = certifications.filter((certification) => {
    return (
      certification.title.toLowerCase().includes(search.toLowerCase()) ||
      certification.abbreviation.toLowerCase().includes(search.toLowerCase())
    );
  });
  return (
    <main className="p-6 space-y-4 min-h-screen">
      <div className="p-4 h-[600px] max-w-4xl mx-auto space-y-4">
        <SearchBox onChange={setSearch} />

        <ChartComponent data={filtered} />
      </div>
    </main>
  );
}
