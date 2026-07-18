"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { ChevronRight } from "lucide-react";
import { FILE_TREE, ROOT_SEGMENT, type TreeNode } from "@/content/registry";
import { useIde } from "../ide-context";
import { FileIcon, FolderIcon } from "../file-icons";
import { cn } from "@/lib/cn";

/** A flattened, currently-visible row used for keyboard navigation. */
interface FlatRow {
  id: string;
  depth: number;
  kind: "folder" | "file";
  label: string;
  /** For folders: the segment; for files: the file path. */
  key: string;
  expanded?: boolean;
  node?: TreeNode;
}

function flatten(nodes: TreeNode[], expanded: string[], depth = 0): FlatRow[] {
  const rows: FlatRow[] = [];
  for (const node of nodes) {
    if (node.type === "folder") {
      const isOpen = expanded.includes(node.segment);
      rows.push({
        id: `folder:${node.segment}`,
        depth,
        kind: "folder",
        label: node.name,
        key: node.segment,
        expanded: isOpen,
        node,
      });
      if (isOpen) rows.push(...flatten(node.children, expanded, depth + 1));
    } else {
      rows.push({
        id: `file:${node.node.path}`,
        depth,
        kind: "file",
        label: node.node.fileName,
        key: node.node.path,
        node,
      });
    }
  }
  return rows;
}

export function Explorer() {
  const { expandedFolders, toggleFolder, openFile, activePath } = useIde();
  const [focusIndex, setFocusIndex] = useState(0);
  const treeRef = useRef<HTMLUListElement>(null);

  const rows = useMemo(() => flatten(FILE_TREE, expandedFolders), [expandedFolders]);
  const rootExpanded = expandedFolders.includes(ROOT_SEGMENT);

  const focusRow = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, rows.length - 1));
    setFocusIndex(clamped);
    const el = treeRef.current?.querySelector<HTMLElement>(`[data-row-index="${clamped}"]`);
    el?.focus();
  }, [rows.length]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number, row: FlatRow) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          focusRow(index + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          focusRow(index - 1);
          break;
        case "Home":
          e.preventDefault();
          focusRow(0);
          break;
        case "End":
          e.preventDefault();
          focusRow(rows.length - 1);
          break;
        case "ArrowRight":
          if (row.kind === "folder" && !row.expanded) {
            e.preventDefault();
            toggleFolder(row.key);
          } else if (row.kind === "folder") {
            e.preventDefault();
            focusRow(index + 1);
          }
          break;
        case "ArrowLeft":
          if (row.kind === "folder" && row.expanded) {
            e.preventDefault();
            toggleFolder(row.key);
          }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (row.kind === "folder") toggleFolder(row.key);
          else openFile(row.key);
          break;
      }
    },
    [focusRow, rows.length, toggleFolder, openFile],
  );

  return (
    <nav aria-label="File explorer" className="flex h-full flex-col">
      <div className="px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
        Explorer
      </div>
      <button
        type="button"
        onClick={() => toggleFolder(ROOT_SEGMENT)}
        aria-expanded={rootExpanded}
        className="flex w-full items-center gap-1 px-2 pb-1 text-left text-[11px] font-bold uppercase tracking-wide text-sidebar-fg hover:bg-hover focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-link"
      >
        <ChevronRight
          size={14}
          aria-hidden
          className={cn("transition-transform", rootExpanded && "rotate-90")}
        />
        dennis-diehl
      </button>
      {rootExpanded && (
        <ul
          ref={treeRef}
          role="tree"
          aria-label="Portfolio files"
          className="flex-1 overflow-y-auto pb-4"
        >
          {rows.map((row, index) => {
          const isActiveFile = row.kind === "file" && row.key === activePath;
          const tabIndex = index === focusIndex ? 0 : -1;
          return (
            <li
              key={row.id}
              role="treeitem"
              aria-expanded={row.kind === "folder" ? row.expanded : undefined}
              aria-selected={row.kind === "file" ? isActiveFile : undefined}
              aria-current={isActiveFile ? "page" : undefined}
              aria-level={row.depth + 1}
            >
              <button
                type="button"
                data-row-index={index}
                tabIndex={tabIndex}
                onClick={() => {
                  setFocusIndex(index);
                  if (row.kind === "folder") toggleFolder(row.key);
                  else openFile(row.key);
                }}
                onKeyDown={(e) => onKeyDown(e, index, row)}
                onFocus={() => setFocusIndex(index)}
                className={cn(
                  "flex w-full items-center gap-1.5 py-1 pr-2 text-left text-sm transition-colors focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-link",
                  isActiveFile ? "bg-selection text-editor-fg" : "text-sidebar-fg hover:bg-hover",
                )}
                style={{ paddingLeft: `${row.depth * 12 + 8}px` }}
              >
                {row.kind === "folder" ? (
                  <>
                    <ChevronRight
                      size={14}
                      aria-hidden
                      className={cn("shrink-0 transition-transform", row.expanded && "rotate-90")}
                    />
                    <FolderIcon open={!!row.expanded} />
                  </>
                ) : (
                  <>
                    <span className="w-[14px] shrink-0" aria-hidden />
                    {row.node?.type === "file" && <FileIcon file={row.node.node} />}
                  </>
                )}
                <span className="truncate">{row.label}</span>
              </button>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}
