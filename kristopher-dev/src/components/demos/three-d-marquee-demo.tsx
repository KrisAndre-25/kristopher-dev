import { ThreeDMarquee } from "@/components/ui/3d-marquee";
import { techIcon } from "@/lib/tech-icons";
import { useContent } from "@/data/useContent";

export function ThreeDMarqueeDemo() {
  const { stackGroups, levelLabel } = useContent();
  const techs = stackGroups.flatMap((g) => g.items);

  const items = techs.map((tech) => {
    const { icon: Icon, color } = techIcon(tech.name);
    return (
      <div
        key={tech.name}
        className="flex h-[130px] w-[130px] flex-col items-center justify-center gap-2 rounded-lg border border-white/10 bg-neutral-900 shadow-lg ring-1 ring-white/5"
      >
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border"
          style={{
            color,
            borderColor: `${color}55`,
            backgroundColor: `${color}1a`,
          }}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>
        <div className="text-center">
          <p className="text-xs font-semibold text-white">{tech.name}</p>
          <p className="text-[0.6rem] text-neutral-500">{levelLabel[tech.level]}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="relative z-10 mt-8 h-[28rem] w-full max-w-5xl overflow-hidden rounded-3xl bg-neutral-900/40 p-2 ring-1 ring-white/10 sm:h-[30rem] lg:h-[32rem] mx-auto">
      <ThreeDMarquee items={items} className="h-full" />
    </div>
  );
}
