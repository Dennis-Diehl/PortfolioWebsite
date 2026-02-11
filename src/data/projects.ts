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
];
