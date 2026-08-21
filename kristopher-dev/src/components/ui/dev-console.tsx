"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TerminalSquare, X } from "lucide-react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useUiStrings } from "@/data/ui-strings";

export interface ConsoleCommand {
  name: string;
  description: string;
  run: () => readonly string[] | "CLEAR";
}

const PROMPT = "kristopher@portfolio:~$";

export function DevConsole({ commands }: { commands: ConsoleCommand[] }) {
  const t = useUiStrings().devConsole;
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<{ cmd: string; out: readonly string[] }[]>([]);
  const [input, setInput] = useState("");
  const [cmdLog, setCmdLog] = useState<string[]>([]);
  const [logIndex, setLogIndex] = useState<number | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  useOutsideClick(panelRef, () => setOpen(false));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const runCommand = (raw: string) => {
    const name = raw.trim().toLowerCase();
    if (!name) return;

    setCmdLog((log) => [...log, raw]);
    setLogIndex(null);

    if (name === "clear") {
      setHistory([]);
      return;
    }

    const match = commands.find((c) => c.name === name);
    const out = match ? match.run() : t.notFound(name);

    if (out === "CLEAR") {
      setHistory([]);
      return;
    }

    setHistory((h) => [...h, { cmd: raw, out }]);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!cmdLog.length) return;
      const next = logIndex === null ? cmdLog.length - 1 : Math.max(0, logIndex - 1);
      setLogIndex(next);
      setInput(cmdLog[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (logIndex === null) return;
      const next = logIndex + 1;
      if (next >= cmdLog.length) {
        setLogIndex(null);
        setInput("");
      } else {
        setLogIndex(next);
        setInput(cmdLog[next]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.triggerAria}
        title={t.triggerAria}
        className="fixed bottom-4 left-4 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-sky-400/30 bg-neutral-950/85 text-sky-400 shadow-[0_10px_30px_-12px_rgba(56,189,248,0.7)] backdrop-blur-md transition hover:-translate-y-0.5 hover:border-sky-400/60 sm:bottom-6 sm:left-6"
      >
        <TerminalSquare className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[110] flex items-end justify-center p-3 sm:items-center sm:p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              ref={panelRef}
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.97 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              className="relative z-10 flex h-[70vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 font-mono text-sm shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span id={titleId} className="ml-2 text-xs text-neutral-500">
                    {t.windowTitle}
                  </span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t.closeAria}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-neutral-500 hover:bg-white/5 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div
                ref={scrollRef}
                role="log"
                aria-live="polite"
                className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-neutral-300"
              >
                <p className="text-neutral-500">{t.hint}</p>
                {history.map((entry, i) => (
                  <div key={i}>
                    <p>
                      <span className="text-sky-400">{PROMPT}</span>{" "}
                      <span className="text-white">{entry.cmd}</span>
                    </p>
                    {entry.out.map((line, j) => (
                      <p key={j} className="pl-0 text-neutral-400">
                        {line}
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-white/10 px-4 py-3">
                <label htmlFor="dev-console-input" className="text-sky-400">
                  {PROMPT}
                </label>
                <input
                  id="dev-console-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label={t.inputAria}
                  className="flex-1 bg-transparent text-white outline-none placeholder:text-neutral-600"
                  placeholder="help"
                />
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
