import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { useUiStrings } from "@/data/ui-strings";

export function GlobeDemo() {
  const t = useUiStrings();

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
          {t.disponibilidad.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {t.disponibilidad.title}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-neutral-400 sm:text-base">
          {t.disponibilidad.subtitle}
        </p>
      </motion.div>

      <div className="relative mt-6 w-full max-w-lg">
        <Globe className="w-full" />
      </div>
    </div>
  );
}
