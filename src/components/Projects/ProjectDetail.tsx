import { useEffect } from "react";
import { motion } from "framer-motion";
import type { Project } from "../../data/projects";
import { getTechIcon } from "../../data/techStack";

interface ProjectDetailProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetail({
  project,
  onClose,
}: ProjectDetailProps): React.JSX.Element {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <motion.div
          layoutId={`card-${project.id}`}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-gray-900"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:scale-110"
          >
            &#x2715;
          </button>

          <img
            src={project.image}
            alt={project.title}
            className="h-64 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="mb-3 text-2xl font-bold text-white">
              {project.title}
            </h2>
            <p className="mb-6 leading-relaxed text-gray-400">
              {project.longDescription}
            </p>

            <h3 className="mb-3 text-lg font-semibold text-white">
              Key Features
            </h3>
            <ul className="mb-6 list-inside list-disc space-y-1 text-gray-400">
              {project.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>

            <div className="mb-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => {
                const icon = getTechIcon(tech);
                return (
                  <span
                    key={tech}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1"
                  >
                    {icon && (
                      <img src={icon} alt="" className="h-4 w-4" />
                    )}
                    <span className="text-xs text-gray-300">{tech}</span>
                  </span>
                );
              })}
            </div>

            <div className="flex gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
                >
                  <img
                    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                    alt=""
                    className="h-5 w-5 invert"
                  />
                  {project.title}
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
