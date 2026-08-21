import { motion } from "framer-motion";
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
    <motion.div
      key={p.heading}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-3xl space-y-6 px-4 text-left"
    >
      <div>
        <h3 className="flex items-center gap-2 text-2xl font-bold text-white">
          {p.heading}
        </h3>
        <p className="mt-1 text-sm font-semibold text-sky-400">{p.techLine}</p>
      </div>

      <p className="text-base leading-relaxed text-neutral-300">{p.paragraph}</p>

      <div className="grid grid-cols-1 gap-4 border-t border-white/10 pt-4 sm:grid-cols-3">
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
    </motion.div>
  );
}
