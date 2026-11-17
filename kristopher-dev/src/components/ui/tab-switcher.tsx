"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type TabSwitcherItem = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Acordeón numerado a la izquierda + imagen a la derecha que cambia con un
 * fundido desenfocado. Al hacer clic en el ítem abierto se cierra, pero la
 * imagen se mantiene en la última seleccionada (igual que la referencia).
 */
export function TabSwitcher({
  items,
  label,
  defaultIndex = 0,
  className,
}: {
  items: readonly TabSwitcherItem[];
  label?: string;
  defaultIndex?: number;
  className?: string;
}) {
  const baseId = useId();
  const [open, setOpen] = useState<number | null>(defaultIndex);
  const [shown, setShown] = useState(defaultIndex);

  const toggle = (i: number) => {
    if (open === i) {
      setOpen(null);
      return;
    }
    setOpen(i);
    setShown(i);
  };

  const current = items[shown];

  return (
    <div className={cn("grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12 lg:gap-16", className)}>
      {/* Lista */}
      <div>
        {label && (
          <p className="mb-8 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white">
            {label}
          </p>
        )}
        <ul className="border-t border-white/10">
          {items.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={item.title} className="border-b border-white/10">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="group flex w-full items-center gap-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    <span
                      className={cn(
                        "w-6 shrink-0 font-mono text-[0.7rem] font-semibold tabular-nums transition-colors duration-300",
                        isOpen ? "text-white" : "text-neutral-500 group-hover:text-neutral-300",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "flex-1 text-sm font-medium transition-colors duration-300 sm:text-base",
                        isOpen ? "text-white" : "text-neutral-400 group-hover:text-neutral-100",
                      )}
                    >
                      {item.title}
                    </span>
                    <PlusMinus open={isOpen} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 pl-11 pr-8 text-sm leading-relaxed text-neutral-300">
                        {item.description}
                      </p>
                      {/* En móvil la imagen va dentro del ítem abierto para que se vea al tocarlo */}
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="mb-5 aspect-video w-full rounded-xl object-cover ring-1 ring-white/10 md:hidden"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Imagen */}
      <div className="relative hidden aspect-square w-full overflow-hidden rounded-2xl bg-neutral-900 ring-1 ring-white/10 md:block">
        <AnimatePresence initial={false}>
          <motion.img
            key={current.image}
            src={current.image}
            alt={current.imageAlt}
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 1.06, filter: "blur(24px) brightness(0.4)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px) brightness(1)" }}
            exit={{ opacity: 0, filter: "blur(24px) brightness(0.4)" }}
            transition={{ duration: 0.7, ease }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <p className="absolute bottom-4 left-5 right-5 truncate font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/80">
          {String(shown + 1).padStart(2, "0")} — {current.title}
        </p>
      </div>
    </div>
  );
}

function PlusMinus({ open }: { open: boolean }) {
  return (
    <span className="relative flex h-3.5 w-3.5 shrink-0 items-center justify-center" aria-hidden="true">
      <span
        className={cn(
          "absolute h-px w-full transition-colors duration-300",
          open ? "bg-white" : "bg-neutral-500 group-hover:bg-neutral-300",
        )}
      />
      <span
        className={cn(
          "absolute h-full w-px transition-all duration-300",
          open ? "rotate-90 scale-y-0 bg-white" : "bg-neutral-500 group-hover:bg-neutral-300",
        )}
      />
    </span>
  );
}
