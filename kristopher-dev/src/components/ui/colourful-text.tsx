"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const COLORS = [
  "#38bdf8",
  "#60a5fa",
  "#a78bfa",
  "#f472b6",
  "#22d3ee",
  "#34d399",
  "#fbbf24",
];

export function ColourfulText({ text }: { text: string }) {
  const [currentColors, setCurrentColors] = useState(COLORS);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((c) => c + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline">
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${index}-${count}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.03, 1],
            filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.03,
          }}
          className="inline-block whitespace-pre font-bold"
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
