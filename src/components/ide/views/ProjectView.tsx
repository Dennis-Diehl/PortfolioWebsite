import Image from "next/image";
import { ExternalLink } from "lucide-react";
import type { Project } from "@/content/projects";
import { getTechIcon } from "@/content/techStack";
import { GithubIcon } from "../BrandIcons";

export function ProjectView({ project }: { project: Project }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-10 md:px-10">
      <header className="mb-6">
        <p className="mb-2 font-mono text-xs text-muted"># {project.id}</p>
        <h1 className="mb-4 text-3xl font-bold text-editor-fg md:text-4xl">{project.title}</h1>
        <p className="leading-relaxed text-editor-fg">{project.longDescription}</p>
      </header>

      <div className="mb-8 overflow-hidden rounded-lg border border-border">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1200}
          height={750}
          className="h-auto w-full"
          priority
        />
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-tab-bg px-4 py-2 text-sm font-medium transition-colors hover:bg-hover"
          >
            <GithubIcon size={16} aria-hidden /> View Source Code
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-statusbar-bg px-4 py-2 text-sm font-medium text-statusbar-fg transition-opacity hover:opacity-90"
          >
            <ExternalLink size={16} aria-hidden /> Live demo
          </a>
        )}
      </div>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Tech stack
        </h2>
        <ul className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => {
            const icon = getTechIcon(tech);
            return (
              <li
                key={tech}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-tab-bg px-3 py-1.5 text-sm"
              >
                {icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={icon} alt="" width={16} height={16} className="h-4 w-4" />
                )}
                {tech}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          Key features
        </h2>
        <ul className="space-y-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-baseline gap-3 text-editor-fg">
              <span aria-hidden className="select-none text-accent-blue">
                ▹
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted">
          What I learned
        </h2>
        <ul className="space-y-2">
          {project.learnings.map((learning) => (
            <li key={learning} className="flex items-baseline gap-3 text-editor-fg">
              <span aria-hidden className="select-none text-accent-blue">
                ▹
              </span>
              <span>{learning}</span>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
