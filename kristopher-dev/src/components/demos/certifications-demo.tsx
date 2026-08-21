import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, ShieldCheck, ExternalLink, FileText, X } from "lucide-react";
import type { Cert } from "@/data/content";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RetroGrid } from "@/components/ui/retro-grid";
import Text3DFlip from "@/components/ui/text-3d-flip";

export function CertificationsDemo() {
  const { certifications } = useContent();
  const t = useUiStrings();
  const [active, setActive] = useState<Cert | null>(null);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-950 py-12">
      <RetroGrid />

      <div className="relative z-10 mb-10 px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
          {t.certificaciones.eyebrow}
        </p>
        <Text3DFlip
          key={t.certificaciones.title}
          className="mt-3 text-3xl font-semibold text-white sm:text-4xl"
          rotateDirection="top"
          staggerDuration={0.02}
          staggerFrom="first"
        >
          {t.certificaciones.title}
        </Text3DFlip>
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <CardContainer key={cert.id} containerClassName="py-0">
            <CardBody className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-shadow hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]">
              <CardItem translateZ={50} className="w-full">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-900">
                  {cert.thumb ? (
                    <img src={cert.thumb} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <Award className="h-10 w-10 text-neutral-700" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  {cert.verifyUrl && (
                    <CardItem
                      translateZ={80}
                      className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 font-mono text-[0.65rem] text-emerald-400 ring-1 ring-emerald-400/30"
                    >
                      <ShieldCheck className="h-3 w-3" /> {t.certificaciones.verificable}
                    </CardItem>
                  )}
                </div>
              </CardItem>

              <CardItem translateZ={40} className="mt-4 w-full">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sky-400">
                  {cert.org}
                </p>
              </CardItem>
              <CardItem translateZ={60} className="mt-1 w-full">
                <h3 className="text-base font-semibold text-white">{cert.name}</h3>
              </CardItem>
              <CardItem translateZ={30} className="mt-1 w-full">
                <p className="text-xs text-neutral-500">
                  {cert.date}
                  {cert.hours ? ` · ${cert.hours}` : ""}
                </p>
              </CardItem>
              <CardItem translateZ={30} className="mt-3 flex w-full flex-wrap gap-1.5">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-white/10 bg-neutral-900 px-2.5 py-0.5 font-mono text-[0.65rem] text-neutral-400"
                  >
                    {s}
                  </span>
                ))}
              </CardItem>

              <CardItem translateZ={50} className="mt-4 w-full">
                <InteractiveHoverButton
                  variant="dark"
                  className="w-full"
                  onClick={() => setActive(cert)}
                >
                  {t.certificaciones.verCertificado}
                </InteractiveHoverButton>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>

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
