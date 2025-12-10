import { Lightbulb, Briefcase, GraduationCap } from "lucide-react";
import RequirementItem from "./RequirementItem";

interface RequirementsSectionProps {
  knowledge?: string;
  workExperience?: string;
  priorCourses?: string;
}

export default function RequirementsSection({
  knowledge,
  workExperience,
  priorCourses,
}: RequirementsSectionProps) {
  return (
    <div className="col-span-2">
      <p className="text-muted-foreground mb-3">Requirements:</p>
      <div className="space-y-2">
        <RequirementItem icon={Lightbulb} label="Knowledge" value={knowledge} />
        <RequirementItem
          icon={Briefcase}
          label="Work Experience"
          value={workExperience}
        />
        <RequirementItem
          icon={GraduationCap}
          label="Prior Courses/Certifications"
          value={priorCourses}
        />
      </div>
    </div>
  );
}
