"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const CATS = [
  {
    label: "PRODUCT",
    color: "#00f7ff",
    rgb: "0,247,255",
    skills: [
      "Roadmapping", "PRD Writing", "Prioritization", "User Stories",
      "Backlog Refinement", "Sprint Planning", "Risk Management",
      "Stakeholder Mgmt", "Training & Adoption", "Go-To-Market",
    ],
  },
  {
    label: "ANALYTICS",
    color: "#a855f7",
    rgb: "168,85,247",
    skills: [
      "A/B Testing", "Funnel Analysis", "OKR Frameworks", "North Star Metrics",
      "SQL Analytics", "Cohort Analysis", "Hypothesis Testing", "KPI Definition",
    ],
  },
  {
    label: "DESIGN",
    color: "#ec4899",
    rgb: "236,72,153",
    skills: [
      "Figma", "FigJam", "User Journey Mapping", "IA Design",
      "Wireframing", "Task Flow Design", "Usability Analysis", "Eraser.io",
    ],
  },
  {
    label: "TECHNICAL",
    color: "#facc15",
    rgb: "250,204,21",
    skills: [
      "Python", "Java", "SQL", "PostgreSQL", "Git / GitHub",
      "HTML · CSS", "Machine Learning", "Deep Learning", "LLMs · RAG", "Full SDLC",
    ],
  },
  {
    label: "SOFT SKILLS",
    color: "#38bdf8",
    rgb: "56,189,248",
    skills: [
      "Leadership", "Strategic Thinking", "Communication", "Empathy",
      "Decision-Making", "Adaptability", "Mentoring", "Problem-Solving",
    ],
  },
];

/* Branch label config: angle from vertical, text anchor, pixel offset from node */
const BRANCH_CONFIGS = [
  { deg: -76, labelAnchor: "end"    as CanvasTextAlign, ldx: -16, ldy:   0 },
  { deg: -38, labelAnchor: "end"    as CanvasTextAlign, ldx: -14, ldy: -12 },
  { deg:   0, labelAnchor: "center" as CanvasTextAlign, ldx:   0, ldy: -18 },
  { deg:  38, labelAnchor: "start"  as CanvasTextAlign, ldx:  14, ldy: -12 },
  { deg:  76, labelAnchor: "start"  as CanvasTextAlign, ldx:  16, ldy:   0 },
];

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface BNode {
  x: number; y: number;
  angle: number;
  cat: typeof CATS[0];
  labelAnchor: CanvasTextAlign;
  ldx: number; ldy: number;
}

/* ─────────────────────────────────────────
   SKILL PANEL (pure DOM — zero overlap)
───────────────────────────────────────── */
function SkillPanel({ openIdx }: { openIdx: number }) {
  if (openIdx < 0) {
    return (
      <div style={{
        height: "100%", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 12, opacity: 0.3,
      }}>
        <div style={{ fontSize: 28 }}>◈</div>
        <div style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 10, color: "rgba(0,247,255,0.6)",
          letterSpacing: 2, textAlign: "center", lineHeight: 1.8,
        }}>
          SELECT A BRANCH<br />TO VIEW SKILLS
        </div>
      </div>
    );
  }

  const cat = CATS[openIdx];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={openIdx}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -8 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", gap: 12,
          marginBottom: 22, paddingBottom: 16,
          borderBottom: "1px solid rgba(0,247,255,0.07)",
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: "50%", flexShrink: 0,
            background: cat.color,
            boxShadow: `0 0 10px ${cat.color}`,
          }} />
          <div style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: 13, fontWeight: 700, letterSpacing: 2,
            color: cat.color,
            textShadow: `0 0 14px ${cat.color}60`,
          }}>
            {cat.label}
          </div>
          <div style={{
            marginLeft: "auto",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, color: "rgba(148,163,184,0.5)",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "2px 8px", borderRadius: 999,
          }}>
            {cat.skills.length} SKILLS
          </div>
        </div>

        {/* Skill chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {cat.skills.map((skill, i) => (
            <SkillChip key={skill} skill={skill} cat={cat} index={i} />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function SkillChip({
  skill, cat, index,
}: {
  skill: string;
  cat: typeof CATS[0];
  index: number;
}) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.04, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 7,
        padding: "9px 14px", borderRadius: 9,
        border: `1px solid ${hov ? cat.color : `rgba(${cat.rgb},0.22)`}`,
        background: hov ? `rgba(${cat.rgb},0.1)` : `rgba(${cat.rgb},0.05)`,
        boxShadow: hov ? `0 0 14px rgba(${cat.rgb},0.2)` : "none",
        transform: hov ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.2s ease",
        cursor: "default",
      }}
    >
      {/* Hex diamond */}
      <div style={{
        width: 6, height: 6, flexShrink: 0,
        background: cat.color,
        clipPath: "polygon(50% 0%,100% 25%,100% 75%,50% 100%,0% 75%,0% 25%)",
        filter: hov ? `drop-shadow(0 0 4px ${cat.color})` : "none",
      }} />
      <span style={{
        fontFamily: "'Exo 2', sans-serif",
        fontSize: 13, fontWeight: 400,
        color: hov ? cat.color : "rgba(203,213,225,0.85)",
        whiteSpace: "nowrap",
        transition: "color 0.2s",
      }}>
        {skill}
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   CANVAS TREE
───────────────────────────────────────── */
function SkillTree({
  openIdx,
  onBranchClick,
}: {
  openIdx: number;
  onBranchClick: (i: number) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state     = useRef({
    animT: 0,
    openIdx: -1,
    hoveredBranch: -1,
    bnodes: [] as BNode[],
    rafId: 0,
    CW: 480,
    CH: 520,
  });

  /* Sync openIdx into ref so canvas loop sees it without re-registering */
  useEffect(() => {
    state.current.openIdx = openIdx;
  }, [openIdx]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const DPR = window.devicePixelRatio || 1;
    const CW = 480, CH = 520;
    state.current.CW = CW;
    state.current.CH = CH;

    canvas.width  = CW * DPR;
    canvas.height = CH * DPR;
    canvas.style.width  = `${CW}px`;
    canvas.style.height = `${CH}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(DPR, DPR);

    /* Geometry */
    const ROOT      = { x: CW / 2, y: CH * 0.87 };
    const TRUNK_TIP = { x: CW / 2, y: ROOT.y - CH * 0.36 };
    const bLen      = CH * 0.23;

    const bnodes: BNode[] = BRANCH_CONFIGS.map((cfg, i) => {
      const rad = (cfg.deg - 90) * Math.PI / 180;
      return {
        x:           TRUNK_TIP.x + Math.cos(rad) * bLen,
        y:           TRUNK_TIP.y + Math.sin(rad) * bLen,
        angle:       rad,
        cat:         CATS[i],
        labelAnchor: cfg.labelAnchor,
        ldx:         cfg.ldx,
        ldy:         cfg.ldy,
      };
    });
    state.current.bnodes = bnodes;

    function hexRgb(h: string) {
      return [
        parseInt(h.slice(1, 3), 16),
        parseInt(h.slice(3, 5), 16),
        parseInt(h.slice(5, 7), 16),
      ].join(",");
    }

    function draw() {
      const s = state.current;
      s.animT += 0.016;
      ctx.clearRect(0, 0, CW, CH);

      /* ── TRUNK ── */
      ctx.save();
      ctx.strokeStyle = "rgba(0,247,255,0.82)";
      ctx.lineWidth   = 4.5;
      ctx.lineCap     = "round";
      ctx.shadowColor = "rgba(0,247,255,0.5)";
      ctx.shadowBlur  = 22;
      ctx.beginPath();
      ctx.moveTo(ROOT.x, ROOT.y);
      ctx.lineTo(TRUNK_TIP.x, TRUNK_TIP.y);
      ctx.stroke();
      ctx.restore();

      /* Pulse travelling up trunk */
      const pct = (s.animT * 0.45) % 1;
      ctx.save();
      ctx.shadowColor = "#00f7ff";
      ctx.shadowBlur  = 18;
      ctx.beginPath();
      ctx.arc(
        ROOT.x + (TRUNK_TIP.x - ROOT.x) * pct,
        ROOT.y + (TRUNK_TIP.y - ROOT.y) * pct,
        3.5, 0, Math.PI * 2,
      );
      ctx.fillStyle = "#00f7ff";
      ctx.fill();
      ctx.restore();

      /* Trunk tip junction */
      ctx.save();
      ctx.shadowColor = "rgba(0,247,255,0.5)";
      ctx.shadowBlur  = 14;
      ctx.beginPath();
      ctx.arc(TRUNK_TIP.x, TRUNK_TIP.y, 6, 0, Math.PI * 2);
      ctx.fillStyle   = "rgba(0,247,255,0.2)";
      ctx.strokeStyle = "rgba(0,247,255,0.6)";
      ctx.lineWidth   = 1.5;
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      /* ── ROOT node ── */
      const rp = 0.6 + Math.sin(s.animT * 2.2) * 0.4;
      ctx.save();
      ctx.shadowColor = "rgba(0,247,255,0.6)";
      ctx.shadowBlur  = 24 * rp;
      ctx.beginPath();
      ctx.arc(ROOT.x, ROOT.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = "#00f7ff";
      ctx.fill();
      ctx.restore();

      /* Name — below root dot */
      ctx.save();
      ctx.textAlign    = "center";
      ctx.textBaseline = "top";
      ctx.font         = `900 13px 'Orbitron', sans-serif`;
      ctx.fillStyle    = "rgba(0,247,255,0.95)";
      ctx.shadowColor  = "rgba(0,247,255,0.5)";
      ctx.shadowBlur   = 14;
      ctx.fillText("VISHAL SINGH RANA", ROOT.x, ROOT.y + 20);
      ctx.font      = `300 9px 'Share Tech Mono', monospace`;
      ctx.fillStyle = "rgba(0,247,255,0.4)";
      ctx.shadowBlur = 0;
      ctx.fillText("AI PRODUCT MANAGER", ROOT.x, ROOT.y + 37);
      ctx.restore();

      /* ── BRANCHES + NODES ── */
      bnodes.forEach((bn, i) => {
        const isOpen = i === s.openIdx;
        const isHov  = i === s.hoveredBranch;

        /* Branch line */
        ctx.save();
        ctx.strokeStyle = bn.cat.color;
        ctx.lineWidth   = isOpen ? 2.8 : 2;
        ctx.lineCap     = "round";
        ctx.shadowColor = bn.cat.color;
        ctx.shadowBlur  = isOpen ? 20 : 10;
        ctx.beginPath();
        ctx.moveTo(TRUNK_TIP.x, TRUNK_TIP.y);
        ctx.lineTo(bn.x, bn.y);
        ctx.stroke();
        ctx.restore();

        /* Node circle */
        const r = isOpen || isHov ? 12 : 8;
        ctx.save();
        ctx.beginPath();
        ctx.arc(bn.x, bn.y, r, 0, Math.PI * 2);
        ctx.fillStyle   = isOpen ? bn.cat.color : `rgba(${hexRgb(bn.cat.color)},0.15)`;
        ctx.strokeStyle = bn.cat.color;
        ctx.lineWidth   = 2;
        ctx.shadowColor = bn.cat.color;
        ctx.shadowBlur  = isOpen ? 28 : 14;
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        /* Label */
        ctx.save();
        ctx.font         = `700 10px 'Orbitron', sans-serif`;
        ctx.fillStyle    = bn.cat.color;
        ctx.shadowColor  = bn.cat.color;
        ctx.shadowBlur   = isOpen ? 14 : 6;
        ctx.textAlign    = bn.labelAnchor;
        ctx.textBaseline = "middle";
        ctx.fillText(bn.cat.label, bn.x + bn.ldx, bn.y + bn.ldy);
        ctx.restore();
      });

      s.rafId = requestAnimationFrame(draw);
    }

    state.current.rafId = requestAnimationFrame(draw);

    /* ── EVENTS ── */
    function branchHit(mx: number, my: number) {
      const sx = CW / canvas!.getBoundingClientRect().width;
      const sy = CH / canvas!.getBoundingClientRect().height;
      for (let i = 0; i < bnodes.length; i++) {
        if (Math.hypot((mx) * sx - bnodes[i].x, (my) * sy - bnodes[i].y) < 24) return i;
      }
      return -1;
    }

    const onMove = (e: MouseEvent) => {
      const r   = canvas!.getBoundingClientRect();
      const hit = branchHit(e.clientX - r.left, e.clientY - r.top);
      state.current.hoveredBranch = hit;
      canvas!.style.cursor = hit >= 0 ? "pointer" : "default";
    };

    const onClick = (e: MouseEvent) => {
      const r   = canvas!.getBoundingClientRect();
      const hit = branchHit(e.clientX - r.left, e.clientY - r.top);
      if (hit < 0) return;
      onBranchClick(hit);
    };

    const onLeave = () => { state.current.hoveredBranch = -1; };

    canvas.addEventListener("mousemove",  onMove);
    canvas.addEventListener("click",      onClick);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(state.current.rafId);
      canvas.removeEventListener("mousemove",  onMove);
      canvas.removeEventListener("click",      onClick);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Skills() {
  const [openIdx, setOpenIdx] = useState(-1);

  const handleBranchClick = (i: number) => {
    setOpenIdx(prev => prev === i ? -1 : i);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @property --sk-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes sk_spin  { to { --sk-ang: 360deg; } }
        @keyframes sk_blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        .sk-shell-border {
          position: absolute; inset: 0; border-radius: 18px; padding: 1.5px;
          background: conic-gradient(from var(--sk-ang),#00f7ff,#7c3aed,#ec4899,#facc15,#00f7ff);
          animation: sk_spin 5s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }

        @media (max-width: 700px) {
          .sk-split { flex-direction: column !important; }
          .sk-tree-side { flex: none !important; width: 100% !important; border-right: none !important; border-bottom: 1px solid rgba(0,247,255,0.07) !important; }
          .sk-tree-side canvas { width: 100% !important; }
        }
      `}</style>

      <section id="skills" style={{ padding: "100px 24px 80px" }}>

        {/* Header */}
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
            // NEURAL · SKILL · TREE · v2.5
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(22px,4vw,36px)",
            fontWeight: 900, letterSpacing: 3,
            background: "linear-gradient(135deg,#22d3ee,#6366f1,#a855f7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 20px rgba(0,247,255,0.3))",
          }}>
            CAPABILITY TREE
          </h2>
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(90deg,transparent,#00f7ff,transparent)",
            margin: "16px auto 0",
          }} />
        </motion.div>

        {/* Shell */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            maxWidth: 1020, margin: "0 auto",
            position: "relative",
            borderRadius: 18,
            background: "rgba(2,6,23,0.96)",
            backdropFilter: "blur(24px)",
            overflow: "hidden",
          }}
        >
          <div className="sk-shell-border" />

          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 18px",
            borderBottom: "1px solid rgba(0,247,255,0.07)",
            background: "rgba(0,247,255,0.02)",
          }}>
            <div style={{ display: "flex", gap: 5 }}>
              {(["#ff5f57","#febc2e","#28c840"] as const).map((c, i) => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: "50%",
                  background: c, boxShadow: `0 0 5px ${c}`,
                }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: "center",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9, color: "rgba(0,247,255,0.35)", letterSpacing: 2,
            }}>
              NEURAL-OS · VISHAL.PM · SKILL-TREE.SYS
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: "#22c55e", boxShadow: "0 0 6px #22c55e",
                animation: "sk_blink 1.8s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 8, color: "rgba(34,197,94,0.55)", letterSpacing: 1.5,
              }}>
                5 MODULES · 44 SKILLS
              </span>
            </div>
          </div>

          {/* Split layout */}
          <div
            className="sk-split"
            style={{ display: "flex", alignItems: "stretch", minHeight: 520 }}
          >
            {/* LEFT — canvas tree */}
            <div
              className="sk-tree-side"
              style={{
                flex: "0 0 480px",
                borderRight: "1px solid rgba(0,247,255,0.07)",
              }}
            >
              <SkillTree openIdx={openIdx} onBranchClick={handleBranchClick} />
            </div>

            {/* RIGHT — skill panel */}
            <div style={{
              flex: 1,
              padding: "28px 24px",
              display: "flex",
              flexDirection: "column",
              minWidth: 0,
            }}>
              <SkillPanel openIdx={openIdx} />
            </div>
          </div>

          {/* Footer */}
          <div style={{
            padding: "10px 20px",
            borderTop: "1px solid rgba(0,247,255,0.06)",
            background: "rgba(0,247,255,0.02)",
            textAlign: "center",
          }}>
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, letterSpacing: 2,
              color: "rgba(0,247,255,0.3)",
            }}>
              CLICK A BRANCH NODE TO EXPAND · CLICK AGAIN TO COLLAPSE
            </span>
          </div>

        </motion.div>
      </section>
    </>
  );
}