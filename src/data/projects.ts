import PortfolioIMG from "../assets/images/project_images/PortfolioIMG.png";
import BudgetRouterIMG from "../assets/images/project_images/BudgetRouterIMG.png";
import MarketplaceIMG from "../assets/images/project_images/MarketplaceIMG.png";

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
    id: "portfolio-website",
    title: "Portfolio Website",
    shortDescription:
      "A modern, interactive portfolio with smooth scroll-snap navigation and modern animations built in React and Tailwind CSS.",
    longDescription:
      `This portfolio website showcases my work and skills with a focus on smooth interactions and modern web technologies.
       It features a macOS dock-style navbar, scroll-snap sections, and animated tech stack marquees. 
       The contact form integrates EmailJS for direct messaging.`,
    image: PortfolioIMG,
    techStack: ["React", "TypeScript", "Tailwind CSS"],
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
    id: "ai-model-budget-router",
    title: "AI Model Budget Router",
    shortDescription: "Smart LLM routing system that selects the optimal AI model based on budget constraints, task type, and quality requirements.",
    longDescription:
      "A full-stack web application that intelligently routes AI prompts to the most cost-effective " +
      "LLM while maintaining quality standards. The system analyzes each request's task type " +
      "(code, email, summarize, general), budget constraints, and quality requirements to select " +
      "from 4 Groq-powered models ranging from LLaMA 3.3 70B to LLaMA 3.1 8B. Features content-aware " +
      "token estimation, real-time cost tracking, and a +15 scoring bonus for task-specific model " +
      "strengths. Built to solve the real-world problem of managing AI API costs for startups and developers.",
    image: BudgetRouterIMG,
    techStack: [
      "Python",
      "FastAPI",
      "Streamlit",
    ],
    features: [
      "Smart routing algorithm with quality thresholds (low/medium/high)",
      "Budget guard that prevents overspending before API calls",
      "Content-aware token estimation (detects code vs. text)",
      "Task-specific optimization (+15 bonus for model strengths)",
      "Real-time cost tracking with estimated vs. actual comparison",
      "Interactive chat UI with session state and spending tracker",
      "JSONL request logging for usage analysis",
      "Support for 4 models: LLaMA 70B, GPT-OSS 120B/20B, LLaMA 8B",
    ],
    githubUrl: "https://github.com/Dennis-Diehl/ai-model-api-budget-router",
  },
  {                                                                                                                                                                       
    id: "online-marketplace",                                                                                                                                           
    title: "Online Marketplace",                                                                                                                                          
    shortDescription:                                                                                                                                                     
      "A full-stack marketplace web app where users can buy and sell products — built as a university database project.",                                                 
    longDescription:                                                                                                                                                      
      "A Flask-based online marketplace supporting two user roles: buyers and sellers. Buyers can browse products, manage a shopping cart and wishlist, place orders" +
      "write reviews, and message sellers directly. Sellers can list and manage products, view sales statistics, and receive notifications when subscribed users engage with" +
      "their shop. The app features a self-referential category hierarchy, session-based authentication, and a normalized MariaDB schema.",
    image: MarketplaceIMG,
    techStack: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    features: [
      "Buyer & seller roles with session-based authentication",
      "Product listing, search, and category filtering",
      "Persistent shopping cart and wishlist",
      "Order management for buyers and sellers",
      "Direct messaging between users",
      "Seller subscription & new product notifications",
      "Sales and product statistics with charts",
      "Review system for purchased products",
    ],
    githubUrl: "https://github.com/Dennis-Diehl/online-marketplace",
  },
];
