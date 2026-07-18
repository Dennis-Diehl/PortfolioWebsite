import { FileCode, FileJson, FileText, Folder, FolderOpen } from "lucide-react";
import type { FileNode } from "@/content/registry";
import { EXT_COLOR, fileExt } from "@/lib/languages";

/** VS Code-ish colored file icon based on the file kind / extension. */
export function FileIcon({ file, size = 16 }: { file: FileNode; size?: number }) {
  if (file.kind === "skills") {
    return <FileJson size={size} className="shrink-0 text-[#cbcb41]" aria-hidden />;
  }
  if (file.kind === "readme") {
    return <FileText size={size} className="shrink-0 text-[#519aba]" aria-hidden />;
  }
  if (file.kind === "project") {
    const color = EXT_COLOR[fileExt(file.fileName)] ?? "#519aba";
    return <FileCode size={size} className="shrink-0" style={{ color }} aria-hidden />;
  }
  return <FileText size={size} className="shrink-0 text-muted" aria-hidden />;
}

export function FolderIcon({ open, size = 16 }: { open: boolean; size?: number }) {
  return open ? (
    <FolderOpen size={size} className="shrink-0 text-[#dcb67a]" aria-hidden />
  ) : (
    <Folder size={size} className="shrink-0 text-[#dcb67a]" aria-hidden />
  );
}
