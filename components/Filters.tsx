"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/ui/multi-select";
import {
  CERT_TYPES,
  CERT_TYPE_CONFIG,
  SKILL_LEVELS,
  type CertType,
} from "@/lib/constants";

export default function Filters({
  onFilter,
}: {
  onFilter: (filterType: string, filterValue: string | string[]) => void;
}) {
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
