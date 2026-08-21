import {
  ScrollVelocityContainer,
  ScrollVelocityRow,
} from "@/components/ui/scroll-based-velocity";

const STACK_LINE =
  "REACT • TYPESCRIPT • JAVA • SPRING BOOT • PLAYWRIGHT • QA AUTOMATION • NODE.JS • TAILWIND CSS • GIT • ";

export function ScrollVelocityDemo() {
  return (
    <ScrollVelocityContainer className="space-y-1 border-y border-white/10 bg-neutral-950 py-4">
      <ScrollVelocityRow
        baseVelocity={3}
        className="font-mono text-lg font-semibold text-neutral-700 sm:text-2xl"
      >
        <span className="mx-2">{STACK_LINE}</span>
      </ScrollVelocityRow>
      <ScrollVelocityRow
        baseVelocity={-3}
        className="font-mono text-lg font-semibold text-sky-400/80 sm:text-2xl"
      >
        <span className="mx-2">{STACK_LINE}</span>
      </ScrollVelocityRow>
    </ScrollVelocityContainer>
  );
}
