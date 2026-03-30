"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────── */
const RELEASES = [
  { label: "SIR INITIATIVE",   pct: 92 },
  { label: "SELF-SERVICE UX",  pct: 78 },
  { label: "CEO GOA PORTAL",   pct: 65 },
  { label: "ANALYTICS LAYER",  pct: 55 },
];

const ORG_ROLES = ["PM", "OPS", "ENG", "QA", "DEO"];

const REPORT_TAGS = [
  "REAL-TIME ANALYTICS",
  "ELECTION INTELLIGENCE",
  "STAKEHOLDER DASHBOARDS",
  "JAVA · PYTHON · SQL",
  "FULL SDLC OWNERSHIP",
];

/* ─────────────────────────────────────────
   COUNT-UP HOOK
───────────────────────────────────────── */
function useCountUp(target: number, duration: number, trigger: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - t, 3);
      setVal(Math.round(ease * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [trigger, target, duration]);
  return val;
}

/* ─────────────────────────────────────────
   HUD CORNERS
───────────────────────────────────────── */
function HudCorners({ color = "rgba(0,247,255,0.5)" }: { color?: string }) {
  const corners = [
    { top: 6, left: 6,    borderWidth: "1.5px 0 0 1.5px" },
    { top: 6, right: 6,   borderWidth: "1.5px 1.5px 0 0" },
    { bottom: 6, left: 6,  borderWidth: "0 0 1.5px 1.5px" },
    { bottom: 6, right: 6, borderWidth: "0 1.5px 1.5px 0" },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div key={i} style={{
          position: "absolute", width: 8, height: 8,
          borderColor: color, borderStyle: "solid",
          ...c,
        }} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   BASE CARD SHELL
───────────────────────────────────────── */
function CardShell({
  children, borderGradient, delay = 0, className = "",
}: {
  children: React.ReactNode;
  borderGradient: string;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      style={{ position: "relative", padding: 1.5, borderRadius: 16, height: "100%" }}
    >
      {/* Gradient border */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 16,
        background: borderGradient, opacity: 0.7,
        transition: "opacity 0.3s",
      }} />

      {/* Glass body */}
      <div style={{
        position: "relative",
        background: "rgba(2,6,23,0.92)",
        backdropFilter: "blur(20px)",
        borderRadius: 14,
        padding: "24px 20px 20px",
        height: "100%",
        overflow: "hidden",
      }}>
        {/* Scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 40,
          background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.03),transparent)",
          animation: "imp_scan 4s ease-in-out infinite",
          pointerEvents: "none",
        }} />
        <HudCorners />
        {children}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   SHARED LABEL PARTS
───────────────────────────────────────── */
function CardId({ id, tag }: { id: string; tag: string }) {
  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 7.5, letterSpacing: 2.5,
      color: "rgba(0,247,255,0.35)", marginBottom: 6,
    }}>
      METRIC · {id} · {tag}
    </div>
  );
}

function CardLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div style={{
      fontFamily: "'Orbitron', sans-serif",
      fontSize: 9, fontWeight: 600, letterSpacing: 2,
      color, marginBottom: 4,
    }}>
      {children}
    </div>
  );
}

function CardDesc({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontFamily: "'Exo 2', sans-serif",
      fontSize: 11, color: "rgba(148,163,184,0.65)",
      lineHeight: 1.55, marginTop: 10,
    }}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────
   CARD 1 — USERS: Radial ring gauge
───────────────────────────────────────── */
function UsersCard({ triggered }: { triggered: boolean }) {
  return (
    <CardShell borderGradient="linear-gradient(135deg,#00f7ff,#0891b2)" delay={0.1}>
      <CardId id="01" tag="SCALE" />
      <CardLabel color="#00f7ff">CITIZENS SERVED</CardLabel>

      <div style={{ display: "flex", justifyContent: "center", margin: "14px 0 8px" }}>
        <svg width="110" height="110" viewBox="0 0 110 110" style={{ overflow: "visible" }}>
          <defs>
            <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f7ff" />
              <stop offset="100%" stopColor="#0891b2" />
            </linearGradient>
            <filter id="gf1">
              <feGaussianBlur stdDeviation="2" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle cx="55" cy="55" r="35" fill="none" stroke="rgba(0,247,255,0.1)" strokeWidth="6" />
          {/* Animated fill */}
          <circle
            cx="55" cy="55" r="35"
            fill="none" stroke="url(#rg1)" strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray="220"
            strokeDashoffset={triggered ? 0 : 220}
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              transition: triggered ? "stroke-dashoffset 2s cubic-bezier(.16,1,.3,1) 0.3s" : "none",
            }}
          />
          {/* Pulse overlay */}
          <circle
            cx="55" cy="55" r="35"
            fill="none" stroke="#00f7ff" strokeWidth="1"
            strokeDasharray="220"
            strokeDashoffset={triggered ? 0 : 220}
            style={{
              transformOrigin: "center",
              transform: "rotate(-90deg)",
              opacity: 0.35,
              transition: triggered ? "stroke-dashoffset 2s cubic-bezier(.16,1,.3,1) 0.3s" : "none",
              animation: triggered ? "imp_ringPulse 2s ease-in-out 2.5s infinite" : "none",
            }}
          />
          <text
            x="55" y="50"
            textAnchor="middle" dominantBaseline="central"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 22, fontWeight: 900, fill: "#00f7ff",
              filter: "url(#gf1)",
            }}
          >
            1M+
          </text>
          <text
            x="55" y="68"
            textAnchor="middle"
            style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: 9, fill: "rgba(0,247,255,0.6)" }}
          >
            USERS
          </text>
        </svg>
      </div>

      <CardDesc>
        End-to-end ownership of Goa's voter management platform — scaled to 1M+ citizens with 99% uptime across different voter related system and operations.
      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 2 — ADOPTION: Counter + fill bar
───────────────────────────────────────── */
function AdoptionCard({ triggered }: { triggered: boolean }) {
  const val = useCountUp(40, 1400, triggered);
  return (
    <CardShell borderGradient="linear-gradient(135deg,#7c3aed,#a855f7)" delay={0.2}>
      <CardId id="02" tag="GROWTH" />
      <CardLabel color="#a855f7">ADOPTION GROWTH</CardLabel>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 52, fontWeight: 900, color: "#a855f7",
        textShadow: "0 0 30px rgba(168,85,247,0.6)",
        lineHeight: 1, margin: "12px 0 4px",
      }}>
        {val}%
      </div>

      {/* Fill bar */}
      <div style={{
        width: "100%", height: 4,
        background: "rgba(168,85,247,0.12)",
        borderRadius: 2, overflow: "hidden", marginTop: 10,
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg,#7c3aed,#a855f7,#ec4899)",
          borderRadius: 2,
          boxShadow: "0 0 10px rgba(168,85,247,0.6)",
          width: triggered ? "40%" : "0%",
          transition: triggered ? "width 1.8s cubic-bezier(.16,1,.3,1) 0.6s" : "none",
        }} />
      </div>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8.5, color: "rgba(168,85,247,0.55)",
        letterSpacing: 1.5, marginTop: 8,
      }}>
        70+ HANDS-ON ENABLEMENT SESSIONS
      </div>

      <CardDesc>
        Spearheaded zero-to-one adoption strategy, training election officials through targeted enablement workshops.
      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 3 — UPTIME: Heartbeat + counter
───────────────────────────────────────── */
function UptimeCard({ triggered }: { triggered: boolean }) {
  const val = useCountUp(99, 1400, triggered);
  return (
    <CardShell borderGradient="linear-gradient(135deg,#22c55e,#16a34a)" delay={0.3}>
      <CardId id="03" tag="RELIABILITY" />
      <CardLabel color="#22c55e">PLATFORM UPTIME</CardLabel>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 44, fontWeight: 900, color: "#22c55e",
        textShadow: "0 0 24px rgba(34,197,94,0.5)",
        lineHeight: 1, margin: "10px 0 4px",
        display: "flex", alignItems: "baseline", gap: 4,
      }}>
        <span>{val}</span>
        <span style={{ fontSize: 22, color: "rgba(34,197,94,0.7)" }}>%</span>
      </div>

      {/* Heartbeat SVG */}
      <div style={{ width: "100%", height: 36, marginTop: 8, overflow: "hidden" }}>
        <svg viewBox="0 0 200 36" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path
            d="M0,18 L30,18 L38,4 L46,32 L54,4 L62,32 L70,18 L100,18 L108,4 L116,32 L124,4 L132,32 L140,18 L200,18"
            fill="none" stroke="#22c55e" strokeWidth="1.5"
            strokeDasharray="300"
            strokeDashoffset={triggered ? 0 : 300}
            style={{
              transition: triggered ? "stroke-dashoffset 1.5s ease 0.8s" : "none",
              opacity: 0.75,
              animation: triggered ? "imp_hbPulse 1.2s ease-in-out 2.5s infinite" : "none",
            }}
          />
        </svg>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
        <div style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#22c55e", boxShadow: "0 0 8px #22c55e",
          animation: "imp_blink 1.5s ease-in-out infinite", flexShrink: 0,
        }} />
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 8, color: "rgba(34,197,94,0.6)", letterSpacing: 1.5,
        }}>
          MAINTAINED DURING CRITICAL SYSTEM OPERATIONS
        </div>
      </div>

      <CardDesc>
        Ensured zero critical failures across election operations through strong coordination, proactive risk escalation, and real-time monitoring.
      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 4 — SUPPORT: Declining line chart
───────────────────────────────────────── */
function SupportCard({ triggered }: { triggered: boolean }) {
  const val = useCountUp(30, 1300, triggered);
  return (
    <CardShell borderGradient="linear-gradient(135deg,#ec4899,#be185d)" delay={0.15}>
      <CardId id="04" tag="EFFICIENCY" />
      <CardLabel color="#ec4899">SUPPORT QUERIES ↓</CardLabel>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 48, fontWeight: 900, color: "#ec4899",
        textShadow: "0 0 26px rgba(236,72,153,0.5)",
        lineHeight: 1, margin: "10px 0 4px",
      }}>
        {val}%
      </div>

      <svg viewBox="0 0 180 44" style={{ width: "100%", height: 44, marginTop: 10 }}>
        <defs>
          <linearGradient id="cf1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M10,8 C50,8 70,16 100,22 C130,28 150,36 170,38 L170,44 L10,44 Z"
          fill="url(#cf1)"
          style={{ opacity: triggered ? 1 : 0, transition: triggered ? "opacity 0.4s ease 2.2s" : "none" }}
        />
        <path
          d="M10,8 C50,8 70,16 100,22 C130,28 150,36 170,38"
          fill="none" stroke="#ec4899" strokeWidth="2"
          strokeDasharray="200"
          strokeDashoffset={triggered ? 0 : 200}
          style={{ transition: triggered ? "stroke-dashoffset 1.8s ease 0.6s" : "none" }}
        />
        <circle cx="10"  cy="8"  r="3" fill="#ec4899"
          style={{
            filter: "drop-shadow(0 0 4px #ec4899)",
            opacity: triggered ? 1 : 0,
            transition: triggered ? "opacity 0.3s ease 2.2s" : "none",
          }} />
        <circle cx="170" cy="38" r="3" fill="#ec4899"
          style={{
            filter: "drop-shadow(0 0 4px #ec4899)",
            opacity: triggered ? 1 : 0,
            transition: triggered ? "opacity 0.3s ease 2.5s" : "none",
          }} />
      </svg>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8, color: "rgba(236,72,153,0.5)", letterSpacing: 1.5, marginTop: 6,
      }}>
        ACHIEVED IN 3 MONTHS · SELF-SERVICE FEATURES & UX FIXES
      </div>
      <CardDesc>
        Analysed support data and field feedback to identify friction, then shipped targeted self-service improvements.
      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 5 — FEATURES: Stacked release bars
───────────────────────────────────────── */
function FeaturesCard({ triggered }: { triggered: boolean }) {
  const val = useCountUp(20, 1100, triggered);
  return (
    <CardShell borderGradient="linear-gradient(135deg,#facc15,#f59e0b)" delay={0.25}>
      <CardId id="05" tag="VELOCITY" />
      <CardLabel color="#facc15">FEATURES SHIPPED</CardLabel>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 48, fontWeight: 900, color: "#facc15",
        textShadow: "0 0 26px rgba(250,204,21,0.4)",
        lineHeight: 1, margin: "6px 0 10px",
      }}>
        {val}+
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {RELEASES.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 7, color: "rgba(250,204,21,0.5)",
              letterSpacing: 1, whiteSpace: "nowrap", minWidth: 90,
            }}>
              {r.label}
            </div>
            <div style={{ flex: 1, height: 3, background: "rgba(250,204,21,0.1)", borderRadius: 2, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 2,
                background: "linear-gradient(90deg,#facc15,#f59e0b)",
                boxShadow: "0 0 6px rgba(250,204,21,0.5)",
                width: triggered ? `${r.pct}%` : "0%",
                transition: triggered ? `width 1.2s cubic-bezier(.16,1,.3,1) ${0.7 + i * 0.15}s` : "none",
              }} />
            </div>
          </div>
        ))}
      </div>

      <CardDesc>
Drove product execution across 20+ releases by defining user journeys and acceptance criteria in high-stakes election environments.      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 6 — TEAM: Overlapping nodes
───────────────────────────────────────── */
function TeamCard({ triggered }: { triggered: boolean }) {
  return (
    <CardShell borderGradient="linear-gradient(135deg,#38bdf8,#0ea5e9)" delay={0.35}>
      <CardId id="06" tag="LEADERSHIP" />
      <CardLabel color="#38bdf8">CROSS-FUNCTIONAL TEAM</CardLabel>

      <div style={{
        fontFamily: "'Orbitron', sans-serif",
        fontSize: 52, fontWeight: 900, color: "#38bdf8",
        textShadow: "0 0 26px rgba(56,189,248,0.5)",
        lineHeight: 1, margin: "6px 0 12px",
      }}>
        5
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {ORG_ROLES.map((role, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={triggered ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6 + i * 0.12, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.25, zIndex: 10, boxShadow: "0 0 16px rgba(56,189,248,0.7)" }}
            style={{
              width: 32, height: 32, borderRadius: "50%",
              border: "1.5px solid rgba(56,189,248,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Orbitron', sans-serif", fontSize: 8, fontWeight: 700,
              color: "#38bdf8",
              background: "rgba(56,189,248,0.06)",
              marginLeft: i === 0 ? 0 : -8,
              position: "relative", cursor: "default",
              transition: "border-color 0.2s",
            }}
          >
            {role}
          </motion.div>
        ))}
      </div>

      <div style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 7.5, color: "rgba(56,189,248,0.5)",
        letterSpacing: 1.5, marginTop: 10, textAlign: "center",
      }}>
        ENG · QA · OPS · CROSS-FUNCTIONAL
      </div>

      <CardDesc>
        Managed stakeholder communication, risk escalation, and delivery accountability—enabling a high-trust team to ship under pressure.      </CardDesc>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   CARD 7 — DASHBOARDS: Wide banner
───────────────────────────────────────── */
function ReportsCard({ triggered }: { triggered: boolean }) {
  const val = useCountUp(25, 1200, triggered);
  return (
    <CardShell
      borderGradient="linear-gradient(90deg,#00f7ff,#7c3aed,#ec4899)"
      delay={0.4}
      className="imp-wide"
    >
      <CardId id="07" tag="ANALYTICS INFRASTRUCTURE" />
      <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>

        <div style={{ flexShrink: 0 }}>
          <CardLabel color="rgba(255,255,255,0.9)">DASHBOARDS & REPORTS BUILT</CardLabel>
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 64, fontWeight: 900,
            background: "linear-gradient(135deg,#00f7ff,#7c3aed,#ec4899)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 24px rgba(0,247,255,0.4))",
            lineHeight: 1,
          }}>
            {val}+
          </div>
        </div>

        <div style={{
          width: 1, height: 60,
          background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.3),transparent)",
          flexShrink: 0,
        }} />

        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 13, color: "rgba(203,213,225,0.75)", lineHeight: 1.6,
          }}>
            Built real-time analytics infrastructure across PM and Full-stack roles—delivering custom reports, live dashboards, and decision-support tools for officials and senior stakeholders.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {REPORT_TAGS.map((tag, i) => (
              <span key={i} style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, letterSpacing: 1.5,
                padding: "4px 10px", borderRadius: 999,
                border: "1px solid rgba(0,247,255,0.2)",
                color: "rgba(0,247,255,0.6)",
                background: "rgba(0,247,255,0.04)",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

      </div>
    </CardShell>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Metrics() {
  const sectionRef  = useRef<HTMLElement>(null);
  const triggered   = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @keyframes imp_scan {
          0%{top:-40px;opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{top:calc(100% + 40px);opacity:0}
        }
        @keyframes imp_blink   { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes imp_ringPulse { 0%,100%{opacity:0.35} 50%{opacity:0.1} }
        @keyframes imp_hbPulse {
          0%,100%{opacity:0.75} 50%{opacity:1;filter:drop-shadow(0 0 4px #22c55e)}
        }

        .imp-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 1020px;
          margin: 0 auto;
        }
        .imp-wide {
          grid-column: 1 / -1;
        }

        @media (max-width: 768px) {
          .imp-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 500px) {
          .imp-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        id="metrics"
        ref={sectionRef}
        style={{ padding: "100px 24px 80px", position: "relative" }}
      >
        {/* ── SECTION HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 4,
            color: "rgba(0,247,255,0.5)", marginBottom: 12,
          }}>
            // MISSION · TELEMETRY · REPORT
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(22px, 4vw, 36px)",
            fontWeight: 900, letterSpacing: 3,
            background: "linear-gradient(135deg,#22d3ee,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(0,247,255,0.3))",
            marginBottom: 10,
          }}>
            IMPACT DELIVERED
          </h2>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 10, color: "rgba(148,163,184,0.5)", letterSpacing: 2,
          }}>
            GOA ELECTRONICS LTD · VOTER PLATFORM · 2022 – 2025
          </div>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* ── METRIC GRID ── */}
        <div className="imp-grid">
          <UsersCard    triggered={triggered} />
          <AdoptionCard triggered={triggered} />
          <UptimeCard   triggered={triggered} />
          <SupportCard  triggered={triggered} />
          <FeaturesCard triggered={triggered} />
          <TeamCard     triggered={triggered} />
          <ReportsCard  triggered={triggered} />
        </div>

      </section>
    </>
  );
}