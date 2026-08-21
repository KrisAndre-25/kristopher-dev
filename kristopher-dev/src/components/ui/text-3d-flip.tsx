"use client";

import { motion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

type RotateDirection = "top" | "bottom" | "left" | "right";

const AXIS: Record<RotateDirection, "rotateX" | "rotateY"> = {
  top: "rotateX",
  bottom: "rotateX",
  left: "rotateY",
  right: "rotateY",
};

const SIGN: Record<RotateDirection, number> = {
  top: 1,
  bottom: -1,
  left: 1,
  right: -1,
};

export default function Text3DFlip({
  children,
  className,
  textClassName,
  flipTextClassName,
  rotateDirection = "top",
  staggerDuration = 0.03,
  staggerFrom = "first",
  transition = { type: "spring", damping: 25, stiffness: 160 },
}: {
  children: string;
  className?: string;
  textClassName?: string;
  flipTextClassName?: string;
  rotateDirection?: RotateDirection;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  transition?: Transition;
}) {
  const chars = children.split("");
  const axis = AXIS[rotateDirection];
  const sign = SIGN[rotateDirection];

  const delayFor = (i: number) => {
    if (staggerFrom === "last") return (chars.length - 1 - i) * staggerDuration;
    if (staggerFrom === "center") {
      const mid = (chars.length - 1) / 2;
      return Math.abs(i - mid) * staggerDuration;
    }
    return i * staggerDuration;
  };

  return (
    <span className={cn("inline-block [perspective:700px]", className)} aria-label={children}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className={cn(
            "relative inline-block [transform-style:preserve-3d]",
            textClassName,
          )}
          initial={{ [axis]: sign * 90, opacity: 0 }}
          whileInView={{ [axis]: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ ...transition, delay: delayFor(i) }}
        >
          <span className={cn(flipTextClassName)}>
            {char === " " ? " " : char}
          </span>
        </motion.span>
      ))}
    </span>
  );
}
