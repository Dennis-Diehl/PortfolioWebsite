"use client";

import type { ReactNode } from "react";
import { useIde } from "./ide-context";
import { OnboardingHint } from "./OnboardingHint";
import { EmptyEditorState } from "./EmptyEditorState";

/**
 * The main editor surface. Renders the routed page content normally, but
 * swaps in an empty-state placeholder once every tab has been closed —
 * mirroring a real editor rather than silently falling back to a file.
 */
export function EditorPane({ children }: { children: ReactNode }) {
  const { openFiles } = useIde();

  return (
    <main id="editor-content" className="relative min-h-0 flex-1 overflow-y-auto bg-editor-bg">
      {openFiles.length === 0 ? <EmptyEditorState /> : children}
      <OnboardingHint />
    </main>
  );
}
