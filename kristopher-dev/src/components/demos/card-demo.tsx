import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Mail, Download, Globe } from "lucide-react";
import { IconBrandLinkedin, IconBrandGithub, IconBrandWhatsapp } from "@tabler/icons-react";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useLanguage } from "@/hooks/useLanguage";

export function CardDemo() {
  const { profile, mailtoUrl, whatsappUrl } = useContent();
  const t = useUiStrings();
  const { language } = useLanguage();

  const links = [
    { label: language === "en" ? "Email" : "Correo", href: mailtoUrl, icon: Mail, external: false },
    { label: "LinkedIn", href: profile.linkedin, icon: IconBrandLinkedin, external: true },
    { label: "GitHub", href: profile.github, icon: IconBrandGithub, external: true },
    { label: "Portfolio", href: profile.portfolio, icon: Globe, external: true },
  ];

  return (
    <CardContainer>
      <CardBody className="group/card relative h-auto w-[20rem] rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:w-[24rem]">
        <CardItem translateZ={40} className="w-full">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
            </span>
            <p className="font-mono text-xs uppercase tracking-widest text-sky-400">
              {profile.availability}
            </p>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {t.contacto.card.incorporacion}
          </p>
        </CardItem>

        <CardItem translateZ={70} className="mt-5 w-full">
          <div className="grid grid-cols-4 gap-2.5">
            {links.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                title={label}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-neutral-900 text-neutral-300 transition hover:-translate-y-0.5 hover:border-sky-400/50 hover:text-sky-400"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2.5 flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-neutral-950 shadow-[0_8px_30px_-10px_rgba(37,211,102,0.6)] transition hover:-translate-y-0.5 hover:bg-[#3ee07a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
          >
            <IconBrandWhatsapp className="h-5 w-5" /> {t.contacto.card.whatsapp}
          </a>
          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            download={profile.cvName}
            className="mt-2.5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-300 transition hover:border-sky-400/50 hover:text-sky-400"
          >
            <Download className="h-3.5 w-3.5" /> {t.contacto.card.descargarCv}
          </a>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
