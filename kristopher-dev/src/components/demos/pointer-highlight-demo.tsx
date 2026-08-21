import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { useContent } from "@/data/useContent";
import { useLanguage } from "@/hooks/useLanguage";

export function PointerHighlightDemo() {
  const { profile } = useContent();
  const { language } = useLanguage();

  return (
    <div className="mx-auto max-w-3xl px-4 text-center">
      <h2 className="text-2xl font-semibold leading-relaxed text-neutral-200 sm:text-3xl">
        {language === "en" ? "Full Stack with a " : "Full Stack con cabeza de "}
        <PointerHighlight
          rectangleClassName="border-sky-400/70"
          pointerClassName="text-sky-400"
        >
          <span className="text-white">{language === "en" ? "QA mindset" : "QA"}</span>
        </PointerHighlight>
        {language === "en" ? ". I build in " : ". Construyo en "}
        <PointerHighlight
          rectangleClassName="border-violet-400/70"
          pointerClassName="text-violet-400"
        >
          <span className="text-white">React &amp; TypeScript</span>
        </PointerHighlight>
        {language === "en" ? ", with backend in " : ", con backend en "}
        <PointerHighlight
          rectangleClassName="border-emerald-400/70"
          pointerClassName="text-emerald-400"
        >
          <span className="text-white">Java &amp; Spring Boot</span>
        </PointerHighlight>
        .
      </h2>
      <p className="mx-auto mt-8 max-w-2xl text-balance text-base leading-relaxed text-neutral-400">
        {profile.intro}
      </p>
    </div>
  );
}
