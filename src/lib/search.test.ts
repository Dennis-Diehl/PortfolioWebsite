import { describe, it, expect } from "vitest";
import { search, highlight, makeSnippet } from "./search";
import type { SearchDoc } from "@/content/searchDocs";

const docs: SearchDoc[] = [
  {
    path: "projects/ai-newsletter-agent",
    fileName: "ai-newsletter-agent.md",
    title: "AI Newsletter Agent",
    keywords: ["langgraph", "agent", "llm"],
    body: "An autonomous agent built with LangGraph that scrapes and summarizes AI news.",
  },
  {
    path: "skills",
    fileName: "skills.json",
    title: "Tech Stack",
    keywords: ["python", "react", "typescript"],
    body: "Python, React, TypeScript, FastAPI, Flask",
  },
];

describe("search", () => {
  it("ranks a filename match above a body-only match", () => {
    const results = search(docs, "agent");
    expect(results[0].doc.path).toBe("projects/ai-newsletter-agent");
  });

  it("matches on keywords", () => {
    const results = search(docs, "langgraph");
    expect(results.map((r) => r.doc.path)).toContain("projects/ai-newsletter-agent");
  });

  it("requires all tokens to match (AND semantics)", () => {
    const results = search(docs, "python langgraph");
    expect(results).toHaveLength(0);
  });

  it("is case-insensitive", () => {
    expect(search(docs, "REACT").map((r) => r.doc.path)).toContain("skills");
  });

  it("returns every doc for an empty query", () => {
    expect(search(docs, "   ")).toHaveLength(docs.length);
  });
});

describe("highlight", () => {
  it("splits matched tokens into highlighted parts", () => {
    const parts = highlight("Python and React", ["react"]);
    const marked = parts.filter((p) => p.highlight).map((p) => p.text);
    expect(marked).toEqual(["React"]);
  });

  it("returns a single unhighlighted part when nothing matches", () => {
    const parts = highlight("nothing here", ["xyz"]);
    expect(parts).toEqual([{ text: "nothing here", highlight: false }]);
  });
});

describe("makeSnippet", () => {
  it("centers the snippet on the first match and marks it", () => {
    const body = "a".repeat(200) + " LangGraph " + "b".repeat(200);
    const parts = makeSnippet(body, ["langgraph"], 20);
    expect(parts.some((p) => p.highlight && /langgraph/i.test(p.text))).toBe(true);
    expect(parts[0].text.startsWith("…")).toBe(true);
  });
});
