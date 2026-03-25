"use client";

import { motion } from "framer-motion";

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
              <div className="flex justify-between mb-1">
                <span>{skill.name}</span>
                <span className="text-cyan-400">{skill.level}%</span>
              </div>

              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-cyan-400 to-purple-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}