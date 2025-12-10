import { useState } from "react";
import { CertType } from "@/lib/constants";

interface UseFiltersProps {
  onFilter: (filterType: string, filterValue: string | string[]) => void;
}

export function useFilters({ onFilter }: UseFiltersProps) {
  const [activeType, setActiveType] = useState<CertType>("blue");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleTypeChange = (value: string) => {
    const type = value as CertType;
    setActiveType(type);
    onFilter("type", type);
  };

  const handleLevelsChange = (values: string[]) => {
    setSelectedLevels(values);
    onFilter("level", values);
  };

  return {
    activeType,
    selectedLevels,
    handleTypeChange,
    handleLevelsChange,
  };
}
