import { Certification } from "./types";

export const certifications: Certification[] = [
  {
    id: 1,
    slug: "ceh",
    title: "Certified Ethical Hacker",
    abbreviation: "CEH",
    description: "EC-Council CEH course...",
    image: "/ceh.png",
    url: "https://eccouncil.org",
    cost: "$1199",
    training_included: true,
    number_of_attempts: 1,
    job_roles_titles: ["Penetration Tester", "Red Team"],
    cert_type: "red",
    total_votes: 320,
    market_presence: 0.8,
    cost_effectiveness: 3.8,
    skill_level: "Intermediate",
    quality: 4,
    satisfaction: 3.5,
    provider: {
      name: "EC-Council",
      url: "https://eccouncil.org",
      image: "/ec.png",
    },
    domains_covered_titles: ["Web", "Network"],
    requirements_data: {
      knowledge: "Basic security knowledge",
      work_experience: "0–1 years",
      prior_courses_and_certifications: "None",
    },
    exam_details_data: {
      format: "MCQ",
      duration: "4 hours",
      report_required: false,
    },
    valid_for: "3 years",
  },
];
