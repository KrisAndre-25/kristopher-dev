"use client";
import React, { useEffect, useId, useRef, useState, createContext, useContext } from "react";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

/*
 * Apple Cards Carousel (Aceternity UI), adaptado al portafolio:
 * - Sin Next.js: `next/image` se reemplaza por <img> en BlurImage.
 * - El sitio es oscuro fijo (no usa la clase `dark`), así que los pares
 *   claro/oscuro quedan en su versión oscura.
 * - `fit: "contain"` muestra la imagen completa sobre un fondo desenfocado
 *   de sí misma, para capturas horizontales en tarjetas verticales.
 * - Escape y clic fuera solo cierran cuando la tarjeta está abierta (en el
 *   original, cualquier clic en la página desplazaba el carrusel).
 * - Etiquetas accesibles en flechas, cierre y diálogo.
 * - El panel abierto se monta en un portal a <body> (si no, la barra de
 *   navegación queda por encima por el transform de la tarjeta).
 */

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
  /** Etiqueta accesible de la flecha izquierda. */
  prevLabel?: string;
  /** Etiqueta accesible de la flecha derecha. */
  nextLabel?: string;
}

type Card = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
  /** Texto alternativo de la imagen (por defecto, el título). */
  alt?: string;
  /** "cover" (original) recorta; "contain" muestra la imagen completa;
   *  "logo" centra el logo en una placa clara del mismo tamaño en todas las tarjetas. */
  fit?: "cover" | "contain" | "logo";
  /** Color del brillo de fondo en modo "logo". */
  accent?: string;
};

/** Alias de compatibilidad con código anterior del proyecto. */
export type CardData = Card;

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({
  items,
  initialScroll = 0,
  prevLabel = "Previous",
  nextLabel = "Next",
}: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
      const gap = isMobile() ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => {
    return window && window.innerWidth < 768;
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className={cn("absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l")}></div>

          <div
            className={cn(
              "flex flex-row justify-start gap-4 pl-4",
              "mx-auto max-w-7xl", // remove max-w-4xl if you want the carousel to span the full width of its container
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    delay: 0.2 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mr-10 flex justify-end gap-2">
          <button
            type="button"
            aria-label={prevLabel}
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:opacity-50"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
          </button>
          <button
            type="button"
            aria-label={nextLabel}
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:opacity-50"
            onClick={scrollRight}
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
  closeLabel = "Close",
}: {
  card: Card;
  index: number;
  layout?: boolean;
  /** Etiqueta accesible del botón de cierre. */
  closeLabel?: string;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const { onCardClose } = useContext(CarouselContext);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => {
    if (open) handleClose();
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  const alt = card.alt ?? card.title;

  // El panel abierto va en un portal a <body>: dentro de la tarjeta animada
  // (transform) quedaría atrapado bajo la barra de navegación.
  const overlay = (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[200] h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl border border-white/10 bg-neutral-900 p-4 font-sans md:p-10"
            >
              <button
                ref={closeRef}
                type="button"
                aria-label={closeLabel}
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                onClick={handleClose}
              >
                <IconX className="h-6 w-6 text-neutral-900" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-white"
              >
                {card.category}
              </motion.p>
              <motion.p
                id={titleId}
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-4 text-2xl font-semibold text-white md:text-5xl"
              >
                {card.title}
              </motion.p>
              <div className="py-10">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );

  return (
    <>
      {typeof document !== "undefined" ? createPortal(overlay, document.body) : null}
      <motion.button
        type="button"
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400 md:h-[40rem] md:w-96"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
        <div className="relative z-40 p-8">
          <motion.p
            layoutId={layout ? `category-${card.category}` : undefined}
            className="text-left font-sans text-sm font-medium text-white md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold [text-wrap:balance] text-white md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        {card.fit === "logo" ? (
          <>
            {/* Fondo uniforme: oscuro con un brillo del color del proyecto */}
            <div
              aria-hidden="true"
              className="absolute inset-0 z-10 bg-neutral-950"
              style={{
                backgroundImage: `radial-gradient(circle at 50% 62%, ${card.accent ?? "#38bdf8"}55, transparent 62%)`,
              }}
            />
            {/* Placa: mismo tamaño y posición en todas las tarjetas */}
            <div className="absolute inset-x-0 bottom-0 top-[28%] z-20 flex items-center justify-center">
              <div className="flex aspect-square w-[72%] items-center justify-center rounded-[2rem] bg-white shadow-2xl ring-1 ring-white/30">
                <BlurImage
                  src={card.src}
                  alt={alt}
                  className="h-[72%] w-[78%] object-contain"
                />
              </div>
            </div>
          </>
        ) : card.fit === "contain" ? (
          <>
            {/* Fondo: la misma imagen desenfocada llena la tarjeta */}
            {/* <img> simple: BlurImage añade blur-0 al cargar y, con
                tailwind-merge v3 sobre Tailwind v3, esa clase anula blur-2xl. */}
            <img
              src={card.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 z-10 h-full w-full scale-125 object-cover opacity-40 blur-2xl"
            />
            {/* Frente: la imagen completa, sin recortes */}
            <BlurImage
              src={card.src}
              alt={alt}
              className="absolute inset-x-0 bottom-0 z-20 h-[62%] object-contain object-bottom px-4 pb-6 drop-shadow-2xl"
            />
          </>
        ) : (
          <BlurImage src={card.src} alt={alt} className="absolute inset-0 z-10 object-cover" />
        )}
      </motion.button>
    </>
  );
};

export const BlurImage = ({
  height,
  width,
  src,
  className,
  alt,
  ...rest
}: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={cn("h-full w-full transition duration-300", isLoading ? "blur-sm" : "blur-0", className)}
      onLoad={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      alt={alt !== undefined ? alt : "Background of a beautiful view"}
      {...rest}
    />
  );
};
