/**
 * Maps a project's dominant programming language to a file extension so the
 * explorer can show e.g. `smart-document-agent.py` instead of a generic `.md`.
 */

/** Known languages → extension. Order of `techStack` decides which one wins. */
export const LANGUAGE_EXT: Record<string, string> = {
  Python: "py",
  TypeScript: "ts",
  JavaScript: "js",
  Java: "java",
  "C++": "cpp",
  "C#": "cs",
  C: "c",
  Scala: "scala",
  Go: "go",
  Rust: "rs",
  Ruby: "rb",
  PHP: "php",
  Swift: "swift",
  Kotlin: "kt",
  HTML: "html",
  CSS: "css",
};

/** Extension → human-readable language label (used in the status bar). */
export const EXT_LABEL: Record<string, string> = {
  py: "Python",
  ts: "TypeScript",
  tsx: "TypeScript",
  js: "JavaScript",
  jsx: "JavaScript",
  java: "Java",
  cpp: "C++",
  cs: "C#",
  c: "C",
  scala: "Scala",
  go: "Go",
  rs: "Rust",
  rb: "Ruby",
  php: "PHP",
  swift: "Swift",
  kt: "Kotlin",
  html: "HTML",
  css: "CSS",
  json: "JSON",
  md: "Markdown",
};

/** Icon tint per extension, echoing VS Code's file-icon colors. */
export const EXT_COLOR: Record<string, string> = {
  py: "#3572A5",
  ts: "#519aba",
  js: "#cbcb41",
  java: "#b07219",
  cpp: "#f34b7d",
  cs: "#8a4182",
  scala: "#c22d40",
  go: "#00add8",
  rs: "#dea584",
};

/** Picks the extension for a project from the first recognized language. */
export function primaryLanguageExt(techStack: readonly string[]): string {
  for (const tech of techStack) {
    if (LANGUAGE_EXT[tech]) return LANGUAGE_EXT[tech];
  }
  return "md";
}

/** Returns the extension part of a file name (without the dot). */
export function fileExt(fileName: string): string {
  const idx = fileName.lastIndexOf(".");
  return idx === -1 ? "" : fileName.slice(idx + 1);
}
