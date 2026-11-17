import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ShieldCheck, ExternalLink, FileText, X } from "lucide-react";
import type { Cert } from "@/data/content";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { SectionHeading } from "@/components/SectionHeading";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";

/** Desvanecido de los bordes con curva suave (sin escalones visibles).
 *  rgb(10 10 10) = bg-neutral-950. */
const EDGE_FADE = [
  "rgb(10 10 10 / 1) 0%",
  "rgb(10 10 10 / 0.97) 12%",
  "rgb(10 10 10 / 0.9) 25%",
  "rgb(10 10 10 / 0.78) 38%",
  "rgb(10 10 10 / 0.62) 50%",
  "rgb(10 10 10 / 0.45) 62%",
  "rgb(10 10 10 / 0.28) 74%",
  "rgb(10 10 10 / 0.13) 86%",
  "rgb(10 10 10 / 0) 100%",
].join(", ");

export function CertificationsDemo() {
  const { certifications } = useContent();
  const t = useUiStrings();
  const [active, setActive] = useState<Cert | null>(null);

  const images = useMemo(
    () =>
      certifications
        .filter((c) => c.image ?? c.thumb)
        .map((c) => ({ src: (c.image ?? c.thumb) as string, alt: c.name })),
    [certifications],
  );
  const withImage = useMemo(() => certifications.filter((c) => c.image ?? c.thumb), [certifications]);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950">
      <TiltedGridHero
        images={images}
        onImageClick={(i) => setActive(withImage[i] ?? null)}
        aspectRatio={1.39}
        tileHeight={32}
        axis={60}
        gap={28}
        curve={55}
        fade={18}
        speed={4.5}
        className="h-[460px] w-full sm:h-[580px]"
      >
        {/* Bordes: degradados opacos del color del fondo. La máscara del
            componente no alcanza a transparentar del todo las tarjetas que se
            curvan hacia la cámara, y quedaban cortadas contra el borde. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[18%]"
          style={{ backgroundImage: `linear-gradient(to right, ${EDGE_FADE})` }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-[5] w-[18%]"
          style={{ backgroundImage: `linear-gradient(to left, ${EDGE_FADE})` }}
        />
        {/* Capa de texto: no intercepta clics, así llegan a los certificados */}
        <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-between pb-6 pt-10 text-center">
          <SectionHeading number="04" eyebrow={t.certificaciones.eyebrow} className="px-4" />
          <p className="px-6 font-mono text-[0.7rem] uppercase tracking-widest text-neutral-300">
            {t.certificaciones.gridHint}
          </p>
        </div>
      </TiltedGridHero>

      {/* Lista accesible (teclado y lectores de pantalla) con los mismos destinos */}
      <nav aria-label={t.certificaciones.listLabel} className="border-t border-white/10 px-4 py-6">
        <ul className="mx-auto flex max-w-5xl flex-wrap justify-center gap-2">
          {certifications.map((cert) => (
            <li key={cert.id}>
              <button
                type="button"
                onClick={() => setActive(cert)}
                className="flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900 px-4 py-2 text-left text-xs text-neutral-200 transition hover:border-sky-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 sm:text-sm"
              >
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-sky-400">{cert.org}</span>
                <span aria-hidden="true" className="h-3 w-px bg-white/15" />
                <span className="font-medium">{cert.name}</span>
                {cert.verifyUrl && (
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" aria-label={t.certificaciones.verificable} />
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <CertModal cert={active} onClose={() => setActive(null)} t={t} />
    </div>
  );
}

function CertModal({
  cert,
  onClose,
  t,
}: {
  cert: Cert | null;
  onClose: () => void;
  t: ReturnType<typeof useUiStrings>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useOutsideClick(ref, onClose);

  useEffect(() => {
    if (!cert) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cert, onClose]);

  return (
    <AnimatePresence>
      {cert && (
        <div className="fixed inset-0 z-[100] flex h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={ref}
            className="relative z-[101] max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-6"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={t.certificaciones.cerrar}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950"
            >
              <X className="h-4 w-4" />
            </button>
            {(cert.image ?? cert.thumb) && (
              <img
                src={cert.image ?? cert.thumb}
                alt={cert.name}
                className="mb-4 w-full rounded-xl border border-white/10"
              />
            )}
            <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
              {cert.org}
            </p>
            <h3 id={titleId} className="mt-1 text-xl font-semibold text-white">
              {cert.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {cert.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {cert.pdf && (
                <a
                  href={cert.pdf}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white hover:border-sky-400/50"
                >
                  <FileText className="h-3.5 w-3.5" /> {t.certificaciones.verPdf}
                </a>
              )}
              {cert.verifyUrl && (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {cert.verifyLabel ?? t.certificaciones.verificar}
                </a>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
