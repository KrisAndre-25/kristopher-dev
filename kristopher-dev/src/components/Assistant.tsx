import { useEffect, useMemo, useRef, useState } from "react";
import { useContent } from "../data/useContent";
import { useUiStrings } from "../data/ui-strings";
import "./Assistant.css";

type Msg = { id: number; from: "bot" | "user"; text: string };

/** Normaliza: minúsculas, sin tildes y sin signos de puntuación. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:()"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Distancia de Levenshtein acotada: cuántas ediciones (insertar, borrar,
 * sustituir) separan dos palabras. Sirve para tolerar erratas como
 * "playwrigth" o "typscript".
 */
function distancia(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const curr = [i];
    let mejor = i;
    for (let j = 1; j <= b.length; j++) {
      const costo = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + costo);
      if (curr[j] < mejor) mejor = curr[j];
    }
    if (mejor > max) return max + 1; // corte temprano
    prev = curr;
  }
  return prev[b.length];
}

/** Erratas de una palabra se toleran solo si la palabra es larga. */
function toleranciaPara(palabra: string) {
  if (palabra.length <= 4) return 0;
  if (palabra.length <= 7) return 1;
  return 2;
}

/**
 * Puntúa cuánto encaja una consulta con una clave.
 * Prioriza la coincidencia exacta de frase, luego palabra a palabra,
 * y en último lugar la coincidencia aproximada (erratas).
 */
function puntuar(consulta: string, clave: string): number {
  const c = norm(clave);
  if (!c) return 0;

  // Frase completa contenida: la señal más fuerte
  if (consulta.includes(c)) return c.length * 3;

  const palabrasConsulta = consulta.split(" ").filter(Boolean);
  const palabrasClave = c.split(" ").filter(Boolean);
  let total = 0;

  for (const pc of palabrasClave) {
    let mejorPalabra = 0;
    for (const pq of palabrasConsulta) {
      if (pq === pc) {
        mejorPalabra = Math.max(mejorPalabra, pc.length * 2);
      } else if (pc.length > 4 && (pq.startsWith(pc) || pc.startsWith(pq))) {
        // "program" encuentra "programa", "programación"
        mejorPalabra = Math.max(mejorPalabra, Math.min(pq.length, pc.length));
      } else {
        const tol = toleranciaPara(pc);
        if (tol > 0 && distancia(pq, pc, tol) <= tol) {
          mejorPalabra = Math.max(mejorPalabra, pc.length);
        }
      }
    }
    total += mejorPalabra;
  }

  // Exige que al menos parte de la clave haya coincidido
  return total >= 4 ? total : 0;
}

let seq = 0;
const nextId = () => ++seq;

export default function Assistant() {
  const { profile, intents, assistantFallback } = useContent();
  const t = useUiStrings().assistant;

  const resolve = useMemo(() => {
    return (input: string): string => {
      const q = norm(input);
      if (!q) return assistantFallback;

      let mejor: { score: number; answer: string } | null = null;

      for (const intent of intents) {
        // El mejor encaje de una sola clave decide, no la suma: si sumáramos,
        // una intención con muchas claves que comparten palabras comunes
        // ("que", "de") ganaría por acumulación en vez de por relevancia.
        let score = 0;
        for (const key of intent.keys) {
          const s = puntuar(q, key);
          if (s > score) score = s;
        }
        if (score > 0 && (!mejor || score > mejor.score)) {
          mejor = { score, answer: intent.answer };
        }
      }

      return mejor ? mejor.answer : assistantFallback;
    };
  }, [intents, assistantFallback]);

  const suggestions = useMemo(() => intents.filter((i) => i.suggested), [intents]);

  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: nextId(), from: "bot", text: t.greeting(profile.name) },
  ]);

  const logRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      timers.current.forEach(clearTimeout);
    };
  }, []);

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    setMsgs((m) => [...m, { id: nextId(), from: "user", text: clean }]);
    setDraft("");
    setTyping(true);

    const timer = window.setTimeout(() => {
      setTyping(false);
      setMsgs((m) => [...m, { id: nextId(), from: "bot", text: resolve(clean) }]);
    }, 480);

    timers.current.push(timer);
  };

  return (
    <>
      <button
        className={`as__toggle ${open ? "is-open" : ""}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="assistant-panel"
        aria-label={open ? t.closeAria : t.openAria}
        data-magnetic
      >
        <span className="as__toggleIcon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M4.5 6.5A2.5 2.5 0 017 4h10a2.5 2.5 0 012.5 2.5v7A2.5 2.5 0 0117 16H9l-4.5 3.5z" />
            </svg>
          )}
        </span>
        <span className="as__togglePing" aria-hidden="true" />
      </button>

      <div
        className={`as ${open ? "is-open" : ""}`}
        id="assistant-panel"
        role="dialog"
        aria-label={t.panelAria}
        aria-modal="false"
      >
        <header className="as__head">
          <span className="as__avatar" aria-hidden="true">
            <span />
          </span>
          <div className="as__ident">
            <p className="as__name">{t.name}</p>
            <p className="as__status mono">
              <span className="as__dot" aria-hidden="true" />
              {t.online}
            </p>
          </div>
          <button className="as__close" onClick={() => setOpen(false)} aria-label={t.closeAria}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7l10 10M17 7L7 17" />
            </svg>
          </button>
        </header>

        <div className="as__log" ref={logRef} role="log" aria-live="polite">
          {msgs.map((m) => (
            <p key={m.id} className={`as__msg as__msg--${m.from}`}>
              {m.text}
            </p>
          ))}

          {typing ? (
            <p className="as__msg as__msg--bot as__typing" aria-label={t.typingAria}>
              <span /><span /><span />
            </p>
          ) : null}
        </div>

        <div className="as__suggest">
          {suggestions.map((s) => (
            <button key={s.id} className="as__chip" onClick={() => send(s.question)}>
              {s.question}
            </button>
          ))}
        </div>

        <form
          className="as__form"
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
        >
          <input
            ref={inputRef}
            className="as__input"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={t.placeholder}
            aria-label={t.inputAria}
          />
          <button className="as__send" type="submit" aria-label={t.sendAria}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h13M12 5.5l6.5 6.5-6.5 6.5" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
