import { useState, useMemo } from "react";
import { Certification } from "@/lib/types";
import {
  filterCertifications,
  type FilterState,
} from "@/lib/utils/certifications";

interface UseCertificationFilteringProps {
  certifications: Certification[];
  initialFilters?: FilterState;
}

export function useCertificationFiltering({
  certifications,
  initialFilters = { type: "blue", level: [] },
}: UseCertificationFilteringProps) {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selected, setSelected] = useState<Certification | null>(null);

  const filtered = useMemo(
    () => filterCertifications(certifications, search, filters),
    [certifications, search, filters]
  );

  const updateFilter = (key: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return {
    search,
    setSearch,
    filters,
    updateFilter,
    selected,
    setSelected,
    filtered,
  };
}
