"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+-=[]{}|;:,.<>?/";

export function EncryptedText({
  text,
  className,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 40,
}: {
  text: string;
  className?: string;
  encryptedClassName?: string;
  revealedClassName?: string;
  revealDelayMs?: number;
}) {
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [revealedCount, setRevealedCount] = useState(prefersReducedMotion ? text.length : 0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setRevealedCount(0);
    const revealTimer = setInterval(() => {
      setRevealedCount((c) => {
        if (c >= text.length) {
          clearInterval(revealTimer);
          return c;
        }
        return c + 1;
      });
    }, revealDelayMs);
    return () => clearInterval(revealTimer);
  }, [text, revealDelayMs]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const scrambleTimer = setInterval(() => setTick((t) => t + 1), 45);
    return () => clearInterval(scrambleTimer);
  }, [prefersReducedMotion]);

  return (
    <span className={cn(className)} aria-label={text}>
      {text.split("").map((char, i) => {
        if (char === " ") return <span key={i}>{" "}</span>;
        const isRevealed = i < revealedCount;
        const display = isRevealed ? char : GLYPHS[(i * 7 + tick) % GLYPHS.length];
        return (
          <span
            key={i}
            aria-hidden="true"
            className={isRevealed ? revealedClassName : encryptedClassName}
          >
            {display}
          </span>
        );
      })}
    </span>
  );
}
