export interface TabsState {
  openPaths: string[];
}

export type TabsAction =
  | { type: "open"; path: string }
  | { type: "close"; path: string }
  | { type: "reorder"; from: number; to: number }
  | { type: "hydrate"; openPaths: string[] };

export function tabsReducer(state: TabsState, action: TabsAction): TabsState {
  switch (action.type) {
    case "open": {
      if (state.openPaths.includes(action.path)) return state;
      return { openPaths: [...state.openPaths, action.path] };
    }
    case "close": {
      return { openPaths: state.openPaths.filter((p) => p !== action.path) };
    }
    case "reorder": {
      const next = [...state.openPaths];
      const [moved] = next.splice(action.from, 1);
      if (moved === undefined) return state;
      next.splice(action.to, 0, moved);
      return { openPaths: next };
    }
    case "hydrate": {
      return { openPaths: action.openPaths };
    }
    default:
      return state;
  }
}

/**
 * Picks the path to navigate to after closing `closedPath`, mirroring VS Code:
 * prefer the tab that shifted into the closed slot, else the previous one, else root.
 */
export function neighborAfterClose(
  openPaths: string[],
  closedPath: string,
  rootPath = "",
): string {
  const idx = openPaths.indexOf(closedPath);
  const remaining = openPaths.filter((p) => p !== closedPath);
  return remaining[idx] ?? remaining[idx - 1] ?? rootPath;
}
