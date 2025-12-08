"use client";

import { Certification } from "@/lib/types";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
type Props = {
  data: Certification[];
  onSelect: (cert: Certification) => void;
};

export default function ChartComponent({ data, onSelect }: Props) {
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
      meta: { title: cert.title, votes: cert.total_votes, cert: cert },
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
      events: {
        markerClick: (event, chartContext, config) => {
          const { seriesIndex, dataPointIndex } = config;
          const dataPoint = series[seriesIndex]?.data[dataPointIndex];
          if (dataPoint?.meta?.cert) {
            onSelect(dataPoint.meta.cert);
          }
        },
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
      custom: function ({ seriesIndex, dataPointIndex }) {
        try {
          const dataPoint = series[seriesIndex]?.data[dataPointIndex];
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
      xaxis: [
        {
          x: 0.5,
          borderColor: "rgba(148,163,184,0.12)",
        },
      ],
      yaxis: [
        {
          y: 3,
          borderColor: "rgba(148,163,184,0.12)",
        },
      ],
      points: [
        {
          x: 0.25,
          y: 4.85,
          marker: { size: 0 },
          label: {
            text: "CHALLENGERS",
            style: {
              color: "rgb(148, 163, 184)",
              fontSize: "12px",
              background: "rgba(241, 245, 249, 0.11)",
            },
            offsetY: -18,
            offsetX: 0,
            borderColor: "rgba(148,163,184,0.06)",
            borderWidth: 0,
          },
        },
        {
          x: 0.75,
          y: 4.85,
          marker: { size: 0 },
          label: {
            text: "LEADERS",
            style: {
              color: "rgb(148, 163, 184)",
              fontSize: "12px",
              background: "rgba(241, 245, 249, 0.11)",
            },
            offsetY: -18,
            offsetX: 0,
            borderColor: "rgba(148,163,184,0.06)",
            borderWidth: 0,
          },
        },
        {
          x: 0.3,
          y: 1,
          marker: { size: 0 },
          label: {
            text: "NICHE PLAYERS",
            style: {
              color: "rgb(148, 163, 184)",
              fontSize: "12px",
              background: "rgba(241, 245, 249, 0.11)",
            },
            offsetX: -40,
            offsetY: 0,
            borderColor: "rgba(148,163,184,0.06)",
            borderWidth: 0,
          },
        },
        {
          x: 0.75,
          y: 1.12,
          marker: { size: 0 },
          label: {
            text: "VISIONARIES",
            style: {
              color: "rgb(148, 163, 184)",
              fontSize: "12px",
              background: "rgba(241, 245, 249, 0.11)",
            },
            offsetY: 12,
            offsetX: 0,
            borderColor: "rgba(148,163,184,0.06)",
            borderWidth: 0,
          },
        },
      ],
    },
  };

  return (
    <Chart options={options} series={series} type="scatter" height="100%" />
  );
}
