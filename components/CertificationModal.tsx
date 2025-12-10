"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Certification } from "@/lib/types";
import InfoField from "./certification/InfoField";
import TagsField from "./certification/TagsField";
import RequirementsSection from "./certification/RequirementsSection";
import DomainsField from "./certification/DomainsField";

interface CertificationModalProps {
  cert: Certification | null;
  open: boolean;
  onClose: (open: boolean) => void;
}

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

          <RequirementsSection
            knowledge={cert.requirements_data?.knowledge}
            workExperience={cert.requirements_data?.work_experience}
            priorCourses={
              cert.requirements_data?.prior_courses_and_certifications
            }
          />

          <DomainsField domains={cert.domains_covered_titles || []} />

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
