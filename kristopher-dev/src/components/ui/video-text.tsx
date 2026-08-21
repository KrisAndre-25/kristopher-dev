"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function VideoText({
  src,
  webmSrc,
  poster,
  lines,
  className,
  lineGap = 1.05,
}: {
  src: string;
  webmSrc?: string;
  poster?: string;
  lines: string[];
  className?: string;
  lineGap?: number;
}) {
  const maskId = useId();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { width, height } = size;
  const fontSize = height > 0 ? height / (lines.length * lineGap + 0.15) : 0;

  return (
    <div
      ref={wrapRef}
      role="img"
      aria-label={lines.join(" ")}
      className={cn("relative mx-auto w-full", className)}
    >
      {width > 0 && height > 0 && (
        <>
          <svg
            width={width}
            height={height}
            className="pointer-events-none absolute inset-0 h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <defs>
              <mask
                id={maskId}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={width}
                height={height}
              >
                <rect width={width} height={height} fill="black" />
                {lines.map((line, i) => {
                  const y = fontSize * lineGap * (i + 1);
                  return (
                    <text
                      key={line + i}
                      x={width / 2}
                      y={y}
                      textAnchor="middle"
                      fontWeight={800}
                      fontFamily="Inter, sans-serif"
                      fontSize={fontSize}
                      fill="white"
                      textLength={width * 0.96}
                      lengthAdjust="spacingAndGlyphs"
                    >
                      {line}
                    </text>
                  );
                })}
              </mask>
            </defs>
          </svg>

          <div
            className="h-full w-full"
            style={{
              WebkitMaskImage: `url(#${maskId})`,
              maskImage: `url(#${maskId})`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
            }}
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={poster}
              aria-hidden="true"
            >
              <source src={src} type="video/mp4" />
              {webmSrc && <source src={webmSrc} type="video/webm" />}
            </video>
          </div>
        </>
      )}
    </div>
  );
}
