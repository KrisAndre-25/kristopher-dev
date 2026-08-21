"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function WordLoader({
  prefix,
  words,
  interval = 900,
  className,
}: {
  prefix: string;
  words: readonly string[];
  interval?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <div className={cn("flex items-center gap-1.5 font-mono text-sm text-neutral-400", className)}>
      <span>{prefix}</span>
      <div className="relative h-5 w-36 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={words[index]}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="absolute inset-0 flex items-center whitespace-nowrap text-sky-400"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
