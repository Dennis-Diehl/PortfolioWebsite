"use client";

import { Fragment, useState } from "react";
import { Copy, Check } from "lucide-react";
import { PROJECT_FILES, EDUCATION_FILES } from "@/content/registry";

type TreeLine = [path: string, comment?: string];

/**
 * Builds the portfolio's own virtual file tree (the same one shown in the
 * Explorer) as a GitHub-README-style "Project Structure" block — computed
 * from the real registry data so it never drifts out of sync.
 */
function buildTreeLines(): TreeLine[] {
  const lines: TreeLine[] = [
    [".", undefined],
    ["├── README.md", "Landing page: bio, tech stack, featured projects"],
    ["├── projects/", undefined],
  ];

  PROJECT_FILES.forEach((file, i) => {
    const branch = i === PROJECT_FILES.length - 1 ? "└──" : "├──";
    lines.push([`│   ${branch} ${file.fileName}`, file.title]);
  });

  lines.push(["├── education/", undefined]);
  EDUCATION_FILES.forEach((file, i) => {
    const branch = i === EDUCATION_FILES.length - 1 ? "└──" : "├──";
    lines.push([`│   ${branch} ${file.fileName}`, file.title]);
  });

  lines.push(
    ["├── skills.json", "Full tech stack"],
    ["└── contact.md", "GitHub & LinkedIn"],
  );

  return lines;
}

const TREE_LINES = buildTreeLines();
const TREE_TEXT = TREE_LINES.map(([path, comment]) =>
  comment ? `${path}  # ${comment}` : path,
).join("\n");

/** Shown in the editor pane when every tab has been closed. */
export function EmptyEditorState() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(TREE_TEXT);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently.
    }
  }

  return (
    <div className="flex h-full items-center justify-center overflow-y-auto p-6">
      <div className="w-full max-w-2xl">
        <h2 className="mb-3 border-b border-border pb-3 text-lg font-bold text-editor-fg">
          Project Structure
        </h2>

        <div className="relative rounded-lg border border-border bg-tab-bg p-5">
          <button
            type="button"
            onClick={copy}
            aria-label="Copy project structure"
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded text-muted transition-colors hover:bg-hover hover:text-editor-fg"
          >
            {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
          </button>

          <div className="grid grid-cols-[max-content_1fr] gap-x-6 gap-y-1 overflow-x-auto pr-6 font-mono text-xs sm:text-sm">
            {TREE_LINES.map(([path, comment], i) => (
              <Fragment key={i}>
                <span className="whitespace-pre text-editor-fg">{path}</span>
                <span className="whitespace-pre" style={{ color: "var(--syntax-comment)" }}>
                  {comment ? `# ${comment}` : ""}
                </span>
              </Fragment>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          No file open. Pick one from the Explorer.
        </p>
      </div>
    </div>
  );
}
