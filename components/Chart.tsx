"use client";

import {
  Chart as ChartJS,
  PointElement,
  Tooltip,
  Legend,
  LinearScale,
  Title,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import { Certification } from "@/lib/types";

ChartJS.register(PointElement, Tooltip, Legend, LinearScale, Title);

type Props = {
  data: Certification[];
};

export default function ChartComponent({ data }: Props) {
  const chartData = {
    datasets: data.map((certification) => ({
      label: certification.abbreviation,
      data: [
        { x: certification.market_presence, y: certification.satisfaction },
      ],
      backgroundColor:
        certification.cert_type === "red"
          ? "#ff4444"
          : certification.cert_type === "blue"
          ? "#4285f4"
          : "#22c55e",
      pointRadius: 8,
      pointHoverRadius: 12,
    })),
  };

  return (
    <Scatter
      data={chartData}
      options={{
        responsive: true,

        plugins: {
          tooltip: { enabled: true },
        },
        scales: {
          x: {
            title: { text: "Market Presence", display: true },
            min: 0,
            max: 1,
          },
          y: { title: { text: "Satisfaction", display: true }, min: 1, max: 5 },
        },
      }}
    />
  );
}
