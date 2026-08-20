import { useState } from "react";
import { certifications, type Cert } from "../data/content";
import "./Certifications.css";

export default function Certifications() {
  const [preview, setPreview] = useState<Cert | null>(null);

  return (
    <>
      <ul className="certs">
        {certifications.map((c) => (
          <li className="certs__item card" key={c.id}>
            {c.thumb ? (
              <div className="certs__thumb">
                <img src={c.thumb} alt={`Certificado: ${c.name}`} loading="lazy" decoding="async" />
              </div>
            ) : (
              <div className="certs__thumb certs__thumb--empty" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M6 3h9l5 5v13a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1z" />
                  <path d="M15 3v5h5" />
                  <circle cx="12" cy="14" r="2.4" />
                  <path d="M10.2 16.2L9.5 20l2.5-1.3 2.5 1.3-.7-3.8" />
                </svg>
              </div>
            )}

            <div className="certs__body">
              <div className="certs__head">
                <h3 className="certs__name">{c.name}</h3>
                <span className="certs__org mono">
                  {c.org} · {c.date}
                  {c.hours ? ` · ${c.hours}` : ""}
                </span>
              </div>

              <p className="certs__summary">{c.summary}</p>

              <ul className="certs__skills">
                {c.skills.map((sk) => (
                  <li className="chip" key={sk}>
                    {sk}
                  </li>
                ))}
              </ul>

              {c.pdf || c.image ? (
                <div className="certs__actions">
                  <button className="certs__btn certs__btn--main" onClick={() => setPreview(c)}>
                    Ver certificado
                  </button>
                  <a className="certs__btn" href={(c.pdf ?? c.image) as string} download data-magnetic>
                    Descargar {c.pdf ? "PDF" : "imagen"}
                  </a>
                  {c.verifyUrl ? (
                    <a
                      className="certs__btn certs__btn--verify"
                      href={c.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      data-magnetic
                    >
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 3l7 3v5.5c0 4.2-2.9 8.1-7 9.5-4.1-1.4-7-5.3-7-9.5V6l7-3z" />
                        <path d="M9 12l2 2 4-4" />
                      </svg>
                      {c.verifyLabel ?? "Verificar"}
                    </a>
                  ) : null}
                </div>
              ) : (
                <p className="certs__noPdf mono">Certificado digital verificable en la plataforma</p>
              )}

              {c.code ? (
                <p className="certs__code mono">
                  <span>Código de verificación</span>
                  {c.code}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {preview ? (
        <div
          className="certModal"
          role="dialog"
          aria-modal="true"
          aria-label={`Certificado: ${preview.name}`}
          onMouseDown={() => setPreview(null)}
        >
          <div className="certModal__panel" onMouseDown={(e) => e.stopPropagation()}>
            <header className="certModal__head">
              <div>
                <p className="certModal__name">{preview.name}</p>
                <p className="certModal__org mono">
                  {preview.org} · {preview.date}
                </p>
              </div>
              <div className="certModal__tools">
                {preview.verifyUrl ? (
                  <a
                    className="certs__btn certs__btn--verify"
                    href={preview.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {preview.verifyLabel ?? "Verificar"}
                  </a>
                ) : null}
                <a className="certs__btn" href={(preview.pdf ?? preview.image) as string} download>
                  Descargar
                </a>
                <button className="certModal__close" onClick={() => setPreview(null)} aria-label="Cerrar">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M7 7l10 10M17 7L7 17" />
                  </svg>
                </button>
              </div>
            </header>

            {preview.pdf ? (
              <object className="certModal__doc" data={preview.pdf} type="application/pdf">
                {/* Muchos navegadores móviles no incrustan PDFs */}
                <div className="certModal__fallback">
                  {preview.thumb ? <img src={preview.thumb} alt={preview.name} /> : null}
                  <p>Tu navegador no puede mostrar el PDF incrustado.</p>
                  <a
                    className="certs__btn certs__btn--main"
                    href={preview.pdf}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir en una pestaña nueva
                  </a>
                </div>
              </object>
            ) : (
              <div className="certModal__imgWrap">
                <img className="certModal__img" src={preview.image} alt={`Certificado: ${preview.name}`} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
