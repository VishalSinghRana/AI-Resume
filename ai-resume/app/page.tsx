import Hero from "./components/Hero";
import Metrics from "./components/Metrics";
import Timeline from "./components/Timeline";
import Skills from "./components/Skills"
import FAQ from "./components/FAQ";
import Navbar from "./components/Navbar";
import CursorGlow from "./components/CursorGlow";
import Beacon from "./components/Beacon";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-gradient-to-b from-black via-slate-900 to black text-white">
      <CursorGlow />
      <Navbar />
      <div className="px-4 md:px-8 pt-20">
      <Hero />
      <Metrics />
      <Timeline />
      <Skills />
      <FAQ />
      <Beacon />
      <Footer />
      </div>
    </main>
  );
}