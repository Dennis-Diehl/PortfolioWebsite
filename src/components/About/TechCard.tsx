import type { TechStackItem } from "../../data/techStack";
interface TechCardProps {
  tech: TechStackItem;
}

export default function TechCard({ tech }: TechCardProps) {
  return (
    <div className="group w-32 shrink-0 rounded-2xl bg-white/5 p-6 text-center transition hover:bg-white/10">
      <img
        src={tech.icon}
        alt={tech.name}
        className="mx-auto mb-4 h-14 w-14 transition-transform group-hover:scale-110"
      />
      <span className="text-sm font-medium text-white">
        {tech.name}
      </span>
    </div>
  );
}