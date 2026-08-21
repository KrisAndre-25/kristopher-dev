"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const TAGS = {
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
  div: motion.div,
};

interface LineShadowTextProps {
  children: ReactNode;
  shadowColor?: string;
  as?: keyof typeof TAGS;
  className?: string;
}

export function LineShadowText({
  children,
  shadowColor = "#38bdf8",
  as = "span",
  className,
}: LineShadowTextProps) {
  const MotionTag = TAGS[as];

  return (
    <MotionTag
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ "--shadow-color": shadowColor } as React.CSSProperties}
      className={cn("relative inline-block", className)}
    >
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden="true"
        className="absolute left-[3px] top-[3px] -z-0 bg-clip-text text-transparent sm:left-[5px] sm:top-[5px]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 3px, var(--shadow-color) 3px, var(--shadow-color) 4px)",
        }}
      >
        {children}
      </span>
    </MotionTag>
  );
}
