import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, Download } from "lucide-react";
import { IconBrandLinkedin, IconBrandGithub } from "@tabler/icons-react";
import { A11yProvider } from "./hooks/useA11y";
import { NavbarDemo } from "./components/demos/navbar-demo";
import { StickyBannerDemo } from "./components/demos/sticky-banner-demo";
import { HeroDemo } from "./components/demos/hero-demo";
import { ScrollVelocityDemo } from "./components/demos/scroll-velocity-demo";
import { ColourfulText } from "./components/ui/colourful-text";
import { SectionHeading } from "./components/SectionHeading";
import { LoaderComponent } from "./components/ui/loader";
import { useContent } from "./data/useContent";
import { useUiStrings } from "./data/ui-strings";
import { useLanguage } from "./hooks/useLanguage";

// Todo lo que vive debajo del hero se carga bajo demanda para aligerar
// el bundle inicial (three.js/cobe, gsap y frameworks de animacion pesados
// quedan fuera del chunk critico de arranque).
const HeroScrollDemo = lazy(() =>
  import("./components/demos/hero-scroll-demo").then((m) => ({ default: m.HeroScrollDemo })),
);
const AboutDemo = lazy(() =>
  import("./components/demos/about-demo").then((m) => ({ default: m.AboutDemo })),
);
const SkillsDemo = lazy(() =>
  import("./components/demos/skills-demo").then((m) => ({ default: m.SkillsDemo })),
);
const FeaturesSectionDemo = lazy(() =>
  import("./components/demos/features-section-demo").then((m) => ({ default: m.FeaturesSectionDemo })),
);
const BentoGridThirdDemo = lazy(() =>
  import("./components/demos/bento-grid-demo").then((m) => ({ default: m.BentoGridThirdDemo })),
);
const ProjectCardsDemo = lazy(() =>
  import("./components/demos/project-cards-demo").then((m) => ({ default: m.ProjectCardsDemo })),
);
const CertificationsDemo = lazy(() =>
  import("./components/demos/certifications-demo").then((m) => ({ default: m.CertificationsDemo })),
);
const TimelineDemo = lazy(() =>
  import("./components/sections/timeline-section").then((m) => ({ default: m.TimelineDemo })),
);
const GlobeDemo = lazy(() =>
  import("./components/demos/globe-demo").then((m) => ({ default: m.GlobeDemo })),
);
const CardDemo = lazy(() =>
  import("./components/demos/card-demo").then((m) => ({ default: m.CardDemo })),
);
const ContactFormDemo = lazy(() =>
  import("./components/demos/contact-form-demo").then((m) => ({ default: m.ContactFormDemo })),
);
const ContactExtrasDemo = lazy(() =>
  import("./components/demos/contact-extras-demo").then((m) => ({ default: m.ContactExtrasDemo })),
);
const DevConsoleDemo = lazy(() =>
  import("./components/demos/dev-console-demo").then((m) => ({ default: m.DevConsoleDemo })),
);
const CinematicFooter = lazy(() =>
  import("./components/ui/motion-footer").then((m) => ({
    default: m.CinematicFooter,
  })),
);

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
    { label: t.contacto.card.descargarCv, href: profile.cv, icon: Download, external: true, download: profile.cvName },
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

          <section id="tecnologias" className="px-4 py-20 sm:py-24">
            <Suspense fallback={null}>
              <HeroScrollDemo />
            </Suspense>
          </section>

          <section id="perfil" className="px-4 py-20 sm:py-24">
            <Suspense fallback={null}>
              <AboutDemo />
            </Suspense>
          </section>

          <section id="habilidades" className="py-20 sm:py-24">
            <Suspense fallback={null}>
              <SkillsDemo />
            </Suspense>
          </section>

          <section id="panorama" className="py-20 sm:py-24">
            <Suspense fallback={null}>
              <FeaturesSectionDemo />
              <div className="mt-10">
                <BentoGridThirdDemo />
              </div>
            </Suspense>
          </section>

          <section id="proyectos" className="px-4 py-20 sm:py-24">
            <SectionHeading number="04" eyebrow={t.proyectos.eyebrow} title={t.proyectos.title} />
            <Suspense fallback={null}>
              <ProjectCardsDemo />
            </Suspense>
          </section>

          <section id="certificaciones" className="px-4 py-20 sm:py-24">
            <Suspense fallback={null}>
              <CertificationsDemo />
            </Suspense>
          </section>

          <section id="trayectoria" className="px-4 py-20 sm:py-24">
            <SectionHeading number="06" eyebrow={t.trayectoria.eyebrow} title={t.trayectoria.title} />
            <Suspense fallback={null}>
              <TimelineDemo />
            </Suspense>
          </section>

          <section id="disponibilidad" className="py-20 sm:py-24">
            <Suspense fallback={null}>
              <GlobeDemo />
            </Suspense>
          </section>

          <section id="contacto" className="px-4 py-20 sm:py-24">
            <SectionHeading
              number="08"
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
                <Suspense fallback={null}>
                  <CardDemo />
                  <ContactExtrasDemo />
                </Suspense>
              </div>
              <div className="flex justify-center">
                <Suspense fallback={null}>
                  <ContactFormDemo />
                </Suspense>
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

      <Suspense fallback={null}>
        <DevConsoleDemo />
      </Suspense>
    </A11yProvider>
  );
}
