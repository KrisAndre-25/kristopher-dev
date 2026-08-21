"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export function StickyBanner({
  children,
  className,
  onDismiss,
}: {
  children: ReactNode;
  className?: string;
  onDismiss?: () => void;
}) {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 z-[80] w-full overflow-hidden"
        >
          <div
            className={cn(
              "flex items-center justify-center gap-3 px-4 py-2.5 text-center text-sm font-medium",
              className,
            )}
          >
            {children}
            <button
              type="button"
              onClick={() => {
                setVisible(false);
                onDismiss?.();
              }}
              aria-label="Cerrar aviso"
              className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white/80 transition hover:bg-white/15 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
