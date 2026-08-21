import { WavyBackground } from "@/components/ui/wavy-background";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { useUiStrings } from "@/data/ui-strings";

export function SkillsDemo() {
  const t = useUiStrings();
  const hard = t.habilidades.hard;
  const soft = t.habilidades.soft;
  const imageAlt = `${t.habilidades.hardTitle}: ${hard.join(", ")}. ${t.habilidades.softTitle}: ${soft.join(", ")}.`;

  return (
    <WavyBackground waveOpacity={0.3} blur={12}>
      <div className="px-4 pt-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
          {t.habilidades.eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {t.habilidades.title}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
          {t.habilidades.caption}
        </p>
      </div>

      <div className="mx-auto mt-8 max-w-3xl px-4 pb-10">
        <CardContainer containerClassName="py-0">
          <CardBody className="w-full">
            <CardItem
              translateZ={80}
              rotateX={4}
              rotateZ={-1}
              className="relative w-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/50 p-2 shadow-xl"
            >
              <img
                src="capturas/HABILIDADES.png"
                alt={imageAlt}
                className="w-full h-auto object-contain rounded-xl"
              />
            </CardItem>
          </CardBody>
        </CardContainer>
      </div>
    </WavyBackground>
  );
}
