export type Certification = {
    id: number;
    slug: string;
    title: string;
    abbreviation: string;
    description: string;
    image: string;
    url: string;
    cost: string;
    training_included: boolean;
    number_of_attempts: number;
    job_roles_titles: string[];
    cert_type: "blue" | "red" | "infoSec";
    total_votes: number;
    market_presence: number;
    cost_effectiveness: number;
    skill_level: "Novice" | "Beginner" | "Intermediate" | "Advanced" | "Expert";
    quality: number;
    satisfaction: number;
    provider: {
      name: string;
      url: string;
      image: string;
    } | null;
    domains_covered_titles: string[];
    requirements_data: {
      knowledge: string;
      work_experience: string;
      prior_courses_and_certifications: string;
    };
    exam_details_data: {
      format: string;
      duration: string | null;
      report_required: boolean;
    };
    valid_for: string | null;
  };
  