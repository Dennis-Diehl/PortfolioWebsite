import { motion } from "framer-motion";

import { TECH_STACK } from "../../data/techStack";
import TechCard from "./TechCard";

export default function About() {
  return (
    <div className="min-h-screen px-4 py-16">
      <div className="mx-auto max-w-6xl">
        <motion.h1
          className="mb-12 text-4xl font-bold text-center text-white md:text-5xl lg:text-6xl"
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
          I'm a computer science student with a focus on exploring machine learning through hands-on Python projects. 
          Currently developing skills in React and Tailwind CSS for frontend development, with plans to expand backend expertise
          in Java Spring Boot and Python, while also learning PostgreSQL and Docker. 
          Committed to continuous growth and deepening technical proficiency, while also being a team player with strong communication skills.
        </p>


        <div>
          <motion.h2 
            className="mb-8 text-3xl font-bold text-white"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Tech Stack
          </motion.h2>
          
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {TECH_STACK.map((tech) => (
              <TechCard key={tech.name} tech={tech} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}