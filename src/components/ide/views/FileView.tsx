import { FileWarning } from "lucide-react";
import { getFileByPath, type FileNode } from "@/content/registry";
import { getProject } from "@/content/projects";
import { getEducation } from "@/content/education";
import { ReadmeView } from "./ReadmeView";
import { SkillsView } from "./SkillsView";
import { ContactView } from "./ContactView";
import { ProjectView } from "./ProjectView";
import { EducationView } from "./EducationView";

/** Renders the correct editor view for a given registry file path. */
export function FileView({ path }: { path: string }) {
  const file = getFileByPath(path);
  if (!file) return <NotFoundView path={path} />;
  return renderFile(file);
}

function renderFile(file: FileNode) {
  switch (file.kind) {
    case "readme":
      return <ReadmeView />;
    case "markdown":
      if (file.path === "contact") return <ContactView />;
      return null;
    case "skills":
      return <SkillsView />;
    case "project": {
      const project = file.refId ? getProject(file.refId) : undefined;
      return project ? <ProjectView project={project} /> : <NotFoundView path={file.path} />;
    }
    case "education": {
      const education = file.refId ? getEducation(file.refId) : undefined;
      return education ? (
        <EducationView education={education} />
      ) : (
        <NotFoundView path={file.path} />
      );
    }
    default:
      return <NotFoundView path={file.path} />;
  }
}

function NotFoundView({ path }: { path: string }) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <FileWarning size={48} className="mb-4 text-muted" aria-hidden />
      <h1 className="mb-2 text-2xl font-bold text-editor-fg">File not found</h1>
      <p className="font-mono text-sm text-muted">
        Cannot open <span className="text-accent">/{path}</span>. No such file in this workspace.
      </p>
    </div>
  );
}
