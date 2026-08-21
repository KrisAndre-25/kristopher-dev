import { Carousel, Card, type CardData } from "@/components/ui/apple-cards-carousel";
import { gradientThumb } from "@/lib/placeholder";
import { project, experience } from "@/data/content";

const speaknosis = experience[0];

function ProjectContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 text-sm leading-relaxed text-neutral-300 md:text-base">
      {children}
    </div>
  );
}

const items: CardData[] = [
  {
    category: project.kind,
    title: project.name,
    src: gradientThumb("studymatch", "STUDYMATCH"),
    content: (
      <ProjectContent>
        <p>{project.summary}</p>
        <ul className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((s) => (
            <li
              key={s}
              className="rounded-full border border-white/10 bg-neutral-900 px-3 py-1 font-mono text-xs text-sky-300"
            >
              {s}
            </li>
          ))}
        </ul>
        {project.isPrivate && (
          <p className="text-neutral-500 italic">{project.privateNote}</p>
        )}
      </ProjectContent>
    ),
  },
  {
    category: "Experiencia profesional",
    title: `Automatización QA — ${speaknosis.org}`,
    src: gradientThumb("speaknosis", "PLAYWRIGHT"),
    content: (
      <ProjectContent>
        <p>{speaknosis.context}</p>
        <ul className="list-disc space-y-1 pl-5">
          {speaknosis.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
        <ul className="flex flex-wrap gap-2 pt-2">
          {speaknosis.tools.map((t) => (
            <li
              key={t}
              className="rounded-full border border-white/10 bg-neutral-900 px-3 py-1 font-mono text-xs text-sky-300"
            >
              {t}
            </li>
          ))}
        </ul>
      </ProjectContent>
    ),
  },
  {
    category: "Proyecto propio",
    title: "Este portafolio",
    src: gradientThumb("portfolio", "PORTFOLIO"),
    content: (
      <ProjectContent>
        <p>
          El sitio que estás viendo: construido en React y TypeScript, con un
          diseño premium ensamblado a partir de componentes de Aceternity UI
          animados con Framer Motion, sobre un sistema de accesibilidad y un
          asistente conversacional propios.
        </p>
        <ul className="flex flex-wrap gap-2 pt-2">
          {["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"].map(
            (t) => (
              <li
                key={t}
                className="rounded-full border border-white/10 bg-neutral-900 px-3 py-1 font-mono text-xs text-sky-300"
              >
                {t}
              </li>
            ),
          )}
        </ul>
      </ProjectContent>
    ),
  },
];

export function AppleCardsCarouselDemo() {
  const cards = items.map((card, index) => (
    <Card key={card.title} card={card} index={index} layout />
  ));

  return <Carousel items={cards} />;
}
