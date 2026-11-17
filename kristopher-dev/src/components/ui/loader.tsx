import type { CSSProperties } from "react";
import "./loader.css";

const BARS = 10;

/** Loader de arranque: el logo "KA" al centro, rodeado por un anillo de 10
 *  barras que pulsan en secuencia hacia afuera. */
export function LoaderComponent({ label = "Cargando" }: { label?: string }) {
  return (
    <div className="ka-loader" role="status" aria-label={`${label}...`}>
      <div className="ka-loader__stage">
        <div className="ka-loader__spinner" aria-hidden="true">
          {Array.from({ length: BARS }, (_, i) => (
            <div
              key={i}
              style={
                {
                  "--delay": (i + 1) / 10,
                  "--rotation": (i + 1) * 36,
                } as CSSProperties
              }
            />
          ))}
        </div>
        <img src="ka-logo.png" alt="" width={320} height={197} className="ka-loader__logo" />
      </div>
      <span className="ka-loader__label">{label}</span>
    </div>
  );
}
