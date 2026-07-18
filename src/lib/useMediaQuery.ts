"use client";

import { useSyncExternalStore } from "react";

/** Returns whether the given media query currently matches (SSR-safe). */
export function useMediaQuery(query: string): boolean {
  function subscribe(callback: () => void) {
    const mql = window.matchMedia(query);
    mql.addEventListener("change", callback);
    return () => mql.removeEventListener("change", callback);
  }

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false, // Server snapshot: assume no match until hydrated.
  );
}
