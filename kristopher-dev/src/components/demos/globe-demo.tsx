import { motion } from "framer-motion";
import { Globe } from "@/components/ui/globe";
import { SectionHeading } from "@/components/SectionHeading";
import { useUiStrings } from "@/data/ui-strings";

export function GlobeDemo() {
  const t = useUiStrings();

  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-4">
      <SectionHeading number="07" eyebrow={t.disponibilidad.eyebrow} title={t.disponibilidad.title} />
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto max-w-md text-center text-sm text-neutral-400 sm:text-base"
      >
        {t.disponibilidad.subtitle}
      </motion.p>

      <div className="relative mt-6 w-full max-w-lg">
        <Globe className="w-full" />
      </div>
    </div>
  );
}
