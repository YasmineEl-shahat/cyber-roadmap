"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MultiSelect } from "@/components/ui/multi-select";

const certTypes = ["blue", "red", "infoSec"] as const;
const certTypeLabels: Record<(typeof certTypes)[number], string> = {
  blue: "Blue Team",
  red: "Red Team",
  infoSec: "InfoSec",
};

const levels = [
  { value: "Novice", label: "Novice" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];

export default function Filters({
  onFilter,
}: {
  onFilter: (filterType: string, filterValue: string | string[]) => void;
}) {
  const [activeType, setActiveType] =
    useState<(typeof certTypes)[number]>("blue");
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);

  const handleTypeChange = (value: string) => {
    const type = value as (typeof certTypes)[number];
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
          {certTypes.map((type) => (
            <TabsTrigger key={type} value={type}>
              {certTypeLabels[type]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <MultiSelect
        options={levels}
        selected={selectedLevels}
        onSelectedChange={handleLevelsChange}
        placeholder="Select Skill Level"
        className="min-w-[220px]"
      />
    </div>
  );
}
