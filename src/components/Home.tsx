interface HomeProps {
  title?: string;
  subtitle?: string;
  showWelcome?: boolean;
}

export default function Home({
  title = "Welcome to My Portfolio",
  subtitle = "Hi, I'm Dennis Diehl.",
  showWelcome = true
}: HomeProps): React.JSX.Element {
  return (
    <main className="px-4 pt-28 pb-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
          {title}
        </h1>
        {showWelcome && (
          <p className="text-lg text-gray-300 md:text-xl">
            {subtitle}
          </p>
        )}
      </div>
    </main>
  )
}
