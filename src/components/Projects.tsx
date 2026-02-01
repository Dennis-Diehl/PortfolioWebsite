interface ProjectsProps {
  // Props für zukünftige Projekte, z.B. projects?: Project[]
}

export default function Projects({}: ProjectsProps): React.JSX.Element {
  return (
    <main className="px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          Projects
        </h1>
        <p className="text-lg text-gray-300 md:text-xl">
          Check out some of my recent projects.
        </p>
      </div>
    </main>
  )
}
