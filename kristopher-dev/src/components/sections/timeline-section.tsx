"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { IconChevronLeft, IconChevronRight, IconX } from "@tabler/icons-react";
import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { useUiStrings } from "@/data/ui-strings";
import { useLanguage } from "@/hooks/useLanguage";
import { studymatchImages as buildStudymatchImages } from "@/data/studymatch-shots";

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mb-4 flex flex-col gap-2">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 md:text-sm"
        >
          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-sky-500 dark:bg-sky-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

type GalleryImage = { src: string; alt: string };

/** Visor a pantalla completa: se cierra con la X, con Escape o clic fuera de la foto. */
function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const { language } = useLanguage();
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const many = images.length > 1;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!many || index === null) return;
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, index, many, images.length, onClose, onIndex]);

  const labels =
    language === "en"
      ? { close: "Close image", prev: "Previous image", next: "Next image" }
      : { close: "Cerrar imagen", prev: "Imagen anterior", next: "Imagen siguiente" };

  return createPortal(
    <AnimatePresence>
      {open && index !== null && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={images[index].alt}
          className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 p-4 backdrop-blur-md sm:p-10"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={labels.close}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-neutral-950 shadow-lg transition hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <IconX className="h-5 w-5" />
          </button>

          {many && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index - 1 + images.length) % images.length);
                }}
                aria-label={labels.prev}
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-neutral-950/70 text-white transition hover:border-sky-400/60"
              >
                <IconChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onIndex((index + 1) % images.length);
                }}
                aria-label={labels.next}
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-neutral-950/70 text-white transition hover:border-sky-400/60"
              >
                <IconChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          <motion.figure
            key={images[index].src}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full max-w-5xl flex-col items-center"
          >
            <img
              src={images[index].src}
              alt={images[index].alt}
              className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
            />
            <figcaption className="mt-3 text-center text-xs text-neutral-300 sm:text-sm">
              {images[index].alt}
              {many && <span className="ml-2 font-mono text-neutral-500">{index + 1}/{images.length}</span>}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function useGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  return { index, setIndex, close };
}

/** Grilla de miniaturas. Con `preview`, muestra solo las primeras N y la
 *  última indica cuántas quedan; el visor recorre todas. */
function ImageGrid({ images, preview }: { images: GalleryImage[]; preview?: number }) {
  const { index, setIndex, close } = useGallery();
  const { language } = useLanguage();
  const shown = preview ? images.slice(0, preview) : images;
  const rest = images.length - shown.length;
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {shown.map((img, i) => {
        const isMore = rest > 0 && i === shown.length - 1;
        return (
          <button
            key={img.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={
              isMore
                ? language === "en"
                  ? `View ${rest + 1} more images, starting with: ${img.alt}`
                  : `Ver ${rest + 1} imágenes más, desde: ${img.alt}`
                : img.alt
            }
            className="group relative aspect-video cursor-zoom-in overflow-hidden rounded-xl bg-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <img
              src={img.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
            />
            {isMore && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/65 text-2xl font-bold text-white backdrop-blur-[2px]">
                +{rest}
              </span>
            )}
          </button>
        );
      })}
      <Lightbox images={images} index={index} onClose={close} onIndex={setIndex} />
    </div>
  );
}

function EventGallery({ images }: { images: GalleryImage[] }) {
  const { index, setIndex, close } = useGallery();
  return (
    <div className="mb-4 grid grid-cols-2 gap-3">
      {images.map((img, i) => (
        <button
          key={img.src}
          type="button"
          onClick={() => setIndex(i)}
          className={`group relative cursor-zoom-in overflow-hidden rounded-xl bg-neutral-900 ring-1 ring-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 ${
            i === 0 ? "col-span-2 aspect-video" : "aspect-[3/4]"
          }`}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </button>
      ))}
      <Lightbox images={images} index={index} onClose={close} onIndex={setIndex} />
    </div>
  );
}

function StackTags({ items }: { items: readonly string[] }) {
  return (
    <div className="mb-4 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-neutral-200 bg-neutral-100 px-2.5 py-0.5 font-mono text-[0.65rem] text-sky-700 dark:border-white/10 dark:bg-neutral-900 dark:text-sky-300"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function TimelineDemo() {
  const t = useUiStrings().trayectoriaTimeline;

  const studymatchImages = buildStudymatchImages(t.images.studymatchShots);
  const speaknosisImages = [
    { src: "capturas/speaknosis_img1.jpg", alt: t.images.speaknosisImg1Alt },
    { src: "capturas/speaknosis_img2.jpg", alt: t.images.speaknosisImg2Alt },
  ];
  const apsImages = [
    { src: "APS2026/speaknosis1.jpeg", alt: t.images.aps1Alt },
    { src: "APS2026/speaknosis2.jpeg", alt: t.images.aps2Alt },
    { src: "APS2026/speaknosis3.jpeg", alt: t.images.aps3Alt },
  ];

  const data: TimelineEntry[] = t.items.map((item) => ({
    title: item.period,
    content: (
      <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 dark:border-white/10 dark:bg-neutral-900/60 sm:p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <h4 className="text-base font-semibold text-neutral-900 dark:text-white sm:text-lg">
            {item.heading}
          </h4>
          {"badge" in item && item.badge && (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 font-mono text-[0.65rem] text-emerald-600 ring-1 ring-emerald-500/30 dark:text-emerald-400">
              {item.badge}
            </span>
          )}
        </div>
        {"subtitle" in item && item.subtitle && (
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-sky-600 dark:text-sky-400">
            {item.subtitle}
          </p>
        )}
        {"paragraph" in item && item.paragraph && (
          <p className="mb-4 text-xs font-normal leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-sm">
            {item.paragraph}
          </p>
        )}
        {"gallery" in item && item.gallery === "aps2026" && <EventGallery images={apsImages} />}
        {"gallery" in item && item.gallery === "speaknosis" && <ImageGrid images={speaknosisImages} />}
        {"bullets" in item && item.bullets && <Bullets items={item.bullets} />}
        {"subBlock" in item && item.subBlock && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-950 sm:p-4">
            <p className="mb-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 md:text-sm">
              {item.subBlock.title}
            </p>
            <StackTags items={item.subBlock.stack} />
            <ImageGrid images={studymatchImages} preview={4} />
            <Bullets items={item.subBlock.bullets} />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />

      <div className="mx-auto max-w-4xl px-4 pb-16 md:px-14">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 dark:border-white/10 dark:bg-neutral-900/60 sm:p-6">
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            {t.tools.heading}
          </h4>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {t.tools.groups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  {group.label}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-neutral-200 bg-white px-3 py-1 font-mono text-xs text-neutral-700 dark:border-white/10 dark:bg-neutral-950 dark:text-neutral-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
