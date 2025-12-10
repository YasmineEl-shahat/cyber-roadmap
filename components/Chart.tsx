"use client";

import { Certification } from "@/lib/types";
import dynamic from "next/dynamic";
import { useChartOptions } from "@/hooks/useChartOptions";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ChartComponentProps {
  data: Certification[];
  onSelect: (cert: Certification) => void;
}

export default function ChartComponent({
  data,
  onSelect,
}: ChartComponentProps) {
  const { options, series } = useChartOptions({ data, onSelect });

  return (
    <Chart options={options} series={series} type="scatter" height="100%" />
  );
}
