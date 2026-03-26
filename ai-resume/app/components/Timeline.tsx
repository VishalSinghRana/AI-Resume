"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const timeline = [
  {
    title: "Amazon",
    role: "Customer Support Associate",
    desc: "Handled high-volume operations efficiently.",
  },
  {
    title: "BrightChamps",
    role: "Coding Educator",
    desc: "Taught coding & improved communication skills.",
  },
  {
    title: "Goa Electronics Ltd",
    role: "Software Engineer",
    desc: "Improved performance by 25% and built dashboards.",
  },
  {
    title: "Goa Electronics Ltd",
    role: "Product Manager",
    desc: "Led platform for 1M+ users with 40% adoption growth.",
  },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-12 text-center">
        Experience
      </h2>

      <div className="relative border-l border-cyan-500/30 ml-4">
        {timeline.map((item, index) => (
          <motion.div
    key={index}
    className="mb-10 ml-6"
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.2 }}
  >
    
    {/* Glow Dot */}
    <span className="absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.8)]"></span>

    {/* Card */}
    <Tilt scale={1.03} glareEnable={true} glareMaxOpacity={0.15}>
    <div className="border-animate rounded-xl">
      <div className="glass glow p-5 rounded-xl">

        <h3 className="text-xl font-bold">
          {item.title}
        </h3>

        <p className="text-cyan-400">
          {item.role}
        </p>

        <p className="text-gray-400 mt-1">
          {item.desc}
        </p>

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