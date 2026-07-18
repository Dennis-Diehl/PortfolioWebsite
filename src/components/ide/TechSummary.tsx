import { OpenInEditorLink } from "./OpenInEditorLink";

/**
 * Compact, centered showcase of the core stack in the skillicons.dev style —
 * exactly 10 icons, wrapping into two rows. This is intentionally just an
 * excerpt; the full list lives in skills.json.
 */
const SKILLICONS = "https://skillicons.dev/icons?i=";

interface Tile {
  slug: string;
  /** Hover/alt text — kept as the general concept name (e.g. "SQL") even when
   * the icon itself is a specific vendor logo (skillicons has no generic SQL icon). */
  name: string;
}

const TILES: Tile[] = [
  { slug: "py", name: "Python" },
  { slug: "go", name: "Go" },
  { slug: "scala", name: "Scala" },
  { slug: "ts", name: "TypeScript" },
  { slug: "react", name: "React" },
  { slug: "tailwind", name: "Tailwind CSS" },
  { slug: "mysql", name: "SQL" },
  { slug: "docker", name: "Docker" },
  { slug: "git", name: "Git" },
  { slug: "fastapi", name: "FastAPI" },
];

export function TechSummary() {
  return (
    <section className="mb-10" aria-labelledby="tech-summary-heading">
      <h2 id="tech-summary-heading" className="mb-1 text-2xl font-bold text-editor-fg">
        Tech Stack
      </h2>
      <p className="mb-4 text-sm text-muted">
        Just an excerpt of my core stack. The full list lives in{" "}
        <OpenInEditorLink path="skills" className="hover:underline">
          skills.json
        </OpenInEditorLink>
        .
      </p>
      <ul className="mx-auto flex max-w-[320px] flex-wrap justify-center gap-3">
        {TILES.map((tile) => (
          <li key={tile.name}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${SKILLICONS}${tile.slug}`}
              alt={tile.name}
              title={tile.name}
              width={48}
              height={48}
              className="h-12 w-12"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
