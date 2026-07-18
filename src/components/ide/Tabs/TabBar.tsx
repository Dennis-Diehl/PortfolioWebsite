"use client";

import { useEffect, useRef } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useIde } from "../ide-context";
import { Tab } from "./Tab";

export function TabBar() {
  const { openFiles, activePath, openFile, closeFile, reorderTabs } = useIde();
  const listRef = useRef<HTMLDivElement>(null);
  // Set when closing the *active* tab, so focus follows onto whichever tab
  // becomes active next — lets repeated Delete/Backspace keep closing tabs
  // without having to click the new tab first.
  const focusAfterNavRef = useRef(false);

  const sensors = useSensors(
    // Small distance so clicks still register; disables accidental drags on touch.
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  // Keep the active tab scrolled into view (esp. on mobile), and carry
  // keyboard focus onto it if a close just navigated us here.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-tab-path="${activePath}"]`);
    el?.scrollIntoView({ inline: "nearest", block: "nearest" });
    if (focusAfterNavRef.current) {
      focusAfterNavRef.current = false;
      el?.focus();
    }
  }, [activePath]);

  function handleClose(path: string) {
    if (path === activePath) focusAfterNavRef.current = true;
    closeFile(path);
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const from = openFiles.findIndex((f) => f.path === active.id);
    const to = openFiles.findIndex((f) => f.path === over.id);
    if (from !== -1 && to !== -1) reorderTabs(from, to);
  }

  function onTabListKeyDown(e: React.KeyboardEvent) {
    // Roving arrow navigation between tabs (ignored while dnd-kit handles a drag).
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const idx = openFiles.findIndex((f) => f.path === activePath);
    const nextIdx = e.key === "ArrowRight" ? idx + 1 : idx - 1;
    const next = openFiles[nextIdx];
    if (next) {
      e.preventDefault();
      openFile(next.path);
    }
  }

  return (
    // DndContext wraps (not nests inside) the tablist so its live region is a
    // sibling of role="tablist", which only permits role="tab" children.
    <DndContext
      id="ide-tabbar"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
      accessibility={{
        announcements: {
          onDragStart: ({ active }) => `Picked up tab ${active.id}.`,
          onDragOver: ({ active, over }) =>
            over ? `Tab ${active.id} is over position of ${over.id}.` : `Tab ${active.id}.`,
          onDragEnd: ({ active, over }) =>
            over
              ? `Tab ${active.id} was moved to the position of ${over.id}.`
              : `Tab ${active.id} was dropped.`,
          onDragCancel: ({ active }) => `Moving tab ${active.id} was canceled.`,
        },
      }}
    >
      <div
        role="tablist"
        aria-label="Open files"
        onKeyDown={onTabListKeyDown}
        className="tabbar-scroll flex h-[calc(2.25rem+6px)] items-start overflow-x-auto overflow-y-hidden border-b border-tab-border bg-tabbar-bg"
        ref={listRef}
      >
        <SortableContext
          items={openFiles.map((f) => f.path)}
          strategy={horizontalListSortingStrategy}
        >
          {openFiles.map((file, i) => (
            <Tab
              key={file.path}
              file={file}
              index={i}
              total={openFiles.length}
              active={file.path === activePath}
              onSelect={() => openFile(file.path)}
              onClose={() => handleClose(file.path)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
