"use client";

import { useEffect, useState } from "react";

interface TypewriterProps {
  phrases: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

type Phase = "typing" | "pausing" | "deleting";

/**
 * Types out each phrase, pauses, deletes it, then moves to the next — looping
 * forever. Respects prefers-reduced-motion by showing the first phrase static.
 */
export function Typewriter({
  phrases,
  typingSpeed = 55,
  deletingSpeed = 28,
  pause = 1600,
  className,
}: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (reduced) {
      setText(phrases[0] ?? "");
      return;
    }
    const current = phrases[index] ?? "";
    let timer: number;

    if (phase === "typing") {
      if (text.length < current.length) {
        timer = window.setTimeout(() => setText(current.slice(0, text.length + 1)), typingSpeed);
      } else {
        timer = window.setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timer = window.setTimeout(() => setPhase("deleting"), pause);
    } else {
      if (text.length > 0) {
        timer = window.setTimeout(() => setText(current.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setIndex((i) => (i + 1) % phrases.length);
        setPhase("typing");
        return;
      }
    }

    return () => window.clearTimeout(timer);
  }, [text, phase, index, phrases, reduced, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className}>
      {text}
      <span aria-hidden className="ml-0.5 inline-block animate-pulse text-accent-blue">
        ▋
      </span>
    </span>
  );
}
