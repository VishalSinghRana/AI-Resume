"use client";

import { motion } from "framer-motion";

const faqs = [
  {
    q: "Who is Vishal?",
    a: "A Product Manager with a strong technical background and experience building scalable platforms.",
  },
  {
    q: "What are his key achievements?",
    a: "Handled 1M+ users, increased adoption by 40%, reduced support queries by 30%, delivered 20+ features.",
  },
  {
    q: "Why should we hire him?",
    a: "He combines product thinking with engineering depth and consistently delivers measurable impact.",
  },
  {
    q: "What makes him different?",
    a: "Blend of product, tech, and user-centric thinking — rare combination.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">

        <h2 className="text-3xl font-semibold mb-12 text-center">
          FAQ
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
  <motion.div
    key={index}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.15 }}
  >

    <div className="border-animate rounded-xl">
      <details className="glass glow p-5 rounded-xl group cursor-pointer">

        {/* Question */}
        <summary className="flex justify-between items-center font-medium text-cyan-400 list-none">
          {item.q}

          <span className="transition-transform duration-300 group-open:rotate-180">
            ⌄
          </span>
        </summary>

        {/* Answer */}
        <motion.p
          className="mt-3 text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          {item.a}
        </motion.p>

      </details>
    </div>

  </motion.div>
))}
        </div>

      </div>
    </section>
  );
}