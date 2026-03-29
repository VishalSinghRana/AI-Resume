"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
interface Mission {
  side: "left" | "right";
  era: string;
  company: string;
  role: string;
  status: string;
  active: boolean;
  accent: string;
  accentRgb: string;
  gradient: string;
  bullets: string[];
  chips: string[];
}

const MISSIONS: Mission[] = [
  {
    side: "right",
    era: "MAY 2024 – DEC 2025",
    company: "GOA ELECTRONICS LTD",
    role: "Product Manager · Product Specialist",
    status: "MISSION COMPLETE",
    active: false,
    accent: "#00f7ff",
    accentRgb: "0,247,255",
    gradient: "linear-gradient(135deg,#00f7ff,#0891b2)",
    bullets: [
      "Owned end-to-end product roadmap for voter management platform — 1M+ citizens, 99% uptime across live election cycles",
      "Defined 20+ PRDs, user journeys & acceptance criteria; shipped features under tight election-cycle timelines",
      "Led nationwide Special Intensive Revision (SIR) initiative — translated Election Commission requirements into sprint-level plans across Eng, QA & Ops",
      "Cut support queries 30% in 3 months by identifying friction from support data & shipping self-service features",
      "Built adoption strategy from scratch; ran 70+ enablement sessions driving 40% district-wide adoption growth",
      "Managed cross-functional team of 5; owned risk escalation, sprint coordination & delivery accountability",
      "Partnered directly with CEO Goa, EROs, AEROs & BLOs — navigated competing compliance vs UX priorities",
      "Leading CEO Goa portal redesign — rethinking IA, task flows & service discovery to improve task completion",
    ],
    chips: ["PRD", "Roadmapping", "Stakeholder Mgmt", "Jira", "OKRs", "A/B Testing", "Cross-Functional Leadership", "Election Tech"],
  },
  {
    side: "left",
    era: "OCT 2022 – MAY 2024",
    company: "GOA ELECTRONICS LTD",
    role: "Software Engineer",
    status: "MISSION COMPLETE",
    active: false,
    accent: "#a855f7",
    accentRgb: "168,85,247",
    gradient: "linear-gradient(135deg,#7c3aed,#a855f7)",
    bullets: [
      "Built & optimised government web applications — Java, Apache Wicket, Python, PostgreSQL, HTML/CSS",
      "Refactored legacy codebases, improving application performance ~25% and maintainability 15–20%",
      "Developed 25+ custom reports & dashboards enabling real-time analytics for election officials & stakeholders",
      "Delivered scalable backend logic & reporting tools across the full SDLC — requirements through deployment",
      "Mentored new developers; achieved 95% trainee satisfaction and reduced team ramp-up time significantly",
    ],
    chips: ["Java", "Apache Wicket", "Python", "PostgreSQL", "HTML/CSS", "Git", "Full SDLC", "Analytics"],
  },
  {
    side: "right",
    era: "AUG 2022 – OCT 2022",
    company: "BRIGHTCHAMPS",
    role: "Coding Educator · Remote",
    status: "MISSION COMPLETE",
    active: false,
    accent: "#ec4899",
    accentRgb: "236,72,153",
    gradient: "linear-gradient(135deg,#ec4899,#be185d)",
    bullets: [
      "Delivered structured coding instruction (Scratch, logic building) to diverse learner groups globally",
      "Sharpened communication, problem explanation & stakeholder-facing skills — direct foundation for PM work",
    ],
    chips: ["Instruction Design", "Communication", "Stakeholder Clarity"],
  },
  {
    side: "left",
    era: "JUN 2017 – JUN 2018",
    company: "AMAZON",
    role: "Customer Support Associate · Pune",
    status: "MISSION COMPLETE",
    active: false,
    accent: "#facc15",
    accentRgb: "250,204,21",
    gradient: "linear-gradient(135deg,#facc15,#f59e0b)",
    bullets: [
      "Demonstrated strong organisational & multitasking discipline in a high-volume, fast-paced environment",
      "Built empathy-first problem solving approach — directly informs my user-centric PM mindset today",
    ],
    chips: ["Customer Empathy", "High-Volume Ops", "Problem Solving"],
  },
];

/* ─────────────────────────────────────────
   HUD CORNERS
───────────────────────────────────────── */
function HudCorners({ accent }: { accent: string }) {
  const defs = [
    { top: 5, left: 5,    borderWidth: "1.5px 0 0 1.5px" },
    { top: 5, right: 5,   borderWidth: "1.5px 1.5px 0 0" },
    { bottom: 5, left: 5,  borderWidth: "0 0 1.5px 1.5px" },
    { bottom: 5, right: 5, borderWidth: "0 1.5px 1.5px 0" },
  ] as const;
  return (
    <>
      {defs.map((d, i) => (
        <div key={i} style={{
          position: "absolute", width: 7, height: 7,
          borderColor: accent, borderStyle: "solid", opacity: 0.55,
          ...d,
        }} />
      ))}
    </>
  );
}

/* ─────────────────────────────────────────
   MISSION CARD
───────────────────────────────────────── */
function MissionCard({ mission, index }: { mission: Mission; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const isLeft = mission.side === "left";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => setOpen(o => !o)}
      style={{
        flex: 1,
        maxWidth: "calc(50% - 30px)",
        position: "relative",
        cursor: "pointer",
        ...(isLeft ? { marginRight: 30 } : { marginLeft: 30 }),
      }}
    >
      {/* Gradient border via mask */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: 14, padding: 1.5,
        background: mission.gradient,
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
        opacity: open ? 1 : 0.55,
        transition: "opacity 0.3s",
        pointerEvents: "none",
      }} />

      {/* Connector to conduit */}
      <div style={{
        position: "absolute",
        top: 30,
        ...(isLeft ? { right: -30, background: `linear-gradient(90deg, ${mission.accent}, transparent)` }
                   : { left: -30,  background: `linear-gradient(270deg, ${mission.accent}, transparent)` }),
        width: 30, height: 1,
        opacity: open ? 0.7 : 0.2,
        transition: "opacity 0.3s",
      }} />

      {/* Glass body */}
      <motion.div
        whileHover={{ y: -3, boxShadow: `0 0 32px rgba(${mission.accentRgb},0.2)` }}
        style={{
          background: "rgba(2,6,23,0.92)",
          backdropFilter: "blur(20px)",
          borderRadius: 13,
          padding: "20px 18px 16px",
          position: "relative",
          overflow: "hidden",
          transition: "box-shadow 0.3s",
        }}
      >
        {/* Scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 36,
          background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.03),transparent)",
          animation: "tl_scan 5s ease-in-out infinite",
          pointerEvents: "none",
        }} />

        <HudCorners accent={mission.accent} />

        {/* Era */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 7.5, letterSpacing: 2,
          color: mission.accent, opacity: 0.6,
          marginBottom: 5, position: "relative", zIndex: 1,
        }}>
          {mission.era}
        </div>

        {/* Company */}
        <div style={{
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
          color: "#fff", marginBottom: 3,
          position: "relative", zIndex: 1,
        }}>
          {mission.company}
        </div>

        {/* Role */}
        <div style={{
          fontFamily: "'Exo 2', sans-serif",
          fontSize: 12, fontWeight: 300,
          color: mission.accent, letterSpacing: 0.5,
          marginBottom: 10, position: "relative", zIndex: 1,
        }}>
          {mission.role}
        </div>

        {/* Status badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          padding: "3px 9px", borderRadius: 999,
          background: `rgba(${mission.accentRgb},0.06)`,
          border: `1px solid ${mission.accent}`,
          marginBottom: 12, position: "relative", zIndex: 1,
        }}>
          <div style={{
            width: 5, height: 5, borderRadius: "50%",
            background: mission.accent,
            animation: mission.active ? "tl_blink 1.4s ease-in-out infinite" : "none",
          }} />
          <span style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7.5, letterSpacing: 1.5, color: mission.accent,
          }}>
            {mission.status}
          </span>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", height: 1,
          background: `linear-gradient(90deg,transparent,${mission.accent},transparent)`,
          opacity: 0.15, marginBottom: 12,
          position: "relative", zIndex: 1,
        }} />

        {/* Expand hint */}
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 8, letterSpacing: 2,
          color: `rgba(${mission.accentRgb},${open ? 0.8 : 0.4})`,
          display: "flex", alignItems: "center", gap: 6,
          transition: "color 0.2s",
          position: "relative", zIndex: 1,
          userSelect: "none",
        }}>
          {open ? "CLOSE BRIEF" : "VIEW MISSION BRIEF"}
          <motion.span
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.35 }}
            style={{ display: "inline-block", fontSize: 10 }}
          >
            ▼
          </motion.span>
        </div>

        {/* Expandable bullets */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="expand"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{ overflow: "hidden", position: "relative", zIndex: 1 }}
            >
              <div style={{ paddingTop: 14 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {mission.bullets.map((b, bi) => (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: bi * 0.05, duration: 0.3 }}
                      style={{
                        display: "flex", gap: 8, alignItems: "flex-start",
                        fontFamily: "'Exo 2', sans-serif",
                        fontSize: 11.5, color: "rgba(203,213,225,0.75)",
                        lineHeight: 1.55,
                      }}
                    >
                      <div style={{
                        flexShrink: 0, marginTop: 6,
                        width: 4, height: 4, borderRadius: "50%",
                        background: mission.accent,
                        boxShadow: `0 0 6px ${mission.accent}`,
                      }} />
                      {b}
                    </motion.div>
                  ))}
                </div>

                {/* Chips */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: 12 }}>
                  {mission.chips.map((chip, ci) => (
                    <motion.span
                      key={ci}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 + ci * 0.04 }}
                      style={{
                        fontFamily: "'Share Tech Mono', monospace",
                        fontSize: 7.5, letterSpacing: 1,
                        padding: "3px 8px", borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        color: "rgba(148,163,184,0.7)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {chip}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CONDUIT (animated vertical line)
───────────────────────────────────────── */
function PowerConduit({ inView }: { inView: boolean }) {
  return (
    <div style={{
      position: "absolute",
      left: "50%", top: 0, bottom: 0,
      width: 2,
      transform: "translateX(-50%)",
      background: "rgba(0,247,255,0.07)",
      zIndex: 0,
    }}>
      {/* Filling gradient */}
      <div style={{
        position: "absolute", left: 0, top: 0, width: "100%",
        background: "linear-gradient(180deg,#00f7ff,#7c3aed,#ec4899,#facc15)",
        height: inView ? "100%" : "0%",
        transition: "height 2s cubic-bezier(.16,1,.3,1) 0.2s",
      }} />
      {/* Travelling pulse */}
      {inView && (
        <div style={{
          position: "absolute", left: -3, width: 8, height: 24,
          background: "linear-gradient(180deg,transparent,#00f7ff,transparent)",
          borderRadius: 4,
          animation: "tl_pulse 3s ease-in-out 2.5s infinite",
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────
   NODE DOT
───────────────────────────────────────── */
function NodeDot({ mission, index, inView }: { mission: Mission; index: number; inView: boolean }) {
  return (
    <div style={{
      flexShrink: 0, width: 60,
      display: "flex", justifyContent: "center", alignItems: "flex-start",
      paddingTop: 22, position: "relative", zIndex: 2,
    }}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.1 + index * 0.1, duration: 0.4, type: "spring", stiffness: 300 }}
        style={{
          width: 16, height: 16, borderRadius: "50%",
          border: `2px solid ${mission.accent}`,
          background: "rgba(2,6,23,0.95)",
          boxShadow: `0 0 0 4px rgba(${mission.accentRgb},0.15), 0 0 20px ${mission.accent}`,
          position: "relative",
        }}
      >
        {mission.active && (
          <motion.div
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              border: `1px solid ${mission.accent}`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @keyframes tl_scan {
          0%{top:-36px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:calc(100% + 36px);opacity:0}
        }
        @keyframes tl_blink { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes tl_pulse {
          0%{top:-24px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0}
        }

        @media (max-width: 640px) {
          .tl-entry { flex-direction: column !important; }
          .tl-entry .tl-card { max-width: 100% !important; margin: 0 0 0 24px !important; }
          .tl-conduit { left: 16px !important; }
          .tl-node-wrap { width: 32px !important; position: absolute !important; left: 0 !important; }
        }
      `}</style>

      <section
        id="timeline"
        ref={sectionRef}
        style={{ padding: "100px 24px 80px", position: "relative" }}
      >
        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 70 }}
        >
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 4,
            color: "rgba(0,247,255,0.5)", marginBottom: 12,
          }}>
            // MISSION · LOG · DECLASSIFIED
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
            CAREER DOSSIER
          </h2>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* ── TIMELINE BODY ── */}
        <div style={{
          maxWidth: 860, margin: "0 auto",
          position: "relative",
        }}>
          {/* Power conduit */}
          <PowerConduit inView={inView} />

          {/* Mission rows */}
          {MISSIONS.map((mission, i) => {
            const isLeft = mission.side === "left";
            return (
              <div
                key={i}
                className="tl-entry"
                style={{
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-start",
                  marginBottom: 40,
                  zIndex: 1,
                  flexDirection: isLeft ? "row" : "row-reverse",
                }}
              >
                {/* CARD side */}
                <MissionCard mission={mission} index={i} />

                {/* NODE centre */}
                <NodeDot mission={mission} index={i} inView={inView} />

                {/* Spacer opposite side */}
                <div style={{ flex: 1 }} />
              </div>
            );
          })}
        </div>

      </section>
    </>
  );
}