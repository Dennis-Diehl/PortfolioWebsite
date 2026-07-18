export interface Education {
  id: string;
  degree: string;
  field: string;
  university: string;
  /** Thesis title; empty string renders a "To be announced" placeholder. */
  thesisTopic: string;
  /** Short description of the thesis work. */
  description: string;
  keywords: string[];
}

export const EDUCATION: readonly Education[] = [
  {
    id: "bsc-computer-science",
    degree: "Bachelor of Science",
    field: "Computer Science",
    university: "Johannes Gutenberg University Mainz",
    thesisTopic: "",
    description:
      "Bachelor's thesis details will be added once the topic is finalized. This section will " +
      "describe the thesis work, its goals and the technologies involved.",
    keywords: ["bachelor", "computer science", "jgu", "mainz", "university", "thesis"],
  },
  {
    id: "msc-ai-data-science",
    degree: "Master of Science",
    field: "Artificial Intelligence and Data Science",
    university: "University of Stuttgart",
    thesisTopic: "",
    description:
      "Master's thesis details will be added once the topic is defined. This section will describe " +
      "the thesis work in Artificial Intelligence and Data Science, its research question and approach.",
    keywords: ["master", "ai", "data science", "machine learning", "stuttgart", "university", "thesis"],
  },
];

export function getEducation(id: string): Education | undefined {
  return EDUCATION.find((e) => e.id === id);
}
