import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import { CircularCarousel, type CircularCarouselItem } from "@/components/ui/circular-carousel";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { gradientThumb } from "@/lib/placeholder";
import { project, experience, profile } from "@/data/content";
import { useOutsideClick } from "@/hooks/use-outside-click";

const speaknosis = experience[0];

interface ProjectEntry {
  id: string;
  category: string;
  title: string;
  blurb: string;
  src: string;
  demoHref?: string;
  content: ReactNode;
}

function Detail({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
      {children}
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2 pt-1">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-white/10 bg-neutral-900 px-3 py-1 font-mono text-xs text-sky-300"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

const PROJECTS: ProjectEntry[] = [
  {
    id: "studymatch",
    category: project.kind,
    title: project.name,
    blurb: project.tagline,
    src: gradientThumb("studymatch", "STUDYMATCH"),
    content: (
      <Detail>
        <p>{project.summary}</p>
        <TagList items={project.stack} />
        {project.isPrivate && <p className="italic text-neutral-500">{project.privateNote}</p>}
      </Detail>
    ),
  },
  {
    id: "speaknosis",
    category: "Experiencia profesional",
    title: `QA Automation — ${speaknosis.org}`,
    blurb: speaknosis.context,
    src: gradientThumb("speaknosis", "PLAYWRIGHT"),
    content: (
      <Detail>
        <p>{speaknosis.context}</p>
        <ul className="list-disc space-y-1 pl-5">
          {speaknosis.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <TagList items={speaknosis.tools} />
      </Detail>
    ),
  },
  {
    id: "portfolio",
    category: "Proyecto propio",
    title: "Este portafolio",
    blurb: "React, TypeScript, Tailwind CSS y Framer Motion.",
    src: gradientThumb("portfolio", "PORTFOLIO"),
    demoHref: profile.github,
    content: (
      <Detail>
        <p>
          El sitio que estás viendo: construido en React y TypeScript, con
          componentes de Aceternity UI animados con Framer Motion.
        </p>
        <TagList items={["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"]} />
      </Detail>
    ),
  },
];

export function CircularCarouselDemo() {
  const [active, setActive] = useState<ProjectEntry | null>(null);

  const items: CircularCarouselItem[] = PROJECTS.map((p) => ({
    id: p.id,
    content: (
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <img src={p.src} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
        </div>
        <div className="p-5">
          <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sky-400">
            {p.category}
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">{p.title}</h3>
          <p className="mt-1 line-clamp-2 text-xs text-neutral-400">{p.blurb}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <InteractiveHoverButton onClick={() => setActive(p)}>
              Ver Proyecto
            </InteractiveHoverButton>
            {p.demoHref && (
              <InteractiveHoverButton
                variant="dark"
                onClick={() => window.open(p.demoHref, "_blank", "noreferrer")}
              >
                Demo
              </InteractiveHoverButton>
            )}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <>
      <CircularCarousel items={items} />
      <ProjectModal project={active} onClose={() => setActive(null)} />
    </>
  );
}

function ProjectModal({
  project: entry,
  onClose,
}: {
  project: ProjectEntry | null;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  useOutsideClick(ref, onClose);

  useEffect(() => {
    if (!entry) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [entry, onClose]);

  return (
    <AnimatePresence>
      {entry && (
        <div className="fixed inset-0 z-[100] flex h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            ref={ref}
            className="relative z-[101] max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/10 bg-neutral-950 p-6 sm:p-10"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Cerrar detalle del proyecto"
              className="sticky top-0 float-right flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-950"
            >
              <IconX className="h-5 w-5" />
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
              {entry.category}
            </p>
            <h3 id={titleId} className="mt-2 text-2xl font-semibold text-white sm:text-3xl">
              {entry.title}
            </h3>
            <div className="mt-6">{entry.content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
