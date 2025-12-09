"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Certification } from "@/lib/types";
import { Lightbulb, Briefcase, GraduationCap, LucideIcon } from "lucide-react";

interface CertificationModalProps {
  cert: Certification | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

interface InfoFieldProps {
  label: string;
  value: string | number;
  className?: string;
  valueClassName?: string;
}

interface RequirementItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface TagsFieldProps {
  label: string;
  items: string[];
  className?: string;
}

const InfoField = ({
  label,
  value,
  className = "",
  valueClassName = "",
}: InfoFieldProps) => (
  <div className={className}>
    <p className="text-muted-foreground">{label}:</p>
    <p className={`text-foreground ${valueClassName}`}>{value}</p>
  </div>
);

const RequirementItem = ({
  icon: Icon,
  label,
  value,
}: RequirementItemProps) => (
  <div className="flex items-start gap-3">
    <Icon className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
    <div>
      <p className="text-muted-foreground text-xs">{label}:</p>
      <p className="text-foreground text-sm">{value || "None"}</p>
    </div>
  </div>
);

const TagsField = ({ label, items, className = "" }: TagsFieldProps) => (
  <div className={className}>
    <p className="text-muted-foreground">{label}:</p>
    <div className="flex flex-wrap gap-2 mt-2">
      {items && items.length > 0 ? (
        items.map((item, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-muted text-muted-foreground rounded text-xs"
          >
            {item}
          </span>
        ))
      ) : (
        <p className="text-foreground">None</p>
      )}
    </div>
  </div>
);

export default function CertificationModal({
  cert,
  open,
  onClose,
}: CertificationModalProps) {
  if (!cert) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogTitle className="text-2xl font-bold">{cert.title}</DialogTitle>
        <p className="text-sm text-muted-foreground mt-2">{cert.description}</p>

        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <InfoField label="Provider" value={cert.provider?.name || "N/A"} />
          <InfoField label="Cost" value={cert.cost || "N/A"} />
          <InfoField
            label="Training"
            value={
              cert.training_included
                ? "Included in cost"
                : "Not included in cost"
            }
          />
          <InfoField label="Valid for" value={cert.valid_for || "None"} />

          <TagsField
            label="Job Roles"
            items={cert.job_roles_titles || []}
            className="col-span-2"
          />

          <div className="col-span-2">
            <p className="text-muted-foreground mb-3">Requirements:</p>
            <div className="space-y-2">
              <RequirementItem
                icon={Lightbulb}
                label="Knowledge"
                value={cert.requirements_data?.knowledge}
              />
              <RequirementItem
                icon={Briefcase}
                label="Work Experience"
                value={cert.requirements_data?.work_experience}
              />
              <RequirementItem
                icon={GraduationCap}
                label="Prior Courses/Certifications"
                value={cert.requirements_data?.prior_courses_and_certifications}
              />
            </div>
          </div>

          <div className="col-span-2">
            <p className="text-muted-foreground">Domains covered:</p>
            <p className="text-foreground mt-1">
              {cert.domains_covered_titles &&
              cert.domains_covered_titles.length > 0
                ? cert.domains_covered_titles.join(", ")
                : "None"}
            </p>
          </div>

          <InfoField
            label="Exam Attempts"
            value={`${cert.number_of_attempts} Attempts`}
          />
          <InfoField
            label="Exam Format"
            value={cert.exam_details_data?.format || "None"}
          />
          <InfoField
            label="Exam Duration"
            value={cert.exam_details_data?.duration || "None"}
          />
          <InfoField
            label="Exam Report"
            value={
              cert.exam_details_data?.report_required
                ? "Required"
                : "Not Required"
            }
            valueClassName={
              cert.exam_details_data?.report_required
                ? "text-destructive font-semibold"
                : ""
            }
          />
          <InfoField label="Skill Level" value={cert.skill_level} />
          <InfoField label="Total Votes" value={cert.total_votes} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
