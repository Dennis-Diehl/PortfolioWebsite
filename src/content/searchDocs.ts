import { ALL_FILES, type FileNode } from "./registry";
import { PROJECTS } from "./projects";
import { EDUCATION } from "./education";
import { TECH_STACK } from "./techStack";
import { ABOUT_BIO } from "./about";
import { SOCIAL_LINKS } from "./socialLinks";

export interface SearchDoc {
  path: string;
  fileName: string;
  title: string;
  keywords: string[];
  /** Flattened plain-text body used for full-text matching and snippets. */
  body: string;
}

/** Extracts the searchable plain-text body for a single file. */
function extractBody(file: FileNode): string {
  switch (file.kind) {
    case "readme":
      return [
        ...ABOUT_BIO.paragraphs,
        ...ABOUT_BIO.highlights.flatMap((h) => [h.title, ...(h.subItems ?? [])]),
      ].join(" ");
    case "markdown":
      if (file.path === "contact") {
        return SOCIAL_LINKS.map((l) => `${l.label} ${l.handle}`).join(" ");
      }
      return "";
    case "skills":
      return TECH_STACK.map((t) => t.name).join(", ");
    case "project": {
      const p = PROJECTS.find((x) => x.id === file.refId);
      if (!p) return "";
      return [
        p.shortDescription,
        p.longDescription,
        ...p.features,
        ...p.learnings,
        p.techStack.join(", "),
      ].join(" ");
    }
    case "education": {
      const e = EDUCATION.find((x) => x.id === file.refId);
      if (!e) return "";
      return [
        `${e.degree} ${e.field}`,
        e.university,
        e.thesisTopic,
        e.description,
      ].join(" ");
    }
    default:
      return "";
  }
}

/** Builds the full set of search documents from the registry. */
export function buildSearchDocs(): SearchDoc[] {
  return ALL_FILES.map((file) => ({
    path: file.path,
    fileName: file.fileName,
    title: file.title,
    keywords: file.keywords,
    body: extractBody(file).replace(/\s+/g, " ").trim(),
  }));
}
