import { GraduationCap, Building2, ScrollText } from "lucide-react";
import type { Education } from "@/content/education";

export function EducationView({ education }: { education: Education }) {
  const thesis = education.thesisTopic.trim() || "To be announced";

  return (
    <article className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs text-muted"># {education.id}</p>
        <h1 className="mb-3 flex items-center gap-3 text-3xl font-bold text-editor-fg md:text-4xl">
          <GraduationCap className="shrink-0 text-editor-fg" aria-hidden />
          {education.degree} {education.field}
        </h1>
        <p className="flex items-center gap-2 text-lg text-muted">
          <Building2 size={18} aria-hidden />
          {education.university}
        </p>
      </header>

      <section className="rounded-lg border border-border bg-tab-bg p-5">
        <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted">
          <ScrollText size={16} aria-hidden />
          Thesis Topic
        </h2>
        <p className="mb-4 text-lg font-medium text-editor-fg">{thesis}</p>
        <p className="leading-relaxed text-muted">{education.description}</p>
      </section>
    </article>
  );
}
