import type { ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { studymatchImages } from "@/data/studymatch-shots";

type Img = { src: string; alt: string };

interface ProjectEntry {
  id: string;
  category: string;
  title: string;
  blurb: string;
  /** Logo del proyecto: lo que se ve en su tarjeta. */
  logo: Img;
  /** Color del brillo detrás del logo. */
  accent: string;
  /** Galería completa, visible al abrir el proyecto. */
  gallery: Img[];
  tags: readonly string[];
  body: ReactNode;
}

function TagList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((t) => (
        <li
          key={t}
          className="rounded-full border border-white/10 bg-neutral-950 px-3 py-1 font-mono text-xs text-sky-300"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ComoLoHice({ heading, paragraph, items }: { heading: string; paragraph: string; items: readonly string[] }) {
  return (
    <div className="rounded-3xl bg-neutral-950 p-6 md:p-10">
      <h4 className="text-xs font-semibold uppercase tracking-widest text-sky-400">{heading}</h4>
      <p className="mt-3">{paragraph}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
    >
      {children}
    </a>
  );
}

/** Contenido del panel abierto: descripción, tecnologías, galería y detalle. */
function ProjectPanel({ entry }: { entry: ProjectEntry }) {
  return (
    <div className="space-y-6 text-base leading-relaxed text-neutral-300 md:text-lg">
      <div className="rounded-3xl bg-neutral-950 p-6 md:p-10">
        <p className="text-neutral-200">{entry.blurb}</p>
        <div className="mt-5">
          <TagList items={entry.tags} />
        </div>
      </div>

      {entry.gallery.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {entry.gallery.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-950">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className="aspect-video w-full object-cover object-top"
              />
            </li>
          ))}
        </ul>
      )}

      {entry.body}
    </div>
  );
}

export function ProjectCardsDemo() {
  const { project, experience, profile } = useContent();
  const t = useUiStrings();
  const speaknosis = experience[0];
  const timelineImages = t.trayectoriaTimeline.images;
  const dmaix = t.proyectos.dmaix;
  const dmaixThumbs = ["dmaix/dmaix-hero.svg", "dmaix/dmaix-dmaic.svg", "dmaix/dmaix-trace.svg", "dmaix/dmaix-grade.svg"];
  const smShots = studymatchImages(timelineImages.studymatchShots);
  const dmaixImages = dmaix.cards.map((card, i) => ({ src: dmaixThumbs[i], alt: card.alt }));

  const PROJECTS: ProjectEntry[] = [
    {
      id: "studymatch",
      category: project.kind,
      title: project.name,
      blurb: project.summary,
      logo: { src: "LOGOS/web/studymatch.webp", alt: "Logo de StudyMatch" },
      accent: "#22d3ee",
      gallery: smShots,
      tags: project.stack,
      body: (
        <>
          {project.isPrivate && <p className="text-sm italic text-neutral-400">{project.privateNote}</p>}
          <ComoLoHice
            heading={t.proyectos.comoLoHiceHeading}
            paragraph={project.howIBuiltIt}
            items={project.challenges.map((c) => c.title)}
          />
        </>
      ),
    },
    {
      id: "dmaix",
      category: dmaix.category,
      title: dmaix.title,
      blurb: dmaix.description,
      logo: { src: "LOGOS/web/dmaix.webp", alt: "Logo de DMAIX" },
      accent: "#3b82f6",
      gallery: dmaixImages,
      tags: dmaix.stack,
      body: (
        <>
          <div className="rounded-3xl bg-neutral-950 p-6 md:p-10">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-sky-400">{dmaix.highlightsHeading}</h4>
            <ul className="mt-4 list-disc space-y-2 pl-5">
              {dmaix.cards.map((card) =>
                "body" in card ? (
                  <li key={card.title}>
                    <span className="font-semibold text-white">{card.title}:</span> {card.body}
                  </li>
                ) : null,
              )}
            </ul>
          </div>
          <LinkButton href={dmaix.link}>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            {dmaix.linkLabel}
          </LinkButton>
        </>
      ),
    },
    {
      id: "speaknosis",
      category: t.proyectos.speaknosisCategory,
      title: `${t.proyectos.speaknosisTitlePrefix}${speaknosis.org}`,
      blurb: speaknosis.context,
      logo: { src: "LOGOS/speaknosis_logo.svg", alt: "Logo de Speaknosis" },
      accent: "#40e0d0",
      gallery: [
        { src: "APS2026/speaknosis1.jpeg", alt: timelineImages.aps1Alt },
        { src: "capturas/speaknosis_img1.jpg", alt: timelineImages.speaknosisImg1Alt },
        { src: "capturas/speaknosis_img2.jpg", alt: timelineImages.speaknosisImg2Alt },
      ],
      tags: speaknosis.tools,
      body: (
        <ComoLoHice
          heading={t.proyectos.comoLoHiceHeading}
          paragraph={speaknosis.howIBuiltIt}
          items={speaknosis.points}
        />
      ),
    },
    {
      id: "portfolio",
      category: t.proyectos.portfolioCategory,
      title: t.proyectos.portfolioTitle,
      blurb: t.proyectos.portfolioDetail,
      logo: { src: "ka-logo.png", alt: "Logo KA de Kristopher Astudillo" },
      accent: "#2f7bff",
      gallery: [],
      tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Claude Code"],
      body: (
        <>
          <ComoLoHice
            heading={t.proyectos.comoLoHiceHeading}
            paragraph={t.proyectos.portfolioHowIBuiltIt}
            items={t.proyectos.portfolioFeatures}
          />
          <LinkButton href={profile.githubRepo}>
            <IconBrandGithub className="h-4 w-4" aria-hidden="true" />
            {t.proyectos.githubLinkLabel}
          </LinkButton>
        </>
      ),
    },
  ];

  const cards = PROJECTS.map((p, index) => (
    <Card
      key={p.id}
      index={index}
      layout={true}
      closeLabel={t.proyectos.cerrar}
      card={{
        category: `${String(index + 1).padStart(2, "0")} · ${p.category}`,
        title: p.title,
        src: p.logo.src,
        alt: p.logo.alt,
        fit: "logo",
        accent: p.accent,
        content: <ProjectPanel entry={p} />,
      }}
    />
  ));

  return (
    <div className="w-full">
      <Carousel items={cards} prevLabel={t.proyectos.prevLabel} nextLabel={t.proyectos.nextLabel} />
    </div>
  );
}
