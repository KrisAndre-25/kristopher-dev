"use client";

import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#38bdf8", "#0ea5e9", "#8b5cf6", "#22d3ee"];

/**
 * Texto con relleno de degradado animado: las bandas de color se generan
 * con `repeating-linear-gradient` y se mueven vía `background-position`
 * (misma técnica que el marquee/retro-grid de este proyecto, no requiere
 * canvas ni medir fuentes — más robusto entre navegadores y DPI distintos).
 */
export function CanvasText({
  text,
  className,
  backgroundClassName,
  colors = DEFAULT_COLORS,
  lineGap = 6,
  animationDuration = 10,
}: {
  text: string;
  className?: string;
  backgroundClassName?: string;
  colors?: string[];
  lineGap?: number;
  animationDuration?: number;
}) {
  const bandWidth = Math.max(1, lineGap);
  const stops = colors
    .map((c, i) => `${c} ${i * bandWidth}px, ${c} ${(i + 1) * bandWidth}px`)
    .join(", ");
  const travel = bandWidth * colors.length * 4;

  const style: CSSProperties = {
    backgroundImage: `repeating-linear-gradient(115deg, ${stops})`,
    backgroundSize: `${travel}px ${travel}px`,
    "--ctf-duration": `${animationDuration}s`,
    "--ctf-travel": `${travel}px`,
  } as CSSProperties;

  return (
    <span className={cn("inline-block", backgroundClassName)}>
      <span
        className={cn(
          "inline-block animate-canvas-text-flow bg-clip-text text-transparent",
          className,
        )}
        style={style}
      >
        {text}
      </span>
    </span>
  );
}
