"use client";

import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";

const metrics = [
  { label: "Users", value: "1M+" },
  { label: "Adoption Growth", value: "+40%" },
  { label: "Features Delivered", value: "20+" },
  { label: "Support Reduction", value: "-30%" },
];

export default function Metrics() {
  return (
    <section id="metrics" className="py-20 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">


        <h2 className="text-3xl font-semibold mb-10 text-center">
          Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {metrics.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Tilt glareEnable={true} glareMaxOpacity={0.2} scale={1.05}>

                <div className="border-animate rounded-2xl">
                  <div className="glass glow p-6 text-center rounded-2xl">

                    <h3 className="text-4xl font-bold text-cyan-400">
                      {item.value}
                    </h3>

                    <p className="mt-2 text-gray-400">
                      {item.label}
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