import { useEffect, useRef, useState } from "react";

/**
 * Si un elemento no está cerca del viewport, no tiene sentido seguir
 * gastando CPU/GPU en su animación (globo WebGL, canvas, RAF loops).
 * `rootMargin` amplio para que arranque un poco antes de entrar en pantalla.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
