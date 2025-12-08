"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Certification } from "@/lib/types";
import { Lightbulb, Briefcase, GraduationCap } from "lucide-react";

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
          {/* Provider */}
          <div>
            <p className="text-muted-foreground">Provider:</p>
            <p className="text-foreground">{cert.provider?.name || "N/A"}</p>
          </div>

          {/* Cost */}
          <div>
            <p className="text-muted-foreground">Cost:</p>
            <p className="text-foreground">{cert.cost || "N/A"}</p>
          </div>

          {/* Training */}
          <div>
            <p className="text-muted-foreground">Training:</p>
            <p className="text-foreground">
              {cert.training_included
                ? "Included in cost"
                : "Not included in cost"}
            </p>
          </div>

          {/* Valid for */}
          <div>
            <p className="text-muted-foreground">Valid for:</p>
            <p className="text-foreground">{cert.valid_for || "None"}</p>
          </div>

          {/* Job Roles */}
          <div className="col-span-2">
            <p className="text-muted-foreground">Job Roles:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {cert.job_roles_titles && cert.job_roles_titles.length > 0 ? (
                cert.job_roles_titles.map((role, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded text-xs"
                  >
                    {role}
                  </span>
                ))
              ) : (
                <p className="text-foreground">None</p>
              )}
            </div>
          </div>

          {/* Requirements */}
          <div className="col-span-2">
            <p className="text-muted-foreground mb-3">Requirements:</p>
            <div className="space-y-2">
              <div className="flex items-start gap-3">
                <Lightbulb className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">Knowledge:</p>
                  <p className="text-foreground text-sm">
                    {cert.requirements_data?.knowledge || "None"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Briefcase className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Work Experience:
                  </p>
                  <p className="text-foreground text-sm">
                    {cert.requirements_data?.work_experience || "None"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GraduationCap className="h-4 w-4 text-white mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground text-xs">
                    Prior Courses/Certifications:
                  </p>
                  <p className="text-foreground text-sm">
                    {cert.requirements_data?.prior_courses_and_certifications ||
                      "None"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Domains covered */}
          <div className="col-span-2">
            <p className="text-muted-foreground">Domains covered:</p>
            <p className="text-foreground mt-1">
              {cert.domains_covered_titles &&
              cert.domains_covered_titles.length > 0
                ? cert.domains_covered_titles.join(", ")
                : "None"}
            </p>
          </div>

          {/* Exam Attempts */}
          <div>
            <p className="text-muted-foreground">Exam Attempts:</p>
            <p className="text-foreground">
              {cert.number_of_attempts} Attempts
            </p>
          </div>

          {/* Exam Format */}
          <div>
            <p className="text-muted-foreground">Exam Format:</p>
            <p className="text-foreground">
              {cert.exam_details_data?.format || "None"}
            </p>
          </div>

          {/* Exam Duration */}
          <div>
            <p className="text-muted-foreground">Exam Duration:</p>
            <p className="text-foreground">
              {cert.exam_details_data?.duration || "None"}
            </p>
          </div>

          {/* Exam Report */}
          <div>
            <p className="text-muted-foreground">Exam Report:</p>
            <p
              className={
                cert.exam_details_data?.report_required
                  ? "text-destructive font-semibold"
                  : "text-foreground"
              }
            >
              {cert.exam_details_data?.report_required
                ? "Required"
                : "Not Required"}
            </p>
          </div>

          {/* Skill Level */}
          <div>
            <p className="text-muted-foreground">Skill Level:</p>
            <p className="text-foreground">{cert.skill_level}</p>
          </div>

          {/* Total Votes */}
          <div>
            <p className="text-muted-foreground">Total Votes:</p>
            <p className="text-foreground">{cert.total_votes}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
