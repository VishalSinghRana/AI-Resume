"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center gap-8 text-sm">

        <a href="#hero" className="hover:text-cyan-400 transition">
          Home
        </a>

        <a href="#metrics" className="hover:text-cyan-400 transition">
          Impact
        </a>

        <a href="#timeline" className="hover:text-cyan-400 transition">
          Experience
        </a>

        <a href="#skills" className="hover:text-cyan-400 transition">
          Skills
        </a>

        <a href="#faq" className="hover:text-cyan-400 transition">
          FAQ
        </a>

      </div>
    </nav>
  );
}