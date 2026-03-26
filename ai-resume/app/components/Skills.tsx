"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const skills = [
  { name: "Product Management", level: 95 },
  { name: "Python / SQL", level: 85 },
  { name: "AI / ML", level: 70 },
  { name: "Stakeholder Management", level: 95 },
];

export default function Skills() {
  return (
    <section id="skills" className="glass p-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-3xl font-semibold mb-12 text-center">
          Skills
        </h2>

        <div className="space-y-6">
          {skills.map((skill, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
  >
    <Tilt scale={1.02}>
    <div className="border-animate rounded-xl">
      <div className="glass glow p-4 rounded-xl">

        {/* Header */}
        <div className="flex justify-between mb-2">
          <span className="font-medium">{skill.name}</span>
          <span className="text-cyan-400">{skill.level}%</span>
        </div>

        {/* Bar */}
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_15px_rgba(0,255,255,0.6)]"
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.level}%` }}
            transition={{ duration: 1.2, delay: index * 0.2 }}
          />

        </div>

      </div>
    </div>
    </Tilt>

  </motion.div>
))}
        </div>

      </div>
    </section>
  );
}