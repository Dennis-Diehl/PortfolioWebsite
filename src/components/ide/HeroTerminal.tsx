"use client";

import { useEffect, useState } from "react";
import { Typewriter } from "./Typewriter";

const COMMAND = "echo $whoami";
const GREETING = "Hi, I'm Dennis";

type Stage = "cmd" | "greet" | "subtitle";

/** Blinking terminal cursor block. */
function Caret() {
  return (
    <span aria-hidden className="ml-0.5 inline-block animate-pulse text-accent-blue">
      ▋
    </span>
  );
}

/**
 * Interactive hero terminal. On every mount (page load, navigating back to the
 * README, or the README tab becoming active again) it replays the sequence:
 * type `echo $whoami` → print the greeting → loop the subtitle. The command
 * and greeting stay visible; only the subtitle keeps looping.
 */
export function HeroTerminal({ phrases }: { phrases: readonly string[] }) {
  const [cmd, setCmd] = useState("");
  const [greet, setGreet] = useState("");
  const [stage, setStage] = useState<Stage>("cmd");

  useEffect(() => {
    // Respect reduced motion: show everything immediately.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCmd(COMMAND);
      setGreet(GREETING);
      setStage("subtitle");
      return;
    }

    const timers: number[] = [];
    const schedule = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));

    // Reset (important when the component remounts on navigation).
    setCmd("");
    setGreet("");
    setStage("cmd");

    const typeGreeting = (i = 0) => {
      if (i <= GREETING.length) {
        setGreet(GREETING.slice(0, i));
        schedule(() => typeGreeting(i + 1), 65);
      } else {
        schedule(() => setStage("subtitle"), 550);
      }
    };

    const typeCommand = (i = 0) => {
      if (i <= COMMAND.length) {
        setCmd(COMMAND.slice(0, i));
        schedule(() => typeCommand(i + 1), 95);
      } else {
        schedule(() => {
          setStage("greet");
          typeGreeting(0);
        }, 450);
      }
    };

    schedule(() => typeCommand(0), 350);

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-border bg-editor-bg shadow-sm">
      <div className="flex items-center gap-2 border-b border-border bg-titlebar-bg px-3 py-2">
        <span aria-hidden className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </span>
        <span className="ml-2 font-mono text-xs text-sidebar-fg">~ zsh</span>
      </div>
      <div className="space-y-1 p-4 font-mono text-sm leading-relaxed md:text-base">
        {/* Command line — classic zsh prompt, command typed live */}
        <p className="text-editor-fg">
          <span className="mr-2 select-none font-semibold text-accent-blue">dennis@Portfolio</span>
          <span className="mr-2 select-none text-muted">~ %</span>
          {cmd}
          {stage === "cmd" && <Caret />}
        </p>

        {/* Greeting (whoami output). Reserve the line height to avoid layout shift. */}
        <h1 className="min-h-[1.5em] text-base font-bold text-editor-fg md:text-lg">
          {stage !== "cmd" ? (
            <>
              {greet}
              {stage === "greet" && <Caret />}
            </>
          ) : (
            <span aria-hidden>&nbsp;</span>
          )}
        </h1>

        {/* Looping subtitle — plain typed text, no prompt prefix */}
        <p className="min-h-[1.5em] text-editor-fg">
          {stage === "subtitle" ? (
            <Typewriter phrases={phrases} />
          ) : (
            <span aria-hidden>&nbsp;</span>
          )}
        </p>
      </div>
    </div>
  );
}
