import { Certification } from "./types";

export const CERT_TYPES = ["blue", "red", "infoSec"] as const;
export type CertType = (typeof CERT_TYPES)[number];

export const CERT_TYPE_CONFIG: Record<
  CertType,
  { name: string; color: string }
> = {
  blue: {
    name: "Blue Team",
    color: "var(--color-cert-blue)",
  },
  red: {
    name: "Red Team",
    color: "var(--color-cert-red)",
  },
  infoSec: {
    name: "InfoSec",
    color: "var(--color-cert-infosec)",
  },
};

export const SKILL_LEVELS = [
  { value: "Novice", label: "Novice" },
  { value: "Beginner", label: "Beginner" },
  { value: "Intermediate", label: "Intermediate" },
  { value: "Advanced", label: "Advanced" },
  { value: "Expert", label: "Expert" },
];
