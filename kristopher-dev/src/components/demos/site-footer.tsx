import { IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconMail } from "@tabler/icons-react";
import { WordmarkRevealFooter, type FooterColumn, type FooterSocial } from "@/components/ui/wordmark-reveal-footer";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";

/** Footer del portafolio sobre WordmarkRevealFooter, con los datos reales. */
export function SiteFooter() {
  const { profile, mailtoUrl, whatsappUrl } = useContent();
  const t = useUiStrings();
  const f = t.footer;

  const columns: FooterColumn[] = [
    {
      title: f.navTitle,
      links: [
        { label: t.nav.inicio, href: "#inicio" },
        { label: t.nav.habilidades, href: "#habilidades" },
        { label: t.nav.proyectos, href: "#proyectos" },
        { label: t.nav.certificaciones, href: "#certificaciones" },
        { label: t.nav.trayectoria, href: "#trayectoria" },
      ],
    },
    {
      title: f.projectsTitle,
      links: [
        { label: "StudyMatch", href: "#proyectos" },
        { label: "DMAIX", href: t.proyectos.dmaix.link, external: true },
        { label: "Speaknosis", href: "#trayectoria" },
        { label: f.repoLabel, href: profile.githubRepo, external: true },
      ],
    },
    {
      title: f.contactTitle,
      links: [
        { label: f.emailLabel, href: mailtoUrl },
        { label: "WhatsApp", href: whatsappUrl, external: true },
        { label: "LinkedIn", href: profile.linkedin, external: true },
        { label: t.contacto.card.descargarCv, href: profile.cv, external: true, download: profile.cvName },
      ],
    },
  ];

  const socials: FooterSocial[] = [
    { label: `${f.emailLabel}: ${profile.email}`, href: mailtoUrl, icon: <IconMail aria-hidden="true" /> },
    { label: "WhatsApp", href: whatsappUrl, external: true, icon: <IconBrandWhatsapp aria-hidden="true" /> },
    { label: "LinkedIn", href: profile.linkedin, external: true, icon: <IconBrandLinkedin aria-hidden="true" /> },
    { label: "GitHub", href: profile.github, external: true, icon: <IconBrandGithub aria-hidden="true" /> },
  ];

  return (
    <WordmarkRevealFooter
      wordmark="KRISTOPHER"
      brand={{
        name: profile.fullName,
        mark: <img src="ka-logo.png" alt="" width={44} height={27} className="h-6 w-auto" />,
        blurb: f.blurb,
      }}
      columns={columns}
      status={{ label: profile.availability, tone: "ok" }}
      offices={[{ city: f.localTime, timeZone: "America/Santiago" }]}
      socials={socials}
      legal={[{ label: f.backToTop, href: "#inicio" }]}
      labels={{ offices: f.localTimeAria, socials: f.socialsAria }}
      reveal="inView"
      // pb-16: deja libre el botón flotante del chat con IA (abajo a la derecha)
      className="border-t border-white/10 pb-16"
    />
  );
}
