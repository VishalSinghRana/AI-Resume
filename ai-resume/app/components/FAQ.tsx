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
            <motion.details
              key={index}
              className="card-hover glass p-4 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <summary className="font-medium text-cyan-400">
                {item.q}
              </summary>
              <p className="mt-2 text-gray-400">{item.a}</p>
            </motion.details>
          ))}
        </div>

      </div>
    </section>
  );
}