/**
 * Chat con IA del portafolio (Netlify Function, runtime v2).
 *
 * El navegador nunca ve la API key: llama a /.netlify/functions/chat y esta
 * función reenvía la conversación a Gemini con la key guardada en la variable
 * de entorno GEMINI_API_KEY (Netlify → Site configuration → Environment variables).
 *
 * Respuesta: texto plano en streaming (se va escribiendo a medida que llega).
 *
 * Protecciones básicas para que nadie use el endpoint para gastar tu cuota:
 * - Solo acepta peticiones del mismo origen (tu sitio).
 * - Límite por IP: RATE_MAX mensajes por ventana (mejor esfuerzo: es memoria
 *   de la instancia, se reinicia con cada arranque en frío).
 * - Tamaño máximo por mensaje, por historial y de la respuesta.
 * - No guarda ni registra el contenido de las conversaciones.
 *
 * Respaldo gratis: si no hay key, o Gemini responde con error o sin cuota,
 * contesta con las respuestas preescritas del portafolio (sin IA). La
 * cabecera `x-chat-source` indica "gemini" o "local".
 */
import { SYSTEM_INSTRUCTION } from "../../src/data/ai-context";
import { localAnswer } from "../../src/data/local-answers";

const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

const MAX_MESSAGE_CHARS = 1000;
const MAX_TURNS = 16;
const MAX_TOTAL_CHARS = 8000;
const MAX_OUTPUT_TOKENS = 600;
const RATE_MAX = 15;
const RATE_WINDOW_MS = 10 * 60 * 1000;

type ChatMessage = { role: "user" | "assistant"; content: string };

const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Limpieza simple para que el mapa no crezca sin límite.
  if (hits.size > 5000) hits.clear();
  return false;
}

function json(status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });
}

function textResponse(text: string, source: "local") {
  return new Response(text, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-chat-source": source,
    },
  });
}

function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // peticiones del mismo sitio sin cabecera Origin
  try {
    return new URL(origin).host === new URL(req.url).host;
  } catch {
    return false;
  }
}

function parseMessages(body: unknown): ChatMessage[] | null {
  if (!body || typeof body !== "object") return null;
  const raw = (body as { messages?: unknown }).messages;
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const messages = raw.slice(-MAX_TURNS).map((m) => {
    const role = (m as ChatMessage)?.role;
    const content = (m as ChatMessage)?.content;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_MESSAGE_CHARS) return null;
    return { role, content: text } as ChatMessage;
  });
  if (messages.some((m) => m === null)) return null;
  const valid = messages as ChatMessage[];
  if (valid[valid.length - 1].role !== "user") return null;
  if (valid.reduce((n, m) => n + m.content.length, 0) > MAX_TOTAL_CHARS) return null;
  // Gemini exige que la conversación empiece con el usuario.
  while (valid.length && valid[0].role !== "user") valid.shift();
  return valid.length ? valid : null;
}

export default async (req: Request) => {
  if (req.method !== "POST") return json(405, { error: "method_not_allowed" });
  if (!sameOrigin(req)) return json(403, { error: "forbidden" });

  const ip =
    req.headers.get("x-nf-client-connection-ip") ??
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "local";
  if (rateLimited(ip)) return json(429, { error: "rate_limited" });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return json(400, { error: "bad_request" });
  }
  const messages = parseMessages(body);
  if (!messages) return json(400, { error: "bad_request" });
  const lastQuestion = messages[messages.length - 1].content;

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return textResponse(localAnswer(lastQuestion), "local");

  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  const upstream = await fetch(`${API_BASE}/${encodeURIComponent(model)}:streamGenerateContent?alt=sse`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      generationConfig: { maxOutputTokens: MAX_OUTPUT_TOKENS },
    }),
  }).catch(() => null);

  if (!upstream || !upstream.ok || !upstream.body) {
    // Solo el código de estado: nunca se registra el contenido del chat.
    console.error("gemini_error", upstream?.status ?? "network");
    return textResponse(localAnswer(lastQuestion), "local");
  }

  // Convierte el SSE de Gemini (líneas "data: {json}") en texto plano.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = upstream.body.getReader();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      const { done, value } = await reader.read();
      if (done) {
        controller.close();
        return;
      }
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        const data = line.slice(5).trim();
        if (!data || data === "[DONE]") continue;
        try {
          const chunk = JSON.parse(data);
          const parts: { text?: string; thought?: boolean }[] = chunk?.candidates?.[0]?.content?.parts ?? [];
          const text = parts
            .filter((p) => !p.thought)
            .map((p) => p.text ?? "")
            .join("");
          if (text) controller.enqueue(encoder.encode(text));
        } catch {
          /* fragmento incompleto o no JSON: se ignora */
        }
      }
    },
    cancel() {
      reader.cancel().catch(() => undefined);
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "x-chat-source": "gemini",
    },
  });
};
