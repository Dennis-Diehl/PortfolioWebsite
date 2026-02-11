import { useRef, useState, useCallback, type RefObject } from "react";

interface TiltStyle {
  transform: string;
  transition: string;
}

interface UseTiltReturn {
  ref: RefObject<HTMLDivElement | null>;
  style: TiltStyle;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

export function useTilt(maxDeg = 10): UseTiltReturn {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<TiltStyle>({
    transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
    transition: "transform 0.1s ease-out",
  });

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      const tiltX = (y - 0.5) * 2 * maxDeg;
      const tiltY = (x - 0.5) * -2 * maxDeg;

      setStyle({
        transform: `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
        transition: "transform 0.1s ease-out",
      });
    },
    [maxDeg],
  );

  const onMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(800px) rotateX(0deg) rotateY(0deg)",
      transition: "transform 0.4s ease-out",
    });
  }, []);

  return { ref, style, onMouseMove, onMouseLeave };
}
