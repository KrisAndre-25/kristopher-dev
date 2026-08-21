"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useSpring } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";

export interface CarouselSlide {
  category: string;
  title: string;
  button: string;
  src: string;
  content?: ReactNode;
}

export default function Carousel({
  slides,
  className,
}: {
  slides: CarouselSlide[];
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const trackId = useId();
  const liveId = useId();
  const regionRef = useRef<HTMLDivElement>(null);

  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const rotateX = useSpring(0, { stiffness: 200, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 200, damping: 20 });

  const goTo = useCallback(
    (i: number) => setIndex(((i % slides.length) + slides.length) % slides.length),
    [slides.length],
  );
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const onMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = regionRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setSpot({ x: px * 100, y: py * 100 });
    rotateY.set((px - 0.5) * 10);
    rotateX.set((0.5 - py) * 8);
  };

  const onMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={regionRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Proyectos"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ perspective: 1200 }}
        className="group relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            backgroundImage: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(56,189,248,0.18), transparent 70%)`,
          }}
        />

        <p id={liveId} role="status" aria-live="polite" className="sr-only">
          Proyecto {index + 1} de {slides.length}: {slides[index]?.title}
        </p>

        <motion.div
          id={trackId}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="flex transition-transform duration-500 ease-out"
        >
          <div
            className="flex w-full shrink-0"
            style={{ transform: `translateX(-${index * 100}%)`, transition: "transform 500ms ease-out" }}
          >
            {slides.map((slide, i) => (
              <div
                key={slide.title}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} de ${slides.length}: ${slide.title}`}
                aria-hidden={i !== index}
                className="relative aspect-[4/5] w-full shrink-0 sm:aspect-[16/10]"
              >
                <img
                  src={slide.src}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
                    {slide.category}
                  </p>
                  <h3 className="mt-2 max-w-md text-2xl font-semibold text-white sm:text-3xl">
                    {slide.title}
                  </h3>
                  {slide.content && (
                    <button
                      onClick={() => setOpenIndex(i)}
                      className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 shadow-[0_4px_25px_-6px_rgba(255,255,255,0.5)] transition hover:-translate-y-0.5"
                    >
                      {slide.button}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <button
          onClick={prev}
          aria-label="Proyecto anterior"
          aria-controls={trackId}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-neutral-950/60 text-white shadow-lg backdrop-blur-md transition hover:-translate-x-0.5 hover:border-sky-400/50 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <IconArrowNarrowLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          aria-label="Siguiente proyecto"
          aria-controls={trackId}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-neutral-950/60 text-white shadow-lg backdrop-blur-md transition hover:translate-x-0.5 hover:border-sky-400/50 hover:bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
        >
          <IconArrowNarrowRight className="h-5 w-5" />
        </button>
      </div>

      <div
        role="tablist"
        aria-label="Seleccionar proyecto"
        className="mt-5 flex justify-center gap-2"
      >
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir al proyecto: ${slide.title}`}
            onClick={() => goTo(i)}
            className={cn(
              "h-2 rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
              i === index ? "w-6 bg-sky-400" : "w-2 bg-neutral-700 hover:bg-neutral-500",
            )}
          />
        ))}
      </div>

      <SlideModal
        slide={openIndex !== null ? slides[openIndex] : null}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}

function SlideModal({
  slide,
  onClose,
}: {
  slide: CarouselSlide | null;
  onClose: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useOutsideClick(containerRef, onClose);

  useEffect(() => {
    if (!slide) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [slide, onClose]);

  return (
    <AnimatePresence>
      {slide && (
        <div className="fixed inset-0 z-[100] flex h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={containerRef}
            className="relative z-[101] max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-neutral-950 p-6 sm:p-10"
          >
            <button
              ref={closeButtonRef}
              onClick={onClose}
              aria-label="Cerrar detalle del proyecto"
              className="sticky top-0 float-right flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950"
            >
              <IconX className="h-5 w-5" />
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
              {slide.category}
            </p>
            <h3 id={titleId} className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {slide.title}
            </h3>
            <div className="mt-6">{slide.content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
