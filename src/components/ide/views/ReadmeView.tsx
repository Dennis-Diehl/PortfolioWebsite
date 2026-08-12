import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EDUCATION } from "@/content/education";
import { getProject } from "@/content/projects";
import { getTechIcon } from "@/content/techStack";
import { ABOUT_BIO } from "@/content/about";
import { SOCIAL_LINKS } from "@/content/socialLinks";
import { OpenInEditorLink } from "../OpenInEditorLink";
import { HeroTerminal } from "../HeroTerminal";
import { TechSummary } from "../TechSummary";

// The two most recent projects get a card on the README itself; the rest are
// one click away in the Explorer / file tree.
const RECENT_PROJECT_IDS = ["ai-newsletter-agent", "smart-document-agent"];

/**
 * The default landing view. Opens with the merged About content (bio,
 * highlights, AI-infrastructure interest), a compact tech summary, the two
 * most recent projects, and pointers into the explorer for everything else.
 */
export function ReadmeView() {
  const recentProjects = RECENT_PROJECT_IDS.map(getProject).filter(
    (p): p is NonNullable<typeof p> => Boolean(p),
  );

  return (
    <article className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <header className="mb-10 border-b border-border pb-8">
        <HeroTerminal phrases={ABOUT_BIO.typingPhrases} />

        <div className="max-w-2xl space-y-4 leading-relaxed text-editor-fg">
          {ABOUT_BIO.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}

          <ul className="space-y-2">
            {ABOUT_BIO.highlights.map((h) => (
              <li key={h.title}>
                <p>
                  <span aria-hidden className="mr-2">
                    {h.emoji}
                  </span>
                  {h.title}
                </p>
                {h.subItems && (
                  <ul className="ml-7 mt-1 list-disc space-y-0.5 text-base text-muted marker:text-muted">
                    {h.subItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOCIAL_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.id}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-tab-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-hover"
              >
                <Icon size={16} aria-hidden /> {link.label}
              </a>
            );
          })}
        </div>
      </header>

      <TechSummary />

      <section className="mb-10">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-editor-fg">Projects</h2>
          <span className="font-mono text-xs text-muted">projects/</span>
        </div>
        <p className="mb-4 text-base text-muted">
          Here are the two most recent projects. The rest can be explored using the file
          explorer or file tree on the left.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {recentProjects.map((project) => (
            <OpenInEditorLink
              key={project.id}
              path={`projects/${project.id}`}
              className="group block overflow-hidden rounded-lg border border-border bg-tab-bg transition-colors hover:border-link"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                <Image
                  src={project.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 100vw, 400px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="mb-1 font-semibold text-editor-fg group-hover:text-link group-hover:underline">
                  {project.title}
                </h3>
                <p className="mb-3 line-clamp-2 text-base text-muted">{project.shortDescription}</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 4).map((t) => {
                    const icon = getTechIcon(t);
                    return (
                      <li
                        key={t}
                        className="inline-flex items-center gap-1 rounded border border-border bg-editor-bg px-1.5 py-0.5 text-[11px] text-muted"
                      >
                        {icon && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={icon} alt="" width={12} height={12} className="h-3 w-3" />
                        )}
                        {t}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </OpenInEditorLink>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-5 flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-editor-fg">Education</h2>
          <span className="font-mono text-xs text-muted">education/</span>
        </div>
        <ul className="space-y-3">
          {EDUCATION.map((e) => (
            <li key={e.id}>
              <OpenInEditorLink
                path={`education/${e.id}`}
                className="group flex items-center justify-between gap-4 rounded-lg border border-border bg-tab-bg px-5 py-4 transition-colors hover:bg-hover"
              >
                <span>
                  <span className="block font-medium text-editor-fg group-hover:underline">
                    {e.degree} {e.field}
                  </span>
                  <span className="block text-sm text-muted">{e.university}</span>
                </span>
                <ArrowRight size={16} className="shrink-0 text-muted" aria-hidden />
              </OpenInEditorLink>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
