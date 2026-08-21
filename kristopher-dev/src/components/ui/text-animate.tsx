"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimationType = "blurInUp";

const VARIANTS: Record<AnimationType, { container: Variants; item: Variants }> = {
  blurInUp: {
    container: {
      hidden: { opacity: 1 },
      show: {
        opacity: 1,
        transition: { staggerChildren: 0.03, delayChildren: 0.1 },
      },
    },
    item: {
      hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
      show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.45, ease: "easeOut" },
      },
    },
  },
};

const TAGS = {
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  span: motion.span,
  div: motion.div,
};

export function TextAnimate({
  children,
  animation = "blurInUp",
  by = "word",
  as = "p",
  className,
  once = true,
  delay = 0,
}: {
  children: string;
  animation?: AnimationType;
  by?: "character" | "word";
  as?: keyof typeof TAGS;
  className?: string;
  once?: boolean;
  delay?: number;
}) {
  const { container, item } = VARIANTS[animation];
  const segments =
    by === "character" ? children.split("") : children.split(/(\s+)/);
  const Tag = TAGS[as];

  return (
    <Tag
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-10%" }}
      transition={{ delayChildren: delay }}
      className={cn("inline-flex flex-wrap", className)}
    >
      {segments.map((seg, i) => (
        <motion.span
          key={i}
          variants={item}
          className="inline-block whitespace-pre"
        >
          {seg}
        </motion.span>
      ))}
    </Tag>
  );
}
