import type { ReactNode } from "react";
import { TECH_STACK, type TechStackItem } from "@/content/techStack";

const CATEGORY_ORDER: TechStackItem["category"][] = ["language", "framework", "tool"];
const CATEGORY_KEY: Record<TechStackItem["category"], string> = {
  language: "languages",
  framework: "frameworks",
  tool: "tools",
};

const punct = (t: string) => <span style={{ color: "var(--syntax-punctuation)" }}>{t}</span>;

/** Builds the JSON document as one React node per line, for the numbered gutter. */
function buildLines(): ReactNode[] {
  const lines: ReactNode[] = [];
  lines.push(punct("{"));

  CATEGORY_ORDER.forEach((cat, ci) => {
    const items = TECH_STACK.filter((t) => t.category === cat);
    lines.push(
      <>
        {"  "}
        <span style={{ color: "var(--syntax-key)" }}>&quot;{CATEGORY_KEY[cat]}&quot;</span>
        {punct(": [")}
      </>,
    );
    items.forEach((item, i) => {
      lines.push(
        <>
          {"    "}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.icon}
            alt=""
            width={16}
            height={16}
            className="mr-2 inline-block h-4 w-4 align-text-bottom"
          />
          <span style={{ color: "var(--syntax-string)" }}>&quot;{item.name}&quot;</span>
          {i < items.length - 1 ? punct(",") : null}
        </>,
      );
    });
    lines.push(
      <>
        {"  "}
        {punct(ci < CATEGORY_ORDER.length - 1 ? "]," : "]")}
      </>,
    );
  });

  lines.push(punct("}"));
  return lines;
}

/** Renders the tech stack as a syntax-highlighted JSON document with line numbers. */
export function SkillsView() {
  const lines = buildLines();

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <h1 className="sr-only">Tech Stack</h1>
      <div className="overflow-x-auto rounded-lg border border-border bg-tab-bg font-mono text-sm leading-7">
        <ol className="min-w-max py-3">
          {lines.map((line, i) => (
            <li key={i} className="flex hover:bg-hover/50">
              <span
                aria-hidden
                className="w-12 shrink-0 select-none border-r border-border pr-3 text-right text-muted"
              >
                {i + 1}
              </span>
              <span className="whitespace-pre pl-4 pr-6">{line}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
