import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./useEnvironment";

/**
 * Anima un número de 0 al valor final cuando el elemento entra en pantalla,
 * una sola vez. Con `prefers-reduced-motion` salta directo al valor final.
 */
export function useCountUp<T extends HTMLElement>(target: number, duration = 1100) {
  const ref = useRef<T | null>(null);
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();
  const done = useRef(false);

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setValue(target);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
              setValue(Math.round(target * eased));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [target, duration, reduced]);

  return { ref, value };
}
