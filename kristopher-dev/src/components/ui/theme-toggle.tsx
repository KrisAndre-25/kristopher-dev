"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Cambiar tema oscuro/claro"
      tabIndex={0}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-white/10 bg-neutral-900 p-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
        isDark ? "bg-neutral-900" : "bg-sky-100",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ease-out",
          isDark ? "translate-x-0" : "translate-x-6",
        )}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-neutral-800" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-amber-500" />
        )}
      </span>
    </button>
  );
}
