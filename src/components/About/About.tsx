import { motion } from "framer-motion";

import { TECH_STACK } from "../../data/techStack";
import MarqueeRow from "./MarqueeRow";

export default function About() {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-5xl">
        <motion.h1
          className="mb-12 text-4xl font-bold text-center text-white md:text-3xl lg:text-6xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        >
            About Me
        </motion.h1>
        
        <p 
          className="mx-auto mb-20 max-w-5xl text-center text-lg leading-relaxed text-gray-300 md:text-xl lg:text-2xl"
        >
          I am a final-year computer science student at JGU Mainz, completing my Bachelor of Science in Computer Science. 
          I will start a Master's degree focused on Artificial Intelligence and Data Science in Winter 2026. I focus on software development, 
          with a strong interest in building practical AI applications using LLMs and Generative AI while working across the full stack with React, FastAPI, PostgreSQL, and Docker to bring AI-powered ideas to life. 
          Committed to continuous growth and deepening technical proficiency, while also being a team player with strong communication skills.
        </p>


        <div>
          <motion.h2 
            className="mb-8 text-2xl font-bold text-white md:text-2xl lg:text-3xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Tech Stack
          </motion.h2>
          
          <div className="flex flex-col gap-6">
            <MarqueeRow
              items={TECH_STACK.filter((t) => t.category === "language")}
              direction="left"
            />
            <MarqueeRow
              items={TECH_STACK.filter((t) => t.category === "framework" || t.category === "tool")}
              direction="right"
            />
          </div>
        </div>
      </div>
    </div>
  );
}