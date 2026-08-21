"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveHoverButton({
  children,
  className,
  variant = "light",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "light" | "dark";
}) {
  return (
    <button
      className={cn(
        "group relative w-fit cursor-pointer overflow-hidden rounded-full border py-2 pl-6 pr-10 text-center text-sm font-semibold transition-colors duration-300",
        variant === "light"
          ? "border-white/20 bg-white text-neutral-950"
          : "border-white/15 bg-neutral-900 text-white",
        className,
      )}
      {...props}
    >
      <span className="relative z-10 inline-flex items-center gap-2 transition-all duration-300 group-hover:translate-x-8 group-hover:opacity-0">
        {children}
      </span>
      <span className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-1 group-hover:opacity-100">
        {children}
        <ArrowRight className="h-4 w-4 shrink-0" />
      </span>
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-[18%] top-1/2 z-0 h-2 w-2 -translate-y-1/2 scale-[1] rounded-full transition-all duration-300 group-hover:left-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.6] group-hover:rounded-none",
          variant === "light" ? "bg-sky-400" : "bg-sky-500",
        )}
      />
    </button>
  );
}
