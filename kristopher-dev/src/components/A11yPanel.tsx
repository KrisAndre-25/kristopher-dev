import { useEffect, useRef, useState } from "react";
import { useA11y, type Theme } from "../hooks/useA11y";
import "./A11yPanel.css";

const THEMES: { id: Theme; label: string; dot: string }[] = [
  { id: "cian", label: "Cian", dot: "#2f7bff" },
  { id: "contraste", label: "Alto contraste", dot: "#7cb8ff" },
  { id: "ambar", label: "Ámbar", dot: "#ffa726" },
  { id: "claro", label: "Claro", dot: "#1552d0" },
  { id: "violeta", label: "Violeta", dot: "#a06bff" },
];

const TEXT_LABEL = { chico: "A−", normal: "A", grande: "A+" } as const;

export default function A11yPanel() {
  const [open, setOpen] = useState(false);
  const {
    theme, setTheme,
    textSize, stepText,
    motion, setMotion, motionEnabled,
    grayscale, setGrayscale,
    reset,
  } = useA11y();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div className="a11y" ref={wrapRef}>
      <button
        className={`a11y__toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Opciones de accesibilidad"
        title="Accesibilidad"
      >
        {/* Símbolo internacional de accesibilidad simplificado */}
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9.2" />
          <circle cx="12" cy="6.6" r="1.5" fill="currentColor" stroke="none" />
          <path d="M6.8 9.6h10.4M12 9.9v4.2M12 14.1l-2.4 4M12 14.1l2.4 4" />
        </svg>
      </button>

      <div
        className={`a11y__panel ${open ? "is-open" : ""}`}
        id="a11y-panel"
        role="dialog"
        aria-label="Accesibilidad"
      >
        {/* Tamaño de texto */}
        <div className="a11y__row">
          <span className="a11y__rowLabel mono">Texto</span>
          <div className="a11y__stepper">
            <button
              onClick={() => stepText(-1)}
              disabled={textSize === "chico"}
              aria-label="Reducir tamaño de texto"
            >
              A−
            </button>
            <span className="a11y__stepValue mono" aria-live="polite">
              {TEXT_LABEL[textSize]}
            </span>
            <button
              onClick={() => stepText(1)}
              disabled={textSize === "grande"}
              aria-label="Aumentar tamaño de texto"
            >
              A+
            </button>
          </div>
        </div>

        {/* Paleta */}
        <div className="a11y__row a11y__row--stack">
          <span className="a11y__rowLabel mono">Color</span>
          <div className="a11y__dots" role="group" aria-label="Paleta de color">
            {THEMES.map((t) => (
              <button
                key={t.id}
                className={`a11y__dot ${theme === t.id ? "is-active" : ""}`}
                onClick={() => setTheme(t.id)}
                aria-pressed={theme === t.id}
                aria-label={t.label}
                title={t.label}
              >
                <i style={{ background: t.dot }} />
              </button>
            ))}
          </div>
        </div>

        {/* Interruptores */}
        <div className="a11y__row">
          <span className="a11y__rowLabel mono">Blanco y negro</span>
          <button
            className={`a11y__switch ${grayscale ? "is-on" : ""}`}
            onClick={() => setGrayscale(!grayscale)}
            role="switch"
            aria-checked={grayscale}
            aria-label="Modo blanco y negro"
          >
            <span />
          </button>
        </div>

        <div className="a11y__row">
          <span className="a11y__rowLabel mono">
            Movimiento
            {motion === "auto" ? <em className="a11y__auto"> auto</em> : null}
          </span>
          <button
            className={`a11y__switch ${motionEnabled ? "is-on" : ""}`}
            onClick={() => setMotion(motionEnabled ? "off" : "on")}
            role="switch"
            aria-checked={motionEnabled}
            aria-label="Animaciones y efectos visuales"
          >
            <span />
          </button>
        </div>

        <button className="a11y__reset" onClick={reset}>
          Restablecer todo
        </button>
      </div>
    </div>
  );
}
