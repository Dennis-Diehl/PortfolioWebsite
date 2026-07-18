"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { X } from "lucide-react";
import type { FileNode } from "@/content/registry";
import { FileIcon } from "../file-icons";
import { cn } from "@/lib/cn";

interface TabProps {
  file: FileNode;
  active: boolean;
  onSelect: () => void;
  onClose: () => void;
  index: number;
  total: number;
}

export function Tab({ file, active, onSelect, onClose, index, total }: TabProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: file.path,
  });

  // Keep dnd-kit's a11y wiring but let our own tab semantics win.
  const { role: _role, tabIndex: _tabIndex, ...dndAttributes } = attributes;

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 10 : undefined,
    opacity: isDragging ? 0.85 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      role="tab"
      aria-selected={active}
      aria-label={`${file.fileName}, tab ${index + 1} of ${total}. Press Delete to close.`}
      aria-keyshortcuts="Delete"
      tabIndex={active ? 0 : -1}
      data-tab-path={file.path}
      onClick={onSelect}
      onAuxClick={(e) => {
        // Middle-click closes.
        if (e.button === 1) {
          e.preventDefault();
          onClose();
        }
      }}
      className={cn(
        "group flex h-9 shrink-0 cursor-pointer select-none items-center gap-2 border-r border-tab-border px-3 text-sm focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-link",
        active
          ? "bg-tab-active-bg text-tab-active-fg"
          : "bg-tab-bg text-tab-inactive-fg hover:bg-hover",
      )}
      {...dndAttributes}
      {...listeners}
      // Our handler must come after {...listeners} so it wins; we still forward
      // other keys to dnd-kit's KeyboardSensor (Space/Enter start a drag).
      onKeyDown={(e) => {
        if (e.key === "Delete" || e.key === "Backspace") {
          e.preventDefault();
          onClose();
          return;
        }
        listeners?.onKeyDown?.(e);
      }}
    >
      <FileIcon file={file} size={14} />
      <span className="max-w-[12rem] truncate">{file.fileName}</span>
      {/*
       * Mouse affordance only — kept non-interactive to avoid nesting a focusable
       * control inside role="tab". Keyboard/AT users close via the Delete shortcut
       * announced on the tab itself.
       */}
      <span
        aria-hidden
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        className={cn(
          "ml-1 flex h-5 w-5 items-center justify-center rounded transition-opacity hover:bg-hover",
          active ? "opacity-70 hover:opacity-100" : "opacity-0 group-hover:opacity-70",
        )}
      >
        <X size={14} />
      </span>
    </div>
  );
}
