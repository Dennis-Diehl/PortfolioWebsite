"use client";

import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";

const KEY = "ide.onboardingDismissed";

export function OnboardingHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  function dismiss() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-md items-start gap-3 rounded-lg border border-border bg-tab-bg px-4 py-3 shadow-lg">
        <Info size={18} className="mt-0.5 shrink-0 text-accent-blue" aria-hidden />
        <p className="text-sm text-editor-fg">
          This site works like a code editor. Browse the files on the left, or just scroll this
          page. Everything is linked from here.
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss hint"
          className="-mr-1 -mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded hover:bg-hover"
        >
          <X size={16} aria-hidden />
        </button>
      </div>
    </div>
  );
}
