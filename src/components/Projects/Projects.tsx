import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS } from "../../data/projects";
import ProjectCard from "./ProjectCard";
import ProjectDetail from "./ProjectDetail";

export default function Projects(): React.JSX.Element {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = PROJECTS.find((p) => p.id === selectedId);

  return (
    <div className="w-full px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <motion.h1
            className="mb-4 text-4xl font-bold text-white md:text-3xl lg:text-5xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Projects
        </motion.h1>
        <p className="mb-12 text-lg text-gray-300 md:text-xl">
          Check out some of my recent projects.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
