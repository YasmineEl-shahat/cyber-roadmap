import { Certification } from "@/lib/types";
import { CertType } from "@/lib/constants";

export interface FilterState {
  type: CertType;
  level: string[];
}

export const filterCertifications = (
  certifications: Certification[],
  search: string,
  filters: FilterState
): Certification[] => {
  return certifications.filter((certification) => {
    const matchesType =
      !filters.type || certification.cert_type === filters.type;
    const matchesLevel =
      !filters.level.length ||
      filters.level.includes(certification.skill_level);
    const matchesSearch =
      certification.title.toLowerCase().includes(search.toLowerCase()) ||
      certification.abbreviation.toLowerCase().includes(search.toLowerCase());

    return matchesType && matchesLevel && matchesSearch;
  });
};

export interface ChartDataPoint {
  x: number;
  y: number;
  name: string;
  meta: {
    title: string;
    votes: number;
    cert: Certification;
  };
}

export interface GroupedCertifications {
  blue: ChartDataPoint[];
  red: ChartDataPoint[];
  infoSec: ChartDataPoint[];
}

export const groupCertificationsByType = (
  certifications: Certification[]
): GroupedCertifications => {
  const grouped: GroupedCertifications = {
    blue: [],
    red: [],
    infoSec: [],
  };

  certifications.forEach((cert) => {
    grouped[cert.cert_type].push({
      x: cert.market_presence,
      y: cert.satisfaction,
      name: cert.abbreviation,
      meta: {
        title: cert.title,
        votes: cert.total_votes,
        cert: cert,
      },
    });
  });

  return grouped;
};
