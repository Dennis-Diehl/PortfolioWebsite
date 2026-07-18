"use client";

import { GitBranch, Check } from "lucide-react";
import { useIde } from "./ide-context";
import { EXT_LABEL, fileExt } from "@/lib/languages";

export function StatusBar() {
  const { activeFile } = useIde();

  const language = EXT_LABEL[fileExt(activeFile.fileName)] ?? "Plain Text";

  return (
    <footer className="flex h-6 shrink-0 items-center justify-between bg-statusbar-bg px-3 text-xs text-statusbar-fg">
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1">
          <GitBranch size={12} aria-hidden /> main
        </span>
        <span className="hidden items-center gap-1 sm:flex">
          <Check size={12} aria-hidden /> ready
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono sm:inline">{activeFile.fileName}</span>
        <span>{language}</span>
        <span aria-hidden>UTF-8</span>
      </div>
    </footer>
  );
}
