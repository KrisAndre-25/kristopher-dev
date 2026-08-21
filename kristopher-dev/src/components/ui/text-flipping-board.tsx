"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FLIP_DURATION = 0.5;
const HOLD_DURATION = 2200;

function FlipChar({ char }: { char: string }) {
  return (
    <span className="relative inline-block h-[1em] w-[0.62em] overflow-hidden align-top">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={char}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          transition={{ duration: FLIP_DURATION, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: "50% 50%" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export const TextFlippingBoard = ({
  words,
  className,
  charClassName,
  interval = HOLD_DURATION,
}: {
  words: string[];
  className?: string;
  charClassName?: string;
  interval?: number;
}) => {
  const [index, setIndex] = useState(0);
  const width = Math.max(...words.map((w) => w.length));

  useEffect(() => {
    if (words.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words.length, interval]);

  const current = words[index].padEnd(width, " ");

  return (
    <div
      className={cn(
        "flex select-none items-center justify-center gap-[0.05em] rounded-xl border border-neutral-800 bg-neutral-900/70 px-6 py-4 font-mono text-2xl font-semibold text-neutral-100 shadow-[0_0_40px_-15px_rgba(96,165,250,0.4)] backdrop-blur sm:text-4xl",
        className,
      )}
      style={{ perspective: 400 }}
    >
      {current.split("").map((char, i) => (
        <span key={i} className={cn(charClassName)}>
          <FlipChar char={char} />
        </span>
      ))}
    </div>
  );
};
