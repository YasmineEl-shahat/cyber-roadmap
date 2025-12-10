"use client";

import { Certification } from "@/lib/types";
import { CERT_TYPE_CONFIG } from "@/lib/constants";
import { groupCertificationsByType } from "@/lib/utils/certifications";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type Props = {
  data: Certification[];
  onSelect: (cert: Certification) => void;
};

export default function ChartComponent({ data, onSelect }: Props) {
  const grouped = groupCertificationsByType(data);

  const series = Object.entries(grouped)
    .filter(([, arr]) => arr.length > 0)
    .map(([type, arr]) => ({
      name: CERT_TYPE_CONFIG[type as keyof typeof CERT_TYPE_CONFIG].name,
      data: arr,
    }));

  // Shared style constants
  const foregroundColor = "var(--color-foreground)";
  const borderColorLight = "rgba(148,163,184,0.12)";
  const borderColorLighter = "rgba(148,163,184,0.06)";
  const labelTextColor = "rgb(148, 163, 184)";

  const baseAxisLabelStyle = {
    color: foregroundColor,
  };

  const baseAnnotationLabelStyle = {
    color: labelTextColor,
    fontSize: "12px",
    background: "rgba(241, 245, 249, 0.11)",
  };

  const createAnnotationPoint = (
    x: number,
    y: number,
    text: string,
    offsetX = 0,
    offsetY = 0
  ) => ({
    x,
    y,
    marker: { size: 0 },
    label: {
      text,
      style: baseAnnotationLabelStyle,
      offsetX,
      offsetY,
      borderColor: borderColorLighter,
      borderWidth: 0,
    },
  });

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
        style: baseAxisLabelStyle,
      },
      labels: {
        style: { colors: foregroundColor },
      },
    },

    yaxis: {
      min: 1,
      max: 5,
      tickAmount: 4,
      axisBorder: {
        show: true,
        color: foregroundColor,
      },
      title: {
        text: "Satisfaction",
        style: baseAxisLabelStyle,
      },
      labels: {
        style: { colors: foregroundColor },
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
      .map(
        ([type]) =>
          CERT_TYPE_CONFIG[type as keyof typeof CERT_TYPE_CONFIG].color
      ),

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
          borderColor: borderColorLight,
        },
      ],
      yaxis: [
        {
          y: 3,
          borderColor: borderColorLight,
        },
      ],
      points: [
        createAnnotationPoint(0.25, 4.85, "CHALLENGERS", 0, -18),
        createAnnotationPoint(0.75, 4.85, "LEADERS", 0, -18),
        createAnnotationPoint(0.3, 1, "NICHE PLAYERS", -40, 0),
        createAnnotationPoint(0.75, 1.12, "VISIONARIES", 0, 12),
      ],
    },
  };

  return (
    <Chart options={options} series={series} type="scatter" height="100%" />
  );
}
