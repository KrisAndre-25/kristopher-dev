"use client";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export type LayoutGridCard = {
  id: number;
  content: React.ReactNode;
  className: string;
  thumbnail: string;
  /** Texto alternativo de la miniatura. */
  alt?: string;
};

export const LayoutGrid = ({ cards, className }: { cards: LayoutGridCard[]; className?: string }) => {
  const [selected, setSelected] = useState<LayoutGridCard | null>(null);
  const [lastSelected, setLastSelected] = useState<LayoutGridCard | null>(null);

  const handleClick = (card: LayoutGridCard) => {
    setLastSelected(selected);
    setSelected(card);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setLastSelected(selected);
        setSelected(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <div
      className={cn(
        "relative mx-auto grid h-full w-full max-w-7xl grid-cols-1 gap-4 p-4 md:grid-cols-3 md:p-10",
        className,
      )}
    >
      {cards.map((card) => (
        <div key={card.id} className={cn(card.className, "")}>
          <motion.div
            onClick={() => handleClick(card)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick(card);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={selected?.id === card.id}
            className={cn(
              card.className,
              "relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
              selected?.id === card.id
                ? "absolute inset-0 z-50 m-auto flex h-3/4 w-full cursor-pointer flex-col flex-wrap items-center justify-center rounded-2xl md:h-2/3 md:w-2/3"
                : lastSelected?.id === card.id
                  ? "z-40 h-full w-full rounded-2xl bg-neutral-900 ring-1 ring-white/10"
                  : "h-full w-full rounded-2xl bg-neutral-900 ring-1 ring-white/10 transition-shadow hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.45)]",
            )}
            layoutId={`card-${card.id}`}
          >
            {selected?.id === card.id && <SelectedCard selected={selected} />}
            <ImageComponent card={card} />
          </motion.div>
        </div>
      ))}
      <motion.div
        onClick={handleOutsideClick}
        className={cn(
          "absolute left-0 top-0 z-10 h-full w-full rounded-3xl bg-black opacity-0",
          selected?.id ? "pointer-events-auto" : "pointer-events-none",
        )}
        animate={{ opacity: selected?.id ? 0.6 : 0 }}
      />
    </div>
  );
};

const ImageComponent = ({ card }: { card: LayoutGridCard }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      loading="lazy"
      decoding="async"
      className="absolute inset-0 h-full w-full object-cover object-top transition duration-200"
      alt={card.alt ?? ""}
    />
  );
};

const SelectedCard = ({ selected }: { selected: LayoutGridCard | null }) => {
  return (
    <div className="relative z-[60] flex h-full w-full flex-col justify-end rounded-2xl bg-transparent shadow-2xl">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.75 }}
        className="absolute inset-0 z-10 h-full w-full bg-neutral-950"
      />
      <motion.div
        layoutId={`content-${selected?.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative z-[70] max-h-full overflow-y-auto px-5 pb-5 sm:px-8 sm:pb-6"
        onClick={(e) => e.stopPropagation()}
      >
        {selected?.content}
      </motion.div>
    </div>
  );
};
