"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────── */
const TYPEWRITER_LINES = [
  "AI Product Manager  |  Built for Scale",
  "Turning Intelligence into Impact",
  "From Zero → 1M+ Users",
];

const LIVE_FEEDS = [
  "OPEN TO AI PRODUCT ROLES · BUILDING THE FUTURE OF INTELLIGENT PRODUCTS",
  "EXPERTISE: LLMs · RAG · AGENTS · PRODUCT STRATEGY · ROADMAPPING",
  "CURRENT FOCUS: SCALING AI PLATFORMS TO ENTERPRISE · 1M+ USERS",
  "MISSION: SHIP PRODUCTS THAT MAKE AI GENUINELY USEFUL",
];

const CONTACTS = [
  {
    icon: "✉",
    label: "EMAIL",
    display: "Vishal Rana E-mail",
    href: "",
    accentColor: "#00f7ff",
    shadowColor: "rgba(0,247,255,0.3)",
    isEmail: true,
    email: "vishalrana.kaps19@gmail.com",
  },
  {
    icon: "in",
    label: "LINKEDIN",
    display: "Vishal Rana",
    href: "https://www.linkedin.com/in/vishal-rana-967b01157",
    accentColor: "#7c3aed",
    shadowColor: "rgba(124,58,237,0.3)",
    isEmail: false,
    email: "",
  },
];

const FLOAT_TAGS = [
  { label: "GPT-4o",     style: { top: "18%", left:  "3%"   } },
  { label: "LangChain",  style: { top: "26%", right: "4%"   } },
  { label: "MLOps",      style: { top: "60%", left:  "2%"   } },
  { label: "RAG · RLHF", style: { top: "65%", right: "3%"   } },
  { label: "OKRs",       style: { top: "40%", left:  "1.5%" } },
  { label: "A/B Tests",  style: { top: "45%", right: "2%"   } },
];

const BOOT_LINES = [
  "▶ INITIALISING AI-PM INTERFACE v2.5...",
  "▶ LOADING NEURAL MODULES... OK",
  "▶ CONNECTING DATA STREAMS... OK",
  "▶ CALIBRATING HOLOGRAPHIC DISPLAY... OK",
  "▶ AUTHENTICATING USER: VISHAL SINGH RANA",
  "✓ ALL SYSTEMS OPERATIONAL",
];

/* ─────────────────────────────────────────
   BOOT OVERLAY
───────────────────────────────────────── */
function BootOverlay({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2600);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "#020617",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 10,
      animation: "hero_bootFade 0.5s ease 2.4s forwards",
      pointerEvents: "all",
    }}>
      {BOOT_LINES.map((line, i) => (
        <div key={i} style={{
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11, letterSpacing: 2,
          color: i === BOOT_LINES.length - 1 ? "#22c55e" : "rgba(0,247,255,0.7)",
          opacity: 0,
          animation: `hero_bootLine 0.3s ease ${0.1 + i * 0.3}s forwards`,
        }}>
          {line}
        </div>
      ))}
      <div style={{
        width: 260, height: 2,
        background: "rgba(0,247,255,0.1)",
        borderRadius: 1, marginTop: 8, overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg,#00f7ff,#7c3aed)",
          animation: "hero_bootBar 2s ease 0.3s forwards",
          width: 0,
        }} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PARTICLE CANVAS
───────────────────────────────────────── */
function ParticleCanvas() {
  const ref   = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = ref.current!;
    const ctx    = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouse);

    const COLORS = ["0,247,255", "124,58,237", "236,72,153"];
    const pts = Array.from({ length: 90 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3,
      r:     Math.random() * 1.2 + 0.3,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let raf = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.phase += 0.02;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d  = Math.hypot(dx, dy);
        if (d < 80 && d > 0) { p.x += (dx / d) * 1.2; p.y += (dy / d) * 1.2; }

        const g = (Math.sin(p.phase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r + g * 0.5, 0, Math.PI * 2);
        ctx.fillStyle   = `rgba(${p.color},${0.3 + g * 0.5})`;
        ctx.shadowColor = `rgba(${p.color},0.6)`;
        ctx.shadowBlur  = 6 + g * 8;
        ctx.fill();
        ctx.shadowBlur  = 0;
      });

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d  = Math.hypot(dx, dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(0,247,255,${(1 - d / 90) * 0.18})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }}
    />
  );
}

/* ─────────────────────────────────────────
   TYPEWRITER
───────────────────────────────────────── */
function Typewriter() {
  const [text,    setText]    = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting,setDeleting]= useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), 3500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started) return;
    const line  = TYPEWRITER_LINES[lineIdx];
    const delay = deleting ? 32 : 55;
    const timer = setTimeout(() => {
      if (!deleting) {
        const next = charIdx + 1;
        setText(line.slice(0, next));
        if (next >= line.length) setTimeout(() => setDeleting(true), 2200);
        else setCharIdx(next);
      } else {
        const next = charIdx - 1;
        setText(line.slice(0, next));
        if (next <= 0) {
          setDeleting(false);
          setLineIdx(i => (i + 1) % TYPEWRITER_LINES.length);
          setCharIdx(0);
        } else {
          setCharIdx(next);
        }
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [started, charIdx, deleting, lineIdx]);

  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: "clamp(11px, 2vw, 14px)",
      color: "rgba(0,247,255,0.7)",
      letterSpacing: 2,
      textAlign: "center",
      marginTop: 10,
      minHeight: 22,
    }}>
      {text}
      <span style={{ animation: "hero_blink 0.8s ease-in-out infinite", display: "inline-block" }}>
        █
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────
   EMAIL POPUP
───────────────────────────────────────── */
function EmailPopup({ email, onClose }: { email: string; onClose: () => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleBackdrop}
      style={{
        position: "fixed", inset: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "rgba(2,6,23,0.7)",
        backdropFilter: "blur(6px)",
        animation: "ep_fadeIn 0.2s ease forwards",
      }}
    >
      <div style={{
        position: "relative",
        padding: 2, borderRadius: 18,
        background: "conic-gradient(from 0deg, #00f7ff, #7c3aed, #ec4899, #00f7ff)",
        boxShadow: "0 0 48px rgba(0,247,255,0.3), 0 0 100px rgba(124,58,237,0.2)",
        animation: "ep_slideIn 0.25s cubic-bezier(.16,1,.3,1) forwards",
        minWidth: 300,
      }}>
        <div style={{
          background: "rgba(2,6,23,0.97)",
          backdropFilter: "blur(24px)",
          borderRadius: 16,
          padding: "28px 28px 24px",
          position: "relative", overflow: "hidden",
        }}>
          {/* Scanline */}
          <div style={{
            position: "absolute", left: 0, right: 0, height: 40,
            background: "linear-gradient(180deg,transparent,rgba(0,247,255,0.04),transparent)",
            animation: "ep_scan 4s ease-in-out infinite",
            pointerEvents: "none",
          }} />

          {/* HUD corners */}
          {[
            { top: 8,    left: 8,  borderWidth: "1.5px 0 0 1.5px" },
            { top: 8,    right: 8, borderWidth: "1.5px 1.5px 0 0" },
            { bottom: 8, left: 8,  borderWidth: "0 0 1.5px 1.5px" },
            { bottom: 8, right: 8, borderWidth: "0 1.5px 1.5px 0" },
          ].map((b, i) => (
            <div key={i} style={{
              position: "absolute", width: 10, height: 10,
              borderColor: "rgba(0,247,255,0.6)", borderStyle: "solid",
              ...b,
            }} />
          ))}

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 12, right: 14,
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 14, color: "rgba(0,247,255,0.4)",
              lineHeight: 1, padding: 4,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "#00f7ff")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(0,247,255,0.4)")}
          >
            ✕
          </button>

          {/* Tag */}
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 8, letterSpacing: 3,
            color: "rgba(0,247,255,0.4)",
            marginBottom: 14, position: "relative", zIndex: 1,
          }}>
            // CONTACT · EMAIL
          </div>

          {/* Icon + label */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: 14, position: "relative", zIndex: 1,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, flexShrink: 0,
              background: "rgba(0,247,255,0.08)",
              border: "1px solid rgba(0,247,255,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 16, color: "#00f7ff",
              textShadow: "0 0 10px #00f7ff",
            }}>
              ✉
            </div>
            <div>
              <div style={{
                fontFamily: "'Share Tech Mono', monospace",
                fontSize: 7.5, letterSpacing: 2,
                color: "rgba(0,247,255,0.5)", marginBottom: 3,
              }}>
                EMAIL ADDRESS
              </div>
              <div style={{
                fontFamily: "'Exo 2', sans-serif",
                fontSize: 13, color: "rgba(203,213,225,0.9)",
                letterSpacing: 0.5,
              }}>
                {email}
              </div>
            </div>
          </div>

          {/* Email display box */}
          <div style={{
            background: "rgba(0,247,255,0.04)",
            border: "1px solid rgba(0,247,255,0.15)",
            borderRadius: 8, padding: "10px 14px",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 12, color: "#00f7ff",
            letterSpacing: 0.5,
            marginBottom: 14,
            wordBreak: "break-all",
            position: "relative", zIndex: 1,
          }}>
            {email}
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            style={{
              width: "100%",
              padding: "10px 0",
              borderRadius: 8,
              fontFamily: "'Orbitron', sans-serif",
              fontSize: 9, fontWeight: 700, letterSpacing: 2,
              border: "none", cursor: "pointer",
              position: "relative", zIndex: 1,
              transition: "all 0.25s",
              background: copied
                ? "linear-gradient(135deg, #22c55e, #16a34a)"
                : "linear-gradient(135deg, #00f7ff, #7c3aed)",
              color: copied ? "#fff" : "#020617",
              boxShadow: copied
                ? "0 0 24px rgba(34,197,94,0.5)"
                : "0 0 24px rgba(0,247,255,0.35)",
            }}
          >
            {copied ? "✓  COPIED!" : "⎘  COPY EMAIL"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CONTACT CARD
───────────────────────────────────────── */
function ContactCard({
  icon, label, display, href, accentColor, shadowColor, isEmail, email,
}: typeof CONTACTS[0] & { isEmail?: boolean; email?: string }) {
  const [hovered,  setHovered]  = useState(false);
  const [showPopup,setShowPopup]= useState(false);

  const handleClick = (e: React.MouseEvent) => {
    if (isEmail) { e.preventDefault(); setShowPopup(true); }
  };

  const rgbAccent = accentColor === "#00f7ff" ? "0,247,255" : "124,58,237";

  return (
    <>
      {showPopup && email && (
        <EmailPopup email={email} onClose={() => setShowPopup(false)} />
      )}

      <a
        href={isEmail ? undefined : href}
        target={isEmail ? undefined : "_blank"}
        rel={isEmail ? undefined : "noopener noreferrer"}
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex", alignItems: "center", gap: 12,
          flex: 1,
          padding: "12px 16px",
          borderRadius: 12,
          textDecoration: "none",
          background: hovered ? `rgba(${rgbAccent},0.08)` : "rgba(255,255,255,0.03)",
          border: `1px solid ${hovered ? accentColor : "rgba(255,255,255,0.08)"}`,
          boxShadow: hovered ? `0 0 22px ${shadowColor}, inset 0 0 10px ${shadowColor}` : "none",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "all 0.25s ease",
          cursor: "pointer",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Sweep glow */}
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, ${shadowColor}, transparent 65%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
          pointerEvents: "none",
        }} />

        {/* Icon */}
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: `${accentColor}18`,
          border: `1px solid ${accentColor}40`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Orbitron', sans-serif",
          fontSize: accentColor === "#7c3aed" ? 11 : 16,
          fontWeight: 700,
          color: accentColor,
          textShadow: `0 0 10px ${accentColor}`,
          position: "relative", zIndex: 1,
        }}>
          {icon}
        </div>

        {/* Text */}
        <div style={{ position: "relative", zIndex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7.5, letterSpacing: 2,
            color: `${accentColor}99`, marginBottom: 3,
          }}>
            {label}
          </div>
          <div style={{
            fontFamily: "'Exo 2', sans-serif",
            fontSize: 12, fontWeight: 400,
            color: hovered ? accentColor : "rgba(203,213,225,0.85)",
            textShadow: hovered ? `0 0 12px ${accentColor}` : "none",
            transition: "all 0.25s",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
          }}>
            {display}
          </div>
        </div>

        {/* Right indicator */}
        <div style={{
          marginLeft: "auto", flexShrink: 0,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: isEmail ? 10 : 12,
          color: hovered ? accentColor : "rgba(255,255,255,0.15)",
          textShadow: hovered ? `0 0 10px ${accentColor}` : "none",
          transition: "all 0.25s",
          transform: hovered ? (isEmail ? "scale(1.2)" : "translate(2px,-2px)") : "none",
          position: "relative", zIndex: 1,
        }}>
          {isEmail ? "⎘" : "↗"}
        </div>
      </a>
    </>
  );
}

/* ─────────────────────────────────────────
   LIVE FEED TICKER
───────────────────────────────────────── */
function LiveFeed() {
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % LIVE_FEEDS.length);
        setVisible(true);
      }, 450);
    }, 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      fontFamily: "'Share Tech Mono', monospace",
      fontSize: 8.5,
      color: "rgba(0,247,255,0.45)",
      letterSpacing: 1.5,
      opacity: visible ? 1 : 0,
      transition: "opacity 0.4s",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
    }}>
      {LIVE_FEEDS[idx]}
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN HERO
───────────────────────────────────────── */
export default function Hero() {
  const [booted,  setBooted]  = useState(false);
  const [visible, setVisible] = useState(false);

  const handleBootDone = useCallback(() => {
    setBooted(true);
    setTimeout(() => setVisible(true), 100);
  }, []);

  return (
    <>
      {/* ── STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@400;700;900&family=Exo+2:wght@200;300;400;600&display=swap');

        @keyframes hero_bootFade { to { opacity:0; pointer-events:none; } }
        @keyframes hero_bootLine { to { opacity:1; } }
        @keyframes hero_bootBar  { to { width:100%; } }
        @keyframes hero_blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hero_scanPass {
          0%{top:-60px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:calc(100% + 60px);opacity:0}
        }
        @keyframes hero_shimmer  { 0%,100%{left:-60%} 50%{left:160%} }
        @keyframes hero_orbit1   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes hero_orbit2   {
          from{transform:rotate(0deg) rotateX(60deg)}
          to{transform:rotate(360deg) rotateX(60deg)}
        }
        @keyframes hero_orbit3   {
          from{transform:rotate(0deg) rotateY(45deg)}
          to{transform:rotate(360deg) rotateY(45deg)}
        }
        @keyframes hero_livePulse {
          0%,100%{opacity:1;transform:scale(1)}
          50%{opacity:0.3;transform:scale(1.5)}
        }
        @keyframes hero_scrollBounce {
          0%,100%{transform:rotate(45deg) translateY(0)}
          50%{transform:rotate(45deg) translateY(6px)}
        }
        @keyframes hero_floatDrift {
          from{opacity:0.25;transform:translateY(0)}
          to{opacity:0.5;transform:translateY(-14px)}
        }
        @keyframes ep_fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes ep_slideIn { from{opacity:0;transform:scale(0.9) translateY(10px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes ep_scan    {
          0%{top:-40px;opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{top:calc(100% + 40px);opacity:0}
        }

        @property --hf-angle { syntax:'<angle>'; initial-value:0deg; inherits:false; }
        @keyframes hero_hfSpin { to { --hf-angle: 360deg; } }

        .hero-frame-border {
          position:absolute; inset:0; border-radius:24px; padding:2px;
          background: conic-gradient(from var(--hf-angle), #00f7ff, #7c3aed, #ec4899, #facc15, #00f7ff);
          animation: hero_hfSpin 4s linear infinite;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude;
          box-shadow: 0 0 40px rgba(0,247,255,0.3), 0 0 80px rgba(124,58,237,0.2);
          pointer-events: none;
        }

        .hero-inner::before {
          content:''; position:absolute; left:0; right:0; height:60px;
          background:linear-gradient(180deg,transparent,rgba(0,247,255,0.04),transparent);
          animation: hero_scanPass 5s ease-in-out 0.5s infinite;
          pointer-events:none; z-index:0;
        }
        .hero-inner::after {
          content:''; position:absolute; top:0; width:55%; height:100%;
          background:linear-gradient(90deg,transparent,rgba(0,247,255,0.04),transparent);
          animation: hero_shimmer 7s ease-in-out infinite;
          pointer-events:none; z-index:0;
        }

        .hero-float-tag {
          position:absolute; pointer-events:none;
          font-family:'Share Tech Mono',monospace; font-size:8px;
          color:rgba(0,247,255,0.35); letter-spacing:1.5px;
          animation: hero_floatDrift 7s ease-in-out infinite alternate;
        }
      `}</style>

      {/* Boot sequence */}
      {!booted && <BootOverlay onDone={handleBootDone} />}

      {/* Particle field */}
      <ParticleCanvas />

      <section
        id="hero"
        style={{
          position: "relative",
          zIndex: 10,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "100px 24px 60px",
        }}
      >
        {/* ── ORBITAL RINGS ── */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          pointerEvents: "none", zIndex: 2,
        }}>
          {[
            { size: 300, anim: "hero_orbit1 8s linear infinite",          color: "rgba(0,247,255,0.12)",   dot: "#00f7ff" },
            { size: 420, anim: "hero_orbit2 14s linear infinite reverse", color: "rgba(124,58,237,0.10)",  dot: "#7c3aed" },
            { size: 540, anim: "hero_orbit3 20s linear infinite",         color: "rgba(236,72,153,0.08)",  dot: "#ec4899" },
          ].map((ring, i) => (
            <div key={i} style={{
              position: "absolute", top: "50%", left: "50%",
              width: ring.size, height: ring.size,
              margin: -ring.size / 2,
              border: `1px solid ${ring.color}`,
              borderRadius: "50%",
              animation: ring.anim,
            }}>
              <div style={{
                position: "absolute", top: -4, left: "calc(50% - 4px)",
                width: 8, height: 8, borderRadius: "50%",
                background: ring.dot,
                boxShadow: `0 0 12px ${ring.dot}, 0 0 24px ${ring.dot}40`,
              }} />
            </div>
          ))}
        </div>

        {/* ── FLOATING TAGS ── */}
        {FLOAT_TAGS.map((tag, i) => (
          <div
            key={i}
            className="hero-float-tag"
            style={{ ...tag.style, animationDelay: `${i * 0.3}s` }}
          >
            {tag.label}
          </div>
        ))}

        {/* ── MAIN CARD ── */}
        <div style={{
          position: "relative",
          width: "min(520px, 92vw)",
          padding: 2,
          borderRadius: 24,
          zIndex: 5,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0) scale(1)" : "translateY(32px) scale(0.93)",
          transition: "opacity 0.8s cubic-bezier(.16,1,.3,1), transform 0.8s cubic-bezier(.16,1,.3,1)",
        }}>
          {/* Spinning conic border */}
          <div className="hero-frame-border" />

          {/* Glass body */}
          <div
            className="hero-inner"
            style={{
              background: "rgba(2,6,23,0.9)",
              backdropFilter: "blur(28px)",
              borderRadius: 22,
              padding: "40px 32px 36px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* HUD corner brackets */}
            {[
              { top: 10,    left: 10,  borderWidth: "2px 0 0 2px"   },
              { top: 10,    right: 10, borderWidth: "2px 2px 0 0"   },
              { bottom: 10, left: 10,  borderWidth: "0 0 2px 2px"   },
              { bottom: 10, right: 10, borderWidth: "0 2px 2px 0"   },
            ].map((b, i) => (
              <div key={i} style={{
                position: "absolute", width: 16, height: 16,
                borderColor: "rgba(0,247,255,0.7)", borderStyle: "solid",
                zIndex: 10, ...b,
              }} />
            ))}

            {/* System tag */}
            <div style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 9, letterSpacing: 3,
              color: "rgba(0,247,255,0.5)",
              textAlign: "center", marginBottom: 18,
              position: "relative", zIndex: 2,
            }}>
              // COMMAND PROFILE · NODE 01 · ACTIVE
            </div>

            {/* Name */}
            <h1 style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "clamp(26px, 5.5vw, 52px)",
              fontWeight: 900,
              textAlign: "center",
              letterSpacing: 3,
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #22d3ee 0%, #6366f1 50%, #a855f7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 24px rgba(0,247,255,0.35))",
              position: "relative", zIndex: 2,
            }}>
              VISHAL SINGH RANA
            </h1>

            {/* Typewriter subtitle */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <Typewriter />
            </div>

            {/* ── CONTACT CARDS ── */}
            <div style={{
              display: "flex", gap: 10, marginTop: 28,
              position: "relative", zIndex: 2,
              flexWrap: "wrap",
            }}>
              {CONTACTS.map((c, i) => (
                <ContactCard key={i} {...c} isEmail={c.isEmail} email={c.email} />
              ))}
            </div>

            {/* ── LIVE FEED ── */}
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              marginTop: 22, position: "relative", zIndex: 2,
            }}>
              <div style={{
                width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
                background: "#22c55e", boxShadow: "0 0 8px #22c55e",
                animation: "hero_livePulse 1.5s ease-in-out infinite",
              }} />
              <LiveFeed />
            </div>

          </div>
        </div>

        {/* ── SCROLL INDICATOR ── */}
        <div style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 6,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s 1.5s",
          zIndex: 10,
        }}>
          <div style={{
            width: 20, height: 20,
            borderRight: "1.5px solid rgba(0,247,255,0.5)",
            borderBottom: "1.5px solid rgba(0,247,255,0.5)",
            animation: "hero_scrollBounce 1.6s ease-in-out infinite",
          }} />
          <div style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 7, color: "rgba(0,247,255,0.35)", letterSpacing: 3,
          }}>
            SCROLL
          </div>
        </div>

      </section>
    </>
  );
}