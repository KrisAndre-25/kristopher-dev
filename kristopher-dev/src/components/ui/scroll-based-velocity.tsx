"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  const mod = (((v - min) % range) + range) % range;
  return mod + min;
}

export function ScrollVelocityContainer({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("relative w-full", className)}>{children}</div>;
}

export function ScrollVelocityRow({
  children,
  baseVelocity = 5,
  className,
}: {
  children: ReactNode;
  baseVelocity?: number;
  className?: string;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, -50, v)}%`);

  const rowRef = useRef<HTMLDivElement>(null);
  // Este marquee corría siempre, aunque estuviera fuera de pantalla.
  const inView = useInView(rowRef, { margin: "200px" });

  const directionFactor = useRef(1);
  useAnimationFrame((_, delta) => {
    if (!inView) return;
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={rowRef} className="w-full overflow-hidden whitespace-nowrap">
      <motion.div
        className={cn("inline-flex items-center", className)}
        style={{ x }}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="inline-flex items-center">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
