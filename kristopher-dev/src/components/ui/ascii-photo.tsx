import { useEffect, useRef } from "react";
import {
  ELECTRIC_GAZE_CONFIG,
  loadImage,
  renderAsciiFrame,
  type AsciiEffectConfig,
} from "@/lib/asciiEffect";
import { cn } from "@/lib/utils";

export function AsciiPhoto({
  src,
  alt,
  width = 320,
  height = 320,
  config = ELECTRIC_GAZE_CONFIG,
  className,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  config?: AsciiEffectConfig;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let raf = 0;
    let cancelled = false;
    let visible = false;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let lastFrame = 0;
    const frameInterval = 1000 / 24;
    let image: HTMLImageElement | null = null;

    const drawStatic = () => {
      if (image) renderAsciiFrame(ctx, image, width, height, config, 0);
    };

    const draw = (now: number) => {
      if (!visible || document.hidden) {
        raf = 0;
        return;
      }
      if (image && now - lastFrame >= frameInterval) {
        lastFrame = now;
        const t = (now - start) / 1000;
        renderAsciiFrame(ctx, image, width, height, config, t);
      }
      raf = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (raf || !config.animated || reduceMotion) return;
      raf = requestAnimationFrame(draw);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) {
          if (config.animated && !reduceMotion) startLoop();
          else drawStatic();
        }
      },
      { threshold: 0.05 },
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (!document.hidden && visible) startLoop();
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    loadImage(src).then((img) => {
      if (cancelled) return;
      image = img;
      if (visible && config.animated && !reduceMotion) startLoop();
      else drawStatic();
    });

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      cancelAnimationFrame(raf);
    };
  }, [src, width, height, config]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={alt}
      style={{ width, height }}
      className={cn("block", className)}
    />
  );
}
