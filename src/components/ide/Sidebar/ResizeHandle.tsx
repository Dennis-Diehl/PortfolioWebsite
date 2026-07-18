"use client";

import { useCallback } from "react";
import { useIde, MIN_SIDEBAR, MAX_SIDEBAR, DEFAULT_SIDEBAR } from "../ide-context";

export function ResizeHandle() {
  const { sidebarWidth, setSidebarWidth } = useIde();

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      e.preventDefault();
      const startX = e.clientX;
      const startWidth = sidebarWidth;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);

      function onMove(ev: PointerEvent) {
        setSidebarWidth(startWidth + (ev.clientX - startX));
      }
      function onUp() {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      }
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [sidebarWidth, setSidebarWidth],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setSidebarWidth(sidebarWidth - 16);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setSidebarWidth(sidebarWidth + 16);
      }
    },
    [sidebarWidth, setSidebarWidth],
  );

  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize sidebar"
      aria-valuenow={sidebarWidth}
      aria-valuemin={MIN_SIDEBAR}
      aria-valuemax={MAX_SIDEBAR}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onDoubleClick={() => setSidebarWidth(DEFAULT_SIDEBAR)}
      onKeyDown={onKeyDown}
      className="group relative w-1 shrink-0 cursor-col-resize bg-border transition-colors hover:bg-link focus-visible:bg-link focus-visible:outline-none"
      title="Drag to resize · double-click to reset"
    >
      {/* Wider invisible hit area */}
      <span aria-hidden className="absolute inset-y-0 -left-1 -right-1" />
    </div>
  );
}
