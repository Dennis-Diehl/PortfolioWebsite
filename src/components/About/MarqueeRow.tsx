import type { TechStackItem } from "../../data/techStack";
import TechCard from "./TechCard";

interface MarqueeRowProps {
  items: TechStackItem[];
  direction: "left" | "right";
  speed?: number;
}

export default function MarqueeRow({ items, direction, speed = 25 }: MarqueeRowProps) {
  const animationClass = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";

  return (
    <div className="marquee-container overflow-hidden">
      <div
        className={`flex w-max gap-6 ${animationClass}`}
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {/* Render items twice for seamless loop */}
        {[...items, ...items].map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}
