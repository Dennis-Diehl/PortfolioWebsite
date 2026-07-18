"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useIde } from "../ide-context";
import { useMediaQuery } from "@/lib/useMediaQuery";
import { Explorer } from "./Explorer";
import { ResizeHandle } from "./ResizeHandle";

export function Sidebar() {
  const { sidebarWidth, mobileSidebarOpen, setMobileSidebarOpen } = useIde();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Drive the native <dialog> from state so we get focus-trap + backdrop for free.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (mobileSidebarOpen && !dialog.open) dialog.showModal();
    if (!mobileSidebarOpen && dialog.open) dialog.close();
  }, [mobileSidebarOpen]);

  // Close the mobile overlay if we grow to desktop.
  useEffect(() => {
    if (isDesktop) setMobileSidebarOpen(false);
  }, [isDesktop, setMobileSidebarOpen]);

  if (isDesktop) {
    return (
      <div className="hidden lg:flex">
        <aside
          style={{ width: sidebarWidth }}
          className="h-full shrink-0 overflow-hidden bg-sidebar-bg"
        >
          <Explorer />
        </aside>
        <ResizeHandle />
      </div>
    );
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => setMobileSidebarOpen(false)}
      onClick={(e) => {
        // Backdrop click closes (clicks on the panel are stopped below).
        if (e.target === dialogRef.current) setMobileSidebarOpen(false);
      }}
      className="m-0 h-full max-h-none w-[80vw] max-w-xs bg-sidebar-bg text-sidebar-fg backdrop:bg-black/50 open:animate-none"
      aria-label="File explorer"
    >
      <div className="flex h-full flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-end border-b border-border px-2 py-1">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(false)}
            aria-label="Close file explorer"
            className="flex h-8 w-8 items-center justify-center rounded hover:bg-hover"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <Explorer />
        </div>
      </div>
    </dialog>
  );
}
