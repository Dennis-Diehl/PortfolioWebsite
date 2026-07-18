import type { SearchDoc } from "@/content/searchDocs";

export interface SearchResult {
  doc: SearchDoc;
  score: number;
  /** A snippet around the first body match, or the start of the body. */
  snippet: SnippetPart[];
}

export interface SnippetPart {
  text: string;
  highlight: boolean;
}

const WEIGHT = { fileName: 8, keyword: 5, title: 3, body: 1 };

/** Splits a text into highlighted / non-highlighted parts for all query tokens. */
export function highlight(text: string, tokens: string[]): SnippetPart[] {
  if (tokens.length === 0 || !text) return [{ text, highlight: false }];
  const escaped = tokens
    .filter(Boolean)
    .map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  if (!escaped) return [{ text, highlight: false }];
  const regex = new RegExp(`(${escaped})`, "gi");
  const lowerTokens = tokens.map((t) => t.toLowerCase());
  return text
    .split(regex)
    .filter((p) => p !== "")
    .map((p) => ({ text: p, highlight: lowerTokens.includes(p.toLowerCase()) }));
}

/** Builds a ±radius snippet around the first matching token in the body. */
export function makeSnippet(body: string, tokens: string[], radius = 60): SnippetPart[] {
  if (!body) return [];
  const lower = body.toLowerCase();
  let matchIndex = -1;
  let matchLen = 0;
  for (const token of tokens) {
    const i = lower.indexOf(token);
    if (i !== -1 && (matchIndex === -1 || i < matchIndex)) {
      matchIndex = i;
      matchLen = token.length;
    }
  }

  if (matchIndex === -1) {
    const head = body.slice(0, radius * 2);
    return [{ text: head + (body.length > radius * 2 ? "…" : ""), highlight: false }];
  }

  const start = Math.max(0, matchIndex - radius);
  const end = Math.min(body.length, matchIndex + matchLen + radius);
  const prefix = start > 0 ? "…" : "";
  const suffix = end < body.length ? "…" : "";
  const slice = body.slice(start, end);
  const parts = highlight(slice, tokens);
  return [
    ...(prefix ? [{ text: prefix, highlight: false }] : []),
    ...parts,
    ...(suffix ? [{ text: suffix, highlight: false }] : []),
  ];
}

export function search(docs: SearchDoc[], query: string): SearchResult[] {
  const tokens = query
    .toLowerCase()
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);

  if (tokens.length === 0) {
    // Empty query: list every file in registry order.
    return docs.map((doc) => ({ doc, score: 0, snippet: makeSnippet(doc.body, []) }));
  }

  const results: SearchResult[] = [];
  for (const doc of docs) {
    const fileName = doc.fileName.toLowerCase();
    const title = doc.title.toLowerCase();
    const keywords = doc.keywords.map((k) => k.toLowerCase());
    const body = doc.body.toLowerCase();

    let score = 0;
    let matchedAll = true;

    for (const token of tokens) {
      let tokenScore = 0;
      if (fileName.includes(token)) tokenScore += WEIGHT.fileName;
      if (keywords.some((k) => k.includes(token))) tokenScore += WEIGHT.keyword;
      if (title.includes(token)) tokenScore += WEIGHT.title;
      if (body.includes(token)) tokenScore += WEIGHT.body;
      if (tokenScore === 0) matchedAll = false;
      score += tokenScore;
    }

    if (matchedAll && score > 0) {
      results.push({ doc, score, snippet: makeSnippet(doc.body, tokens) });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}
