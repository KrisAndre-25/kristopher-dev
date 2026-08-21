"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParallaxItem {
  title: string;
  note: string;
  color: string;
  icon: ReactNode;
}

export const HeroParallax = ({
  items,
  header,
}: {
  items: ParallaxItem[];
  header?: ReactNode;
}) => {
  const third = Math.ceil(items.length / 3);
  const firstRow = items.slice(0, third);
  const secondRow = items.slice(third, third * 2);
  const thirdRow = items.slice(third * 2);

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 500]),
    springConfig,
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -500]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [10, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-300, 100]),
    springConfig,
  );

  return (
    <div
      ref={ref}
      className="relative flex h-[100vh] flex-col self-auto overflow-hidden py-8 antialiased [perspective:1000px] [transform-style:preserve-3d] sm:h-[110vh]"
    >
      {header}
      <motion.div
        style={{ rotateX, rotateZ, translateY, opacity }}
        className="mt-4"
      >
        <div className="mb-10 flex flex-row-reverse space-x-10 space-x-reverse">
          {firstRow.map((item) => (
            <ParallaxTile item={item} translate={translateX} key={item.title} />
          ))}
        </div>
        <div className="mb-10 flex flex-row space-x-10">
          {secondRow.map((item) => (
            <ParallaxTile
              item={item}
              translate={translateXReverse}
              key={item.title}
            />
          ))}
        </div>
        <div className="flex flex-row-reverse space-x-10 space-x-reverse">
          {thirdRow.map((item) => (
            <ParallaxTile item={item} translate={translateX} key={item.title} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const ParallaxTile = ({
  item,
  translate,
}: {
  item: ParallaxItem;
  translate: MotionValue<number>;
}) => {
  return (
    <motion.div
      style={{ x: translate }}
      whileHover={{ y: -14 }}
      className="group/tile relative h-40 w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 shadow-xl transition-colors sm:h-48 sm:w-64"
    >
      <div
        className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover/tile:opacity-35"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${item.color}, transparent 65%)`,
        }}
      />
      <div className="relative flex h-full flex-col items-center justify-center gap-3 p-4 text-center">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-xl border"
          style={{
            color: item.color,
            borderColor: `${item.color}55`,
            backgroundColor: `${item.color}1a`,
          }}
        >
          {item.icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="mt-0.5 text-xs text-neutral-500">{item.note}</p>
        </div>
      </div>
    </motion.div>
  );
};

export const ParallaxHeader = ({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) => (
  <div className={cn("relative mx-auto w-full max-w-3xl px-4 text-center", className)}>
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
      {eyebrow}
    </p>
    <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
    {description && (
      <p className="mx-auto mt-4 max-w-xl text-base text-neutral-400">
        {description}
      </p>
    )}
  </div>
);
