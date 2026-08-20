import { useState } from "react";
import { profile, whatsappUrl, mailtoUrl, gmailUrl } from "../data/content";
import { WhatsAppIcon, MailIcon, LinkedInIcon, DownloadIcon } from "./icons";
import Mark3D from "./Mark3D";
import "./Contact.css";

export default function Contact() {
  const [copied, setCopied] = useState<"mail" | "tel" | null>(null);

  const copy = async (value: string, key: "mail" | "tel") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {
      /* si el portapapeles falla, los enlaces siguen funcionando */
    }
  };

  return (
    <div className="ct">
      <Mark3D />

      <div className="ct__grid">
        {/* ── Correo ── */}
        <article className="ct__card card">
          <span className="ct__icon" aria-hidden="true">
            <MailIcon className="ct__iconSvg" />
          </span>

          <p className="eyebrow">Correo</p>
          <p className="ct__value">{profile.email}</p>
          <p className="ct__hint">Respondo el mismo día.</p>

          <div className="ct__actions">
            <a
              className="ct__go"
              href={gmailUrl}
              target="_blank"
              rel="noreferrer"
              data-magnetic
            >
              Abrir en Gmail
            </a>
            <a className="ct__alt" href={mailtoUrl}>
              App de correo
            </a>
            <button className="ct__alt" onClick={() => copy(profile.email, "mail")}>
              {copied === "mail" ? "Copiado ✓" : "Copiar"}
            </button>
          </div>
        </article>

        {/* ── WhatsApp ── */}
        <article className="ct__card card ct__card--wa">
          <span className="ct__icon ct__icon--wa" aria-hidden="true">
            <WhatsAppIcon className="ct__iconSvg ct__iconSvg--fill" />
          </span>

          <p className="eyebrow">WhatsApp</p>
          <p className="ct__value">{profile.phone}</p>
          <p className="ct__hint">Abre el chat con un mensaje ya escrito.</p>

          <div className="ct__actions">
            <a
              className="ct__go ct__go--wa"
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              data-magnetic
            >
              Enviar mensaje
            </a>
            <a className="ct__alt" href={`tel:${profile.phoneHref}`}>
              Llamar
            </a>
            <button className="ct__alt" onClick={() => copy(profile.phone, "tel")}>
              {copied === "tel" ? "Copiado ✓" : "Copiar"}
            </button>
          </div>
        </article>

        {/* ── LinkedIn ── */}
        <article className="ct__card card">
          <span className="ct__icon" aria-hidden="true">
            <LinkedInIcon className="ct__iconSvg" />
          </span>

          <p className="eyebrow">LinkedIn</p>
          <p className="ct__value">Kristopher Astudillo Durán</p>
          <p className="ct__hint">Experiencia, formación y recomendaciones.</p>

          <div className="ct__actions">
            <a
              className="ct__go"
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-magnetic
            >
              Ver perfil
            </a>
          </div>
        </article>
      </div>

      {/* ── Bloque final ── */}
      <div className="ct__cta card">
        <div className="ct__ctaCopy">
          <h3 className="ct__ctaTitle">¿Conversamos?</h3>
          <p className="ct__ctaText">
            Estoy buscando mi primer rol full-time como desarrollador. Escríbeme por donde
            te acomode: correo, WhatsApp o LinkedIn.
          </p>
        </div>

        <div className="ct__ctaActions">
          <a
            className="btn btn--primary"
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <WhatsAppIcon className="btn__icon btn__icon--fill" />
            WhatsApp
          </a>

          <a
            className="btn btn--ghost"
            href={gmailUrl}
            target="_blank"
            rel="noreferrer"
            data-magnetic
          >
            <MailIcon className="btn__icon" />
            Correo
          </a>

          <a
            className="btn btn--ghost"
            href={profile.cv}
            download={profile.cvName}
            data-magnetic
          >
            <DownloadIcon className="btn__icon" />
            Descargar CV
          </a>
        </div>
      </div>

      <ul className="ct__meta">
        <li className="pill">
          <span className="pill__led" aria-hidden="true" />
          {profile.location}
        </li>
        <li className="pill">Remoto · Híbrido · Presencial</li>
        <li className="pill">Incorporación inmediata</li>
      </ul>
    </div>
  );
}
