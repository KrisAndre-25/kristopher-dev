"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { IconLayoutGrid, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface FloatingDockItem {
  title: string;
  icon: ReactNode;
  href: string;
  external?: boolean;
  onClick?: () => void;
}

export function FloatingDock({
  items,
  className,
  mobileClassName,
}: {
  items: FloatingDockItem[];
  className?: string;
  mobileClassName?: string;
}) {
  return (
    <>
      <FloatingDockDesktop items={items} className={className} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
}

function FloatingDockMobile({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative lg:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="dock-mobile"
            className="absolute bottom-full mb-2 flex flex-col gap-2"
          >
            {items.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { delay: (items.length - i) * 0.03 } }}
                transition={{ delay: i * 0.03 }}
              >
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noreferrer" : undefined}
                  onClick={() => {
                    item.onClick?.();
                    setOpen(false);
                  }}
                  aria-label={item.title}
                  title={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-neutral-300"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Cerrar accesos rápidos" : "Abrir accesos rápidos"}
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-neutral-900 text-neutral-300"
      >
        {open ? <IconX className="h-4 w-4" /> : <IconLayoutGrid className="h-4 w-4" />}
      </button>
    </div>
  );
}

function FloatingDockDesktop({
  items,
  className,
}: {
  items: FloatingDockItem[];
  className?: string;
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "hidden items-end gap-3 rounded-full border border-white/10 bg-neutral-900/90 px-3 py-2 backdrop-blur lg:flex",
        className,
      )}
    >
      {items.map((item) => (
        <DockIcon key={item.title} mouseX={mouseX} item={item} />
      ))}
    </div>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue<number>;
  item: FloatingDockItem;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return 0;
    return val - (rect.left + rect.width / 2);
  });

  const sizeTransform = useTransform(distance, [-140, 0, 140], [32, 52, 32]);
  const size = useSpring(sizeTransform, { mass: 0.1, stiffness: 200, damping: 14 });

  return (
    <div className="group relative flex flex-col items-center">
      <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md bg-neutral-950 px-2 py-1 text-[0.65rem] text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {item.title}
      </span>
      <motion.a
        ref={ref}
        href={item.href}
        target={item.external ? "_blank" : undefined}
        rel={item.external ? "noreferrer" : undefined}
        onClick={item.onClick}
        aria-label={item.title}
        style={{ width: size, height: size }}
        className="flex items-center justify-center rounded-full border border-white/10 bg-neutral-800 text-neutral-300 transition-colors hover:border-sky-400/50 hover:text-sky-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
      >
        <div className="h-1/2 w-1/2">{item.icon}</div>
      </motion.a>
    </div>
  );
}
