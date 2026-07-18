"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/cn";

const OPTIONS = [
  { value: "system", label: "System", icon: Monitor },
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
] as const;

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Cycle system -> light -> dark to keep the control compact.
  const active = mounted ? (theme ?? "system") : "system";
  const activeIndex = OPTIONS.findIndex((o) => o.value === active);
  const current = OPTIONS[activeIndex === -1 ? 0 : activeIndex];
  const next = OPTIONS[(OPTIONS.findIndex((o) => o.value === current.value) + 1) % OPTIONS.length];
  const Icon = current.icon;

  return (
    <button
      type="button"
      onClick={() => setTheme(next.value)}
      title={`Theme: ${current.label} (click for ${next.label})`}
      aria-label={`Switch theme. Current: ${current.label}. Click for ${next.label}.`}
      className={cn(
        "inline-flex h-7 w-7 items-center justify-center rounded text-sidebar-fg transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-link",
        className,
      )}
    >
      {/* Render a neutral placeholder until mounted to avoid hydration mismatch. */}
      <Icon size={16} aria-hidden className={mounted ? "" : "opacity-0"} />
    </button>
  );
}
