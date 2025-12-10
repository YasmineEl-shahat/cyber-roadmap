"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/ui/multi-select";
import { CERT_TYPES, CERT_TYPE_CONFIG, SKILL_LEVELS } from "@/lib/constants";
import { useFilters } from "@/hooks/useFilters";

interface FiltersProps {
  onFilter: (filterType: string, filterValue: string | string[]) => void;
}

export default function Filters({ onFilter }: FiltersProps) {
  const { activeType, selectedLevels, handleTypeChange, handleLevelsChange } =
    useFilters({ onFilter });

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <Tabs value={activeType} onValueChange={handleTypeChange}>
        <TabsList>
          {CERT_TYPES.map((type) => (
            <TabsTrigger key={type} value={type}>
              {CERT_TYPE_CONFIG[type].name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <MultiSelect
        options={SKILL_LEVELS}
        selected={selectedLevels}
        onSelectedChange={handleLevelsChange}
        placeholder="Select Skill Level"
        className="min-w-[220px] cursor-pointer"
      />
    </div>
  );
}
