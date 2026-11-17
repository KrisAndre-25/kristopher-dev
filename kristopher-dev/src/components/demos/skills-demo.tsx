import { motion } from "framer-motion";
import { TabSwitcher, type TabSwitcherItem } from "@/components/ui/tab-switcher";
import { SectionHeading } from "@/components/SectionHeading";
import { useUiStrings } from "@/data/ui-strings";

/** Una imagen propia por habilidad, en el mismo orden que `habilidades.transferable`. */
const skillImages = [
  "APS2026/speaknosis2.jpeg", // Comunicación: stand en la EXPO APS
  "APS2026/speaknosis1.jpeg", // Multidisciplinario: equipo en el escenario
  "skills/kanban.svg", // Metodología ágil: tablero Kanban
  "APS2026/speaknosis3.jpeg", // Calma bajo presión: transcripción en vivo
  "certificados/CertificadoDesafiolatam.jpeg", // Enseñar: Duplas Intergeneracionales
  "capturas/speaknosis_img1.jpg", // Mejora continua: suite Playwright en verde
];

export function SkillsDemo() {
  const h = useUiStrings().habilidades;

  const items: TabSwitcherItem[] = h.transferable.map((skill, i) => ({
    title: skill.title,
    description: skill.description,
    image: skillImages[i % skillImages.length],
    imageAlt: skill.title,
  }));

  return (
    <div className="mx-auto max-w-6xl px-4">
      <div className="text-center">
        <SectionHeading number="02" eyebrow={h.eyebrow} title={h.title} />
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-400 sm:text-base">{h.transferLead}</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mt-14"
      >
        <TabSwitcher items={items} label={h.transferTitle} />
      </motion.div>

      <div className="mt-16 flex flex-col items-center gap-4 border-t border-white/10 pt-10 sm:flex-row sm:justify-between">
        <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-neutral-500">
          {h.stackTitle}
        </p>
        <ul className="flex flex-wrap justify-center gap-2 sm:justify-end">
          {h.hard.map((item) => (
            <li
              key={item}
              className="rounded-full border border-white/10 px-3.5 py-1.5 font-mono text-xs text-neutral-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
