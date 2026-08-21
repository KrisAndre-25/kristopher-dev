"use client";

import { useEffect, useRef } from "react";
import createGlobe, { type COBEOptions } from "cobe";
import { useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

const GLOBE_CONFIG: COBEOptions = {
  width: 600,
  height: 600,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [0.15, 0.15, 0.2],
  markerColor: [56 / 255, 189 / 255, 248 / 255],
  glowColor: [0.2, 0.4, 0.8],
  markers: [
    { location: [-33.4489, -70.6693], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.05 },
    { location: [52.52, 13.405], size: 0.05 },
    { location: [-23.5505, -46.6333], size: 0.05 },
    { location: [19.4326, -99.1332], size: 0.05 },
  ],
};

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / 200);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
    });

    // El globo (WebGL) es caro: se pausa por completo cuando la sección
    // no está visible en vez de seguir consumiendo GPU en segundo plano.
    let inView = true;
    let frame: number;
    const loop = () => {
      if (!pointerInteracting.current) phi += 0.005;
      globe.update({
        phi: phi + rs.get(),
        width: width * 2,
        height: width * 2,
      });
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(frame);
        }
      },
      { rootMargin: "200px" },
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[520px]",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
      />
    </div>
  );
}
