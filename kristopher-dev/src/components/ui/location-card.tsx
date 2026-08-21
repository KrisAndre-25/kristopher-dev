"use client";

import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function LocationCard({
  city,
  country,
  label,
  className,
}: {
  city: string;
  country: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("group relative inline-block", className)}>
      <p className="inline-flex cursor-default items-center gap-1.5 text-sm text-neutral-300">
        <MapPin className="h-3.5 w-3.5 text-sky-400" />
        {label} <span className="font-medium italic text-sky-400">{city}</span>, {country}
      </p>

      <div
        role="presentation"
        style={{ transitionTimingFunction: "cubic-bezier(0.74, -0.03, 0.05, 1.24)" }}
        className="pointer-events-none absolute -top-28 left-1/2 z-30 h-[104px] w-[184px] -translate-x-1/2 scale-0 overflow-hidden rounded-2xl border border-sky-400/30 bg-neutral-950 opacity-0 shadow-2xl blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 group-hover:blur-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 20%, rgba(56,189,248,0.18), transparent 60%), linear-gradient(rgba(56,189,248,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.12) 1px, transparent 1px)",
            backgroundSize: "auto, 18px 18px, 18px 18px",
          }}
        />
        <span className="absolute left-[55%] top-[34%] flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-neutral-950 bg-sky-400" />
        </span>
        <div className="relative z-10 p-3.5">
          <p className="text-sm font-semibold text-white">{city}</p>
          <p className="text-xs text-neutral-400">{country}</p>
        </div>
      </div>
    </div>
  );
}
