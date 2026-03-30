"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────── */
const NAV_LINKS = [
  { label: "HOME",       href: "#hero",     tag: "INIT",  code: "01" },
  { label: "IMPACT",     href: "#metrics",  tag: "KPI",   code: "02" },
  { label: "EXPERIENCE", href: "#timeline", tag: "LOG",   code: "03" },
  { label: "SKILLS",     href: "#skills",   tag: "SYS",   code: "04" },
  { label: "FAQ",        href: "#faq",      tag: "QUERY", code: "05" },
];

const AI_TAGS = [
  "GPT-4o", "Claude 4.6", "LangChain", "RAG", "RLHF",
  "Embeddings", "Fine-tuning", "AI Agents", "MCP", "MLOps",
  "Roadmaps", "OKRs", "A/B Tests", "Inference",
];

const WAVE_HEIGHTS = [9, 14, 7, 17, 11, 15, 8, 13, 10, 16, 9];
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%";

/* ─────────────────────────────────────────
   NEURAL CANVAS — animated floating nodes
───────────────────────────────────────── */
function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 22;
    const nodes = Array.from({ length: N }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.45,
      vy:    (Math.random() - 0.5) * 0.45,
      phase: Math.random() * Math.PI * 2,
      r:     Math.random() * 1.4 + 0.7,
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.phase += 0.022;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 125) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,247,255,${(1 - d / 125) * 0.4})`;
            ctx.lineWidth = 0.65;
            ctx.stroke();
          }
        }
      }

      nodes.forEach(n => {
        const g = (Math.sin(n.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + g * 1.6, 0, Math.PI * 2);
        ctx.fillStyle    = `rgba(0,247,255,${0.4 + g * 0.6})`;
        ctx.shadowColor  = "#00f7ff";
        ctx.shadowBlur   = 8 + g * 12;
        ctx.fill();
        ctx.shadowBlur   = 0;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        borderRadius: "inherit",
        opacity: 0.5,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   GLITCH TEXT — scrambles letters on hover
───────────────────────────────────────── */
function GlitchText({ text }: { text: string }) {
  const [out, setOut]   = useState(text);
  const timer           = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let i = 0;
    clearInterval(timer.current!);
    timer.current = setInterval(() => {
      setOut(
        text.split("").map((ch, idx) =>
          idx < i
            ? ch
            : ch === " "
            ? " "
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join("")
      );
      i += 0.5;
      if (i >= text.length) {
        clearInterval(timer.current!);
        setOut(text);
      }
    }, 28);
  };

  return (
    <span onMouseEnter={scramble} style={{ cursor: "default" }}>
      {out}
    </span>
  );
}

/* ─────────────────────────────────────────
   AI TICKER — cycles AI/PM buzzwords
───────────────────────────────────────── */
function AITicker() {
  const [idx,  setIdx]  = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % AI_TAGS.length);
        setFade(true);
      }, 260);
    }, 1900);
    return () => clearInterval(t);
  }, []);

  return (
    <span style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 8,
      color: "rgba(0,247,255,0.5)",
      letterSpacing: 1.5,
      display: "flex", alignItems: "center", gap: 4,
    }}>
      <span style={{ color: "#7c3aed" }}>▶</span>
      <span style={{
        opacity: fade ? 1 : 0,
        transition: "opacity 0.26s",
        minWidth: 70,
        display: "inline-block",
      }}>
        {AI_TAGS[idx]}
      </span>
    </span>
  );
}

/* ─────────────────────────────────────────
   WAVEFORM — animated bars
───────────────────────────────────────── */
function Waveform() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 20 }}>
      {WAVE_HEIGHTS.map((h, i) => (
        <div
          key={i}
          style={{
            width: 2.5, borderRadius: 1.5,
            background: "linear-gradient(to top, #00f7ff, #7c3aed)",
            animation: `nb_wave ${0.38 + i * 0.065}s ease-in-out ${i * 0.07}s infinite alternate`,
            height: 3,
            ["--h" as any]: `${h}px`,
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   PARTICLE BURST — on nav link click
───────────────────────────────────────── */
function useBurst() {
  return useCallback((x: number, y: number) => {
    for (let i = 0; i < 14; i++) {
      const el      = document.createElement("div");
      const angle   = (i / 14) * Math.PI * 2;
      const dist    = 25 + Math.random() * 55;
      const color   = i % 3 === 0 ? "#00f7ff" : i % 3 === 1 ? "#7c3aed" : "#ec4899";
      el.style.cssText = `
        position:fixed;left:${x}px;top:${y}px;
        width:5px;height:5px;border-radius:50%;
        background:${color};box-shadow:0 0 10px ${color};
        pointer-events:none;z-index:99999;
        transform:translate(-50%,-50%);
        transition:all 0.65s cubic-bezier(.17,.67,.35,1.1);
        opacity:1;
      `;
      document.body.appendChild(el);
      requestAnimationFrame(() => {
        el.style.left      = `${x + Math.cos(angle) * dist}px`;
        el.style.top       = `${y + Math.sin(angle) * dist}px`;
        el.style.opacity   = "0";
        el.style.transform = "translate(-50%,-50%) scale(0.1)";
      });
      setTimeout(() => el.remove(), 700);
    }
  }, []);
}

/* ─────────────────────────────────────────
   MAIN NAVBAR
───────────────────────────────────────── */
export default function Navbar() {
  const [active,  setActive]  = useState("hero");
  const [scrolled,setScrolled]= useState(false);
  const [mounted, setMounted] = useState(false);
  const [clock,   setClock]   = useState("");
  const burst = useBurst();

  /* Mount + clock */
  useEffect(() => { setTimeout(() => setMounted(true), 120); }, []);
  useEffect(() => {
    const tick = () =>
      setClock(new Date().toLocaleTimeString("en-US", { hour12: false }));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  /* Scroll → active section */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 30);
      const ids = NAV_LINKS.map(l => l.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActive(id); break;
        }
      }
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;600;700;900&display=swap');

        /* Conic spinning border */
        @property --nb-spin {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        @keyframes nb_spin_border { to { --nb-spin: 360deg; } }

        /* Waveform bars */
        @keyframes nb_wave {
          from { height: 3px; opacity: 0.3; }
          to   { height: var(--h, 14px); opacity: 0.85; }
        }

        /* Mount */
        @keyframes nb_mount {
          from { opacity: 0; transform: translateY(-32px) scaleX(0.82); }
          to   { opacity: 1; transform: translateY(0) scaleX(1); }
        }

        /* Scanline pass */
        @keyframes nb_scan {
          0%   { top: -50px; opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 1; }
          100% { top: calc(100% + 50px); opacity: 0; }
        }

        /* Shimmer sweep */
        @keyframes nb_shimmer {
          0%,100% { left: -60%; }
          50%     { left: 160%; }
        }

        /* Status dot */
        @keyframes nb_blink { 0%,100%{opacity:1} 50%{opacity:0.2} }

        /* Active ping */
        @keyframes nb_ping {
          0%,100% { transform: scale(1); opacity: 1; }
          50%     { transform: scale(2); opacity: 0.3; }
        }

        /* ── Outer conic border ── */
        .nb-outer {
          position: relative;
          padding: 1.5px;
          border-radius: 20px;
          background: conic-gradient(
            from var(--nb-spin),
            #00f7ff 0deg,
            #7c3aed 90deg,
            #ec4899 200deg,
            #facc15 280deg,
            #00f7ff 360deg
          );
          animation: nb_spin_border 3s linear infinite;
          box-shadow:
            0 0 40px rgba(0,247,255,0.35),
            0 0 100px rgba(124,58,237,0.2),
            0 20px 60px rgba(0,0,0,0.8);
          transition: box-shadow 0.4s;
        }
        .nb-outer.scrolled {
          box-shadow:
            0 0 28px rgba(0,247,255,0.25),
            0 0 70px rgba(124,58,237,0.14),
            0 12px 40px rgba(0,0,0,0.7);
        }

        /* ── Glass body ── */
        .nb-body {
          position: relative;
          display: flex;
          align-items: stretch;
          background: rgba(2, 6, 23, 0.95);
          backdrop-filter: blur(32px);
          border-radius: 18px;
          overflow: hidden;
        }

        /* Scanline */
        .nb-body::before {
          content: '';
          position: absolute; left: 0; right: 0; height: 50px;
          background: linear-gradient(180deg, transparent, rgba(0,247,255,0.05), transparent);
          animation: nb_scan 6s ease-in-out infinite;
          pointer-events: none; z-index: 30;
        }

        /* Shimmer */
        .nb-body::after {
          content: '';
          position: absolute; top: 0; width: 55%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0,247,255,0.04), transparent);
          animation: nb_shimmer 7s ease-in-out infinite;
          pointer-events: none; z-index: 30;
        }

        /* HUD corners */
        .nb-hud {
          position: absolute; width: 10px; height: 10px;
          border-color: rgba(0,247,255,0.6); border-style: solid; z-index: 40;
        }
        .nb-hud.tl { top:4px; left:4px;   border-width:1.5px 0 0 1.5px; }
        .nb-hud.tr { top:4px; right:4px;  border-width:1.5px 1.5px 0 0; }
        .nb-hud.bl { bottom:4px; left:4px; border-width:0 0 1.5px 1.5px; }
        .nb-hud.br { bottom:4px; right:4px;border-width:0 1.5px 1.5px 0; }

        /* Panel divider */
        .nb-divider {
          width: 1px; flex-shrink: 0; margin: 8px 2px;
          background: linear-gradient(180deg, transparent, rgba(0,247,255,0.2), transparent);
        }

        /* ── Side panels ── */
        .nb-panel {
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 4px; padding: 10px 16px;
          position: relative; z-index: 5;
          min-width: 80px;
        }
        .nb-panel-l { border-right: 1px solid rgba(0,247,255,0.1); }
        .nb-panel-r { border-left:  1px solid rgba(0,247,255,0.1); }

        /* ── Nav link ── */
        .nb-link {
          position: relative;
          display: flex; flex-direction: column;
          align-items: center; gap: 1px;
          padding: 8px 14px; border-radius: 11px;
          text-decoration: none; cursor: pointer;
          border: 1px solid transparent;
          transition: all 0.2s ease;
          min-width: 74px; overflow: hidden;
          user-select: none;
        }
        /* Radial sweep */
        .nb-link::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(ellipse at 50% 110%, rgba(0,247,255,0.12), transparent 65%);
          opacity: 0; transition: opacity 0.2s;
        }
        .nb-link:hover::before,
        .nb-link.active::before { opacity: 1; }

        /* Bottom glow bar */
        .nb-link-bar {
          position: absolute; bottom: 0; left: 50%;
          width: 0; height: 2px;
          background: linear-gradient(90deg, transparent, #00f7ff, transparent);
          transform: translateX(-50%);
          border-radius: 999px;
          box-shadow: 0 0 10px #00f7ff;
          transition: width 0.25s ease;
        }
        .nb-link:hover .nb-link-bar,
        .nb-link.active .nb-link-bar { width: 80%; }

        /* Text layers */
        .nb-link-tag   { font-family:'Share Tech Mono',monospace; font-size:7.5px; letter-spacing:2px; color:rgba(0,247,255,0.3); transition:color 0.2s; }
        .nb-link-label { font-family:'Orbitron',sans-serif; font-size:9.5px; font-weight:700; letter-spacing:2.5px; color:rgba(148,163,184,0.8); transition:all 0.2s; }
        .nb-link-code  { font-family:'Share Tech Mono',monospace; font-size:7px; color:rgba(0,247,255,0.2); transition:color 0.2s; }

        /* Hover */
        .nb-link:hover {
          border-color: rgba(0,247,255,0.22);
          box-shadow: 0 0 20px rgba(0,247,255,0.13), inset 0 0 8px rgba(0,247,255,0.04);
          transform: translateY(-2px);
        }
        .nb-link:hover .nb-link-tag   { color: rgba(0,247,255,0.75); }
        .nb-link:hover .nb-link-label { color: #00f7ff; text-shadow: 0 0 16px #00f7ff; }
        .nb-link:hover .nb-link-code  { color: rgba(0,247,255,0.5); }

        /* Active */
        .nb-link.active {
          background: rgba(0,247,255,0.07);
          border-color: rgba(0,247,255,0.3);
          box-shadow: 0 0 28px rgba(0,247,255,0.22), inset 0 0 14px rgba(0,247,255,0.07);
          transform: translateY(-2px);
        }
        .nb-link.active .nb-link-tag   { color: rgba(0,247,255,0.8); }
        .nb-link.active .nb-link-label { color: #00f7ff; text-shadow: 0 0 16px #00f7ff; }
        .nb-link.active .nb-link-code  { color: rgba(0,247,255,0.5); }

        /* Active ping dot */
        .nb-ping {
          position: absolute; top: 5px; right: 5px;
          width: 5px; height: 5px; border-radius: 50%;
          background: #00f7ff; box-shadow: 0 0 10px #00f7ff;
          animation: nb_ping 1.6s ease-in-out infinite;
        }

        /* Status dot */
        .nb-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #22c55e; box-shadow: 0 0 8px #22c55e;
          animation: nb_blink 2s ease-in-out infinite;
        }

        /* Mount animation */
        .nb-mount {
          animation: nb_mount 0.9s cubic-bezier(.16,1,.3,1) both;
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, width: "100%",
          zIndex: 9999, display: "flex", justifyContent: "center",
          paddingTop: 20, pointerEvents: "none",
        }}
      >
        <div className="nb-mount" style={{ pointerEvents: "auto" }}>
          <div className={`nb-outer${scrolled ? " scrolled" : ""}`}>
            <div className="nb-body">

              {/* Neural canvas */}
              <NeuralCanvas />

              {/* HUD corners */}
              <span className="nb-hud tl" />
              <span className="nb-hud tr" />
              <span className="nb-hud bl" />
              <span className="nb-hud br" />

              {/* ── LEFT PANEL ── */}
              <div className="nb-panel nb-panel-l">
                <div style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: 15, fontWeight: 900, color: "#00f7ff",
                  letterSpacing: 4,
                  textShadow: "0 0 16px #00f7ff, 0 0 32px rgba(0,247,255,0.4)",
                }}>
                  VSR
                </div>
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 8.5, color: "rgba(0,247,255,0.45)", letterSpacing: 1.5,
                }}>
                  AI·PM·v2.5
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                  <div className="nb-status-dot" />
                  <span style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: 7, color: "rgba(0,247,255,0.4)", letterSpacing: 1,
                  }}>
                    LIVE
                  </span>
                </div>
              </div>

              <div className="nb-divider" />

              {/* ── NAV LINKS ── */}
              <div style={{
                display: "flex", alignItems: "center",
                gap: 1, padding: "6px 8px", zIndex: 5,
              }}>
                {NAV_LINKS.map((link) => {
                  const id       = link.href.replace("#", "");
                  const isActive = active === id;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`nb-link${isActive ? " active" : ""}`}
                      onClick={(e) => burst(e.clientX, e.clientY)}
                    >
                      <span className="nb-link-tag">{link.tag}</span>
                      <span className="nb-link-label">
                        <GlitchText text={link.label} />
                      </span>
                      <span className="nb-link-code">{link.code}</span>
                      <span className="nb-link-bar" />
                      {isActive && <span className="nb-ping" />}
                    </a>
                  );
                })}
              </div>

              <div className="nb-divider" />

              {/* ── RIGHT PANEL ── */}
              <div className="nb-panel nb-panel-r">
                <Waveform />
                <div style={{
                  fontFamily: "'Share Tech Mono', monospace",
                  fontSize: 9, color: "rgba(0,247,255,0.5)",
                  letterSpacing: 1, marginTop: 4,
                }}>
                  {clock}
                </div>
                <AITicker />
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
}