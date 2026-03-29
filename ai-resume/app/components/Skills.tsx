"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
interface Skill {
  name: string;
  tier: 1 | 2; // 2 = proficient, 1 = working knowledge
}

interface Module {
  id: string;
  icon: string;
  label: string;
  color: string;
  rgb: string;
  desc: string;
  skills: Skill[];
}

const MODULES: Module[] = [
  {
    id: "pm",
    icon: "🧭",
    label: "PRODUCT",
    color: "#00f7ff",
    rgb: "0,247,255",
    desc: "CORE PM · STRATEGY · EXECUTION · DELIVERY",
    skills: [
      { name: "Product Roadmapping",        tier: 2 },
      { name: "PRD Writing",                tier: 2 },
      { name: "Feature Prioritization",     tier: 2 },
      { name: "User Story Mapping",         tier: 2 },
      { name: "Backlog Refinement",         tier: 2 },
      { name: "Acceptance Criteria",        tier: 2 },
      { name: "Go-To-Market",               tier: 1 },
      { name: "Market Research",            tier: 1 },
      { name: "Product Lifecycle Mgmt",     tier: 2 },
      { name: "Problem Framing",            tier: 2 },
      { name: "Risk Management",            tier: 1 },
      { name: "Sprint Planning",            tier: 2 },
      { name: "Stakeholder Alignment",      tier: 2 },
      { name: "Cross-Functional Leadership",tier: 2 },
      { name: "Training & Adoption",        tier: 2 },
    ],
  },
  {
    id: "analytics",
    icon: "📊",
    label: "ANALYTICS",
    color: "#a855f7",
    rgb: "168,85,247",
    desc: "DATA · EXPERIMENTATION · METRICS · INSIGHTS",
    skills: [
      { name: "A/B Testing",             tier: 2 },
      { name: "Funnel Analysis",         tier: 2 },
      { name: "Cohort Analysis",         tier: 1 },
      { name: "North Star Metrics",      tier: 2 },
      { name: "OKR Frameworks",          tier: 2 },
      { name: "SQL (Analytics)",         tier: 2 },
      { name: "Hypothesis Testing",      tier: 1 },
      { name: "Experiment Design",       tier: 1 },
      { name: "Data-Driven Decisions",   tier: 2 },
      { name: "Support Data Analysis",   tier: 2 },
      { name: "KPI Definition",          tier: 2 },
    ],
  },
  {
    id: "design",
    icon: "✦",
    label: "DESIGN",
    color: "#ec4899",
    rgb: "236,72,153",
    desc: "UX · PROTOTYPING · INFORMATION ARCHITECTURE",
    skills: [
      { name: "Figma",                    tier: 2 },
      { name: "FigJam",                   tier: 2 },
      { name: "Eraser.io",                tier: 1 },
      { name: "User Journey Mapping",     tier: 2 },
      { name: "Information Architecture", tier: 2 },
      { name: "Wireframing",              tier: 1 },
      { name: "Prototyping",              tier: 1 },
      { name: "Usability Analysis",       tier: 2 },
      { name: "Service Design",           tier: 1 },
      { name: "Task Flow Design",         tier: 2 },
    ],
  },
  {
    id: "tech",
    icon: "⚡",
    label: "TECHNICAL",
    color: "#facc15",
    rgb: "250,204,21",
    desc: "ENGINEERING · AI/ML · FULL STACK · INFRASTRUCTURE",
    skills: [
      { name: "Python",                  tier: 2 },
      { name: "Java",                    tier: 2 },
      { name: "SQL",                     tier: 2 },
      { name: "Apache Wicket",           tier: 2 },
      { name: "HTML / CSS",              tier: 2 },
      { name: "Git · GitHub · GitLab",   tier: 2 },
      { name: "Machine Learning",        tier: 1 },
      { name: "Deep Learning",           tier: 1 },
      { name: "Computer Vision",         tier: 1 },
      { name: "PostgreSQL",              tier: 2 },
      { name: "REST APIs",               tier: 1 },
      { name: "Full SDLC",               tier: 2 },
      { name: "LLMs · RAG · Agents",     tier: 1 },
      { name: "Prompt Engineering",      tier: 1 },
    ],
  },
  {
    id: "soft",
    icon: "◈",
    label: "SOFT SKILLS",
    color: "#38bdf8",
    rgb: "56,189,248",
    desc: "LEADERSHIP · COMMUNICATION · MINDSET",
    skills: [
      { name: "Strategic Thinking",  tier: 2 },
      { name: "Communication",       tier: 2 },
      { name: "Leadership",          tier: 2 },
      { name: "Empathy",             tier: 2 },
      { name: "Decision-Making",     tier: 2 },
      { name: "Adaptability",        tier: 2 },
      { name: "Time Management",     tier: 2 },
      { name: "Problem-Solving",     tier: 2 },
      { name: "Negotiation",         tier: 1 },
      { name: "Conflict Resolution", tier: 1 },
      { name: "Mentoring",           tier: 2 },
      { name: "Presentation",        tier: 2 },
    ],
  },
];

/* ─────────────────────────────────────────
   SKILL NODE
───────────────────────────────────────── */
function SkillNode({ skill, color, rgb, index }: {
  skill: Skill; color: string; rgb: string; index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: 8,
        padding: "9px 14px", borderRadius: 10,
        background: hovered ? `rgba(${rgb},0.07)` : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? `rgba(${rgb},0.35)` : "rgba(255,255,255,0.07)"}`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? `0 0 18px rgba(${rgb},0.18), inset 0 0 8px rgba(${rgb},0.05)` : "none",
        transition: "all 0.22s ease",
        cursor: "default",
      }}
    >
      {/* Hex accent */}
      <div style={{
        width: 7, height: 7, flexShrink: 0,
        background: color,
        clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        opacity: hovered ? 1 : 0.5,
        filter: hovered ? `drop-shadow(0 0 4px ${color})` : "none",
        transition: "all 0.22s",
      }} />

      {/* Name */}
      <span style={{
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 12, fontWeight: 400,
        color: hovered ? color : "rgba(203,213,225,0.8)",
        letterSpacing: 0.3,
        whiteSpace: "nowrap",
        transition: "color 0.22s",
        textShadow: hovered ? `0 0 12px rgba(${rgb},0.6)` : "none",
      }}>
        {skill.name}
      </span>

      {/* Tier dots */}
      <div style={{ display: "flex", gap: 3, marginLeft: 4, flexShrink: 0 }}>
        {Array.from({ length: skill.tier }).map((_, i) => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: "50%",
            background: color,
            opacity: hovered ? 0.9 : 0.3,
            boxShadow: hovered ? `0 0 5px ${color}` : "none",
            transition: "all 0.22s",
          }} />
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   TAB
───────────────────────────────────────── */
function Tab({ mod, active, onClick }: {
  mod: Module; active: boolean; onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        flexShrink: 0,
        display: "flex", alignItems: "center", gap: 7,
        padding: "12px 18px",
        cursor: "pointer",
        background: active ? `rgba(${mod.rgb},0.04)` : "transparent",
        borderTop: "none",
        borderLeft: "none",
        borderRight: "1px solid rgba(0,247,255,0.06)",
        borderBottom: `2px solid ${active ? mod.color : "transparent"}`,
        transition: "all 0.22s",
        outline: "none",
      }}
    >
      {/* Icon chip */}
      <div style={{
        width: 24, height: 24, borderRadius: 6, flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12,
        background: active ? `rgba(${mod.rgb},0.12)` : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? `rgba(${mod.rgb},0.35)` : "rgba(255,255,255,0.08)"}`,
        boxShadow: active ? `0 0 10px rgba(${mod.rgb},0.2)` : "none",
        transition: "all 0.22s",
      }}>
        {mod.icon}
      </div>

      {/* Label */}
      <span style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 8.5, fontWeight: 600, letterSpacing: 1.5,
        color: active ? mod.color : "rgba(148,163,184,0.6)",
        transition: "color 0.22s",
        whiteSpace: "nowrap",
      }}>
        {mod.label}
      </span>

      {/* Count badge */}
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 7,
        padding: "1px 5px", borderRadius: 999,
        background: active ? `rgba(${mod.rgb},0.1)` : "rgba(255,255,255,0.05)",
        color: active ? mod.color : "rgba(148,163,184,0.4)",
        border: `1px solid ${active ? `rgba(${mod.rgb},0.3)` : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.22s",
      }}>
        {mod.skills.length}
      </span>
    </button>
  );
}

/* ─────────────────────────────────────────
   PANEL
───────────────────────────────────────── */
function Panel({ mod }: { mod: Module }) {
  return (
    <motion.div
      key={mod.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      style={{ padding: "28px 24px 24px" }}
    >
      {/* Panel header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
          background: `rgba(${mod.rgb},0.08)`,
          border: `1px solid rgba(${mod.rgb},0.25)`,
          boxShadow: `0 0 16px rgba(${mod.rgb},0.15)`,
        }}>
          {mod.icon}
        </div>
        <div>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 14, fontWeight: 700, letterSpacing: 2,
            color: mod.color,
            textShadow: `0 0 16px rgba(${mod.rgb},0.4)`,
          }}>
            {mod.label} MODULE
          </div>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8, letterSpacing: 1.5,
            color: "rgba(148,163,184,0.45)",
            marginTop: 4,
          }}>
            {mod.desc}
          </div>
        </div>
      </div>

      {/* Skill nodes */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {mod.skills.map((skill, i) => (
          <SkillNode key={skill.name} skill={skill} color={mod.color} rgb={mod.rgb} index={i} />
        ))}
      </div>

      {/* Legend */}
      <div style={{
        marginTop: 24, paddingTop: 20,
        borderTop: "1px solid rgba(0,247,255,0.07)",
        display: "flex", gap: 20, flexWrap: "wrap",
      }}>
        {[
          { dots: 2, label: "PROFICIENT" },
          { dots: 1, label: "WORKING KNOWLEDGE" },
        ].map(({ dots, label }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <div style={{ display: "flex", gap: 3 }}>
              {Array.from({ length: dots }).map((_, i) => (
                <div key={i} style={{
                  width: 5, height: 5, borderRadius: "50%",
                  background: mod.color,
                  boxShadow: `0 0 5px ${mod.color}`,
                  opacity: 0.85,
                }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, letterSpacing: 1.5,
              color: "rgba(148,163,184,0.4)",
            }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Skills() {
  const [activeId, setActiveId] = useState("pm");
  const active = MODULES.find(m => m.id === activeId)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @property --sk-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes sk_spin  { to { --sk-ang: 360deg; } }
        @keyframes sk_blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes sk_scan  {
          0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100vh;opacity:0}
        }

        .sk-os-border {
          position:absolute; inset:0; border-radius:20px; padding:1.5px;
          background: conic-gradient(from var(--sk-ang), #00f7ff, #7c3aed, #ec4899, #facc15, #00f7ff);
          animation: sk_spin 5s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
          box-shadow: 0 0 40px rgba(0,247,255,0.2);
        }

        .sk-tabbar {
          display:flex; align-items:stretch;
          border-bottom: 1px solid rgba(0,247,255,0.08);
          overflow-x: auto; scrollbar-width: none;
        }
        .sk-tabbar::-webkit-scrollbar { display:none; }

        .sk-hex-bg {
          position:fixed; inset:0; pointer-events:none; z-index:0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100'%3E%3Cpath d='M28 0 L56 16 L56 48 L28 64 L0 48 L0 16 Z' fill='none' stroke='rgba(0,247,255,0.04)' stroke-width='1'/%3E%3Cpath d='M28 64 L56 80 L56 100' fill='none' stroke='rgba(0,247,255,0.04)' stroke-width='1'/%3E%3Cpath d='M0 80 L28 64 L0 100' fill='none' stroke='rgba(0,247,255,0.04)' stroke-width='1'/%3E%3C/svg%3E");
          background-size: 56px 100px;
          opacity: 0.55;
        }
      `}</style>

      {/* Hex grid */}
      <div className="sk-hex-bg" />

      <section id="skills" style={{ padding: "100px 24px 80px", position: "relative", zIndex: 1 }}>

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 50 }}
        >
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 4,
            color: "rgba(0,247,255,0.5)", marginBottom: 12,
          }}>
            // NEURAL · OS · v2.5 · SKILL MATRIX
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
            CAPABILITY STACK
          </h2>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* ── OS SHELL ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            maxWidth: 960, margin: "0 auto",
            position: "relative",
            borderRadius: 20,
            background: "rgba(2,6,23,0.95)",
            backdropFilter: "blur(24px)",
            overflow: "hidden",
          }}
        >
          {/* Spinning conic border */}
          <div className="sk-os-border" />

          {/* ── TITLE BAR ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "12px 20px",
            background: "rgba(0,247,255,0.03)",
            borderBottom: "1px solid rgba(0,247,255,0.08)",
          }}>
            {/* Traffic lights */}
            <div style={{ display: "flex", gap: 6 }}>
              {[
                { bg: "#ff5f57", shadow: "#ff5f57" },
                { bg: "#febc2e", shadow: "#febc2e" },
                { bg: "#28c840", shadow: "#28c840" },
              ].map((d, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: d.bg, boxShadow: `0 0 6px ${d.shadow}`,
                }} />
              ))}
            </div>

            {/* Title */}
            <div style={{
              flex: 1, textAlign: "center",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, color: "rgba(0,247,255,0.4)", letterSpacing: 2,
            }}>
              NEURAL-OS · VISHAL.PM · SKILL-MATRIX.SYS
            </div>

            {/* Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#22c55e", boxShadow: "0 0 6px #22c55e",
                animation: "sk_blink 1.8s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, color: "rgba(34,197,94,0.6)", letterSpacing: 1.5,
              }}>
                ALL MODULES LOADED
              </span>
            </div>
          </div>

          {/* ── TAB BAR ── */}
          <div className="sk-tabbar">
            {MODULES.map(mod => (
              <Tab
                key={mod.id}
                mod={mod}
                active={activeId === mod.id}
                onClick={() => setActiveId(mod.id)}
              />
            ))}
          </div>

          {/* ── PANEL ── */}
          <AnimatePresence mode="wait">
            <Panel key={activeId} mod={active} />
          </AnimatePresence>

        </motion.div>

      </section>
    </>
  );
}