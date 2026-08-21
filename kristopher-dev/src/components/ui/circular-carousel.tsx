"use client";

import { useCallback, useState, type ReactNode } from "react";
import { motion, useSpring, useTransform, type MotionValue } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface CircularCarouselItem {
  id: string;
  content: ReactNode;
}

export function CircularCarousel({
  items,
  radius = 320,
  itemWidth = 300,
  className,
}: {
  items: CircularCarouselItem[];
  radius?: number;
  itemWidth?: number;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const count = items.length;
  const angleStep = count > 0 ? 360 / count : 0;

  const ring = useSpring(0, { stiffness: 140, damping: 22 });

  const goTo = useCallback(
    (i: number) => {
      const nextIndex = ((i % count) + count) % count;
      setActive(nextIndex);
      ring.set(-nextIndex * angleStep);
    },
    [count, angleStep, ring],
  );

  const prev = () => goTo(active - 1);
  const next = () => goTo(active + 1);

  return (
    <div className={cn("relative mx-auto", className)}>
      <div
        className="relative mx-auto flex items-center justify-center"
        style={{ perspective: 1600, height: itemWidth * 1.15 }}
      >
        <div className="relative h-full w-full" style={{ transformStyle: "preserve-3d" }}>
          {items.map((item, i) => (
            <CarouselTile
              key={item.id}
              angle={angleStep * i}
              radius={radius}
              itemWidth={itemWidth}
              ring={ring}
              isActive={i === active}
            >
              {item.content}
            </CarouselTile>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prev}
          aria-label="Proyecto anterior"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white transition hover:border-sky-400/50 hover:text-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <IconArrowNarrowLeft className="h-5 w-5" />
        </button>

        <div role="tablist" aria-label="Seleccionar proyecto" className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Ir al proyecto ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                i === active ? "w-6 bg-sky-400" : "w-2 bg-neutral-700 hover:bg-neutral-500",
              )}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente proyecto"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white transition hover:border-sky-400/50 hover:text-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <IconArrowNarrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

function CarouselTile({
  angle,
  radius,
  itemWidth,
  ring,
  isActive,
  children,
}: {
  angle: number;
  radius: number;
  itemWidth: number;
  ring: MotionValue<number>;
  isActive: boolean;
  children: ReactNode;
}) {
  // El anillo (ring) rota el conjunto; cada tarjeta se posiciona en su
  // ángulo + la rotación actual del anillo, y luego se contra-rota la
  // misma cantidad para quedar siempre de frente al espectador ("billboard").
  const transform = useTransform(ring, (r) => {
    const total = r + angle;
    return `translate(-50%, -50%) rotateY(${total}deg) translateZ(${radius}px) rotateY(${-total}deg)`;
  });

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: itemWidth, transform, transformStyle: "preserve-3d" }}
    >
      <motion.div
        animate={{ scale: isActive ? 1 : 0.86, opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
        className={cn(!isActive && "pointer-events-none")}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
