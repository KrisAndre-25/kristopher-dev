"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function MacbookScroll({
  title,
  badge,
  src,
  showGradient = true,
  className,
}: {
  title?: ReactNode;
  badge?: ReactNode;
  src: string;
  showGradient?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const lidRotate = useTransform(scrollYProgress, [0, 1], [-28, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <div ref={ref} className={cn("relative flex flex-col items-center py-16", className)}>
      {title && (
        <div className="mb-10 max-w-2xl px-4 text-center text-lg text-neutral-300 sm:text-xl">
          {title}
        </div>
      )}

      <div className="relative mx-auto w-full max-w-3xl px-4" style={{ perspective: 1400 }}>
        <motion.div
          style={{ rotateX: lidRotate, scale, opacity, transformOrigin: "bottom center" }}
          className="relative mx-auto aspect-[16/10] w-full overflow-hidden rounded-2xl border-[10px] border-neutral-800 bg-neutral-950 shadow-2xl"
        >
          <img src={src} alt="" className="h-full w-full object-cover" draggable={false} />
          {showGradient && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
          )}
          {badge && <div className="absolute bottom-4 right-4">{badge}</div>}
        </motion.div>

        {/* Base del laptop: barra con bisagra, da la sensación de pantalla+teclado */}
        <div className="relative mx-auto -mt-1 h-4 w-[92%] rounded-b-xl bg-neutral-800 shadow-lg" />
        <div className="mx-auto h-1.5 w-24 rounded-b-md bg-neutral-700" />
      </div>
    </div>
  );
}
