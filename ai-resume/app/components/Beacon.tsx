"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const ROLE_TAGS = [
  "AI-NATIVE PRODUCTS",
  "GOVTECH",
  "ENTERPRISE AI",
  "POST-PMF STAGE",
  "HIGH OWNERSHIP",
];



/* ─────────────────────────────────────────
   RADAR CANVAS
───────────────────────────────────────── */
function RadarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx    = canvas.getContext("2d")!;
    const CW = 600, CH = 600;
    canvas.width  = CW;
    canvas.height = CH;
    const cx = CW / 2, cy = CH / 2;

    const BLIPS = [
      { a: 0.8, r: 140 },
      { a: 2.3, r: 200 },
      { a: 4.1, r: 100 },
      { a: 5.0, r: 220 },
    ];

    let sweep = 0;
    let raf   = 0;

    const draw = () => {
      ctx.clearRect(0, 0, CW, CH);

      /* Rings */
      [60, 120, 180, 240, 280].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(34,197,94,0.25)";
        ctx.lineWidth   = 1;
        ctx.stroke();
      });

      /* Cross hair */
      ctx.strokeStyle = "rgba(34,197,94,0.15)";
      ctx.lineWidth   = 1;
      ctx.beginPath(); ctx.moveTo(cx - 280, cy); ctx.lineTo(cx + 280, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, cy - 280); ctx.lineTo(cx, cy + 280); ctx.stroke();

      /* Sweep trail */
      sweep += 0.025;
      for (let a = 0; a < Math.PI / 2; a += 0.02) {
        const angle = sweep - a;
        const alpha = (1 - a / (Math.PI / 2)) * 0.55;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 280, angle, angle + 0.022);
        ctx.closePath();
        ctx.fillStyle = `rgba(34,197,94,${alpha})`;
        ctx.fill();
      }

      /* Sweep line */
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * 280, cy + Math.sin(sweep) * 280);
      ctx.strokeStyle = "rgba(34,197,94,0.9)";
      ctx.lineWidth   = 1.5;
      ctx.stroke();

      /* Blips */
      BLIPS.forEach(b => {
        const diff = ((sweep - b.a) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const fade = Math.max(0, 1 - diff / (Math.PI * 0.8));
        if (fade < 0.01) return;
        ctx.beginPath();
        ctx.arc(
          cx + Math.cos(b.a) * b.r,
          cy + Math.sin(b.a) * b.r,
          4, 0, Math.PI * 2,
        );
        ctx.fillStyle   = `rgba(34,197,94,${fade * 0.9})`;
        ctx.shadowColor = "#22c55e";
        ctx.shadowBlur  = 8 * fade;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        opacity: 0.18,
        width: 600, height: 600,
      }}
    />
  );
}



/* ─────────────────────────────────────────
   MAIN SECTION
───────────────────────────────────────── */
export default function Beacon() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @property --bc-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes bc_spin  { to { --bc-ang: 360deg; } }
        @keyframes bc_pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.3;transform:scale(1.5)} }
        @keyframes bc_grad  { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

        .bc-card-border {
          position: absolute; inset: 0; border-radius: 20px; padding: 2px;
          background: linear-gradient(135deg, #22c55e, #00f7ff, #22c55e);
          background-size: 200% 200%;
          animation: bc_grad 3s ease infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          pointer-events: none;
        }
      `}</style>

      <section
        id="beacon"
        style={{
          padding: "100px 24px 80px",
          display: "flex", flexDirection: "column",
          alignItems: "center",
          position: "relative", overflow: "hidden",
        }}
      >
        {/* Radar background */}
        <RadarCanvas />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", position: "relative", zIndex: 2 }}
        >
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, letterSpacing: 4,
            color: "rgba(34,197,94,0.6)", marginBottom: 12,
          }}>
            // DEPLOYMENT · STATUS · ACTIVE
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', sans-serif",
            fontSize: "clamp(24px,4vw,40px)",
            fontWeight: 900, letterSpacing: 3,
            background: "linear-gradient(135deg,#22c55e,#00f7ff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 24px rgba(34,197,94,0.35))",
            marginBottom: 16,
          }}>
            AVAILABLE FOR DEPLOYMENT
          </h2>
        </motion.div>

        {/* Status card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            marginTop: 40, zIndex: 2,
            width: "min(500px, 90vw)",
          }}
        >
          <div className="bc-card-border" />
          <div style={{
            background: "rgba(2,6,23,0.96)",
            borderRadius: 18,
            padding: "40px 40px",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            {/* HUD corners */}
            {[
              { top: 8, left: 8,    borderWidth: "2px 0 0 2px"   },
              { top: 8, right: 8,   borderWidth: "2px 2px 0 0"   },
              { bottom: 8, left: 8,  borderWidth: "0 0 2px 2px"  },
              { bottom: 8, right: 8, borderWidth: "0 2px 2px 0"  },
            ].map((b, i) => (
              <div key={i} style={{
                position: "absolute", width: 12, height: 12,
                borderStyle: "solid", borderColor: "rgba(34,197,94,0.5)",
                ...b,
              }} />
            ))}

            {/* Inner radial glow */}
            <div style={{
              position: "absolute", inset: 0,
              background: "radial-gradient(ellipse at 50% 0%,rgba(34,197,94,0.06),transparent 70%)",
              pointerEvents: "none",
            }} />

            {/* Live indicator */}
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "center", gap: 8, marginBottom: 20,
              position: "relative", zIndex: 1,
            }}>
              <div style={{
                width: 8, height: 8, borderRadius: "50%",
                background: "#22c55e", boxShadow: "0 0 12px #22c55e",
                animation: "bc_pulse 1.4s ease-in-out infinite",
              }} />
              <span style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 10, color: "rgba(34,197,94,0.8)", letterSpacing: 2,
              }}>
                SIGNAL ACTIVE · OPEN TO OPPORTUNITIES
              </span>
            </div>

            {/* Big status */}
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(18px,3vw,28px)",
              fontWeight: 900, letterSpacing: 3,
              color: "#22c55e",
              textShadow: "0 0 24px rgba(34,197,94,0.5)",
              marginBottom: 10, position: "relative", zIndex: 1,
            }}>
              READY TO SHIP
            </div>

            <div style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: 14, fontWeight: 300,
              color: "rgba(203,213,225,0.65)",
              marginBottom: 28, position: "relative", zIndex: 1,
            }}>
              Seeking APM / PM / AI PM roles where intelligence is the product
            </div>

            {/* Role tags */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8,
              justifyContent: "center", marginBottom: 28,
              position: "relative", zIndex: 1,
            }}>
              {ROLE_TAGS.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 9, letterSpacing: 2,
                    padding: "5px 12px", borderRadius: 999,
                    border: "1px solid rgba(34,197,94,0.3)",
                    color: "rgba(34,197,94,0.8)",
                    background: "rgba(34,197,94,0.05)",
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Manifesto */}
            <div style={{
              borderTop: "1px solid rgba(0,247,255,0.08)",
              paddingTop: 22,
              fontFamily: "'Exo 2', sans-serif",
              fontSize: 15, fontWeight: 300, fontStyle: "italic",
              color: "rgba(0,247,255,0.55)",
              letterSpacing: 0.5,
              position: "relative", zIndex: 1,
            }}>
              "I thrive where messy real-world problems meet structured product thinking."
            </div>
          </div>
        </motion.div>

      </section>
    </>
  );
}