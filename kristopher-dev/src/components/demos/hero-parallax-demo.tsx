import { HeroParallax, ParallaxHeader, type ParallaxItem } from "@/components/ui/hero-parallax";
import { stackGroups, levelLabel } from "@/data/content";
import { techIcon } from "@/lib/tech-icons";

const items: ParallaxItem[] = stackGroups
  .flatMap((g) => g.items)
  .map((tech) => {
    const { icon: Icon, color } = techIcon(tech.name);
    return {
      title: tech.name,
      note: levelLabel[tech.level],
      color,
      icon: <Icon className="h-6 w-6" strokeWidth={1.75} />,
    };
  });

export function HeroParallaxDemo() {
  return (
    <HeroParallax
      items={items}
      header={
        <ParallaxHeader
          eyebrow="Stack técnico"
          title="Con qué construyo"
          description="React, TypeScript y Java con Spring Boot como base, y Playwright como mi especialidad diferenciadora en testing automatizado."
        />
      }
    />
  );
}
