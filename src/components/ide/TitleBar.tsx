"use client";

import { Search, PanelLeft } from "lucide-react";
import { useIde } from "./ide-context";
import { usePalette } from "./palette-context";
import { ThemeToggle } from "../theme/ThemeToggle";

export function TitleBar() {
  const { openFile, setMobileSidebarOpen } = useIde();
  const { setOpen } = usePalette();

  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-titlebar-bg px-3">
      <button
        type="button"
        onClick={() => setMobileSidebarOpen(true)}
        aria-label="Open file explorer"
        className="flex h-8 w-8 items-center justify-center rounded text-sidebar-fg hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-link lg:hidden"
      >
        <PanelLeft size={18} aria-hidden />
      </button>

      {/* Logo: terminal prompt >_ + name, returns to README */}
      <button
        type="button"
        onClick={() => openFile("")}
        aria-label="Dennis Diehl home"
        className="flex items-center gap-2 rounded px-1.5 py-1 font-mono text-base font-semibold text-accent transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-link"
      >
        <span aria-hidden className="text-accent-blue">
          &gt;_
        </span>
        <span className="text-editor-fg">Dennis</span>
      </button>

      {/* Center search trigger */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto flex h-7 w-full max-w-md items-center gap-2 rounded border border-border bg-editor-bg px-3 text-sm text-muted transition-colors hover:bg-hover"
        aria-label="Search files (Ctrl+P)"
      >
        <Search size={14} aria-hidden />
        <span className="truncate">Search files &amp; content…</span>
        <kbd className="ml-auto hidden rounded border border-border px-1.5 py-0.5 font-mono text-[10px] sm:inline">
          ⌘P
        </kbd>
      </button>

      <ThemeToggle />
    </header>
  );
}
