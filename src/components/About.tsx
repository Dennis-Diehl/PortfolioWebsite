interface AboutProps {
  // Hier können zukünftige Props definiert werden, z.B. name?: string
}

export default function About({}: AboutProps) {
  return (
    <main className="px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          About Me
        </h1>
        <p className="mb-6 text-lg text-gray-300 md:text-xl">
          Learn more about who I am and what I do.
        </p>
        <p className="text-gray-400">
          TODO: Add interests and skills (programming languages, devtools, frameworks)
        </p>
      </div>
    </main>
  )
}
