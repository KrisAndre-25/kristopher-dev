import { useEffect, useState } from "react";
import { navLinks, profile, whatsappUrl } from "../data/content";
import { WhatsAppIcon } from "./icons";
import { useActiveSection } from "../hooks/useEnvironment";
import A11yPanel from "./A11yPanel";
import "./Navbar.css";

const ids = navLinks.map((l) => l.id);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
      <div className={`nav__bar ${open ? "is-open" : ""}`}>
        <a className="nav__brand" href="#inicio" data-magnetic onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">
            <span />
          </span>
          <span className="nav__brandText">{profile.name}</span>
        </a>

        <nav className="nav__links" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`nav__link ${active === link.id ? "is-active" : ""}`}
              aria-current={active === link.id ? "true" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <A11yPanel />

        <a
          className="nav__wa"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="Escribir por WhatsApp"
          title="Escribir por WhatsApp"
          data-magnetic
        >
          <WhatsAppIcon className="nav__waIcon" />
        </a>

        <a className="nav__cta" href="#contacto" data-magnetic>
          Hablemos
        </a>

        <button
          className="nav__burger"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`nav__sheet ${open ? "is-open" : ""}`}>
        {navLinks.map((link, i) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="nav__sheetLink"
            style={{ transitionDelay: `${open ? 60 + i * 45 : 0}ms` }}
            onClick={() => setOpen(false)}
          >
            <span className="mono nav__sheetIndex">0{i + 1}</span>
            {link.label}
          </a>
        ))}
        <a
          className="nav__sheetWa"
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          <WhatsAppIcon className="nav__waIcon" />
          Escribir por WhatsApp
        </a>
      </div>
    </header>
  );
}
