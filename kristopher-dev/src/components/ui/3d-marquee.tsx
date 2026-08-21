"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const ThreeDMarquee = ({
  items,
  className,
}: {
  items: ReactNode[];
  className?: string;
}) => {
  const chunkSize = Math.ceil(items.length / 4);
  const chunks = Array.from({ length: 4 }, (_, i) =>
    items.slice(i * chunkSize, (i + 1) * chunkSize),
  );

  return (
    <div
      className={cn(
        "mx-auto block h-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950",
        className,
      )}
    >
      {/* Centrado por flexbox + rotación sobre el propio centro del grid
          (transform-origin por defecto): así el grid queda visible sin
          depender de un offset en px calculado a mano para un contenedor
          de un tamaño específico. */}
      <div
        className="flex size-full items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        <div
          className="grid grid-cols-4 gap-6"
          style={{
            transform: "rotateX(42deg) rotateZ(-24deg) scale(0.82)",
            transformStyle: "preserve-3d",
          }}
        >
          {chunks.map((subarray, colIndex) => (
            <motion.div
              animate={{ y: colIndex % 2 === 0 ? 70 : -70 }}
              transition={{
                duration: colIndex % 2 === 0 ? 10 : 15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
              key={colIndex + "marquee"}
              className="flex flex-col items-center gap-6"
            >
              {subarray.map((item, itemIndex) => (
                <div key={itemIndex}>{item}</div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
