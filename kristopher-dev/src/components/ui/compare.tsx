"use client";

import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Compare({
  firstImage,
  secondImage,
  firstImageLabel,
  secondImageLabel,
  className,
  firstImageClassName,
  secondImageClassName,
  slideMode = "hover",
  autoplay = false,
}: {
  firstImage: string;
  secondImage: string;
  firstImageLabel?: string;
  secondImageLabel?: string;
  className?: string;
  firstImageClassName?: string;
  secondImageClassName?: string;
  slideMode?: "hover" | "drag";
  autoplay?: boolean;
}) {
  const [sliderX, setSliderX] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!autoplay) return;
    let dir = 1;
    const id = setInterval(() => {
      setSliderX((p) => {
        let next = p + dir * 0.5;
        if (next >= 82) dir = -1;
        if (next <= 18) dir = 1;
        return next;
      });
    }, 30);
    return () => clearInterval(id);
  }, [autoplay]);

  const updateFromClientX = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(0, Math.min(100, percent)));
  };

  const onMouseMove = (e: ReactMouseEvent) => {
    if (slideMode === "hover" || isDragging) updateFromClientX(e.clientX);
  };
  const onTouchMove = (e: ReactTouchEvent) => {
    if (e.touches[0]) updateFromClientX(e.touches[0].clientX);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border border-white/10 select-none",
        className,
      )}
      onMouseMove={onMouseMove}
      onMouseDown={() => slideMode === "drag" && setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onTouchMove={onTouchMove}
    >
      <img
        src={secondImage}
        alt={secondImageLabel ?? ""}
        className={cn("h-full w-full object-cover", secondImageClassName)}
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      >
        <img
          src={firstImage}
          alt={firstImageLabel ?? ""}
          className={cn("h-full w-full object-cover", firstImageClassName)}
          draggable={false}
        />
      </div>

      <motion.div
        className="pointer-events-none absolute top-0 bottom-0 w-0.5 bg-white/80"
        style={{ left: `${sliderX}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
          <span className="text-xs text-neutral-900">↔</span>
        </div>
      </motion.div>

      {firstImageLabel && (
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[0.65rem] text-white backdrop-blur">
          {firstImageLabel}
        </span>
      )}
      {secondImageLabel && (
        <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 font-mono text-[0.65rem] text-white backdrop-blur">
          {secondImageLabel}
        </span>
      )}
    </div>
  );
}
