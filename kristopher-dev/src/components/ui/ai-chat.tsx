"use client";

import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconArrowUp, IconPlayerStopFilled, IconSparkles, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export type ChatMessage = { role: "user" | "assistant"; content: string; local?: boolean };

export type AiChatStrings = {
  triggerLabel: string;
  title: string;
  subtitle: string;
  disclaimer: string;
  placeholder: string;
  inputLabel: string;
  send: string;
  stop: string;
  close: string;
  greeting: string;
  suggestionsLabel: string;
  suggestions: readonly string[];
  thinking: string;
  localNote: string;
  errors: {
    not_configured: string;
    rate_limited: string;
    upstream_busy: string;
    generic: string;
  };
};

const ENDPOINT = "/.netlify/functions/chat";
const MAX_CHARS = 1000;

/** Chat flotante con IA. Habla con la función del servidor, nunca con Gemini directo. */
export function AiChat({ strings: s }: { strings: AiChatStrings }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Foco al abrir; al cerrar vuelve al botón que abrió el chat.
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 50);
      return () => window.clearTimeout(id);
    }
  }, [open]);

  // Mantiene visible el último mensaje mientras se escribe la respuesta.
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming, error]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || streaming) return;
    setError(null);
    const history: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setStreaming(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        let code = "generic";
        try {
          code = ((await res.json()) as { error?: string }).error ?? "generic";
        } catch {
          /* sin cuerpo JSON */
        }
        throw new Error(code);
      }
      if (res.headers.get("x-chat-source") === "local") {
        setMessages((prev) => {
          const next = [...prev];
          next[next.length - 1] = { ...next[next.length - 1], local: true };
          return next;
        });
      }
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        const piece = decoder.decode(value, { stream: true });
        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = { ...last, content: last.content + piece };
          return next;
        });
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        const code = (err as Error).message as keyof AiChatStrings["errors"];
        setError(s.errors[code] ?? s.errors.generic);
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
      // Si no llegó nada (error o detenido al inicio), se quita la burbuja vacía.
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        return last?.role === "assistant" && !last.content ? prev.slice(0, -1) : prev;
      });
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send(input);
    }
  };

  const stop = () => abortRef.current?.abort();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls={open ? titleId : undefined}
        className="fixed bottom-4 right-4 z-[150] flex h-12 items-center gap-2 rounded-full border border-sky-400/40 bg-neutral-950/90 pl-3.5 pr-4 text-sm font-semibold text-white shadow-[0_0_30px_-8px_rgba(56,189,248,0.6)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
      >
        {open ? <IconX className="h-5 w-5" aria-hidden="true" /> : <IconSparkles className="h-5 w-5 text-sky-300" aria-hidden="true" />}
        <span className={cn(open && "sr-only sm:not-sr-only")}>{open ? s.close : s.triggerLabel}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-labelledby={titleId}
            aria-describedby={descId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onKeyDown={(e) => {
              if (e.key === "Escape") close();
            }}
            className="fixed inset-x-3 bottom-20 z-[150] flex max-h-[min(70vh,600px)] flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 shadow-2xl backdrop-blur-xl sm:inset-x-auto sm:right-4 sm:w-[400px]"
          >
            <header className="flex items-start gap-3 border-b border-white/10 px-4 py-3">
              <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sky-400/10 text-sky-300 ring-1 ring-sky-400/20">
                <IconSparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 id={titleId} className="text-sm font-semibold text-white">
                  {s.title}
                </h2>
                <p id={descId} className="text-xs text-neutral-400">
                  {s.subtitle}
                </p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={s.close}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
              >
                <IconX className="h-4 w-4" aria-hidden="true" />
              </button>
            </header>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite" aria-busy={streaming}>
              <Bubble role="assistant">{s.greeting}</Bubble>

              {messages.length === 0 && (
                <div>
                  <p className="mb-2 text-[0.7rem] font-medium uppercase tracking-widest text-neutral-500">{s.suggestionsLabel}</p>
                  <ul className="flex flex-wrap gap-2">
                    {s.suggestions.map((q) => (
                      <li key={q}>
                        <button
                          type="button"
                          onClick={() => void send(q)}
                          className="rounded-full border border-white/15 bg-neutral-900 px-3 py-1.5 text-left text-xs text-neutral-200 transition hover:border-sky-400/60 hover:text-white focus-visible:outline-2 focus-visible:outline-sky-400"
                        >
                          {q}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {messages.map((m, i) => (
                <div key={i}>
                  <Bubble role={m.role}>
                    {m.content || (streaming && i === messages.length - 1 ? <Thinking label={s.thinking} /> : null)}
                  </Bubble>
                  {m.local && m.content && (
                    <p className="mt-1 pl-1 text-[0.65rem] text-neutral-500">{s.localNote}</p>
                  )}
                </div>
              ))}

              {error && (
                <p role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
                  {error}
                </p>
              )}
            </div>

            <form onSubmit={onSubmit} className="border-t border-white/10 p-3">
              <div className="flex items-end gap-2 rounded-xl border border-white/10 bg-neutral-900 p-1.5 focus-within:border-sky-400/60">
                <label htmlFor={`${titleId}-input`} className="sr-only">
                  {s.inputLabel}
                </label>
                <textarea
                  id={`${titleId}-input`}
                  ref={inputRef}
                  rows={1}
                  value={input}
                  maxLength={MAX_CHARS}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder={s.placeholder}
                  className="max-h-28 min-h-[2.25rem] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-neutral-500"
                />
                {streaming ? (
                  <button
                    type="button"
                    onClick={stop}
                    aria-label={s.stop}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-neutral-950 transition hover:bg-neutral-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
                  >
                    <IconPlayerStopFilled className="h-4 w-4" aria-hidden="true" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    aria-label={s.send}
                    disabled={!input.trim()}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-400 text-neutral-950 transition hover:bg-sky-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <IconArrowUp className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
              <p className="mt-2 px-1 text-[0.65rem] leading-snug text-neutral-500">{s.disclaimer}</p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({ role, children }: { role: ChatMessage["role"]; children: ReactNode }) {
  if (children === null || children === "") return null;
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
          isUser ? "rounded-br-md bg-sky-400 text-neutral-950" : "rounded-bl-md border border-white/10 bg-neutral-900 text-neutral-100",
        )}
      >
        {children}
      </div>
    </div>
  );
}

function Thinking({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={label} role="status">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-neutral-400 motion-reduce:animate-none"
          style={{ animationDelay: `${i * 120}ms` }}
        />
      ))}
    </span>
  );
}
