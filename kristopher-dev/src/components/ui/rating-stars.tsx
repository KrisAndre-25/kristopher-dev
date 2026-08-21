"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "kd-portfolio-rating";

export function RatingStars({
  heading,
  thanks,
  levelLabels,
  className,
}: {
  heading: string;
  thanks: string;
  levelLabels: readonly string[];
  className?: string;
}) {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setRating(Number(stored));
  }, []);

  const setAndPersist = (n: number) => {
    setRating(n);
    window.localStorage.setItem(STORAGE_KEY, String(n));
  };

  const active = hovered ?? rating ?? 0;

  return (
    <div className={cn("text-center", className)}>
      <p className="text-sm font-medium text-neutral-300">{heading}</p>
      <div role="radiogroup" aria-label={heading} className="mt-2 flex items-center justify-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={rating === n}
            aria-label={levelLabels[n - 1]}
            title={levelLabels[n - 1]}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(n)}
            onBlur={() => setHovered(null)}
            onClick={() => setAndPersist(n)}
            className="p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <Star
              className={cn(
                "h-6 w-6 transition-colors",
                n <= active ? "fill-amber-400 text-amber-400" : "fill-transparent text-neutral-600",
              )}
            />
          </button>
        ))}
      </div>
      {rating !== null && (
        <p role="status" aria-live="polite" className="mt-2 text-xs text-emerald-400">
          {thanks}
        </p>
      )}
    </div>
  );
}
