/**
 * Respuestas locales (sin IA) para el chat: busca la pregunta entre las
 * respuestas preescritas de content.ts / content.en.ts, tolerando erratas.
 * Se usa en el servidor cuando Gemini no está disponible (sin key, sin
 * cuota o con error), así el chat siempre responde algo útil y gratis.
 *
 * Solo datos y lógica: no importa React ni nada del navegador.
 */
import { intents as intentsEs, assistantFallback as fallbackEs } from "./content";
import { intents as intentsEn, assistantFallback as fallbackEn } from "./content.en";

type Intent = { keys: string[]; answer: string };

/** Minúsculas, sin tildes y sin signos de puntuación. */
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[¿?¡!.,;:()"']/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Levenshtein acotado, para tolerar erratas como "playwrigth". */
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
    if (mejor > max) return max + 1;
    prev = curr;
  }
  return prev[b.length];
}

function tolerancia(palabra: string) {
  if (palabra.length <= 4) return 0;
  if (palabra.length <= 7) return 1;
  return 2;
}

/** Palabras de relleno que no deben contar como coincidencia. */
const RELLENO = new Set([
  "de", "del", "la", "el", "los", "las", "un", "una", "y", "o", "a", "en", "con", "por", "para", "que", "se", "su", "sus", "es", "lo", "al",
  "the", "a", "an", "of", "to", "in", "on", "and", "or", "is", "are", "his", "he", "does", "do", "what", "how", "for", "with",
]);

/** Cuánto encaja una consulta con una clave (frase completa > palabra > errata). */
function puntuar(consulta: string, clave: string): number {
  const c = norm(clave);
  if (!c) return 0;
  // Frase completa como palabras enteras ("ia" no debe encajar en "historia").
  if (` ${consulta} `.includes(` ${c} `)) return c.length * 3 + 2;
  const palabrasConsulta = consulta.split(" ").filter(Boolean);
  let total = 0;
  for (const pc of c.split(" ").filter((w) => w && !RELLENO.has(w))) {
    let mejor = 0;
    for (const pq of palabrasConsulta) {
      if (pq === pc) mejor = Math.max(mejor, pc.length * 2);
      else if (pc.length > 4 && pq.length > 3 && (pq.startsWith(pc) || pc.startsWith(pq))) mejor = Math.max(mejor, Math.min(pq.length, pc.length));
      else {
        const tol = tolerancia(pc);
        if (tol > 0 && distancia(pq, pc, tol) <= tol) mejor = Math.max(mejor, pc.length);
      }
    }
    total += mejor;
  }
  return total >= 4 ? total : 0;
}

function mejorRespuesta(q: string, intents: readonly Intent[]) {
  let mejor: { score: number; answer: string } | null = null;
  for (const intent of intents) {
    let score = 0;
    for (const key of intent.keys) score = Math.max(score, puntuar(q, key));
    if (score > 0 && (!mejor || score > mejor.score)) mejor = { score, answer: intent.answer };
  }
  return mejor;
}

const PALABRAS_EN = /\b(what|who|how|does|do|is|are|his|he|tell|about|experience|available|skills|projects|hello|hi|thanks|where|which|can)\b/;

/** Respuesta local para la última pregunta del visitante (ES o EN según la pregunta). */
export function localAnswer(pregunta: string): string {
  const q = norm(pregunta);
  const pareceIngles = PALABRAS_EN.test(q);
  if (!q) return pareceIngles ? fallbackEn : fallbackEs;
  const es = mejorRespuesta(q, intentsEs);
  const en = mejorRespuesta(q, intentsEn);
  if (es && en) return pareceIngles ? en.answer : es.answer;
  if (es) return es.answer;
  if (en) return en.answer;
  return pareceIngles ? fallbackEn : fallbackEs;
}
