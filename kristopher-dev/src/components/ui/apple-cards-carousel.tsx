"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type JSX,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "@/hooks/use-outside-click";

export interface CardData {
  category: string;
  title: string;
  src: string;
  content: ReactNode;
}

const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({ onCardClose: () => {}, currentIndex: 0 });

export const Carousel = ({
  items,
  initialScroll = 0,
}: {
  items: JSX.Element[];
  initialScroll?: number;
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" });
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = window.innerWidth < 768 ? 230 : 384;
      const gap = window.innerWidth < 768 ? 4 : 8;
      const scrollPosition = (cardWidth + gap) * (index + 1);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-14 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div
            className={cn(
              "mx-auto flex max-w-6xl flex-row justify-start gap-4 px-4",
            )}
          >
            {items.map((item, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * index, ease: "easeOut" }}
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
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white disabled:opacity-40"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Anterior"
          >
            <IconArrowNarrowLeft className="h-5 w-5" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-white disabled:opacity-40"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Siguiente"
          >
            <IconArrowNarrowRight className="h-5 w-5" />
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
}: {
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { onCardClose, currentIndex } = useContext(CarouselContext);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") handleClose();
    }
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useOutsideClick(containerRef, () => handleClose());

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onCardClose(index);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              ref={containerRef}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[101] mx-auto my-10 h-fit max-w-5xl rounded-3xl border border-white/10 bg-neutral-950 p-4 font-sans md:p-10"
            >
              <button
                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950"
                onClick={handleClose}
                aria-label="Cerrar"
              >
                <IconX className="h-5 w-5" />
              </button>
              <motion.p
                layoutId={layout ? `category-${card.title}` : undefined}
                className="text-base font-medium text-sky-400"
              >
                {card.category}
              </motion.p>
              <motion.p
                layoutId={layout ? `title-${card.title}` : undefined}
                className="mt-2 text-2xl font-semibold text-neutral-100 md:text-4xl"
              >
                {card.title}
              </motion.p>
              <div className="py-6">{card.content}</div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className={cn(
          "relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 text-left md:h-[28rem] md:w-96",
          currentIndex === index && "ring-2 ring-sky-400/60",
        )}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-1/2 bg-gradient-to-b from-black/70 via-transparent to-transparent" />
        <div className="relative z-40 p-6">
          <motion.p
            layoutId={layout ? `category-${card.title}` : undefined}
            className="text-left font-sans text-sm font-medium text-white/80 md:text-base"
          >
            {card.category}
          </motion.p>
          <motion.p
            layoutId={layout ? `title-${card.title}` : undefined}
            className="mt-2 max-w-xs text-left font-sans text-xl font-semibold text-white [text-wrap:balance] md:text-3xl"
          >
            {card.title}
          </motion.p>
        </div>
        <img
          src={card.src}
          alt={card.title}
          className="absolute inset-0 z-10 h-full w-full object-cover opacity-70"
        />
      </motion.button>
    </>
  );
};
