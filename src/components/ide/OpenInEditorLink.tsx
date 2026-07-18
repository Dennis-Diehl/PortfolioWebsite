"use client";

import type { ReactNode } from "react";
import { useIde } from "./ide-context";
import { cn } from "@/lib/cn";

/**
 * An internal link that opens a registry file as a tab instead of doing a full
 * navigation. Used across the README/welcome view and cross-references.
 */
export function OpenInEditorLink({
  path,
  children,
  className,
}: {
  path: string;
  children: ReactNode;
  className?: string;
}) {
  const { openFile } = useIde();
  const href = path === "" ? "/" : `/${path}`;

  return (
    <a
      href={href}
      onClick={(e) => {
        // Let modified clicks (new tab) behave normally.
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
        e.preventDefault();
        openFile(path);
      }}
      className={cn("text-link", className)}
    >
      {children}
    </a>
  );
}
