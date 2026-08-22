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
          <div className="mx-auto mb-4 max-w-3xl px-4 text-center">
            <h2 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-5xl lg:text-6xl">
              <span className="font-mono text-teal-400">01. </span>
              {t.stackSection.eyebrow}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base font-medium text-sky-300 sm:text-lg">
              {t.stackSection.title}
            </p>
          </div>
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
