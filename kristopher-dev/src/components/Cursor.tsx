import { useEffect, useRef } from "react";
import { useFinePointer } from "../hooks/useEnvironment";
import { useA11y } from "../hooks/useA11y";
import "./Cursor.css";

/**
 * Cursor personalizado con atracción magnética.
 * Solo se activa con puntero fino y si el usuario no pidió menos movimiento.
 * Los elementos con [data-magnetic] atraen el anillo y se desplazan ligeramente.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const { motionEnabled } = useA11y();
  const reduced = !motionEnabled;
  const fine = useFinePointer();

  useEffect(() => {
    if (reduced || !fine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.body.classList.add("has-cursor");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let magnet: HTMLElement | null = null;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;

      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("[data-magnetic]") ?? null;

      if (el !== magnet) {
        if (magnet) magnet.style.transform = "";
        magnet = el;
        ring.classList.toggle("is-locked", Boolean(el));
      }
    };

    const onLeave = () => {
      if (magnet) magnet.style.transform = "";
      magnet = null;
      ring.classList.remove("is-locked");
      ring.classList.add("is-hidden");
      dot.classList.add("is-hidden");
    };

    const onEnter = () => {
      ring.classList.remove("is-hidden");
      dot.classList.remove("is-hidden");
    };

    const onDown = () => ring.classList.add("is-down");
    const onUp = () => ring.classList.remove("is-down");

    const loop = () => {
      let tx = mx;
      let ty = my;

      if (magnet) {
        const r = magnet.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;

        // El anillo se ancla al centro del elemento
        tx = cx;
        ty = cy;

        // …y el elemento se desplaza un poco hacia el cursor
        const pull = Math.min(r.width, r.height) * 0.16;
        const dx = ((mx - cx) / (r.width / 2)) * pull;
        const dy = ((my - cy) / (r.height / 2)) * pull;
        magnet.style.transform = `translate3d(${dx.toFixed(2)}px, ${dy.toFixed(2)}px, 0)`;
      }

      rx += (tx - rx) * 0.16;
      ry += (ty - ry) * 0.16;

      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.body.classList.remove("has-cursor");
      if (magnet) magnet.style.transform = "";
    };
  }, [reduced, fine]);

  if (reduced || !fine) return null;

  return (
    <>
      <div className="cursor__ring" ref={ringRef} aria-hidden="true" />
      <div className="cursor__dot" ref={dotRef} aria-hidden="true" />
    </>
  );
}
