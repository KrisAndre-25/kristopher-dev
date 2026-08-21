import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { GraduationCap, Code2, Briefcase, Rocket } from "lucide-react";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

const ICONS = [GraduationCap, Code2, Briefcase, GraduationCap, Rocket];

export function TimelineDemo() {
  const { project, experience, profile } = useContent();
  const t = useUiStrings();
  const speaknosis = experience[0];
  const [m0, m1, , m3, m4] = t.trayectoria.milestones;

  const milestones = [
    { id: "duoc-titulo", period: m0.period, title: m0.title, org: m0.org, body: m0.body },
    { id: "studymatch", period: project.kind, title: project.name, org: project.tagline, body: m1.org },
    { id: "speaknosis", period: speaknosis.period, title: speaknosis.role, org: speaknosis.org, body: speaknosis.context },
    { id: "ingenieria", period: m3.period, title: m3.title, org: m3.org, body: m3.body },
    { id: "hoy", period: m4.period, title: profile.availability, org: m4.org, body: m4.body },
  ];

  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const pathHeight = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  return (
    <div ref={ref} className="mx-auto max-w-3xl px-4">
      <div className="relative">
        <div
          aria-hidden="true"
          className="absolute left-5 top-2 bottom-2 w-px bg-white/10 sm:left-6"
        />
        <motion.div
          aria-hidden="true"
          style={{ scaleY: pathHeight }}
          className="absolute left-5 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-sky-400 via-sky-400/70 to-violet-400 sm:left-6"
        />
        <ol className="space-y-8">
          {milestones.map((m, i) => {
            const Icon = ICONS[i];
            return (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative flex gap-4 pl-2 sm:gap-5"
              >
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-sky-400/40 bg-neutral-950 text-sky-400 sm:h-12 sm:w-12">
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                </span>
                <div className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-neutral-950 p-4 sm:p-5">
                  <p className="font-mono text-[0.65rem] uppercase tracking-widest text-sky-400">
                    {m.period}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-white sm:text-lg">
                    {m.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{m.org}</p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{m.body}</p>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
