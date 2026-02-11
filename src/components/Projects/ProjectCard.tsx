import { motion } from "framer-motion";
import { useTilt } from "../../hooks/useTilt";
import type { Project } from "../../data/projects";
import { getTechIcon } from "../../data/techStack";

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export default function ProjectCard({
  project,
  onClick,
}: ProjectCardProps): React.JSX.Element {
  const { ref, style, onMouseMove, onMouseLeave } = useTilt(10);

  return (
    <motion.div layoutId={`card-${project.id}`} onClick={onClick}>
      <div
        ref={ref}
        style={style}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
      >
        <img
          src={project.image}
          alt={project.title}
          className="h-48 w-full object-cover"
        />
        <div className="p-5">
          <h3 className="mb-2 text-xl font-bold text-white">
            {project.title}
          </h3>
          <p className="mb-4 text-sm leading-relaxed text-gray-400">
            {project.shortDescription}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => {
              const icon = getTechIcon(tech);
              return icon ? (
                <img
                  key={tech}
                  src={icon}
                  alt={tech}
                  title={tech}
                  className="h-5 w-5"
                />
              ) : (
                <span
                  key={tech}
                  className="text-xs text-gray-400"
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
