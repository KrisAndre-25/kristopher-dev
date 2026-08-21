"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.5 });
  const [rect, setRect] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setRect({ width, height });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative inline-block w-fit", containerClassName)}
    >
      <div className="relative z-10">{children}</div>
      {rect.width > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.35 }}
          style={{ width: rect.width + 4, height: rect.height + 4 }}
          className="absolute -left-1 -top-1"
        >
          <motion.svg
            width={rect.width + 4}
            height={rect.height + 4}
            viewBox={`0 0 ${rect.width + 4} ${rect.height + 4}`}
            className="absolute -left-1 -top-1"
          >
            <motion.rect
              x="1"
              y="1"
              width={rect.width + 2}
              height={rect.height + 2}
              rx="6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className={cn("text-sky-400", rectangleClassName)}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </motion.svg>
          <motion.div
            initial={{ opacity: 0, x: -6, y: -6 }}
            animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
            transition={{ duration: 0.3, delay: 0.9 }}
            className="absolute -bottom-2 -right-2"
          >
            <MousePointer2
              className={cn(
                "h-4 w-4 -rotate-90 text-sky-400",
                pointerClassName,
              )}
              fill="currentColor"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
