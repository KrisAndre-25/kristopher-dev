"use client";

import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Point {
  x: number;
  y: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  born: number;
}

const CELL_SIZE = 46;
const INFLUENCE_RADIUS = 220;
const MAX_WARP = 20;
const DOT_SPACING = 26;
const LERP_SPEED = 0.08;

const BG = "#0a0a0a";
type Rgba = { r: number; g: number; b: number; a: number };
const LINE_BASE: Rgba = { r: 255, g: 255, b: 255, a: 0.1 };
const LINE_ACTIVE: Rgba = { r: 56, g: 189, b: 248, a: 0.9 };
const NODE_ACTIVE: Rgba = { r: 56, g: 189, b: 248, a: 1 };
const GLOW = "56,189,248";
const RIPPLE_COLOR = "56,189,248";
const NODE_BASE_RADIUS = 1.6;
const NODE_ACTIVE_RADIUS = 3;

function lerpN(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpColor(base: Rgba, active: Rgba, t: number): string {
  const r = Math.round(lerpN(base.r, active.r, t));
  const g = Math.round(lerpN(base.g, active.g, t));
  const b = Math.round(lerpN(base.b, active.b, t));
  const a = lerpN(base.a, active.a, t);
  return `rgba(${r},${g},${b},${a.toFixed(3)})`;
}

/**
 * Grilla interactiva: se deforma hacia el cursor y genera ondas al hacer
 * click. A diferencia del componente original (canvas `fixed` a todo el
 * viewport, listeners en `window`, sin pausa fuera de pantalla), aquí el
 * canvas se ajusta al contenedor con ResizeObserver, los listeners están
 * acotados al propio contenedor y el RAF se pausa con IntersectionObserver —
 * mismo patrón que WavyBackground/AuroraBackground en este proyecto.
 */
export function KineticGrid({ children, className }: { children?: ReactNode; className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const targetMouseRef = useRef<Point>({ x: -9999, y: -9999 });
  const ripplesRef = useRef<Ripple[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });

  const getWarpedPoint = useCallback(
    (
      gx: number,
      gy: number,
      col: number,
      row: number,
      mouse: Point,
      ripples: Ripple[],
      cols: number,
      rows: number,
    ): { pt: Point; proximity: number } => {
      const edgeMargin = 1.5;
      const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
      const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
      const pinFactor = colPin * colPin * rowPin * rowPin;

      const dx = gx - mouse.x;
      const dy = gy - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;

      let rx = 0;
      let ry = 0;
      for (const r of ripples) {
        const rdx = gx - r.x;
        const rdy = gy - r.y;
        const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
        const waveWidth = 55;
        const diff = rdist - r.radius;
        if (Math.abs(diff) < waveWidth) {
          const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 18 * pinFactor;
          const angle = Math.atan2(rdy, rdx);
          const sign = diff < 0 ? -1 : 1;
          rx += Math.cos(angle) * strength * sign * -1;
          ry += Math.sin(angle) * strength * sign * -1;
        }
      }

      if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
        const t = dist / INFLUENCE_RADIUS;
        const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
        const warpAmt = eased * MAX_WARP * pinFactor;
        const angle = Math.atan2(dy, dx);
        return {
          pt: {
            x: gx - Math.cos(angle) * warpAmt + rx,
            y: gy - Math.sin(angle) * warpAmt + ry,
          },
          proximity,
        };
      }

      return { pt: { x: gx + rx, y: gy + ry }, proximity };
    },
    [],
  );

  const draw = useCallback(
    (now: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const { w: W, h: H } = sizeRef.current;
      const mouse = mouseRef.current;
      const ripples = ripplesRef.current;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "rgba(255,255,255,0.05)";
      for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
        for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
          ctx.beginPath();
          ctx.arc(x, y, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const age = (now - r.born) / 1000;
        r.radius = Math.max(0, age * 400);
        r.opacity = Math.max(0, 1 - age * 1.2);
        if (r.opacity <= 0) ripples.splice(i, 1);
      }

      const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
      const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
      const cellW = W / (cols - 1);
      const cellH = H / (rows - 1);

      const pts: Point[][] = [];
      const prox: number[][] = [];

      for (let row = 0; row < rows; row++) {
        pts[row] = [];
        prox[row] = [];
        for (let col = 0; col < cols; col++) {
          const { pt, proximity } = getWarpedPoint(col * cellW, row * cellH, col, row, mouse, ripples, cols, rows);
          pts[row][col] = pt;
          prox[row][col] = proximity;
        }
      }

      const drawSeg = (p1: Point, p2: Point, pr1: number, pr2: number) => {
        const avg = (pr1 + pr2) / 2;
        const t = avg * avg * (3 - 2 * avg);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.strokeStyle = lerpColor(LINE_BASE, LINE_ACTIVE, t);
        ctx.lineWidth = lerpN(0.8, 1.5, t);
        ctx.stroke();
      };

      ctx.lineCap = "butt";
      for (let row = 0; row < rows; row++)
        for (let col = 0; col < cols - 1; col++)
          drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      for (let col = 0; col < cols; col++)
        for (let row = 0; row < rows - 1; row++)
          drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const p = pts[row][col];
          const pr = prox[row][col];
          const t = pr * pr * (3 - 2 * pr);
          const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

          if (t > 0.3) {
            const glowR = r + lerpN(0, 6, (t - 0.3) / 0.7);
            const grd = ctx.createRadialGradient(p.x, p.y, r * 0.5, p.x, p.y, glowR);
            grd.addColorStop(0, `rgba(${GLOW},${(t * 0.3).toFixed(3)})`);
            grd.addColorStop(1, `rgba(${GLOW},0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.2 }, NODE_ACTIVE, t);
          ctx.fill();
        }
      }

      for (const r of ripples) {
        const safeRadius = Math.max(0, r.radius);
        ctx.beginPath();
        ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${RIPPLE_COLOR},${(r.opacity * 0.28).toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
    },
    [getWarpedPoint],
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!wrap || !canvas || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let rafId = 0;
    let inView = true;

    const setSize = () => {
      const w = wrap.offsetWidth;
      const h = wrap.offsetHeight;
      sizeRef.current = { w, h };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(wrap);

    const onMouseMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      targetMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => {
      targetMouseRef.current = { x: -9999, y: -9999 };
    };
    const onClick = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 0,
        opacity: 1,
        born: performance.now(),
      });
    };

    wrap.addEventListener("mousemove", onMouseMove);
    wrap.addEventListener("mouseleave", onMouseLeave);
    wrap.addEventListener("click", onClick);

    const animate = (now: number) => {
      const m = mouseRef.current;
      const t = targetMouseRef.current;
      m.x = lerpN(m.x, t.x, LERP_SPEED);
      m.y = lerpN(m.y, t.y, LERP_SPEED);
      draw(now);
      if (!reduceMotion) rafId = requestAnimationFrame(animate);
    };

    if (reduceMotion) {
      draw(performance.now());
    } else {
      rafId = requestAnimationFrame(animate);
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const wasInView = inView;
        inView = entry.isIntersecting;
        if (inView && !wasInView && !reduceMotion) {
          cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(animate);
        } else if (!inView) {
          cancelAnimationFrame(rafId);
        }
      },
      { rootMargin: "200px" },
    );
    visibilityObserver.observe(wrap);

    return () => {
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      wrap.removeEventListener("mousemove", onMouseMove);
      wrap.removeEventListener("mouseleave", onMouseLeave);
      wrap.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, [draw]);

  return (
    <div ref={wrapRef} className={cn("relative w-full overflow-hidden bg-neutral-950", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="relative z-10 flex h-full w-full items-center justify-center">{children}</div>
    </div>
  );
}
