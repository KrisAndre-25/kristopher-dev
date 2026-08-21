import { BackgroundBeams } from "@/components/ui/background-beams";
import { useUiStrings } from "@/data/ui-strings";

export function HeroDemo() {
  const t = useUiStrings();

  return (
    <div className="relative flex min-h-[65vh] w-full flex-col items-center justify-center overflow-hidden bg-neutral-950 px-4 py-16 antialiased sm:min-h-[75vh]">
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-3xl font-bold text-transparent sm:text-5xl md:text-6xl">
          {t.hero.welcomeTitle}
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base text-neutral-300 sm:text-lg">
          {t.hero.subtitle}
        </p>
      </div>
      <BackgroundBeams />
    </div>
  );
}
