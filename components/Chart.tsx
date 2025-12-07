"use client";

import { Certification } from "@/lib/types";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
type Props = {
  data: Certification[];
};

export default function ChartComponent({ data }: Props) {
  // Group certifications by cert_type
  const certTypeMap = {
    blue: {
      name: "Blue Team",
      color: "var(--color-cert-blue)",
    },
    red: {
      name: "Red Team",
      color: "var(--color-cert-red)",
    },
    infosec: {
      name: "InfoSec",
      color: "var(--color-cert-infosec)",
    },
  };

  const grouped = {
    blue: [] as any[],
    red: [] as any[],
    infosec: [] as any[],
  };
  data.forEach((cert) => {
    const type =
      cert.cert_type === "blue"
        ? "blue"
        : cert.cert_type === "red"
        ? "red"
        : "infosec";
    grouped[type].push({
      x: cert.market_presence,
      y: cert.satisfaction,
      name: cert.abbreviation,
      meta: { title: cert.title, votes: cert.total_votes },
    });
  });

  const series = Object.entries(grouped)
    .filter(([, arr]) => arr.length > 0)
    .map(([type, arr]) => ({
      name: certTypeMap[type as keyof typeof certTypeMap].name,
      data: arr,
    }));
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "scatter",
      height: "100%",
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        speed: 600,
      },
    },

    xaxis: {
      min: 0,
      max: 1,
      tickAmount: 5,
      title: {
        text: "Market Presence",
        style: { color: "var(--color-foreground)" },
      },
      labels: {
        style: { colors: "var(--color-foreground)" },
      },
    },

    yaxis: {
      min: 1,
      max: 5,
      tickAmount: 4,
      axisBorder: {
        show: true,
        color: "var(--color-foreground)",
      },
      title: {
        text: "Satisfaction",
        style: { color: "var(--color-foreground)" },
      },
      labels: {
        style: { colors: "var(--color-foreground)" },
      },
    },

    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: "#ffffff9e",
      hover: { size: 7 },
    },

    dataLabels: {
      enabled: true,
      formatter: function (_val, opts) {
        try {
          return series[opts.seriesIndex].data[opts.dataPointIndex]
            .name as string;
        } catch (e) {
          return "";
        }
      },
      style: {
        colors: ["#dbeafe"],
        fontSize: "12px",
        fontWeight: "600",
      },
      offsetY: -14,
      background: {
        enabled: false,
      },
    },

    tooltip: {
      theme: "dark",
      custom: function ({ series, seriesIndex, dataPointIndex }) {
        try {
          const dataPoint = series[seriesIndex]?.[dataPointIndex];
          if (!dataPoint) return "";

          const name = dataPoint.name || "Unknown";
          const votes = dataPoint.meta?.votes || 0;
          return `
            <div style="padding: 12px; background: transparent;">
              <div style="font-size: 14px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px;">Certification: ${name}</div>
              <div style="font-size: 13px; color: #cbd5e1;">Total Votes: ${votes}</div>
            </div>
          `;
        } catch (e) {
          return "";
        }
      },
    },

    colors: Object.entries(grouped)
      .filter(([, arr]) => arr.length > 0)
      .map(([type]) => certTypeMap[type as keyof typeof certTypeMap].color),

    grid: {
      borderColor: "rgba(148,163,184,0.06)",
      xaxis: {
        lines: { show: true },
      },
      yaxis: {
        lines: { show: true },
      },
      row: {
        colors: undefined,
      },
    },

    annotations: {
      points: [],
      // xaxis: [
      //   {
      //     x: 0.5,
      //     borderColor: "rgba(148,163,184,0.12)",
      //     label: { text: "", style: { color: "var(--color-foreground)" } },
      //   },
      //   {
      //     x: 0.25,
      //     label: {
      //       text: "CHALLENGERS",
      //       style: { color: "#cbd5e1", fontSize: "12px", fontWeight: 700 },
      //       position: "top",
      //     },
      //   },
      //   {
      //     x: 0.75,
      //     label: {
      //       text: "LEADERS",
      //       style: { color: "#cbd5e1", fontSize: "12px", fontWeight: 700 },
      //       position: "top",
      //     },
      //   },
      // ],
      yaxis: [
        {
          y: 3,
          borderColor: "rgba(148,163,184,0.12)",
          label: { text: "", style: { color: "var(--color-foreground)" } },
        },
        // { y: 1, label: { text: "NIChe player", style: { color: "#cbd5e1" } } },
        // { y: 0.4, label: { text: "", style: { color: "#cbd5e1" } } },
      ],
    },
  };

  return (
    <Chart options={options} series={series} type="scatter" height="100%" />
  );
}
