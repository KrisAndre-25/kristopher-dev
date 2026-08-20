import { useEffect, useRef } from "react";

/**
 * Revela un elemento cuando entra al viewport.
 * Añade la clase `is-in` una sola vez y desconecta el observer.
 */
export function useReveal<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.setProperty("--reveal-delay", `${delay}ms`);

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    io.observe(node);
    return () => io.disconnect();
  }, [delay]);

  return ref;
}
