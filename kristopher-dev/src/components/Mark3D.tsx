import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { useA11y } from "../hooks/useA11y";
import "./Mark3D.css";

/**
 * three.js pesa bastante, así que no entra en el bundle inicial: se importa
 * de forma diferida y solo cuando la sección está por entrar en pantalla.
 * Quien nunca baja hasta acá, nunca lo descarga.
 */
const ParticleObject = lazy(() =>
  import("./canvasui/ParticleObject").then((m) => ({ default: m.ParticleObject }))
);

const ACCENT: Record<string, string> = {
  cian: "#2f7bff",
  contraste: "#7cb8ff",
  ambar: "#ffa726",
  claro: "#1552d0",
  violeta: "#a06bff",
};

export default function Mark3D() {
  const { motionEnabled, theme } = useA11y();
  const ref = useRef<HTMLDivElement | null>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      // Empieza a cargar un poco antes de que se vea, para que no aparezca vacío
      { rootMargin: "300px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div className="mark3d" ref={ref}>
      {motionEnabled && near ? (
        <Suspense fallback={<MarkFallback />}>
          <ParticleObject
            src="mark.svg"
            className="mark3d__canvas"
            count={26000}
            size={2.4}
            sizeVariance={0.35}
            color={ACCENT[theme] ?? ACCENT.cian}
            radius={120}
            strength={2.2}
            swirl={0.9}
            spring={3.5}
            damping={0.82}
            drift={0.35}
            background=""
            scale={3.1}
            autoRotate={false}
          />
        </Suspense>
      ) : (
        <MarkFallback />
      )}
      <p className="mark3d__hint mono">
        {motionEnabled ? "Pasa el cursor sobre la marca" : "Marca del portafolio"}
      </p>
    </div>
  );
}

/** Versión estática: se ve igual de bien sin WebGL ni three.js. */
function MarkFallback() {
  return (
    <div className="mark3d__static" aria-hidden="true">
      <svg viewBox="0 0 240 120">
        <polygon points="58,18 20,60 58,102 58,82 40,60 58,38" />
        <polygon points="98,102 116,102 142,18 124,18" />
        <polygon points="182,18 220,60 182,102 182,82 200,60 182,38" />
      </svg>
    </div>
  );
}
