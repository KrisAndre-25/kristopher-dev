import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { techIcon } from "@/lib/tech-icons";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

export function HeroScrollDemo() {
  const { stackGroups, levelLabel } = useContent();
  const t = useUiStrings();
  const techs = stackGroups.flatMap((g) => g.items);

  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
              {t.stackSection.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
              {t.stackSection.title}
            </h2>
          </>
        }
      >
        <div className="grid h-full w-full grid-cols-3 gap-3 overflow-y-auto p-4 sm:grid-cols-4 md:grid-cols-5 md:gap-4 md:p-6">
          {techs.map((tech) => {
            const { icon: Icon, color } = techIcon(tech.name);
            return (
              <div
                key={tech.name}
                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900 p-3 text-center shadow-md"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg border"
                  style={{
                    color,
                    borderColor: `${color}55`,
                    backgroundColor: `${color}1a`,
                  }}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-white">{tech.name}</p>
                  <p className="text-[0.6rem] text-neutral-500">
                    {levelLabel[tech.level]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ContainerScroll>
    </div>
  );
}
