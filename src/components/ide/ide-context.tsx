"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ALL_FILES,
  DEFAULT_EXPANDED,
  ROOT_FILE,
  getFileByPath,
  type FileNode,
} from "@/content/registry";
import { tabsReducer, neighborAfterClose } from "@/lib/tabsReducer";

const EXPANDED_KEY = "ide.expandedFolders";
const SIDEBAR_WIDTH_KEY = "ide.sidebarWidth";

export const MIN_SIDEBAR = 200;
export const MAX_SIDEBAR = 480;
export const DEFAULT_SIDEBAR = 260;

/** Maps a URL pathname to a registry file path ("" = README root). */
function pathnameToFilePath(pathname: string): string {
  return pathname.replace(/^\/+|\/+$/g, "");
}

interface IdeContextValue {
  openFiles: FileNode[];
  activeFile: FileNode;
  activePath: string;
  openFile: (path: string) => void;
  closeFile: (path: string) => void;
  reorderTabs: (from: number, to: number) => void;
  isActive: (path: string) => boolean;
  // sidebar / explorer
  expandedFolders: string[];
  toggleFolder: (segment: string) => void;
  sidebarWidth: number;
  setSidebarWidth: (w: number) => void;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
}

const IdeContext = createContext<IdeContextValue | null>(null);

export function IdeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const activePath = pathnameToFilePath(pathname);
  const activeFile = getFileByPath(activePath) ?? ROOT_FILE;

  const [tabs, dispatch] = useReducer(tabsReducer, { openPaths: [ROOT_FILE.path] });
  const [expandedFolders, setExpandedFolders] = useState<string[]>(DEFAULT_EXPANDED);
  const [sidebarWidth, setSidebarWidthState] = useState(DEFAULT_SIDEBAR);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  // Set right before navigating to root because the very last tab was closed,
  // so the "always keep the routed file open" effect below skips that one
  // transition instead of silently reopening README as a tab.
  const suppressAutoOpenRef = useRef(false);

  // Every fresh page load (first visit or reload) starts clean with just
  // README open — plus the current route's file too, if it's a deep link to
  // something else. Open tabs are never restored from a previous session.
  useEffect(() => {
    try {
      const initial =
        getFileByPath(activePath) && activePath !== ROOT_FILE.path
          ? [ROOT_FILE.path, activePath]
          : [ROOT_FILE.path];
      dispatch({ type: "hydrate", openPaths: initial });

      const storedExpanded = localStorage.getItem(EXPANDED_KEY);
      if (storedExpanded) setExpandedFolders(JSON.parse(storedExpanded));

      const storedWidth = localStorage.getItem(SIDEBAR_WIDTH_KEY);
      if (storedWidth) {
        const w = Number(storedWidth);
        if (!Number.isNaN(w)) setSidebarWidthState(Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, w)));
      }
    } catch {
      // Ignore malformed storage.
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ensure the currently routed file always has an open tab — except right
  // after closing the very last tab, where we deliberately leave the tab bar
  // empty instead of silently reopening README.
  useEffect(() => {
    if (!hydrated) return;
    if (suppressAutoOpenRef.current) {
      suppressAutoOpenRef.current = false;
      return;
    }
    dispatch({ type: "open", path: activePath });
  }, [activePath, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(EXPANDED_KEY, JSON.stringify(expandedFolders));
  }, [expandedFolders, hydrated]);

  const openFile = useCallback(
    (path: string) => {
      dispatch({ type: "open", path });
      const url = path === "" ? "/" : `/${path}`;
      router.push(url);
      setMobileSidebarOpen(false);
    },
    [router],
  );

  const closeFile = useCallback(
    (path: string) => {
      dispatch({ type: "close", path });

      // If we closed the active tab, navigate to a neighbor.
      if (path === activePath) {
        const remaining = tabs.openPaths.filter((p) => p !== path);
        if (remaining.length === 0) {
          // Closing the very last tab: leave the tab bar empty rather than
          // treating the fallback navigation as "opening" README.
          suppressAutoOpenRef.current = true;
        }
        const neighbor = neighborAfterClose(tabs.openPaths, path, ROOT_FILE.path);
        const url = neighbor === "" ? "/" : `/${neighbor}`;
        router.push(url);
      }
    },
    [tabs.openPaths, activePath, router],
  );

  const reorderTabs = useCallback((from: number, to: number) => {
    dispatch({ type: "reorder", from, to });
  }, []);

  const toggleFolder = useCallback((segment: string) => {
    setExpandedFolders((prev) =>
      prev.includes(segment) ? prev.filter((s) => s !== segment) : [...prev, segment],
    );
  }, []);

  const setSidebarWidth = useCallback((w: number) => {
    const clamped = Math.min(MAX_SIDEBAR, Math.max(MIN_SIDEBAR, w));
    setSidebarWidthState(clamped);
    localStorage.setItem(SIDEBAR_WIDTH_KEY, String(clamped));
  }, []);

  const openFiles = useMemo(
    () =>
      tabs.openPaths
        .map((p) => ALL_FILES.find((f) => f.path === p))
        .filter((f): f is FileNode => Boolean(f)),
    [tabs.openPaths],
  );

  const value: IdeContextValue = {
    openFiles,
    activeFile,
    activePath,
    openFile,
    closeFile,
    reorderTabs,
    isActive: (path) => path === activePath,
    expandedFolders,
    toggleFolder,
    sidebarWidth,
    setSidebarWidth,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  };

  return <IdeContext.Provider value={value}>{children}</IdeContext.Provider>;
}

export function useIde(): IdeContextValue {
  const ctx = useContext(IdeContext);
  if (!ctx) throw new Error("useIde must be used within IdeProvider");
  return ctx;
}
