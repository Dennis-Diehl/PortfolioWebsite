export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  techStack: string[];
  features: string[];
  /** 2–3 concrete things learned while building this project. */
  learnings: string[];
  keywords: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const PROJECTS: readonly Project[] = [
  {
    id: "ai-newsletter-agent",
    title: "AI Newsletter Agent",
    shortDescription:
      "Agentic workflow that researches, scores, and summarizes the week's most relevant AI industry news and delivers a structured report straight to your inbox.",
    longDescription:
      "An autonomous market intelligence agent that researches, scores, and summarizes the week's most " +
      "relevant AI industry news, then delivers a structured newsletter straight to your inbox. I built " +
      "this project to get hands-on with how agentic, multi-step workflows are actually designed and " +
      "orchestrated in practice.",
    image: "/images/projects/NewsletterAgentIMG.png",
    techStack: ["Python", "LangGraph", "Streamlit"],
    learnings: [
      "Designing and orchestrating a multi-step agentic pipeline with LangGraph",
      "How much prompt design affects output quality and reliability, including relevance scoring, citation constraints, and avoiding hallucinations",
      "Practical web scraping techniques (Trafilatura + stealth Playwright) and iterating toward an architecture that actually works end-to-end",
    ],
    features: [
      "Five-node LangGraph pipeline: Research → Scraper → Summarizer → Writer → Publisher",
      "Hybrid scraping strategy with Trafilatura and stealth Playwright fallback",
      "Paywall and bot-detection bypass via playwright-stealth",
      "A two-step scoring pipeline that scores relevance before summarization",
      "Staleness detection for breaking news older than 14 days",
      "Source-only citation enforcement to prevent LLM hallucinations",
      "HTML newsletter with executive summary and detailed company reports",
      "In-memory PDF generation via headless Chromium",
      "Gmail SMTP delivery with retry logic and exponential backoff",
      "Streamlit UI and headless entry point via main.py",
    ],
    keywords: ["agent", "langgraph", "llm", "gemini", "scraping", "newsletter", "automation", "ai"],
    githubUrl: "https://github.com/Dennis-Diehl/ai-newsletter-agent",
  },
  {
    id: "smart-document-agent",
    title: "Smart Document Agent",
    shortDescription:
      "Ask questions about your PDF documents and get precise answers with source references, powered by LangChain, ChromaDB and Llama 3.3.",
    longDescription:
      "A local RAG (Retrieval-Augmented Generation) application that lets you upload PDF documents and " +
      "ask questions about them via a chat interface, with every answer backed by its exact source. I " +
      "built this project primarily to understand how RAG works end-to-end, from chunking and " +
      "embeddings to retrieval and grounded generation.",
    image: "/images/projects/SmartDocumentAgentIMG.png",
    techStack: ["Python", "LangChain", "ChromaDB", "Streamlit"],
    learnings: [
      "A clear, under-the-hood picture of how RAG actually works, covering chunking, embeddings, and retrieval",
      "Building the pipeline manually instead of using a high-level RetrievalQA abstraction forced a step-by-step understanding of each stage rather than treating it as a black box",
    ],
    features: [
      "PDF upload with automatic duplicate detection",
      "Three retrieval strategies: Similarity, MMR, and Multi-Query",
      "Dual LLM support via Llama 3.3 through Groq and OpenRouter, switchable at runtime",
      "Source attribution, with every answer showing the originating page and text excerpt",
      "A persistent vector store, so embeddings survive app restarts",
      "Manual RAG pipeline without high-level abstractions for full transparency",
    ],
    keywords: ["rag", "langchain", "chromadb", "llama", "pdf", "embeddings", "chatbot", "ai"],
    githubUrl: "https://github.com/Dennis-Diehl/smart-document-agent",
    liveUrl: "https://smart-document-agent.streamlit.app/",
  },
  {
    id: "ai-model-budget-router",
    title: "AI Model Budget Router",
    shortDescription:
      "Smart LLM routing system that selects the optimal AI model based on budget constraints, task type, and quality requirements.",
    longDescription:
      "A full-stack application that intelligently routes AI prompts to the most cost-effective LLM for " +
      "the job, balancing budget, task type, and quality requirements instead of always reaching for the " +
      "most expensive model. I built this to explore how a full-stack service reasons about cost, " +
      "quality, and task type together.",
    image: "/images/projects/BudgetRouterIMG.png",
    techStack: ["Python", "FastAPI", "Streamlit"],
    learnings: [
      "How to estimate and verify LLM costs before and after each API call, rather than just reacting to a bill afterwards",
      "How to score and select between multiple models based on task type, quality tier, and budget, not just always picking the strongest model",
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
      "Interactive API docs via auto-generated Swagger UI at /docs",
    ],
    keywords: ["routing", "fastapi", "llm", "groq", "cost", "budget", "api", "ai"],
    githubUrl: "https://github.com/Dennis-Diehl/ai-model-api-budget-router",
    liveUrl: "https://ai-api-budget-router.streamlit.app/",
  },
  {
    id: "online-marketplace",
    title: "Online Marketplace",
    shortDescription:
      "A full-stack marketplace web app where users can buy and sell products, built as a university database project.",
    longDescription:
      "A full-stack marketplace web app where buyers and sellers can list, browse, and manage products, " +
      "built as a university database systems project together with a small team. It was my first real " +
      "exposure to how a frontend and backend actually work together in a live application, and what it " +
      "takes to coordinate, communicate and plan within a small team.",
    image: "/images/projects/MarketplaceIMG.png",
    techStack: ["Python", "Flask", "MySQL", "HTML", "CSS", "JavaScript"],
    learnings: [
      "How a full-stack application's frontend and backend actually work together end-to-end, beyond just theory",
      "What it takes to coordinate, communicate, and plan effectively within a small team building shared software",
      "Structuring and reasoning about a normalized relational schema as a team, rather than solo",
    ],
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
    keywords: ["flask", "mysql", "fullstack", "database", "ecommerce", "webapp"],
    githubUrl: "https://github.com/Dennis-Diehl/online-marketplace",
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    shortDescription:
      "An interactive portfolio styled as a VS Code-like IDE, built with Next.js, React and Tailwind CSS.",
    longDescription:
      "My portfolio reimagined as a code editor. Projects and education live as files in a navigable " +
      "explorer and open as draggable tabs, with full-text search and theming built in. Since this is " +
      "just my portfolio site, the real goal here was hands-on practice with frontend development, " +
      "getting properly comfortable with React, Next.js and TypeScript.",
    image: "/images/projects/PortfolioIMG.png",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    learnings: [
      "Structuring a non-trivial React + TypeScript application end-to-end, from routing to shared state",
      "Working hands-on with the Next.js App Router and its static-generation model",
    ],
    features: [
      "VS Code-style explorer with collapsible folders",
      "Draggable editor tabs via @dnd-kit with full keyboard support",
      "Client-side full-text search with highlighted snippets",
      "Light/dark/system theme via next-themes",
      "Fully statically generated, deep-linkable file routes",
    ],
    keywords: ["nextjs", "react", "typescript", "tailwind", "ide", "portfolio", "frontend"],
    githubUrl: "https://github.com/Dennis-Diehl/PortfolioWebsite",
    liveUrl: "https://dennisd-portfolio.vercel.app/",
  },
];

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}
