import { Fragment, useState, type ReactNode } from "react";
import { samples, type Lang } from "../data/code";
import "./CodeShowcase.css";

/* ── Resaltador mínimo, sin dependencias ──────────────── */

const KEYWORDS: Record<Lang, string[]> = {
  ts: ["import","from","export","const","let","await","async","function","return","for","if","break","delete","new","type","interface","default","test","describe"],
  tsx: ["import","from","export","const","let","await","async","function","return","if","type"],
  java: ["public","private","final","class","return","new","import","package","void","this","List","URI"],
};

type Token = { text: string; kind: string };

function tokenize(line: string, lang: Lang): Token[] {
  const out: Token[] = [];

  // Comentario de línea completo
  const comment = line.match(/^(\s*)(\/\/.*)$/);
  if (comment) {
    if (comment[1]) out.push({ text: comment[1], kind: "plain" });
    out.push({ text: comment[2], kind: "comment" });
    return out;
  }

  const pattern = new RegExp(
    [
      "(\\/\\/[^\\n]*)",                    // comentario al final de línea
      "('[^']*'|\"[^\"]*\"|`[^`]*`)",       // cadenas
      "(@[A-Za-z]+)",                        // anotaciones y decoradores
      "\\b(\\d+)\\b",                        // números
      "\\b([A-Za-z_][\\w]*)(?=\\()",         // llamadas a función
      "\\b([A-Z][\\w]*)\\b",                 // tipos
      "\\b(" + KEYWORDS[lang].join("|") + ")\\b",
    ].join("|"),
    "g"
  );

  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = pattern.exec(line)) !== null) {
    if (m.index > last) out.push({ text: line.slice(last, m.index), kind: "plain" });

    const [full, cm, str, ann, num, fn, type, kw] = m;
    const kind = cm ? "comment"
      : str ? "string"
      : ann ? "annotation"
      : num ? "number"
      : kw ? "keyword"
      : fn ? "fn"
      : type ? "type"
      : "plain";

    out.push({ text: full, kind });
    last = m.index + full.length;
  }

  if (last < line.length) out.push({ text: line.slice(last), kind: "plain" });
  return out;
}

function highlight(code: string, lang: Lang): ReactNode {
  return code.split("\n").map((line, i) => (
    <Fragment key={i}>
      <span className="cw__num" aria-hidden="true">
        {i + 1}
      </span>
      <span className="cw__line">
        {tokenize(line, lang).map((t, j) => (
          <span key={j} className={`tk tk--${t.kind}`}>
            {t.text}
          </span>
        ))}
      </span>
    </Fragment>
  ));
}

/* ── Componente ───────────────────────────────────────── */

export default function CodeShowcase() {
  const [active, setActive] = useState(samples[0].id);
  const sample = samples.find((s) => s.id === active) ?? samples[0];

  return (
    <div className="cw">
      <div className="cw__tabs" role="tablist" aria-label="Ejemplos de código">
        {samples.map((s) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={s.id === active}
            className={`cw__tab ${s.id === active ? "is-active" : ""}`}
            onClick={() => setActive(s.id)}
          >
            {s.label}
          </button>
        ))}
      </div>

      <figure className="cw__window">
        <figcaption className="cw__bar">
          <span className="cw__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="cw__file mono">{sample.file}</span>
          <span className="cw__lang mono">{sample.lang}</span>
        </figcaption>

        <pre className="cw__code" tabIndex={0}>
          <code>{highlight(sample.code, sample.lang)}</code>
        </pre>
      </figure>

      <p className="cw__caption">{sample.caption}</p>
    </div>
  );
}
