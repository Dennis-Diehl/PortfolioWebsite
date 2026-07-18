export interface AboutHighlight {
  emoji: string;
  title: string;
  subItems?: string[];
}

export const ABOUT_BIO = {
  // Original bio, shown at the top of the README (About page was merged in).
  paragraphs: [
    "I am a final-year computer science student at JGU Mainz, completing my Bachelor of Science in " +
      "Computer Science. I will start a Master's degree focused on Artificial Intelligence and Data " +
      "Science in Winter 2026.",
    "Here's where my interest is currently focused:",
  ],
  // Ordered by priority — GenAI/LLMs first, full-stack AI apps last as a
  // longer-term direction rather than the main focus.
  highlights: [
    {
      emoji: "🧠",
      title:
        "Building applications with Generative AI and LLMs, from APIs and prompt design to application-level integration",
    },
    {
      emoji: "🔗",
      title:
        "Building agentic workflows that orchestrate multi-step, tool-using AI agents rather than single-shot prompts",
    },
    {
      emoji: "🏗️",
      title:
        "Exploring AI platform engineering, the infrastructure side of making AI systems reliable, observable and easy to deploy at scale",
    },
    {
      emoji: "🔁",
      title: "Building automation workflows with tools like n8n to connect AI into real processes",
    },
    {
      emoji: "💻",
      title: "Longer-term, I'd like to bring all of this together into full-stack AI applications:",
      subItems: [
        "Frontend: React, Next.js, Tailwind CSS",
        "Backend: FastAPI and Go for AI-powered services",
        "Database: PostgreSQL and ChromaDB",
        "DevOps: Docker and Kubernetes, ideally on a cloud platform like Azure or AWS",
      ],
    },
  ] satisfies AboutHighlight[],
  // Phrases cycled through the hero typing animation.
  typingPhrases: [
    "Bachelor of Science Computer Science",
    "Master of Science Artificial Intelligence and Data Science",
  ],
} as const;
