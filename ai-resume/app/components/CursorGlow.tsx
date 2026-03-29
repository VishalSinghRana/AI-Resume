"use client";

import { useEffect, useRef } from "react";

/* ─────────────────────────────────────────
   CONFIG
───────────────────────────────────────── */
const BRAND_COLORS = [
  { r: 0,   g: 247, b: 255 },  // cyan
  { r: 124, g: 58,  b: 237 },  // purple
  { r: 236, g: 72,  b: 153 },  // pink
  { r: 250, g: 204, b: 21  },  // gold
];

const TRAIL_COUNT  = 18;   // ghost trail dots
const SPARK_LIFE   = 40;   // frames a spark lives
const RING_LAG     = 0.10; // spring follow speed (lower = more lag)
const AURA_RADIUS  = 220;  // large glow radius
const RING_RADIUS  = 22;   // orbiting ring radius
const DOT_RADIUS   = 4;    // sharp centre dot

/* ─────────────────────────────────────────
   TYPES
───────────────────────────────────────── */
interface Spark {
  x: number; y: number;
  vx: number; vy: number;
  life: number;
  maxLife: number;
  color: typeof BRAND_COLORS[0];
  size: number;
}

interface Ripple {
  x: number; y: number;
  life: number;
  maxLife: number;
  color: typeof BRAND_COLORS[0];
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    /* Only run on non-touch devices */
    if (window.matchMedia("(hover: none)").matches) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    /* ── State ── */
    let W = window.innerWidth;
    let H = window.innerHeight;
    let mouseX = -500, mouseY = -500;
    let prevMouseX = -500, prevMouseY = -500;
    let ringX = -500, ringY = -500;      // lagging ring position
    let colorT    = 0;                   // colour cycle timer
    let frameN    = 0;
    let rafId     = 0;
    let isVisible = false;               // hide until first mousemove

    const sparks:  Spark[]  = [];
    const ripples: Ripple[] = [];

    /* Trail history */
    const trail: Array<{ x: number; y: number }> = Array(TRAIL_COUNT)
      .fill(null)
      .map(() => ({ x: -500, y: -500 }));

    /* ── Resize ── */
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize);

    /* ── Hide default cursor on body ── */
    document.body.style.cursor = "none";

    /* ── Mouse move ── */
    const onMove = (e: MouseEvent) => {
      prevMouseX = mouseX;
      prevMouseY = mouseY;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isVisible = true;

      /* Spawn sparks proportional to movement speed */
      const speed = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
      const count = Math.min(Math.floor(speed * 0.4), 5);
      for (let i = 0; i < count; i++) {
        const col = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
        sparks.push({
          x:       mouseX + (Math.random() - 0.5) * 8,
          y:       mouseY + (Math.random() - 0.5) * 8,
          vx:      (Math.random() - 0.5) * 3,
          vy:      (Math.random() - 0.5) * 3 - 1,
          life:    SPARK_LIFE,
          maxLife: SPARK_LIFE,
          color:   col,
          size:    Math.random() * 2.5 + 0.8,
        });
      }
    };

    /* ── Click ripple ── */
    const onClick = (e: MouseEvent) => {
      const col = BRAND_COLORS[frameN % BRAND_COLORS.length];
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x:       e.clientX,
          y:       e.clientY,
          life:    40 + i * 12,
          maxLife: 40 + i * 12,
          color:   BRAND_COLORS[(frameN + i) % BRAND_COLORS.length],
        });
      }
      /* Extra spark burst on click */
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        sparks.push({
          x:       e.clientX,
          y:       e.clientY,
          vx:      Math.cos(angle) * (2 + Math.random() * 4),
          vy:      Math.sin(angle) * (2 + Math.random() * 4),
          life:    SPARK_LIFE * 1.5,
          maxLife: SPARK_LIFE * 1.5,
          color:   BRAND_COLORS[i % BRAND_COLORS.length],
          size:    Math.random() * 2 + 1,
        });
      }
    };

    window.addEventListener("mousemove", onClick as any);   // remove below
    window.removeEventListener("mousemove", onClick as any);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("click",     onClick);

    /* ── Colour lerp helper ── */
    function lerpColor(a: typeof BRAND_COLORS[0], b: typeof BRAND_COLORS[0], t: number) {
      return {
        r: Math.round(a.r + (b.r - a.r) * t),
        g: Math.round(a.g + (b.g - a.g) * t),
        b: Math.round(a.b + (b.b - a.b) * t),
      };
    }

    function currentColor() {
      const total = BRAND_COLORS.length;
      const scaled = colorT % total;
      const idx  = Math.floor(scaled);
      const t    = scaled - idx;
      return lerpColor(BRAND_COLORS[idx % total], BRAND_COLORS[(idx + 1) % total], t);
    }

    /* ── Draw loop ── */
    function draw() {
      frameN++;
      colorT += 0.012;

      ctx.clearRect(0, 0, W, H);

      if (!isVisible) {
        rafId = requestAnimationFrame(draw);
        return;
      }

      /* Spring-follow ring */
      ringX += (mouseX - ringX) * RING_LAG;
      ringY += (mouseY - ringY) * RING_LAG;

      /* Update trail */
      for (let i = TRAIL_COUNT - 1; i > 0; i--) {
        trail[i].x = trail[i - 1].x;
        trail[i].y = trail[i - 1].y;
      }
      trail[0].x = mouseX;
      trail[0].y = mouseY;

      const col = currentColor();
      const colStr = (c: typeof col, a: number) =>
        `rgba(${c.r},${c.g},${c.b},${a})`;

      /* ── 1. LARGE AURA ── */
      const aura = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, AURA_RADIUS);
      aura.addColorStop(0,   colStr(col, 0.06));
      aura.addColorStop(0.4, colStr(col, 0.03));
      aura.addColorStop(1,   colStr(col, 0));
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, AURA_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = aura;
      ctx.fill();

      /* ── 2. GHOST TRAIL ── */
      trail.forEach((pt, i) => {
        const alpha  = (1 - i / TRAIL_COUNT) * 0.35;
        const radius = DOT_RADIUS * (1 - i / TRAIL_COUNT) * 0.7;
        if (radius < 0.3) return;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = colStr(col, alpha);
        ctx.fill();
      });

      /* ── 3. RIPPLES ── */
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.life--;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        const t = 1 - rp.life / rp.maxLife;
        const r = t * 80;
        const a = (1 - t) * 0.7;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rp.color.r},${rp.color.g},${rp.color.b},${a})`;
        ctx.lineWidth   = 1.5 * (1 - t);
        ctx.stroke();
      }

      /* ── 4. SPARKS ── */
      for (let i = sparks.length - 1; i >= 0; i--) {
        const sp = sparks[i];
        sp.x  += sp.vx;
        sp.y  += sp.vy;
        sp.vy += 0.08;  // gravity
        sp.vx *= 0.96;
        sp.life--;
        if (sp.life <= 0) { sparks.splice(i, 1); continue; }
        const t = sp.life / sp.maxLife;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size * t, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${sp.color.r},${sp.color.g},${sp.color.b},${t * 0.9})`;
        ctx.shadowColor = `rgb(${sp.color.r},${sp.color.g},${sp.color.b})`;
        ctx.shadowBlur  = 6;
        ctx.fill();
        ctx.shadowBlur  = 0;
      }

      /* ── 5. LAGGING RING ── */
      const ringPulse = 0.85 + Math.sin(frameN * 0.08) * 0.15;
      const ringR     = RING_RADIUS * ringPulse;

      /* Outer glow ring */
      ctx.beginPath();
      ctx.arc(ringX, ringY, ringR + 4, 0, Math.PI * 2);
      ctx.strokeStyle = colStr(col, 0.12);
      ctx.lineWidth   = 8;
      ctx.stroke();

      /* Main ring */
      ctx.beginPath();
      ctx.arc(ringX, ringY, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = colStr(col, 0.65);
      ctx.lineWidth   = 1.5;
      ctx.shadowColor = `rgb(${col.r},${col.g},${col.b})`;
      ctx.shadowBlur  = 12;
      ctx.stroke();
      ctx.shadowBlur  = 0;

      /* Rotating tick marks on ring */
      const angle = frameN * 0.05;
      for (let i = 0; i < 4; i++) {
        const a  = angle + (i / 4) * Math.PI * 2;
        const x1 = ringX + Math.cos(a) * ringR;
        const y1 = ringY + Math.sin(a) * ringR;
        const x2 = ringX + Math.cos(a) * (ringR + 6);
        const y2 = ringY + Math.sin(a) * (ringR + 6);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = colStr(col, 0.9);
        ctx.lineWidth   = 1.5;
        ctx.shadowColor = `rgb(${col.r},${col.g},${col.b})`;
        ctx.shadowBlur  = 8;
        ctx.stroke();
        ctx.shadowBlur  = 0;
      }

      /* ── 6. CROSSHAIR LINES ── */
      const crossSize = 10;
      const crossGap  = DOT_RADIUS + 3;
      ctx.strokeStyle = colStr(col, 0.6);
      ctx.lineWidth   = 1;
      ctx.shadowColor = `rgb(${col.r},${col.g},${col.b})`;
      ctx.shadowBlur  = 6;

      /* Horizontal */
      ctx.beginPath();
      ctx.moveTo(mouseX - crossSize - crossGap, mouseY);
      ctx.lineTo(mouseX - crossGap, mouseY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX + crossGap, mouseY);
      ctx.lineTo(mouseX + crossSize + crossGap, mouseY);
      ctx.stroke();

      /* Vertical */
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY - crossSize - crossGap);
      ctx.lineTo(mouseX, mouseY - crossGap);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(mouseX, mouseY + crossGap);
      ctx.lineTo(mouseX, mouseY + crossSize + crossGap);
      ctx.stroke();
      ctx.shadowBlur = 0;

      /* ── 7. CENTRE DOT ── */
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, DOT_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle   = `rgb(${col.r},${col.g},${col.b})`;
      ctx.shadowColor = `rgb(${col.r},${col.g},${col.b})`;
      ctx.shadowBlur  = 16;
      ctx.fill();
      ctx.shadowBlur = 0;

      /* Inner bright core */
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, DOT_RADIUS * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      rafId = requestAnimationFrame(draw);
    }

    rafId = requestAnimationFrame(draw);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click",     onClick);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 99998,
      }}
    />
  );
}