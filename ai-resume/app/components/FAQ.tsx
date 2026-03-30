"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   DATA — Smart Q&A from resume
───────────────────────────────────────── */
interface FAQItem {
  color: string;
  rgb: string;
  q: string;
  a: string;
  chips: string[];
}

const FAQS: FAQItem[] = [
  {
    color: "#00f7ff",
    rgb: "0,247,255",
    q: "You've been at the same company for 3+ years. Why should we believe you can operate in a different environment?",
    a: "Fair challenge. But this wasn't a comfortable legacy setup — I stepped into a 1M+ user voter platform with no PM processes, no adoption playbook, and fixed election deadlines. I built the product roadmap, defined user journeys and prioritization frameworks, and led 70+ enablement sessions to drive adoption, while navigating senior government stakeholders (CEO Goa, DEOs, EROs, BLOs) with zero tolerance for ambiguity. That's the same execution muscle any fast-moving company needs — new domain, same discipline.",
    chips: ["Zero-to-one Ownership", "Stakeholder Navigation", "Ambiguity Tolerance"],
  },
  {
    color: "#a855f7",
    rgb: "168,85,247",
    q: "What makes you different from a PM who just writes tickets and runs standups?",
    a: "I close the loop between data and delivery. I didn't just define the problem — I pulled support logs, identified the top friction patterns, prioritised the right self-service fixes, and measured the 30% query reduction that followed. I also came up as a full-stack engineer, so I can pressure-test estimates, spot technical debt risks in a PRD, and write SQL to validate my own hypotheses without waiting on a data team. That combination — product thinking plus engineering depth plus analytics — is rare.",
    chips: ["Data-Driven Prioritization", "SQL Self-Sufficiency", "Technical PM", "Support Analytics"],
  },
  {
    color: "#ec4899",
    rgb: "236,72,153",
    q: "How do you handle product decisions when stakeholders have completely conflicting demands?",
    a: "I've lived this. EROs wanted compliance-first features, users wanted friction-free flows, and engineering had capacity constraints — all at once, with an election date on the calendar. My approach: anchor every tradeoff to a shared north star metric, make the cost of each option explicit, and document the decision with a clear rationale. I don't let alignment be a vibe — I make it a structured conversation. Sometimes the answer is 'we do X now and Y afterwards'; sometimes it's 'we don't do Y at all, and here's why.' Either way, stakeholders leave the room knowing what's happening and why.",
    chips: ["Conflict Resolution", "Tradeoff Frameworks", "Stakeholder Alignment", "Decision Docs"],
  },
  {
    color: "#facc15",
    rgb: "250,204,21",
    q: "You mention AI/ML skills — are those real, or resume padding?",
    a: "Real, with appropriate honesty. I hold certifications in Machine Learning (Applied AI) and have hands-on exposure to ML pipelines, deep learning, and computer vision. I understand embeddings, RAG architectures, LLM fine-tuning, and agent patterns at the level a PM needs to — enough to write technically credible PRDs, evaluate vendor claims, and have meaningful conversations with AI engineers without bluffing. I'm not an MLE. But I'm the PM who actually reads the model card, asks the right inference latency questions, and knows when 'just use GPT-4' is and isn't the right answer.",
    chips: ["ML Foundations", "LLMs & RAG", "Prompt Engineering", "AI Product Strategy"],
  },
  {
    color: "#38bdf8",
    rgb: "56,189,248",
    q: "What's your biggest failure as a PM and what did you actually learn from it?",
    a: "Early in my PM role I shipped a feature that technically met the acceptance criteria but completely missed the user. I'd defined the 'what' from stakeholder requirements without enough field validation — the election officials we built for didn't use it the way we assumed. Adoption was near zero for two weeks. I went to the field, sat with actual BLOs, watched them work, and realised the flow was three steps longer than their mental model. We shipped a revised version in the next release and adoption recovered. The lesson: acceptance criteria are a floor, not a ceiling. User behaviour is the only real acceptance test.",
    chips: ["Field Research", "User Empathy", "Rapid Iteration", "Honest Post-Mortems"],
  },
  {
    color: "#22c55e",
    rgb: "34,197,94",
    q: "What kind of role and company are you looking for next?",
    a: "I want to work on AI-native products where the intelligence layer is the product, not a bolt-on. Ideally, a team that’s post-PMF but still scrappy enough that a PM’s decisions visibly move the needle — not buried under layers of approvals. I’m especially drawn to enterprise and platform products where adoption, usability, and real-world execution matter as much as the tech itself. Having worked on systems serving 1M+ users and driven adoption and usability improvements, I thrive at the intersection of messy real-world constraints and structured product execution. If your team is serious about building AI that actually gets used at scale, that’s where I do my best work.",
    chips: ["AI-Native Products", "Saas/Paas", "Post-PMF Stage", "High Ownership"],
  },
];

/* ─────────────────────────────────────────
   PROMPT CURSOR
───────────────────────────────────────── */
function BlinkCursor() {
  return (
    <span style={{
      display: "inline-block",
      width: 7, height: 13,
      background: "rgba(0,247,255,0.7)",
      animation: "faq_blink 1s ease-in-out infinite",
      verticalAlign: "middle",
      marginLeft: 3,
      borderRadius: 1,
    }} />
  );
}

/* ─────────────────────────────────────────
   FAQ ITEM
───────────────────────────────────────── */
function FAQRow({ item, index, open, onToggle }: {
  item: FAQItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{
        borderBottom: "1px solid rgba(0,247,255,0.05)",
      }}
    >
      {/* Question row */}
      <div
        onClick={onToggle}
        style={{
          display: "flex", alignItems: "flex-start", gap: 14,
          padding: "20px 22px 18px",
          cursor: "pointer",
          background: open ? `rgba(${item.rgb},0.03)` : "transparent",
          transition: "background 0.2s",
        }}
      >
        {/* Index badge */}
        <div style={{
          flexShrink: 0,
          width: 28, height: 28, borderRadius: 7,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Share Tech Mono', monospace", fontSize: 9,
          border: `1px solid ${open ? item.color : "rgba(0,247,255,0.15)"}`,
          color: open ? item.color : "rgba(0,247,255,0.4)",
          background: open ? `rgba(${item.rgb},0.08)` : "rgba(0,247,255,0.04)",
          boxShadow: open ? `0 0 10px rgba(${item.rgb},0.2)` : "none",
          transition: "all 0.25s",
          marginTop: 1,
        }}>
          {`Q${String(index + 1).padStart(2, "0")}`}
        </div>

        {/* Question text */}
        <div style={{
          flex: 1,
          fontFamily: "'Orbitron', sans-serif",
          fontSize: 11.5, fontWeight: 600, letterSpacing: 1,
          color: open ? item.color : "rgba(203,213,225,0.8)",
          lineHeight: 1.5,
          textShadow: open ? `0 0 14px rgba(${item.rgb},0.35)` : "none",
          transition: "all 0.25s",
        }}>
          {item.q}
        </div>

        {/* Chevron */}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            flexShrink: 0,
            width: 22, height: 22, borderRadius: 6,
            border: `1px solid ${open ? item.color : "rgba(255,255,255,0.07)"}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 9,
            color: open ? item.color : "rgba(148,163,184,0.4)",
            background: open ? `rgba(${item.rgb},0.08)` : "transparent",
            transition: "border-color 0.25s, color 0.25s, background 0.25s",
            marginTop: 3,
          }}
        >
          ▼
        </motion.div>
      </div>

      {/* Answer panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ padding: "0 22px 22px 64px", position: "relative" }}>

              {/* Left accent bar */}
              <div style={{
                position: "absolute",
                left: 64, top: 0, bottom: 14,
                width: 2,
                background: `linear-gradient(180deg,${item.color},transparent)`,
                borderRadius: 1, opacity: 0.4,
              }} />

              {/* Terminal prompt + answer */}
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}
              >
                <span style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 10, color: `rgba(${item.rgb},0.6)`,
                  whiteSpace: "nowrap", flexShrink: 0, marginTop: 2,
                }}>
                  AI-PM:~$
                </span>
                <p style={{
                  fontFamily: "'Exo 2', sans-serif",
                  fontSize: 13, fontWeight: 300,
                  color: "rgba(203,213,225,0.82)",
                  lineHeight: 1.7, letterSpacing: 0.2,
                }}>
                  {item.a}
                </p>
              </motion.div>

              {/* Chips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                style={{ display: "flex", flexWrap: "wrap", gap: 6 }}
              >
                {item.chips.map((chip, ci) => (
                  <motion.span
                    key={ci}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 + ci * 0.05 }}
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: 8, letterSpacing: 1.5,
                      padding: "3px 9px", borderRadius: 999,
                      border: `1px solid rgba(${item.rgb},0.25)`,
                      color: `rgba(${item.rgb},0.8)`,
                      background: `rgba(${item.rgb},0.06)`,
                    }}
                  >
                    {chip}
                  </motion.span>
                ))}
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIdx(prev => prev === i ? null : i);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @property --faq-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes faq_spin  { to { --faq-ang: 360deg; } }
        @keyframes faq_blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes faq_sdot  { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .faq-shell-border {
          position: absolute; inset: 0; border-radius: 18px; padding: 1.5px;
          background: conic-gradient(from var(--faq-ang), #00f7ff, #7c3aed, #ec4899, #facc15, #00f7ff);
          animation: faq_spin 5s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
          box-shadow: 0 0 40px rgba(0,247,255,0.15);
        }
      `}</style>

      <section id="faq" style={{ padding: "100px 24px 80px" }}>

        {/* ── HEADER ── */}
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
            // RECRUITER · QUERY · INTERFACE
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
            FREQUENTLY ASKED
          </h2>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* ── SHELL ── */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            maxWidth: 820, margin: "0 auto",
            position: "relative",
            borderRadius: 18,
            background: "rgba(2,6,23,0.96)",
            backdropFilter: "blur(24px)",
            overflow: "hidden",
          }}
        >
          <div className="faq-shell-border" />

          {/* ── TITLE BAR ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "11px 18px",
            background: "rgba(0,247,255,0.03)",
            borderBottom: "1px solid rgba(0,247,255,0.07)",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {[
                { bg: "#ff5f57" },
                { bg: "#febc2e" },
                { bg: "#28c840" },
              ].map((d, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: d.bg, boxShadow: `0 0 6px ${d.bg}`,
                }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: "center",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9, color: "rgba(0,247,255,0.35)", letterSpacing: 2,
            }}>
              VSR.PM · FAQ · QUERY-ENGINE.SYS
            </div>
          </div>

          {/* ── PROMPT BAR ── */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "12px 20px",
            background: "rgba(0,247,255,0.02)",
            borderBottom: "1px solid rgba(0,247,255,0.06)",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, color: "rgba(0,247,255,0.5)",
              whiteSpace: "nowrap",
            }}>
              RECRUITER@AI-PM:~$
            </span>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10, color: "rgba(203,213,225,0.4)", letterSpacing: 1,
            }}>
              ask --candidate="Vishal Singh Rana" --mode=honest
            </span>
            <BlinkCursor />
          </div>

          {/* ── FAQ ROWS ── */}
          <div>
            {FAQS.map((item, i) => (
              <FAQRow
                key={i}
                item={item}
                index={i}
                open={openIdx === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>

          {/* ── FOOTER ── */}
          <div style={{
            padding: "13px 22px",
            borderTop: "1px solid rgba(0,247,255,0.06)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "rgba(0,247,255,0.02)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#22c55e", boxShadow: "0 0 6px #22c55e",
                animation: "faq_sdot 1.8s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, color: "rgba(34,197,94,0.55)", letterSpacing: 1.5,
              }}>
                QUERY ENGINE ACTIVE · RESPONSE TIME &lt; 1ms
              </span>
            </div>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, color: "rgba(0,247,255,0.3)", letterSpacing: 1.5,
            }}>
              {FAQS.length} QUERIES INDEXED
            </span>
          </div>

        </motion.div>
      </section>
    </>
  );
}