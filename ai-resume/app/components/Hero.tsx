"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const text = "Product Manager | Built for Scale";
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-[70vh] flex flex-col justify-center items-center text-center animate-pulse">
      
      {/* Name */}
      <motion.h1
  className="text-6xl md:text-7xl font-bold text-gradient"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  Vishal Singh Rana
</motion.h1>

      {/* Typing text */}
      <p className="mt-6 text-lg text-gray-400">
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>

    </section>
  );
}