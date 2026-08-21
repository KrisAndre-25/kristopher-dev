"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

export function LanguageToggle({ className }: { className?: string }) {
  const { language, toggleLanguage } = useLanguage();
  const isEn = language === "en";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? "Switch language to Spanish" : "Cambiar idioma a inglés"}
      tabIndex={0}
      onClick={toggleLanguage}
      className={cn(
        "relative inline-flex h-8 w-14 shrink-0 items-center rounded-full border border-white/10 bg-neutral-900 p-1 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
        className,
      )}
    >
      <span
        className={cn(
          "flex h-6 w-6 items-center justify-center rounded-full bg-white text-[0.6rem] font-bold text-neutral-800 shadow-md transition-transform duration-300 ease-out",
          isEn ? "translate-x-6" : "translate-x-0",
        )}
      >
        {isEn ? "EN" : "ES"}
      </span>
    </button>
  );
}
