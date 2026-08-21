"use client";

import { forwardRef, useId, useState, type InputHTMLAttributes } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GooeyInput = forwardRef<
  HTMLInputElement,
  InputHTMLAttributes<HTMLInputElement> & { containerClassName?: string }
>(({ className, containerClassName, onFocus, onBlur, ...props }, ref) => {
  const filterId = useId();
  const [focused, setFocused] = useState(false);

  return (
    <div className={cn("relative", containerClassName)}>
      <svg width="0" height="0" className="absolute">
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
          </filter>
        </defs>
      </svg>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 overflow-hidden rounded-full"
        style={{ filter: `url(#${filterId})` }}
      >
        <motion.span
          className="absolute left-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-sky-400/80"
          animate={
            focused
              ? { x: [0, 22, 4, 0], scale: [1, 1.2, 0.9, 1] }
              : { x: 0, scale: 0.85 }
          }
          transition={{ duration: 2.4, repeat: focused ? Infinity : 0, ease: "easeInOut" }}
        />
        <motion.span
          className="absolute right-2 top-1/2 h-8 w-8 -translate-y-1/2 rounded-full bg-violet-400/80"
          animate={
            focused
              ? { x: [0, -22, -4, 0], scale: [1, 1.2, 0.9, 1] }
              : { x: 0, scale: 0.85 }
          }
          transition={{
            duration: 2.4,
            repeat: focused ? Infinity : 0,
            ease: "easeInOut",
            delay: 0.25,
          }}
        />
      </div>

      <input
        ref={ref}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        className={cn(
          "relative z-10 h-10 w-full rounded-full border border-white/10 bg-neutral-900/90 px-4 text-sm text-white outline-none placeholder:text-neutral-500 focus:border-sky-400/60",
          className,
        )}
      />
    </div>
  );
});

GooeyInput.displayName = "GooeyInput";
