import { PROJECTS } from "./projects";
import { EDUCATION } from "./education";
import { primaryLanguageExt } from "@/lib/languages";

/**
 * Virtual file system that backs the IDE. Every "file" the user can open in the
 * editor is described here once and reused by the explorer tree, the router
 * (generateStaticParams / metadata) and the search index builder.
 */

export type FileKind = "markdown" | "project" | "education" | "skills" | "readme";

export interface FileNode {
  /** URL path relative to root, e.g. "projects/ai-newsletter-agent". "" is the README root. */
  path: string;
  /** Display name shown in the explorer and tabs, e.g. "ai-newsletter-agent.md". */
  fileName: string;
  /** Human-readable title used for metadata and search. */
  title: string;
  /** File extension bucket, drives which editor view renders it. */
  kind: FileKind;
  /** Reference to the underlying content record's id (project/education id). */
  refId?: string;
  /** Extra search keywords. */
  keywords: string[];
}

export interface TreeFolder {
  type: "folder";
  name: string;
  /** Path segment, e.g. "projects". */
  segment: string;
  children: TreeNode[];
}

export interface TreeFile {
  type: "file";
  node: FileNode;
}

export type TreeNode = TreeFolder | TreeFile;

const README: FileNode = {
  path: "",
  fileName: "README.md",
  title: "Dennis Diehl Portfolio",
  kind: "readme",
  keywords: ["home", "readme", "welcome", "dennis", "diehl", "portfolio", "about"],
};

const SKILLS: FileNode = {
  path: "skills",
  fileName: "skills.json",
  title: "Tech Stack",
  kind: "skills",
  keywords: ["skills", "tech", "stack", "languages", "frameworks", "tools", "technologies"],
};

const CONTACT: FileNode = {
  path: "contact",
  fileName: "contact.md",
  title: "Contact",
  kind: "markdown",
  keywords: ["contact", "github", "linkedin", "email", "reach", "connect", "social"],
};

export const PROJECT_FILES: FileNode[] = PROJECTS.map((p) => ({
  path: `projects/${p.id}`,
  // Extension reflects the project's dominant language (e.g. .py, .ts).
  fileName: `${p.id}.${primaryLanguageExt(p.techStack)}`,
  title: p.title,
  kind: "project",
  refId: p.id,
  keywords: [...p.keywords, ...p.techStack.map((t) => t.toLowerCase())],
}));

export const EDUCATION_FILES: FileNode[] = EDUCATION.map((e) => ({
  path: `education/${e.id}`,
  fileName: `${e.id}.md`,
  title: `${e.degree} ${e.field}`,
  kind: "education",
  refId: e.id,
  keywords: e.keywords,
}));

/** Flat list of every file, in explorer order. */
export const ALL_FILES: readonly FileNode[] = [
  README,
  ...PROJECT_FILES,
  ...EDUCATION_FILES,
  SKILLS,
  CONTACT,
];

/** The default file opened on first visit. */
export const ROOT_FILE = README;

/** Segment name of the workspace root row in the explorer. */
export const ROOT_SEGMENT = "dennis-diehl";

/** Folders (and the workspace root) that are expanded by default in the explorer. */
export const DEFAULT_EXPANDED = [ROOT_SEGMENT, "projects"];

/** Nested tree used to render the explorer. */
export const FILE_TREE: TreeNode[] = [
  { type: "file", node: README },
  {
    type: "folder",
    name: "projects",
    segment: "projects",
    children: PROJECT_FILES.map((node) => ({ type: "file", node })),
  },
  {
    type: "folder",
    name: "education",
    segment: "education",
    children: EDUCATION_FILES.map((node) => ({ type: "file", node })),
  },
  { type: "file", node: SKILLS },
  { type: "file", node: CONTACT },
];

export function getFileByPath(path: string): FileNode | undefined {
  const normalized = path.replace(/^\/+|\/+$/g, "");
  return ALL_FILES.find((f) => f.path === normalized);
}

/** Path segments for Next.js generateStaticParams (excludes the "" root). */
export function getAllFilePaths(): string[][] {
  return ALL_FILES.filter((f) => f.path !== "").map((f) => f.path.split("/"));
}
