import PortfolioIMG from "../assets/images/project_images/PortfolioIMG.png";
import BudgetRouterIMG from "../assets/images/project_images/BudgetRouterIMG.png";
import MarketplaceIMG from "../assets/images/project_images/MarketplaceIMG.png";
import SmartDocumentAgentIMG from "../assets/images/project_images/SmartDocumentAgentIMG.png";

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
    id: "smart-document-agent",
    title: "Smart Document Agent",                                                                                                                                      
    shortDescription:
      "Ask questions about your PDF documents and get precise answers with source references — powered by LangChain, ChromaDB and Llama 3.3.",                          
    longDescription:                                                                                                                                                  
      "A local RAG (Retrieval-Augmented Generation) application that lets you upload one or multiple " +
      "PDF documents and query them via a chat interface. Built with a fully manual LangChain pipeline — " +
      "from document loading and chunking to embedding, vector retrieval and LLM inference — without " +
      "high-level abstractions, for maximum transparency and control. Answers include the exact source " +
      "chunks (page number and text excerpt) they were derived from.",
    image: SmartDocumentAgentIMG,
    techStack: [
      "Python",
      "LangChain",
      "ChromaDB",
      "Streamlit",
    ],
    features: [
      "PDF upload with automatic duplicate detection",
      "Three retrieval strategies: Similarity, MMR, and Multi-Query",
      "Dual LLM support: Llama 3.3 via Groq and OpenRouter — switchable at runtime",
      "Source attribution: every answer shows the originating page and text excerpt",
      "Persistent vector store — embeddings survive app restarts",
      "Manual RAG pipeline without high-level abstractions for full transparency",
    ],
    githubUrl: "https://github.com/Dennis-Diehl/smart-document-agent",
    liveUrl: "https://smart-document-agent.streamlit.app/",
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
    liveUrl: "https://ai-api-budget-router.streamlit.app/",
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
];
