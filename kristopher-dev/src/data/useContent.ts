import { useLanguage } from "@/hooks/useLanguage";
import * as es from "./content";
import * as en from "./content.en";

const dictionaries = { es, en } as const;

/** Devuelve content.ts o content.en.ts según el idioma activo. Mismas
 * claves en los dos archivos, así los componentes no cambian de forma. */
export function useContent() {
  const { language } = useLanguage();
  return dictionaries[language];
}
