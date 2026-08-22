import { motion } from "framer-motion";
import { AsciiPhoto } from "@/components/ui/ascii-photo";
import { LampContainer } from "@/components/ui/lamp";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

export function AboutDemo() {
  const { profile } = useContent();
  const t = useUiStrings();
  const p = t.perfil;

  const facts = [
    { label: p.ubicacion, value: profile.location },
    {
      label: p.disponibilidad,
      value: p.disponibilidadValue,
      pulse: true,
    },
    { label: p.metodologia, value: p.metodologiaValue },
  ];

  return (
    <LampContainer>
      <motion.div
        key={p.heading}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-8 px-4 pb-4 pt-8 text-left md:grid-cols-[280px_1fr] md:gap-12"
      >
        <div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 md:mx-0">
          <AsciiPhoto
            src={profile.photo}
            alt={`Retrato de ${profile.fullName} con efecto ASCII`}
            width={280}
            height={280}
          />
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
              {p.heading}
            </h3>
            <p className="mt-1 text-sm font-semibold text-sky-400">{p.techLine}</p>
          </div>

          <p className="text-base leading-relaxed text-neutral-300">{p.paragraph}</p>

          <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label}>
                <span className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
                  {f.label}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-neutral-200">
                  {f.pulse && (
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  )}
                  <span className={f.pulse ? "text-emerald-400" : undefined}>{f.value}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </LampContainer>
  );
}
