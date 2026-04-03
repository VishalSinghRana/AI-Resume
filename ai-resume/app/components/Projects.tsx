"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PROJECTS = [
  {
    id: "01",
    featured: true,
    status: "LIVE · DEPLOYED",
    statusColor: "#00f7ff",
    name: "AI RESUME",
    tagline: "NEXT.JS · TYPESCRIPT · CANVAS API",
    accent: "#00f7ff",
    accent2: "#7c3aed",
    rgb: "0,247,255",
    description:
      "A fully interactive, AI-themed personal resume built as a product — not a document. Features a live neural network canvas, holographic cursor system, animated skill tree, mission-control impact section, radar beacon, and a terminal FAQ. Designed and engineered end-to-end as a PM + engineer hybrid project.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "Canvas API", "Tailwind CSS", "Vercel"],
    liveUrl: "https://ai-resume-vishal.vercel.app",
    githubUrl: "https://github.com/VishalSinghRana/AI-Resume",
  },
  {
    id: "02",
    featured: false,
    status: "LIVE · STREAMLIT CLOUD",
    statusColor: "#a855f7",
    name: "LILA BLACK",
    tagline: "PLAYER JOURNEY VISUALIZATION TOOL",
    accent: "#a855f7",
    accent2: "#ec4899",
    rgb: "168,85,247",
    description:
      "A browser-based analytics tool for Level Designers to explore player behaviour across 3 maps using 5 days of real production gameplay data from LILA BLACK. Processes 89,104 event rows across 1,243 parquet files. Four interactive tabs: Map View with player path overlays, Heatmaps for kill/death/loot zones, Match Timeline scrubber, and Aggregate Stats with insight callouts.",
    tech: ["Python", "Streamlit", "Plotly", "Pandas", "NumPy", "Parquet"],
    liveUrl: "https://player-journey-tool-2slkely888zqtueappg6wba.streamlit.app/",
    githubUrl: "https://github.com/VishalSinghRana/player-journey-tool",
    highlights: [
      "89,104 event rows · 15 columns",
      "3 maps: AmbroseValley, GrandRift, Lockdown",
      "5 days of production data (Feb 10–14 2026)",
      "8 event types tracked",
    ],
  },
  {
    id: "03",
    featured: false,
    status: "CASE STUDY · PRODUCT",
    statusColor: "#f97316",
    name: "ZOMATO MOOD",
    tagline: "AI-POWERED FOOD DISCOVERY · DECISION FATIGUE",
    accent: "#f97316",
    accent2: "#ef4444",
    rgb: "249,115,22",
    description:
      "A product case study defining Zomato Mood — an AI-powered, intent-first discovery experience designed to reduce decision fatigue and increase session-to-order conversion. Covers end-to-end PM thinking: problem framing, three user personas, north star metric definition, feature prioritisation, go-to-market rollout plan, and risk analysis.",
    tech: ["Product Strategy", "User Research", "AI / ML", "A/B Testing", "Go-to-Market", "Metrics & KPIs"],
    liveUrl: "https://www.notion.so/PRODUCT-CASE-STUDY-337a1528eced80e782f8caa1cdbc6eb5",
    githubUrl: "https://www.notion.so/PRODUCT-CASE-STUDY-337a1528eced80e782f8caa1cdbc6eb5",
    highlights: [
      "North star: Session-to-order conversion rate +7–10%",
      "Time-to-order: 9 min → 5 min target",
      "Mood feature adoption: 25% within 3 months",
      "Session abandonment reduction: 10–15%",
    ],
  },
  {
    id: "04",
    featured: false,
    status: "COMING SOON",
    statusColor: "#64748b",
    name: "???",
    tagline: "NEXT PROJECT · IN PROGRESS",
    accent: "#64748b",
    accent2: "#475569",
    rgb: "100,116,139",
    description:
      "Something new is being built. Stay tuned.",
    tech: [],
    liveUrl: "#",
    githubUrl: "#",
    highlights: [
      "Currently in development",
    ],
  },
];

/* ─────────────────────────────────────────
   HUD CORNERS
───────────────────────────────────────── */
function HudCorners({ color }: { color: string }) {
  return (
    <>
      {[
        { top: 6, left: 6,    borderWidth: "1.5px 0 0 1.5px" },
        { top: 6, right: 6,   borderWidth: "1.5px 1.5px 0 0" },
        { bottom: 6, left: 6,  borderWidth: "0 0 1.5px 1.5px" },
        { bottom: 6, right: 6, borderWidth: "0 1.5px 1.5px 0" },
      ].map((b, i) => (
        <div key={i} style={{
          position: "absolute", width: 8, height: 8,
          borderStyle: "solid", borderColor: color,
          opacity: 0.6, ...b,
        }} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   FEATURED PROJECT CARD
───────────────────────────────────────── */
function FeaturedCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{ position: "relative", padding: 1.5, borderRadius: 16 }}
    >
      {/* Conic border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, padding: 1.5,
        background: `conic-gradient(from 0deg, ${project.accent}, ${project.accent2}, ${project.accent})`,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        animation: "proj_spin 4s linear infinite",
        opacity: 0.7, pointerEvents: "none",
      }} />

      <div style={{
        background: "rgba(2,6,23,0.94)",
        backdropFilter: "blur(20px)",
        borderRadius: 14,
        padding: "28px 26px",
        display: "flex", flexDirection: "column",
        position: "relative", overflow: "hidden",
      }}>
        {/* Scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 40,
          background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.03),transparent)",
          animation: "proj_scan 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <HudCorners color={project.accent} />
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7.5, letterSpacing: 2.5,
            color: "rgba(0,247,255,0.3)", marginBottom: 14,
            position: "relative", zIndex: 1,
          }}>
            PROJECT · {project.id} · FEATURED
          </div>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "3px 9px", borderRadius: 999,
            border: `1px solid ${project.accent}`,
            background: `rgba(${project.rgb},0.06)`,
            marginBottom: 14, position: "relative", zIndex: 1,
            width: "fit-content",
          }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: project.accent,
              boxShadow: `0 0 6px ${project.accent}`,
              animation: "proj_blink 1.5s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 7.5, letterSpacing: 1.5, color: project.accent,
            }}>
              {project.status}
            </span>
          </div>

          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 18, fontWeight: 700, letterSpacing: 2,
            color: "#fff", marginBottom: 6,
            position: "relative", zIndex: 1,
          }}>
            {project.name}
          </div>

          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 1.5,
            color: project.accent, opacity: 0.7,
            marginBottom: 14, position: "relative", zIndex: 1,
          }}>
            {project.tagline}
          </div>

          <div style={{
            width: "100%", height: 1,
            background: `linear-gradient(90deg,transparent,${project.accent},transparent)`,
            opacity: 0.15, marginBottom: 14,
          }} />

          <p style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 12.5, fontWeight: 300,
            color: "rgba(203,213,225,0.7)", lineHeight: 1.65,
            marginBottom: 18, position: "relative", zIndex: 1,
          }}>
            {project.description}
          </p>

          {/* Tech chips */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: 6,
            marginBottom: 22, position: "relative", zIndex: 1,
          }}>
            {project.tech.map(t => (
              <span key={t} style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, letterSpacing: 1,
                padding: "3px 8px", borderRadius: 5,
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(148,163,184,0.7)",
                background: "rgba(255,255,255,0.03)",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 8, position: "relative", zIndex: 1 }}>
            <LinkBtn href={project.liveUrl} primary accent={project.accent} rgb={project.rgb} label="↗ LIVE SITE" />
            <LinkBtn href={project.githubUrl} primary={false} accent={project.accent} rgb={project.rgb} label="⌥ GITHUB" />
          </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   STANDARD PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      style={{ position: "relative", padding: 1.5, borderRadius: 16 }}
    >
      {/* Conic border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16, padding: 1.5,
        background: `conic-gradient(from 0deg, ${project.accent}, ${project.accent2}, ${project.accent})`,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor", maskComposite: "exclude",
        animation: "proj_spin 4s linear infinite",
        opacity: 0.55, pointerEvents: "none",
        transition: "opacity 0.3s",
      }} />

      <div style={{
        background: "rgba(2,6,23,0.94)",
        backdropFilter: "blur(20px)",
        borderRadius: 14,
        padding: "24px 22px 20px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 36,
          background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.03),transparent)",
          animation: "proj_scan 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <HudCorners color={project.accent} />

        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 7.5, letterSpacing: 2.5,
          color: "rgba(0,247,255,0.3)", marginBottom: 14,
          position: "relative", zIndex: 1,
        }}>
          PROJECT · {project.id}
        </div>

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 9px", borderRadius: 999,
          border: `1px solid ${project.accent}`,
          background: `rgba(${project.rgb},0.06)`,
          marginBottom: 14, position: "relative", zIndex: 1,
          width: "fit-content",
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: project.accent,
            boxShadow: `0 0 6px ${project.accent}`,
            animation: "proj_blink 1.5s ease-in-out infinite",
          }} />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7.5, letterSpacing: 1.5, color: project.accent,
          }}>
            {project.status}
          </span>
        </div>

        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 15, fontWeight: 700, letterSpacing: 1.5,
          color: "#fff", marginBottom: 4,
          position: "relative", zIndex: 1,
        }}>
          {project.name}
        </div>

        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 9, letterSpacing: 1.5,
          color: project.accent, opacity: 0.7,
          marginBottom: 14, position: "relative", zIndex: 1,
        }}>
          {project.tagline}
        </div>

        <div style={{
          width: "100%", height: 1,
          background: `linear-gradient(90deg,transparent,${project.accent},transparent)`,
          opacity: 0.15, marginBottom: 14,
        }} />

        <p style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 12.5, fontWeight: 300,
          color: "rgba(203,213,225,0.7)", lineHeight: 1.65,
          marginBottom: 8,
          position: "relative", zIndex: 1,
        }}>
          {project.description}
        </p>

        {/* Highlights */}
        {project.highlights && (
          <div style={{
            display: "flex", flexDirection: "column", gap: 6,
            marginBottom: 16, position: "relative", zIndex: 1,
          }}>
            {project.highlights.map((h, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: "50%", flexShrink: 0,
                  background: project.accent,
                  boxShadow: `0 0 5px ${project.accent}`,
                }} />
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 8.5, letterSpacing: 1,
                  color: `rgba(${project.rgb},0.7)`,
                }}>
                  {h}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Tech chips */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 6,
          marginBottom: 20, position: "relative", zIndex: 1,
        }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, letterSpacing: 1,
              padding: "3px 8px", borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(148,163,184,0.7)",
              background: "rgba(255,255,255,0.03)",
            }}>
              {t}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 8, position: "relative", zIndex: 1 }}>
          <LinkBtn href={project.liveUrl} primary accent={project.accent} rgb={project.rgb} label="↗ LIVE SITE" />
          <LinkBtn href={project.githubUrl} primary={false} accent={project.accent} rgb={project.rgb} label="⌥ GITHUB" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   LINK BUTTON
───────────────────────────────────────── */
function LinkBtn({
  href, primary, accent, rgb, label,
}: {
  href: string; primary: boolean; accent: string; rgb: string; label: string;
}) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: "7px 14px", borderRadius: 8,
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8.5, letterSpacing: 1.5,
        textDecoration: "none",
        cursor: "pointer",
        transition: "all 0.2s",
        ...(primary ? {
          background: accent,
          color: "#020617",
          fontWeight: 700,
          boxShadow: hov ? `0 0 28px rgba(${rgb},0.55)` : `0 0 16px rgba(${rgb},0.35)`,
          transform: hov ? "translateY(-1px)" : "none",
        } : {
          background: "rgba(255,255,255,0.03)",
          border: `1px solid ${hov ? accent : "rgba(255,255,255,0.1)"}`,
          color: hov ? accent : "rgba(148,163,184,0.7)",
        }),
      }}
    >
      {label}
    </a>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Projects() {
  const featured = PROJECTS.filter(p => p.featured);
  const standard = PROJECTS.filter(p => !p.featured);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @property --proj-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes proj_spin  { to { --proj-ang: 360deg; } }
        @keyframes proj_blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes proj_scan  {
          0%{top:-36px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:calc(100% + 36px);opacity:0}
        }
      `}</style>

      <section id="projects" style={{ padding: "100px 24px 80px" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 56 }}
        >
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 4,
            color: "rgba(0,247,255,0.5)", marginBottom: 12,
          }}>
            // DEPLOYED · PROJECTS · OPEN SOURCE
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(22px,4vw,36px)",
            fontWeight: 900, letterSpacing: 3,
            background: "linear-gradient(135deg,#22d3ee,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(0,247,255,0.3))",
            marginBottom: 10,
          }}>
            PROJECTS
          </h2>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* Content */}
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>

          {/* Featured cards — full width */}
          {featured.map((p, i) => (
            <FeaturedCard key={p.id} project={p} index={i} />
          ))}

          {/* Standard cards — grid */}
          {standard.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 20,
            }}>
              {standard.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}