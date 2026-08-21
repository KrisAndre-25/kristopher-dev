"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const BLOBS = [
  { color: "#38bdf8", size: 480, x: "10%", y: "15%", duration: 18 },
  { color: "#8b5cf6", size: 420, x: "70%", y: "10%", duration: 22 },
  { color: "#22d3ee", size: 400, x: "50%", y: "60%", duration: 26 },
  { color: "#a855f7", size: 360, x: "85%", y: "70%", duration: 20 },
];

export function AuroraBackground({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Cuatro blobs con blur(90px) animando sin parar era caro incluso con
  // la sección fuera de pantalla. Se congelan cuando no están a la vista.
  const inView = useInView(ref, { margin: "200px" });

  return (
    <div
      ref={ref}
      className={cn("relative w-full overflow-hidden bg-neutral-950", className)}
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {BLOBS.map((blob, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: blob.x,
              top: blob.y,
              width: blob.size,
              height: blob.size,
              background: blob.color,
              filter: "blur(90px)",
              opacity: 0.28,
            }}
            animate={
              inView
                ? {
                    x: [0, 40, -30, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.15, 0.95, 1],
                  }
                : {}
            }
            transition={{
              duration: blob.duration,
              repeat: inView ? Infinity : 0,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-neutral-950/40" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
