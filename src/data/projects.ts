import PortfolioIMG from "../assets/images/project_images/PortfolioIMG.png";

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "project-1",
    title: "Portfolio Website",
    shortDescription:
      "A modern, interactive portfolio with smooth scroll-snap navigation and modern animations built in React and Tailwind CSS.",
    longDescription:
      `This portfolio website showcases my work and skills with a focus on smooth interactions and modern web technologies.
       It features a macOS dock-style navbar, scroll-snap sections, and animated tech stack marquees. 
       The contact form integrates EmailJS for direct messaging.`,
    image: PortfolioIMG,
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    features: [
      "Scroll-snap navigation with intersection observer",
      "macOS dock-style magnifier navbar",
      "Animated tech stack marquee",
      "EmailJS contact form integration",
    ],
    githubUrl: "https://github.com/Dennis-Diehl/PortfolioWebsite",
    liveUrl: "https://dennisd-portfolio.vercel.app/",
  },
  {
    id: "project-2",
    title: "Data Pipeline Engine",
    shortDescription:
      "A scalable data processing pipeline built with Apache Spark and Scala for real-time analytics.",
    longDescription:
      "This project implements a high-throughput data pipeline capable of processing millions of records in near real-time. It leverages Apache Spark for distributed computing and includes custom transformations, data quality checks, and automated reporting dashboards.",
    image: "https://placehold.co/600x400/1f2937/e5e7eb?text=Data+Pipeline",
    techStack: ["Scala", "Apache Spark", "SQL", "Python"],
    features: [
      "Real-time stream processing with Spark Structured Streaming",
      "Automated data quality validation",
      "Custom ETL transformations",
      "Interactive analytics dashboard",
    ],
    githubUrl: "https://github.com",
  },
  {
    id: "project-3",
    title: "Task Management App",
    shortDescription:
      "A full-stack task management application with real-time updates and collaborative features.",
    longDescription:
      "A productivity application that helps teams organize and track their work. Features include drag-and-drop task boards, real-time collaboration, priority management, and deadline tracking with notifications.",
    image: "https://placehold.co/600x400/1f2937/e5e7eb?text=Task+App",
    techStack: ["React", "TypeScript", "Tailwind CSS", "SQL"],
    features: [
      "Drag-and-drop Kanban boards",
      "Real-time collaborative editing",
      "Priority and deadline management",
      "Activity log and notifications",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
  },
];
