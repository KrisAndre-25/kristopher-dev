"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { GooeyInput } from "@/components/ui/gooey-input";
import { cn } from "@/lib/utils";
import { useContent } from "@/data/useContent";
import { useUiStrings } from "@/data/ui-strings";
import { useLanguage } from "@/hooks/useLanguage";

interface SearchEntry {
  label: string;
  sectionId: string;
  keywords: string[];
}

function normalize(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function GooeyInputDemo({ className }: { className?: string }) {
  const { certifications, project, stackGroups } = useContent();
  const t = useUiStrings();
  const { language } = useLanguage();

  const baseEntries: SearchEntry[] = [
    { label: t.nav.inicio, sectionId: "inicio", keywords: ["inicio", "home", "kristopher astudillo"] },
    { label: t.nav.stack, sectionId: "tecnologias", keywords: ["stack", "tecnologias", "technologies", "herramientas", "tools"] },
    { label: language === "en" ? "Profile" : "Perfil", sectionId: "perfil", keywords: ["perfil", "profile", "qa", "sobre mi", "about"] },
    { label: t.nav.habilidades, sectionId: "habilidades", keywords: ["habilidades", "skills", "hard skills", "soft skills"] },
    { label: t.nav.panorama, sectionId: "panorama", keywords: ["panorama", "overview", "resumen"] },
    { label: t.nav.proyectos, sectionId: "proyectos", keywords: ["proyectos", "projects", "trabajos", "work"] },
    { label: t.nav.certificaciones, sectionId: "certificaciones", keywords: ["certificaciones", "certifications", "duoc", "formacion"] },
    { label: t.nav.trayectoria, sectionId: "trayectoria", keywords: ["trayectoria", "journey", "experiencia", "experience", "timeline", "formacion"] },
    { label: t.nav.disponibilidad, sectionId: "disponibilidad", keywords: ["disponibilidad", "availability", "mundo", "world", "remoto", "remote", "globo", "globe"] },
    { label: t.nav.contacto, sectionId: "contacto", keywords: ["contacto", "contact", "email", "linkedin", "github", "hablemos"] },
  ];

  const techEntries: SearchEntry[] = stackGroups
    .flatMap((g) => g.items)
    .map((tech) => ({
      label: tech.name,
      sectionId: "tecnologias",
      keywords: [tech.name],
    }));

  const certEntries: SearchEntry[] = certifications.map((c) => ({
    label: c.name,
    sectionId: "certificaciones",
    keywords: [c.name, c.org],
  }));

  const projectEntry: SearchEntry = {
    label: project.name,
    sectionId: "proyectos",
    keywords: [project.name, project.tagline],
  };

  const entries: SearchEntry[] = [...baseEntries, ...techEntries, ...certEntries, projectEntry];

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return [];
    return entries
      .filter(
        (entry) =>
          normalize(entry.label).includes(q) ||
          entry.keywords.some((k) => normalize(k).includes(q)),
      )
      .slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const goTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
    setQuery("");
    inputRef.current?.blur();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => (h + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => (h - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      goTo(results[highlight]?.sectionId ?? results[0].sectionId);
    } else if (e.key === "Escape") {
      setOpen(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className={cn("relative w-full max-w-[220px]", className)}>
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 z-20 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" />
        <GooeyInput
          ref={inputRef}
          type="search"
          role="combobox"
          aria-expanded={open && results.length > 0}
          aria-label={t.navbar.searchOpen}
          placeholder={t.search.placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="pl-9 pr-3"
        />
      </div>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            role="listbox"
            className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 py-1.5 shadow-2xl backdrop-blur"
          >
            {results.map((entry, i) => (
              <li key={entry.label + entry.sectionId} role="option" aria-selected={i === highlight}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => goTo(entry.sectionId)}
                  onMouseEnter={() => setHighlight(i)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm ${
                    i === highlight ? "bg-sky-400/10 text-sky-300" : "text-neutral-300"
                  }`}
                >
                  <span>{entry.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
