import { StickyBanner } from "@/components/ui/sticky-banner";
import { useUiStrings } from "@/data/ui-strings";

function scrollToContact() {
  document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function StickyBannerDemo() {
  const t = useUiStrings();

  return (
    <StickyBanner className="bg-gradient-to-r from-sky-500 to-violet-500 text-white">
      <p className="max-w-[90%] drop-shadow-sm">
        {t.stickyBanner.message}{" "}
        <button
          type="button"
          onClick={scrollToContact}
          className="underline underline-offset-2 transition hover:no-underline"
        >
          {t.stickyBanner.cta}
        </button>
      </p>
    </StickyBanner>
  );
}
