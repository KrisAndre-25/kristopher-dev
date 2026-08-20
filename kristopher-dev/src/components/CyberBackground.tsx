import { useEffect, useRef } from "react";
import { useFinePointer } from "../hooks/useEnvironment";
import { useA11y } from "../hooks/useA11y";
import "./CyberBackground.css";

/** Generador determinista: mismo layout en cada carga, sin sorpresas. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

type Mote = {
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  depth: number;
};

const rand = seeded(20260722);

const nodes: Mote[] = Array.from({ length: 18 }, () => ({
  x: rand() * 100,
  y: rand() * 100,
  size: 1.5 + rand() * 2.5,
  delay: -rand() * 22,
  duration: 16 + rand() * 16,
  drift: -18 + rand() * 36,
  depth: 0.4 + rand() * 1.6,
}));

/** Líneas de conexión entre nodos cercanos, dibujadas una sola vez. */
const links = (() => {
  const out: { x1: number; y1: number; x2: number; y2: number; len: number }[] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 15 && out.length < 20) {
        out.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, len: d });
      }
    }
  }
  return out;
})();

export default function CyberBackground() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { motionEnabled } = useA11y();
  const reduced = !motionEnabled;
  const fine = useFinePointer();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced || !fine) return;

    let frame = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const tick = () => {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      el.style.setProperty("--px", cx.toFixed(4));
      el.style.setProperty("--py", cy.toFixed(4));

      if (Math.abs(tx - cx) > 0.001 || Math.abs(ty - cy) > 0.001) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [reduced, fine]);

  return (
    <div className="bg" ref={ref} aria-hidden="true">
      <div className="bg__grid" />
      <div className="bg__glow" />

      <svg className="bg__links" viewBox="0 0 100 100" preserveAspectRatio="none">
        {links.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            style={{
              animationDelay: `${-i * 1.7}s`,
              animationDuration: `${9 + l.len * 0.4}s`,
            }}
          />
        ))}
      </svg>

      <div className="bg__layer">
        {nodes.map((n, i) => (
          <span
            key={`n${i}`}
            className="bg__node"
            style={{
              left: `${n.x}%`,
              top: `${n.y}%`,
              width: `${n.size}px`,
              height: `${n.size}px`,
              animationDelay: `${n.delay}s`,
              animationDuration: `${n.duration}s`,
              // @ts-expect-error propiedades personalizadas de CSS
              "--drift": `${n.drift}px`,
              "--depth": n.depth,
            }}
          />
        ))}


      </div>

      <div className="bg__vignette" />
    </div>
  );
}
