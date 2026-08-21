"use client";

import { cn } from "@/lib/utils";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cloneElement, isValidElement, useRef, useState, type ReactNode } from "react";

interface NavbarProps {
  children: ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setVisible(latest > 80);
  });

  return (
    <motion.div
      ref={ref}
      className={cn("sticky inset-x-0 top-0 z-50 w-full", className)}
    >
      {(Array.isArray(children) ? children : [children]).map((child, i) =>
        isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ visible?: boolean }>, {
              key: i,
              visible,
            })
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.5)"
          : "none",
        width: visible ? "60%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      style={{ minWidth: "800px" }}
      className={cn(
        "relative z-[60] mx-auto hidden max-w-6xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-neutral-950/80",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-1 text-sm font-medium text-neutral-300 lg:flex",
        className,
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => setHovered(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-300 transition-colors hover:text-white"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "none",
        boxShadow: visible
          ? "0 0 0 1px rgba(255,255,255,0.08), 0 8px 30px rgba(0,0,0,0.5)"
          : "none",
        width: visible ? "92%" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 50 }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between rounded-2xl bg-transparent px-4 py-3 lg:hidden",
        visible && "bg-neutral-950/90",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({ children, className }: MobileNavHeaderProps) => {
  return (
    <div className={cn("flex w-full flex-row items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-3 rounded-2xl border border-white/10 bg-neutral-950/95 px-5 py-6 shadow-2xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      className="relative flex h-8 w-8 flex-col items-center justify-center gap-1.5"
    >
      <motion.span
        animate={{ rotate: isOpen ? 45 : 0, y: isOpen ? 6 : 0 }}
        className="h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        className="h-0.5 w-6 bg-white"
      />
      <motion.span
        animate={{ rotate: isOpen ? -45 : 0, y: isOpen ? -6 : 0 }}
        className="h-0.5 w-6 bg-white"
      />
    </button>
  );
};

export const NavbarLogo = ({ children }: { children?: ReactNode }) => {
  return (
    <a
      href="#top"
      className="relative z-20 flex items-center gap-2 px-2 py-1 text-sm font-semibold text-white"
    >
      {children}
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary";
} & Record<string, unknown>) => {
  const base =
    "inline-block rounded-full px-4 py-2 text-sm font-semibold text-center transition duration-200";
  const variants: Record<string, string> = {
    primary:
      "bg-white text-neutral-950 shadow-[0_2px_20px_-4px_rgba(255,255,255,0.3)] hover:-translate-y-0.5",
    secondary: "bg-transparent text-white hover:text-neutral-300",
  };

  return (
    <Tag href={href} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </Tag>
  );
};
