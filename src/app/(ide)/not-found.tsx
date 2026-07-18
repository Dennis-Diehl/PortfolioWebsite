import { FileWarning } from "lucide-react";
import { OpenInEditorLink } from "@/components/ide/OpenInEditorLink";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-24 text-center">
      <FileWarning size={48} className="mb-4 text-muted" aria-hidden />
      <h1 className="mb-2 text-2xl font-bold text-editor-fg">File not found</h1>
      <p className="mb-6 font-mono text-sm text-muted">
        This file doesn&apos;t exist in the workspace.
      </p>
      <OpenInEditorLink
        path=""
        className="rounded-md border border-border bg-tab-bg px-4 py-2 text-sm font-medium text-editor-fg no-underline hover:bg-hover"
      >
        Open README.md
      </OpenInEditorLink>
    </div>
  );
}
