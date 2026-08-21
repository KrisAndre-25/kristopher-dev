import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { A11yProvider } from "./hooks/useA11y";
import { NavbarDemo } from "./components/demos/navbar-demo";
import { StickyBannerDemo } from "./components/demos/sticky-banner-demo";
import { HeroDemo } from "./components/demos/hero-demo";
import { ScrollVelocityDemo } from "./components/demos/scroll-velocity-demo";
import { HeroScrollDemo } from "./components/demos/hero-scroll-demo";
import { AboutDemo } from "./components/demos/about-demo";
import { SkillsDemo } from "./components/demos/skills-demo";
import { FeaturesSectionDemo } from "./components/demos/features-section-demo";
import { BentoGridThirdDemo } from "./components/demos/bento-grid-demo";
import { ProjectCardsDemo } from "./components/demos/project-cards-demo";
import { CertificationsDemo } from "./components/demos/certifications-demo";
import { TimelineDemo } from "./components/sections/timeline-section";
import { GlobeDemo } from "./components/demos/globe-demo";
import { CardDemo } from "./components/demos/card-demo";
import { ContactFormDemo } from "./components/demos/contact-form-demo";
import { ContactExtrasDemo } from "./components/demos/contact-extras-demo";
import { ColourfulText } from "./components/ui/colourful-text";
import { LoaderComponent } from "./components/ui/loader";
import { DevConsoleDemo } from "./components/demos/dev-console-demo";
import { useContent } from "./data/useContent";
import { useUiStrings } from "./data/ui-strings";
import { useLanguage } from "./hooks/useLanguage";

const CinematicFooter = lazy(() =>
  import("./components/ui/motion-footer").then((m) => ({
    default: m.CinematicFooter,
  })),
);

function SectionHeader({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mx-auto mb-8 max-w-2xl px-4 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-sky-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}

export default function App() {
  const { profile, mailtoUrl } = useContent();
  const t = useUiStrings();
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  const footerLinks = [
    { label: language === "en" ? "Email" : "Correo", href: mailtoUrl, icon: Mail },
    { label: "LinkedIn", href: profile.linkedin, icon: IconBrandLinkedin, external: true },
    { label: "GitHub", href: profile.github, icon: IconBrandGithub, external: true },
    { label: t.contacto.card.descargarCv, href: profile.cv, icon: Download, download: profile.cvName },
  ];

  return (
    <A11yProvider>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[500] flex items-center justify-center bg-neutral-950"
          >
            <LoaderComponent />
          </motion.div>
        )}
      </AnimatePresence>

      <a
        className="fixed left-1/2 top-[-100px] z-[300] -translate-x-1/2 rounded-full border border-sky-400/40 bg-neutral-950 px-5 py-2.5 font-mono text-sm text-white transition-[top] duration-300 focus:top-3"
        href="#contenido"
      >
        {language === "en" ? "Skip to content" : "Saltar al contenido"}
      </a>

      <div className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <StickyBannerDemo />
        <NavbarDemo />

        <main id="contenido">
          <section id="inicio" className="w-full">
            <HeroDemo />
          </section>

          <ScrollVelocityDemo />

          <section id="tecnologias" className="px-4 py-8">
            <HeroScrollDemo />
          </section>

          <section id="perfil" className="px-4 py-8">
            <AboutDemo />
          </section>

          <section id="habilidades" className="py-8">
            <SkillsDemo />
          </section>

          <section id="panorama" className="py-8">
            <FeaturesSectionDemo />
            <div className="mt-10">
              <BentoGridThirdDemo />
            </div>
          </section>

          <section id="proyectos" className="px-4 py-8">
            <SectionHeader eyebrow={t.proyectos.eyebrow} title={t.proyectos.title} />
            <ProjectCardsDemo />
          </section>

          <section id="certificaciones" className="px-4 py-8">
            <CertificationsDemo />
          </section>

          <section id="trayectoria" className="px-4 py-8">
            <SectionHeader eyebrow={t.trayectoria.eyebrow} title={t.trayectoria.title} />
            <TimelineDemo />
          </section>

          <section id="disponibilidad" className="py-8">
            <GlobeDemo />
          </section>

          <section id="contacto" className="px-4 py-10">
            <SectionHeader
              eyebrow={t.contacto.eyebrow}
              title={
                <>
                  {t.contacto.titlePrefix}
                  <ColourfulText text={t.contacto.highlight} />
                </>
              }
            />
            <div className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
              <div className="flex flex-col items-center">
                <CardDemo />
                <ContactExtrasDemo />
              </div>
              <div className="flex justify-center">
                <ContactFormDemo />
              </div>
            </div>
          </section>
        </main>

        <Suspense fallback={<div className="h-64 border-t border-white/10" />}>
          <CinematicFooter
            title="KRISTOPHER ASTUDILLO"
            tagline={profile.availability}
            links={footerLinks}
            copyright={`© ${new Date().getFullYear()} ${profile.fullName} · ${t.footer.builtWith}`}
          />
        </Suspense>
      </div>

      <DevConsoleDemo />
    </A11yProvider>
  );
}
