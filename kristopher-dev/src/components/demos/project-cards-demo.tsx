import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconBrandGithub, IconX } from "@tabler/icons-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface ProjectEntry {
  id: string;
  category: string;
  title: string;
  blurb: string;
  images: { src: string; alt: string }[];
  content: ReactNode;
}

function ImageCarousel({
  images,
  imageLabel,
  goToLabel,
}: {
  images: { src: string; alt: string }[];
  imageLabel: string;
  goToLabel: string;
}) {
  const [index, setIndex] = useState(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) setIndex((i) => (i + 1) % images.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden rounded-xl bg-neutral-900"
      onMouseEnter={() => (pausedRef.current = true)}
      onMouseLeave={() => (pausedRef.current = false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={
            images.length > 1
              ? `${images[index].alt} (${imageLabel} ${index + 1}/${images.length})`
              : images[index].alt
          }
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </AnimatePresence>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIndex(i);
              }}
              aria-label={`${goToLabel} ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === index ? "bg-sky-400" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function Detail({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-neutral-300 sm:text-base">
      {children}
    </div>
  );
}

function TagList({ items }: { items: readonly string[] }) {
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

function ComoLoHice({
  heading,
  paragraph,
  items,
}: {
  heading: string;
  paragraph: string;
  items: readonly string[];
}) {
  return (
    <div className="border-t border-white/10 pt-4">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-sky-400">{heading}</h4>
      <p className="mt-2">{paragraph}</p>
      <ul className="mt-3 list-disc space-y-1.5 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function ProjectCardsDemo() {
  const { project, experience, profile } = useContent();
  const t = useUiStrings();
  const speaknosis = experience[0];
  const [active, setActive] = useState<ProjectEntry | null>(null);

  const timelineImages = t.trayectoriaTimeline.images;

  const PROJECTS: ProjectEntry[] = [
    {
      id: "studymatch",
      category: project.kind,
      title: project.name,
      blurb: project.tagline,
      images: [
        { src: "capturas/studymatch_home.png", alt: timelineImages.studymatchHomeAlt },
        { src: "capturas/studymatch_form_login.png", alt: timelineImages.studymatchLoginAlt },
        { src: "capturas/studymatch_form_register.png", alt: timelineImages.studymatchRegisterAlt },
      ],
      content: (
        <Detail>
          <p>{project.summary}</p>
          <TagList items={project.stack} />
          {project.isPrivate && <p className="italic text-neutral-500">{project.privateNote}</p>}
          <ComoLoHice
            heading={t.proyectos.comoLoHiceHeading}
            paragraph={project.howIBuiltIt}
            items={project.challenges.map((c) => c.title)}
          />
        </Detail>
      ),
    },
    {
      id: "speaknosis",
      category: t.proyectos.speaknosisCategory,
      title: `${t.proyectos.speaknosisTitlePrefix}${speaknosis.org}`,
      blurb: speaknosis.context,
      images: [
        { src: "capturas/speaknosis_img1.jpg", alt: timelineImages.speaknosisImg1Alt },
        { src: "capturas/speaknosis_img2.jpg", alt: timelineImages.speaknosisImg2Alt },
      ],
      content: (
        <Detail>
          <p>{speaknosis.context}</p>
          <TagList items={speaknosis.tools} />
          <ComoLoHice
            heading={t.proyectos.comoLoHiceHeading}
            paragraph={speaknosis.howIBuiltIt}
            items={speaknosis.points}
          />
        </Detail>
      ),
    },
    {
      id: "portfolio",
      category: t.proyectos.portfolioCategory,
      title: t.proyectos.portfolioTitle,
      blurb: t.proyectos.portfolioBlurb,
      images: [{ src: "capturas/icono_portfolio.png", alt: t.proyectos.portfolioTitle }],
      content: (
        <Detail>
          <p>{t.proyectos.portfolioDetail}</p>
          <TagList items={["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"]} />
          <ComoLoHice
            heading={t.proyectos.comoLoHiceHeading}
            paragraph={t.proyectos.portfolioHowIBuiltIt}
            items={t.proyectos.portfolioFeatures}
          />
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 transition hover:text-sky-300"
          >
            <IconBrandGithub className="h-4 w-4" />
            {t.proyectos.githubLinkLabel}
          </a>
        </Detail>
      ),
    },
  ];

  return (
    <>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-4 sm:grid-cols-2">
        {PROJECTS.map((p) => (
          <CardContainer
            key={p.id}
            containerClassName={p.id === "portfolio" ? "py-0 sm:col-span-2" : "py-0"}
          >
            <CardBody className="relative flex h-full w-full flex-col rounded-2xl border border-white/10 bg-neutral-950 p-5 transition-shadow hover:shadow-[0_0_40px_-12px_rgba(56,189,248,0.35)]">
              <CardItem translateZ={60} rotateX={4} rotateZ={-2} className="w-full">
                <ImageCarousel
                  images={p.images}
                  imageLabel={t.proyectos.carouselImageLabel}
                  goToLabel={t.proyectos.carouselGoTo}
                />
              </CardItem>

              <CardItem translateZ={40} className="mt-4 w-full">
                <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sky-400">
                  {p.category}
                </p>
              </CardItem>
              <CardItem translateZ={50} className="mt-1 w-full">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              </CardItem>
              <CardItem translateZ={30} className="mt-1 w-full">
                <p className="line-clamp-2 text-xs text-neutral-500">{p.blurb}</p>
              </CardItem>

              <CardItem translateZ={50} className="mt-4 w-full">
                <InteractiveHoverButton onClick={() => setActive(p)}>
                  {t.proyectos.verProyecto}
                </InteractiveHoverButton>
              </CardItem>
            </CardBody>
          </CardContainer>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} closeLabel={t.proyectos.cerrar} />
    </>
  );
}

function ProjectModal({
  project: entry,
  onClose,
  closeLabel,
}: {
  project: ProjectEntry | null;
  onClose: () => void;
  closeLabel: string;
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
            className="relative z-[101] max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl border border-white/10 bg-neutral-950 p-5 sm:p-6"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={closeLabel}
              className="sticky top-0 float-right flex h-8 w-8 items-center justify-center rounded-full bg-white text-neutral-950"
            >
              <IconX className="h-4 w-4" />
            </button>
            <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
              {entry.category}
            </p>
            <h3 id={titleId} className="mt-2 text-xl font-semibold text-white sm:text-2xl">
              {entry.title}
            </h3>
            <div className="mt-4">{entry.content}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
