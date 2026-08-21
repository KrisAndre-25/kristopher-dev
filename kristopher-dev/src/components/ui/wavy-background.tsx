"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const WAVE_COLORS = ["#38bdf8", "#818cf8", "#c084fc", "#22d3ee", "#0ea5e9"];

export function WavyBackground({
  children,
  className,
  containerClassName,
  waveWidth = 50,
  backgroundFill = "#050505",
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !wrap || !ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const speedFactor = speed === "slow" ? 0.001 : 0.002;

    // Se re-mide con ResizeObserver (no solo en window resize): el alto
    // real de este contenedor depende de su contenido (el laptop, las
    // listas de skills), que puede cambiar de tamaño sin que la ventana
    // cambie. Antes se medía una sola vez al montar y el canvas quedaba
    // más bajo que el contenido real.
    const resize = () => {
      width = wrap.offsetWidth;
      height = wrap.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      // setTransform en vez de scale: scale() se acumula en cada llamada,
      // así que tras dos o más resizes el dibujo quedaba escalado de más.
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(wrap);

    let t = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // El blur de canvas se recalcula por frame y no siempre va por GPU:
    // es el elemento más caro de este componente. Se pausa del todo
    // cuando la sección no está en pantalla en vez de seguir dibujando
    // detrás de otras secciones.
    let inView = true;

    const draw = () => {
      ctx.fillStyle = backgroundFill;
      ctx.globalAlpha = 1;
      ctx.fillRect(0, 0, width, height);
      ctx.filter = `blur(${blur}px)`;

      WAVE_COLORS.forEach((color, i) => {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.globalAlpha = waveOpacity;
        ctx.lineWidth = waveWidth;
        const amplitude = 40 + i * 8;
        const yBase = height * 0.5 + i * 14;
        for (let x = 0; x <= width; x += 8) {
          const y =
            yBase +
            Math.sin(x * 0.006 + t * (1 + i * 0.15) + i) * amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      if (!reduceMotion) {
        t += speedFactor * 16;
        if (inView) animationId = requestAnimationFrame(draw);
      }
    };

    draw();

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const wasInView = inView;
        inView = entry.isIntersecting;
        if (inView && !wasInView && !reduceMotion) {
          cancelAnimationFrame(animationId);
          animationId = requestAnimationFrame(draw);
        }
      },
      { rootMargin: "200px" },
    );
    visibilityObserver.observe(wrap);

    return () => {
      observer.disconnect();
      visibilityObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [waveWidth, backgroundFill, blur, speed, waveOpacity]);

  return (
    <div ref={wrapRef} className={cn("relative w-full overflow-hidden", containerClassName)}>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
