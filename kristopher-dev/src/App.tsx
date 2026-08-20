import CyberBackground from "./components/CyberBackground";
import Cursor from "./components/Cursor";
import Progress from "./components/Progress";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Section from "./components/Section";
import Bento from "./components/Bento";
import Project from "./components/Project";
import CodeShowcase from "./components/CodeShowcase";
import Carousel from "./components/Carousel";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import StackGrid from "./components/StackGrid";
import Contact from "./components/Contact";
import Assistant from "./components/Assistant";
import { A11yProvider } from "./hooks/useA11y";
import {
  FxLaser,
  FxClouds,
  FxGlass,
  FxGrid,
  FxMagnify,
  FxRipple,
} from "./components/Fx";
import { profile, whatsappUrl } from "./data/content";
import "./App.css";

export default function App() {
  return (
    <A11yProvider>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>

      <CyberBackground />
      <Cursor />
      <Progress />
      <Navbar />

      <main id="contenido">
        <FxLaser>
          <Hero />
        </FxLaser>

        <Section
          id="perfil"
          index="01"
          eyebrow="Perfil"
          title="Un panorama rápido"
          lede="Lo esencial de mi formación, mis números y en qué estoy ahora."
        >
          <FxClouds>
            <Bento />
          </FxClouds>
        </Section>

        <Section
          id="proyecto"
          index="02"
          eyebrow="Proyecto destacado"
          title="StudyMatch, de la idea a la infraestructura"
          lede="El proyecto donde tomé decisiones en todas las capas: interfaz, API, datos, infraestructura y pruebas."
        >
          <FxGlass>
            <Project />
          </FxGlass>
        </Section>

        <Section
          id="codigo"
          index="03"
          eyebrow="Código"
          title="Cómo escribo, no solo qué uso"
          lede="Tres fragmentos reales de mi trabajo. Una lista de tecnologías dice poco; el código dice cómo pienso."
        >
          <FxGrid>
            <CodeShowcase />
          </FxGrid>
        </Section>

        <Section
          id="hitos"
          index="04"
          eyebrow="Recorrido"
          title="Hitos y certificaciones"
          lede="Un repaso navegable por lo que he construido y estudiado."
        >
          <Carousel />
        </Section>

        <Section
          id="experiencia"
          index="05"
          eyebrow="Experiencia"
          title="Dónde trabajé y qué dejé funcionando"
        >
          <Experience />
        </Section>

        <Section
          id="certificaciones"
          index="06"
          eyebrow="Certificaciones"
          title="Formación continua"
          lede="Cursos y eventos que complementan mi formación técnica."
        >
          <Certifications />
        </Section>

        <Section
          id="stack"
          index="07"
          eyebrow="Stack técnico"
          title="Con qué trabajo, y qué tan a fondo"
          lede="Sin inflar la lista: cada tecnología dice dónde la apliqué de verdad."
        >
          <FxMagnify>
            <StackGrid />
          </FxMagnify>
        </Section>

        <Section
          id="contacto"
          index="08"
          eyebrow="Contacto"
          title="Hablemos"
          lede="Disponible para incorporarme de inmediato en Santiago o en remoto."
        >
          <FxRipple>
            <Contact />
          </FxRipple>
        </Section>
      </main>

      <footer className="ft">
        <div className="shell ft__inner">
          <div className="ft__col">
            <p className="mono">
              © {new Date().getFullYear()} {profile.fullName}
            </p>
            <p className="mono ft__built">
              Construido con <span>React</span> · <span>TypeScript</span> ·{" "}
              <span>CSS puro</span>
            </p>
          </div>

          <nav className="ft__links" aria-label="Enlaces de contacto">
            <a href={`mailto:${profile.email}`}>Correo</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              WhatsApp
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={profile.cv} download={profile.cvName}>
              Descargar CV
            </a>
          </nav>
        </div>
      </footer>

      <Assistant />
    </A11yProvider>
  );
}
