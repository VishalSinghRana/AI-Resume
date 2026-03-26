"use client";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center mt-6">
      
      {/* OUTER BIG PILL */}
      <div className="px-6 py-3 rounded-full bg-white/60 backdrop-blur-md border border-white/20 shadow-lg">

        {/* INNER ITEMS */}
        <div className="flex items-center gap-4 text-lg font-medium">

          <a href="#hero" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-gray-300 transition">
            Home
          </a>

          <a href="#metrics" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-gray-300 transition">
            Impact
          </a>

          <a href="#timeline" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-gray-300 transition">
            Experience
          </a>

          <a href="#skills" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-gray-300 transition">
            Skills
          </a>

          <a href="#faq" className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-cyan-400 hover:text-black text-gray-300 transition">
            FAQ
          </a>

        </div>
      </div>
    </nav>
  );
}