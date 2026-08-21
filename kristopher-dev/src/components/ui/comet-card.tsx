"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const SPRING = { mass: 0.1, stiffness: 260, damping: 20 };

export function CometCard({
  children,
  className,
  rotateDepth = 14,
  translateDepth = 8,
}: {
  children: ReactNode;
  className?: string;
  rotateDepth?: number;
  translateDepth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [rotateDepth, -rotateDepth]), SPRING);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-rotateDepth, rotateDepth]), SPRING);
  const translateX = useSpring(useTransform(x, [-0.5, 0.5], [-translateDepth, translateDepth]), SPRING);
  const translateY = useSpring(useTransform(y, [-0.5, 0.5], [-translateDepth, translateDepth]), SPRING);
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), SPRING);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), SPRING);
  const glareOpacity = useSpring(0, SPRING);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.35), transparent 60%)`,
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => glareOpacity.set(0.6);

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 800 }}
      className={cn("relative", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          x: translateX,
          y: translateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}
        <motion.div
          aria-hidden="true"
          style={{
            opacity: glareOpacity,
            background: glareBackground,
          }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay"
        />
      </motion.div>
    </motion.div>
  );
}
