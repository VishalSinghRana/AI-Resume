"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   TICKER CONTENT
───────────────────────────────────────── */
const TICKER_ITEMS = [
  "VISHAL SINGH RANA",
  "AI PRODUCT MANAGER",
  "1M+ USERS SERVED",
  "20+ FEATURES SHIPPED",
  "99% UPTIME",
  "GOA ELECTRONICS LTD",
  "SHIP THINGS THAT ACTUALLY GET USED",
  "OPEN TO AI PM ROLES",
];

const TICKER_TEXT = TICKER_ITEMS.join("  ·  ") + "  ·  " + TICKER_ITEMS.join("  ·  ");

/* ─────────────────────────────────────────
   CARRIER WAVE SVG
───────────────────────────────────────── */
function CarrierWave() {
  return (
    <div style={{ width: "100%", height: 40, overflow: "hidden", opacity: 0.35 }}>
      <svg
        viewBox="0 0 2400 40"
        preserveAspectRatio="none"
        style={{
          width: "200%", height: "100%",
          animation: "footer_wave 8s linear infinite",
        }}
      >
        <path
          d={Array.from({ length: 40 }, (_, i) => {
            const x1 = i * 60;
            const x2 = x1 + 30;
            const x3 = x1 + 60;
            return `${i === 0 ? "M" : "Q"}${x1},20 ${x2},${i % 2 === 0 ? 5 : 35} Q${x2 + 15},${i % 2 === 0 ? 35 : 5} ${x3},20`;
          }).join(" ")}
          fill="none"
          stroke="rgba(0,247,255,0.6)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   SCROLL TO TOP BUTTON
───────────────────────────────────────── */
function ScrollTop() {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", gap: 6,
        cursor: "pointer",
      }}
    >
      <motion.div
        animate={{ y: hov ? -3 : 0 }}
        transition={{ duration: 0.2 }}
        style={{
          width: 38, height: 38, borderRadius: "50%",
          border: `1px solid ${hov ? "#00f7ff" : "rgba(0,247,255,0.25)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: hov ? "rgba(0,247,255,0.08)" : "rgba(0,247,255,0.03)",
          boxShadow: hov ? "0 0 20px rgba(0,247,255,0.3)" : "none",
          transition: "all 0.2s",
          fontSize: 16, color: "#00f7ff",
        }}
      >
        ↑
      </motion.div>
      <span style={{
        fontFamily: "'Share Tech Mono', monospace",
        fontSize: 8, letterSpacing: 2,
        color: hov ? "rgba(0,247,255,0.7)" : "rgba(0,247,255,0.3)",
        transition: "color 0.2s",
      }}>
        BACK TO TOP
      </span>
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN FOOTER
───────────────────────────────────────── */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @keyframes footer_ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes footer_wave   { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes footer_signal { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes footer_scan   {
          0%{top:0;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:100%;opacity:0}
        }
      `}</style>

      <footer style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,247,255,0.07)",
      }}>
        {/* Scan line */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg,transparent,rgba(0,247,255,0.12),transparent)",
          animation: "footer_scan 6s ease-in-out infinite",
          pointerEvents: "none", zIndex: 10,
        }} />

        {/* ── TICKER ── */}
        <div style={{
          background: "rgba(0,247,255,0.03)",
          borderBottom: "1px solid rgba(0,247,255,0.07)",
          padding: "10px 0", overflow: "hidden",
          whiteSpace: "nowrap",
        }}>
          <div style={{
            display: "inline-block",
            animation: "footer_ticker 28s linear infinite",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9, color: "rgba(0,247,255,0.35)",
            letterSpacing: 2,
          }}>
            {TICKER_TEXT}&nbsp;&nbsp;&nbsp;
          </div>
        </div>

        {/* ── MAIN ROW ── */}
        <div style={{
          padding: "48px 40px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
          position: "relative", zIndex: 2,
        }}>

          {/* LEFT — branding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 22, fontWeight: 900, letterSpacing: 4,
              color: "#00f7ff",
              textShadow: "0 0 20px rgba(0,247,255,0.4)",
              marginBottom: 6,
            }}>
              VSR
            </div>
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9, letterSpacing: 2,
              color: "rgba(0,247,255,0.35)",
            }}>
              AI · PM · v2.5 · GOA · INDIA
            </div>
          </motion.div>

          {/* CENTRE — manifesto */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ flex: 1, textAlign: "center", minWidth: 200 }}
          >
            <div style={{
              fontFamily: "'Exo 2', sans-serif",
              fontSize: 13, fontWeight: 300, fontStyle: "italic",
              color: "rgba(148,163,184,0.45)",
              lineHeight: 1.7,
            }}>
              "Ship things that actually get used."
            </div>
          </motion.div>

          {/* RIGHT — scroll to top */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ScrollTop />
          </motion.div>

        </div>

        {/* ── CARRIER WAVE ── */}
        <CarrierWave />

        {/* ── BASE STRIP ── */}
        <div style={{
          padding: "14px 40px",
          borderTop: "1px solid rgba(0,247,255,0.06)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          background: "rgba(0,247,255,0.01)",
        }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8, color: "rgba(148,163,184,0.25)",
            letterSpacing: 1.5,
          }}>
            © {year} VISHAL SINGH RANA · BUILT WITH PURPOSE · ALL SYSTEMS OPERATIONAL
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#22c55e", boxShadow: "0 0 6px #22c55e",
              animation: "footer_signal 2s ease-in-out infinite",
            }} />
            <span style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 8, color: "rgba(34,197,94,0.4)",
              letterSpacing: 1.5,
            }}>
              TRANSMISSION COMPLETE · SIGNAL END
            </span>
          </div>
        </div>

      </footer>
    </>
  );
}