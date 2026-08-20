import { useState } from "react";
import { project } from "../data/content";
import "./Project.css";

type Tab = "arquitectura" | "desafios" | "aprendizajes";

const tabs: { id: Tab; label: string }[] = [
  { id: "arquitectura", label: "Arquitectura" },
  { id: "desafios", label: "Desafíos técnicos" },
  { id: "aprendizajes", label: "Aprendizajes" },
];

export default function Project() {
  const [tab, setTab] = useState<Tab>("arquitectura");

  return (
    <article className="pj">
      <header className="pj__head">
        <div className="pj__ident">
          <span className="eyebrow">{project.kind}</span>
          <h3 className="pj__name">{project.name}</h3>
          <p className="pj__tagline mono">{project.tagline}</p>
        </div>

        <ul className="pj__metrics">
          {project.metrics.map((m) => (
            <li className="pj__metric" key={m.label}>
              <span className="pj__metricValue">{m.value}</span>
              <span className="pj__metricLabel">{m.label}</span>
            </li>
          ))}
        </ul>
      </header>

      <p className="pj__summary">{project.summary}</p>

      <ul className="pj__stack">
        {project.stack.map((s) => (
          <li className="chip" key={s}>
            {s}
          </li>
        ))}
      </ul>

      <div className="pj__panel">
        <div className="pj__tabs" role="tablist" aria-label="Detalle del proyecto">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              className={`pj__tab ${tab === t.id ? "is-active" : ""}`}
              onClick={() => setTab(t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          className="pj__content"
          role="tabpanel"
          id={`panel-${tab}`}
          aria-labelledby={`tab-${tab}`}
        >
          {tab === "arquitectura" ? (
            <ul className="pj__layers">
              {project.architecture.map((a, i) => (
                <li className="pj__layer" key={a.layer} style={{ ["--i" as string]: i }}>
                  <span className="pj__layerName mono">{a.layer}</span>
                  <p className="pj__layerText">{a.detail}</p>
                </li>
              ))}
            </ul>
          ) : null}

          {tab === "desafios" ? (
            <ul className="pj__cards">
              {project.challenges.map((c, i) => (
                <li className="pj__challenge" key={c.title} style={{ ["--i" as string]: i }}>
                  <h4 className="pj__challengeTitle">{c.title}</h4>
                  <p className="pj__challengeText">{c.detail}</p>
                </li>
              ))}
            </ul>
          ) : null}

          {tab === "aprendizajes" ? (
            <ul className="pj__learnings">
              {project.learnings.map((l, i) => (
                <li className="pj__learning" key={l} style={{ ["--i" as string]: i }}>
                  <span className="pj__learningIndex mono">0{i + 1}</span>
                  <p>{l}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {project.isPrivate ? (
        <p className="pj__private mono">
          <span className="pj__lock" aria-hidden="true" />
          {project.privateNote}
        </p>
      ) : null}
    </article>
  );
}
