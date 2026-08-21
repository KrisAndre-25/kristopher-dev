"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function LayoutTextFlip({
  text,
  words,
  duration = 3000,
  className,
  wordClassName,
}: {
  text: string;
  words: string[];
  duration?: number;
  className?: string;
  wordClassName?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);
    return () => window.clearInterval(id);
  }, [words.length, duration]);

  return (
    <>
      <motion.span
        layout
        className={cn(
          "text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-4xl md:text-5xl",
          className,
        )}
      >
        {text}
      </motion.span>

      <motion.span
        layout
        className={cn(
          "relative inline-block w-fit overflow-hidden rounded-xl border border-white/10 bg-neutral-900 px-4 py-2 text-2xl font-bold text-sky-400 shadow-[0_0_30px_-8px_rgba(56,189,248,0.5)] sm:text-4xl md:text-5xl",
          wordClassName,
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={words[index]}
            initial={{ y: -32, opacity: 0, filter: "blur(6px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ y: 32, opacity: 0, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="inline-block whitespace-nowrap"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </>
  );
}
