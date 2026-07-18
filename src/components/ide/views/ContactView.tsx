import { SOCIAL_LINKS } from "@/content/socialLinks";

export function ContactView() {
  return (
    <article className="mx-auto max-w-2xl px-6 py-10 md:px-10">
      <header className="mb-8">
        <p className="mb-2 font-mono text-xs text-muted"># contact</p>
        <h1 className="mb-2 text-3xl font-bold text-editor-fg md:text-4xl">Get in touch</h1>
        <p className="text-lg text-muted">
          Check out my code on GitHub, or connect with me on LinkedIn.
        </p>
      </header>

      <ul className="flex flex-col gap-3 sm:flex-row">
        {SOCIAL_LINKS.map((link) => {
          const Icon = link.icon;
          return (
            <li key={link.id} className="flex-1">
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-full items-center justify-center gap-3 rounded-lg border border-border bg-tab-bg px-3 py-4 font-medium text-editor-fg transition-colors hover:bg-hover"
              >
                <Icon size={22} className="shrink-0" aria-hidden />
                {link.label}
              </a>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
