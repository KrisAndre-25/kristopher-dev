"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export interface TimelineEntry {
  title: string;
  content: ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white font-sans dark:bg-neutral-950 md:px-10"
    >
      <div ref={ref} className="relative mx-auto max-w-6xl pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:gap-10 md:pt-32">
            <div className="sticky top-24 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white dark:border-white/10 dark:bg-neutral-900 md:left-3">
                <div className="h-4 w-4 rounded-full border border-sky-500/60 bg-sky-500/20 dark:border-sky-400/50 dark:bg-sky-400/20" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-400 dark:text-neutral-500 md:block md:pl-20 md:text-4xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-400 dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-gradient-to-b from-transparent via-neutral-200 to-transparent dark:via-white/10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-sky-500 via-violet-500 to-transparent dark:from-sky-400 dark:via-violet-400"
          />
        </div>
      </div>
    </div>
  );
};
