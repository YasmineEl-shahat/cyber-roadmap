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
        certification.cert_type === "blue"
          ? "oklch(0.594 0.16404 250.257 / 0.85)"
          : certification.cert_type === "red"
          ? "oklch(0.621 0.25441 29.197 / 0.85)"
          : "oklch(0.605 0.1702 45.96 / 0.85)",
      pointRadius: 8,
      pointHoverRadius: 12,
    })),
  };

  return (
    <Scatter
      data={chartData}
      options={{
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          tooltip: { enabled: true },
          legend: { display: false },
        },
        scales: {
          x: {
            title: {
              text: "Market Presence",
              display: true,
              color: "rgb(203, 213, 225)",
              font: { size: 16 },
              align: "start",
              padding: { top: 20 },
            },
            min: 0,
            max: 1,
          },
          y: {
            title: {
              text: "Satisfaction",
              display: true,
              color: "rgb(203, 213, 225)",
              font: { size: 16 },
              align: "start",
              padding: { bottom: 20 },
            },
            min: 1,
            max: 5,
          },
        },
      }}
    />
  );
}
