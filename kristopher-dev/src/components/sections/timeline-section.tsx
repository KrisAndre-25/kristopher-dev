"use client";

import { Timeline, type TimelineEntry } from "@/components/ui/timeline";
import { useUiStrings } from "@/data/ui-strings";

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

function ImageGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {images.map((img) => (
        <a
          key={img.src}
          href={img.src}
          target="_blank"
          rel="noreferrer"
          className="group relative aspect-video overflow-hidden rounded-xl bg-neutral-900"
        >
          <img
            src={img.src}
            alt={img.alt}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </a>
      ))}
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

  const studymatchImages = [
    { src: "capturas/studymatch_home.png", alt: t.images.studymatchHomeAlt },
    { src: "capturas/studymatch_form_login.png", alt: t.images.studymatchLoginAlt },
    { src: "capturas/studymatch_form_register.png", alt: t.images.studymatchRegisterAlt },
  ];
  const speaknosisImages = [
    { src: "capturas/speaknosis_img1.jpg", alt: t.images.speaknosisImg1Alt },
    { src: "capturas/speaknosis_img2.jpg", alt: t.images.speaknosisImg2Alt },
  ];

  const data: TimelineEntry[] = t.items.map((item, index) => ({
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
        {index === 1 && <ImageGrid images={speaknosisImages} />}
        {"bullets" in item && item.bullets && <Bullets items={item.bullets} />}
        {"subBlock" in item && item.subBlock && (
          <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-3 dark:border-white/10 dark:bg-neutral-950 sm:p-4">
            <p className="mb-3 text-xs font-semibold text-neutral-800 dark:text-neutral-200 md:text-sm">
              {item.subBlock.title}
            </p>
            <StackTags items={item.subBlock.stack} />
            <ImageGrid images={studymatchImages} />
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
