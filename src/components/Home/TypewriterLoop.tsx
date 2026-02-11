import { useEffect, useState } from "react";

interface TypewriterLoopProps {
  texts: string[];
  speed: number;        // Tippen-Geschwindigkeit
  pause: number;        // Pause nach Fertigstellung
}

export function TypewriterLoop({ texts, speed, pause }: TypewriterLoopProps) {
  const [textIndex, setTextIndex] = useState(0);   // Welcher Text gerade dran ist
  const [displayed, setDisplayed] = useState("");  // Was aktuell getippt ist
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let timeout: number;

    if (!deleting) {
      // Tippen
      if (displayed.length < texts[textIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(texts[textIndex].slice(0, displayed.length + 1));
        }, speed);
      } else {
        // Text fertig getippt → kurze Pause → löschen starten
        timeout = setTimeout(() => setDeleting(true), pause);
      }
    } else {
      // Löschen
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, speed / 2);
      } else {
        // Löschung fertig → nächsten Text
        setDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, textIndex, texts, speed, pause]);

  return (
    <span>
      {displayed}
      <span className="inline-block w-[1px] bg-white ml-1 animate-blink">&nbsp;</span>
    </span>
  );
}
