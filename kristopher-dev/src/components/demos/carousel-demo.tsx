import Carousel, { type CarouselSlide } from "@/components/ui/carousel";
import { gradientThumb } from "@/lib/placeholder";
import { project, experience } from "@/data/content";

const speaknosis = experience[0];

function Detail({ children }: { children: React.ReactNode }) {
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

const slides: CarouselSlide[] = [
  {
    category: project.kind,
    title: project.name,
    button: "Ver detalles",
    src: gradientThumb("studymatch", "STUDYMATCH"),
    content: (
      <Detail>
        <p>{project.summary}</p>
        <TagList items={project.stack} />
        {project.isPrivate && (
          <p className="italic text-neutral-500">{project.privateNote}</p>
        )}
      </Detail>
    ),
  },
  {
    category: "Experiencia profesional",
    title: `Automatización QA — ${speaknosis.org}`,
    button: "Ver detalles",
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
    category: "Proyecto propio",
    title: "Este portafolio",
    button: "Ver detalles",
    src: gradientThumb("portfolio", "PORTFOLIO"),
    content: (
      <Detail>
        <p>
          El sitio que estás viendo: construido en React y TypeScript, con un
          diseño premium ensamblado a partir de componentes de Aceternity UI
          animados con Framer Motion, sobre un sistema de accesibilidad y un
          asistente conversacional propios.
        </p>
        <TagList
          items={["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"]}
        />
      </Detail>
    ),
  },
];

export function CarouselDemo() {
  return (
    <div className="relative w-full">
      <Carousel slides={slides} />
    </div>
  );
}
