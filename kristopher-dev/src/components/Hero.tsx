import { profile, heroStats } from "../data/content";
import { DownloadIcon } from "./icons";
import { useReveal } from "../hooks/useReveal";
import "./Hero.css";

export default function Hero() {
  const copy = useReveal<HTMLDivElement>(0);
  const media = useReveal<HTMLDivElement>(180);
  const stats = useReveal<HTMLUListElement>(320);

  return (
    <section className="hero" id="inicio">
      <div className="shell hero__grid">
        <div className="hero__copy reveal" ref={copy}>
          <span className="pill hero__pill">
            <span className="pill__led" aria-hidden="true" />
            {profile.availability}
          </span>

          <h1 className="hero__title">
            <span className="hero__first">Kristopher</span>
            <span className="hero__last">Astudillo</span>
          </h1>

          <p className="hero__role mono">
            {profile.role}
            <span className="hero__sep" aria-hidden="true">
              ·
            </span>
            {profile.altRole}
          </p>

          <p className="hero__lede">{profile.intro}</p>

          <div className="hero__actions">
            <a className="btn btn--primary" href="#proyecto" data-magnetic>
              Ver mi trabajo
            </a>
            <a className="btn btn--ghost" href="#contacto" data-magnetic>
              Contactar
            </a>
          </div>
        </div>

        <div className="hero__media reveal" ref={media}>
          <div className="hero__frame">
            <span className="hero__halo" aria-hidden="true" />
            <span className="hero__orbit" aria-hidden="true" />
            <div className="hero__photoWrap" data-magnetic>
              <img
                className="hero__photo"
                src={profile.photo}
                alt={`Retrato de ${profile.fullName}`}
                width={800}
                height={800}
                loading="eager"
                decoding="async"
              />
              <span className="hero__scan" aria-hidden="true" />
            </div>
            <span className="hero__tag hero__tag--tl mono">React · TS</span>
            <span className="hero__tag hero__tag--br mono">Java · Spring</span>
          </div>

          <a
            className="hero__cv"
            href={profile.cv}
            download={profile.cvName}
            data-magnetic
          >
            <DownloadIcon className="hero__cvIcon" />
            <span className="hero__cvText">
              Descargar CV
              <span className="hero__cvMeta mono">PDF · 1 página</span>
            </span>
          </a>
        </div>
      </div>

      <ul className="shell hero__stats reveal" ref={stats}>
        {heroStats.map((s) => (
          <li className="hero__stat" key={s.label}>
            <span className="hero__statValue">{s.value}</span>
            <span className="hero__statLabel">{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
