"use client";

import type { ReactNode } from "react";
import { IdeProvider } from "./ide-context";
import { PaletteProvider } from "./palette-context";
import { TitleBar } from "./TitleBar";
import { Sidebar } from "./Sidebar/Sidebar";
import { TabBar } from "./Tabs/TabBar";
import { StatusBar } from "./StatusBar";
import { SearchPalette } from "./Search/SearchPalette";
import { EditorPane } from "./EditorPane";

/**
 * The persistent IDE chrome. Wraps the routed editor content (children) so that
 * navigation between files never remounts the shell — the active file is derived
 * from the URL inside IdeProvider.
 */
export function IdeShell({ children }: { children: ReactNode }) {
  return (
    <IdeProvider>
      <PaletteProvider>
        <a
          href="#editor-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-statusbar-bg focus:px-3 focus:py-2 focus:text-sm focus:text-statusbar-fg"
        >
          Skip to content
        </a>

        <div className="flex h-[100dvh] flex-col overflow-hidden">
          <TitleBar />
          <div className="flex min-h-0 flex-1">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
              <TabBar />
              <EditorPane>{children}</EditorPane>
            </div>
          </div>
          <StatusBar />
        </div>

        <SearchPalette />
      </PaletteProvider>
    </IdeProvider>
  );
}
