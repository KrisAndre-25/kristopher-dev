"use client";

import { useId, useMemo, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const BEAM_COUNT = 12;
const BEAM_COLORS = ["#38bdf8", "#8b5cf6", "#22d3ee"];

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function buildBeams(width: number, height: number) {
  return Array.from({ length: BEAM_COUNT }, (_, i) => {
    const startX = (width / (BEAM_COUNT - 1)) * i;
    const drift = (seededRandom(i * 3.1) - 0.5) * width * 0.35;
    const endX = startX + drift;
    const cx1 = startX + (seededRandom(i * 7.7) - 0.5) * 160;
    const cx2 = endX + (seededRandom(i * 11.3) - 0.5) * 160;
    return {
      d: `M${startX} -200 C${cx1} ${height * 0.35}, ${cx2} ${height * 0.7}, ${endX} ${height + 200}`,
      duration: 8 + seededRandom(i * 1.9) * 10,
      delay: seededRandom(i * 5.3) * 6,
      color: BEAM_COLORS[i % BEAM_COLORS.length],
      strokeWidth: 0.6 + seededRandom(i * 2.3) * 1.2,
    };
  });
}

/**
 * Fondo de "rayos" verticales con degradado que recorre cada trazo SVG.
 * A diferencia del original (~50 paths sin pausar), aquí son 12, con la
 * misma pausa por IntersectionObserver que usan Aurora/Wavy en este
 * proyecto — se congelan cuando la sección no está en pantalla.
 */
export function BackgroundBeams({ className }: { className?: string }) {
  const uid = useId();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px" });

  const width = 1400;
  const height = 900;
  const beams = useMemo(() => buildBeams(width, height), []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        {beams.map((beam, i) => (
          <path key={`base-${i}`} d={beam.d} stroke={beam.color} strokeOpacity={0.06} strokeWidth={1} />
        ))}

        {beams.map((beam, i) => (
          <path
            key={`glow-${i}`}
            d={beam.d}
            stroke={`url(#${uid}-grad-${i})`}
            strokeWidth={beam.strokeWidth}
            strokeLinecap="round"
          />
        ))}

        <defs>
          {beams.map((beam, i) => (
            <motion.linearGradient
              key={i}
              id={`${uid}-grad-${i}`}
              gradientUnits="userSpaceOnUse"
              initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
              animate={
                inView
                  ? { x1: ["0%", "0%"], x2: ["0%", "0%"], y1: ["0%", "100%"], y2: ["10%", "110%"] }
                  : {}
              }
              transition={{
                duration: beam.duration,
                repeat: inView ? Infinity : 0,
                ease: "easeInOut",
                delay: beam.delay,
              }}
            >
              <stop stopColor={beam.color} stopOpacity="0" />
              <stop offset="50%" stopColor={beam.color} />
              <stop offset="100%" stopColor={beam.color} stopOpacity="0" />
            </motion.linearGradient>
          ))}
        </defs>
      </svg>
    </div>
  );
}
