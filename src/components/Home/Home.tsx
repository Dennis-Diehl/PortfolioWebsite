import { TypewriterLoop } from "./TypewriterLoop";

export default function Home() {
  const texts = [
    "B. Sc. Computer Science 26' @ JGU Mainz",
    "M. Sc. Artificial Intelligence & Data Science"
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="mx-auto w-full max-w-5xl text-center">
        <h1 className="text-6xl font-bold text-white mb-4 md:text-5xl lg:text-7xl">
          Hi, I'm Dennis
        </h1>
        <p className="text-lg md:text-xl text-gray-300 md:mb-12 lg:mb-16">
          <TypewriterLoop texts={texts} speed={55} pause={2000} />
        </p>
      </div>
    </main>
  );
}
