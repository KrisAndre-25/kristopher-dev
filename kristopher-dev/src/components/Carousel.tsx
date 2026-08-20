import { useCallback, useEffect, useRef, useState } from "react";
import { slides } from "../data/content";
import { usePrefersReducedMotion } from "../hooks/useEnvironment";
import "./Carousel.css";

const AUTOPLAY_MS = 6000;
const total = slides.length;

/**
 * Carrusel "Hero" (Material Design 3): un ítem grande centrado, con los
 * vecinos asomando —recortados y atenuados— a los costados. A diferencia
 * de un slider tradicional (una tarjeta a la vez, flechas, listo), acá
 * siempre ves un anticipo de lo que sigue y de lo que quedó atrás.
 *
 * El desplazamiento es scroll nativo con scroll-snap (funciona con touch,
 * trackpad y rueda sin JS adicional); React solo decide a qué ítem saltar
 * cuando usas flechas/puntos, y calcula cuál está centrado para aplicarle
 * el estado "activo" (tamaño completo, opacidad completa).
 */
export default function Carousel() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduced = usePrefersReducedMotion();
  const itemWidthRef = useRef(0);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = ((i % total) + total) % total;
    const item = track.children[clamped] as HTMLElement | undefined;
    if (!item) return;
    track.scrollTo({
      left: item.offsetLeft - (track.clientWidth - item.clientWidth) / 2,
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  // Autoplay: avanza solo si nadie está interactuando y no se pidió menos movimiento.
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setTimeout(() => scrollToIndex(active + 1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [active, paused, reduced, scrollToIndex]);

  // Determina cuál ítem está centrado en el track, para marcarlo "activo".
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.clientWidth / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    const onResize = () => {
      itemWidthRef.current = (track.children[0] as HTMLElement)?.clientWidth ?? 0;
      measure();
    };

    measure();
    onResize();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") scrollToIndex(active + 1);
    if (e.key === "ArrowLeft") scrollToIndex(active - 1);
  };

  return (
    <div
      className="car"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKey}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Hitos y certificaciones"
      tabIndex={0}
    >
      <div className="car__track" ref={trackRef}>
        {slides.map((s, i) => (
          <article
            className={`car__slide ${i === active ? "is-active" : ""}`}
            key={s.id}
            aria-roledescription="diapositiva"
            aria-label={`${i + 1} de ${total}: ${s.title}`}
            aria-hidden={i !== active}
          >
            <div className={`car__card ${s.image ? "has-media" : ""}`}>
              {s.image ? (
                <div className="car__media">
                  <img src={s.image} alt={s.imageAlt ?? s.title} loading="lazy" decoding="async" />
                </div>
              ) : null}

              <div className="car__body-col">
                <div className="car__top">
                  <span className="eyebrow">{s.eyebrow}</span>
                  <span className="car__meta mono">{s.meta}</span>
                </div>

                <h3 className="car__title">{s.title}</h3>
                <p className="car__body">{s.body}</p>

                <ul className="car__tags">
                  {s.tags.map((t) => (
                    <li className="chip" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <span className="car__index mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="car__controls">
        <div className="car__dots" role="tablist" aria-label="Ir a la diapositiva">
          {slides.map((s, i) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={i === active}
              aria-label={`Diapositiva ${i + 1}: ${s.title}`}
              className={`car__dot ${i === active ? "is-active" : ""}`}
              onClick={() => scrollToIndex(i)}
            >
              <span
                className="car__dotFill"
                style={{
                  animationDuration: `${AUTOPLAY_MS}ms`,
                  animationPlayState: i === active && !paused && !reduced ? "running" : "paused",
                }}
              />
            </button>
          ))}
        </div>

        <div className="car__arrows">
          <button className="car__arrow" onClick={() => scrollToIndex(active - 1)} aria-label="Anterior" data-magnetic>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" />
            </svg>
          </button>
          <button className="car__arrow" onClick={() => scrollToIndex(active + 1)} aria-label="Siguiente" data-magnetic>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
