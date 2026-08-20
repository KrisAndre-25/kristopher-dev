import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "cian" | "contraste" | "ambar" | "claro" | "violeta";
export type TextSize = "chico" | "normal" | "grande";
/** auto = respeta la preferencia del sistema; on/off = decisión explícita del usuario. */
export type MotionPref = "auto" | "on" | "off";

type Ctx = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  textSize: TextSize;
  setTextSize: (s: TextSize) => void;
  /** Sube o baja un escalón el tamaño de texto. */
  stepText: (dir: 1 | -1) => void;
  motion: MotionPref;
  setMotion: (m: MotionPref) => void;
  grayscale: boolean;
  setGrayscale: (v: boolean) => void;
  reset: () => void;
  /** Resultado final: si los efectos y animaciones deben correr. */
  motionEnabled: boolean;
};

const A11yContext = createContext<Ctx | null>(null);

const KEY = "kd-a11y";

type Stored = { theme: Theme; textSize: TextSize; motion: MotionPref; grayscale: boolean };

function read(): Stored {
  const fallback: Stored = { theme: "cian", textSize: "normal", motion: "auto", grayscale: false };
  if (typeof localStorage === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function A11yProvider({ children }: { children: ReactNode }) {
  const initial = read();
  const [theme, setThemeState] = useState<Theme>(initial.theme);
  const [textSize, setTextSizeState] = useState<TextSize>(initial.textSize);
  const [motion, setMotionState] = useState<MotionPref>(initial.motion);
  const [grayscale, setGrayscaleState] = useState<boolean>(initial.grayscale);
  const [systemReduced, setSystemReduced] = useState(false);

  // Preferencia del sistema operativo
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setSystemReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const persist = useCallback((next: Partial<Stored>) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...read(), ...next }));
    } catch {
      /* modo privado o almacenamiento lleno: la sesión sigue funcionando igual */
    }
  }, []);

  const setTheme = useCallback(
    (t: Theme) => {
      // Clase temporal para que el cambio de color sea una transición y no un salto
      document.documentElement.classList.add("theme-switching");
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-switching");
      }, 500);
      setThemeState(t);
      persist({ theme: t });
    },
    [persist]
  );

  const setTextSize = useCallback(
    (s: TextSize) => {
      setTextSizeState(s);
      persist({ textSize: s });
    },
    [persist]
  );

  const setMotion = useCallback(
    (m: MotionPref) => {
      setMotionState(m);
      persist({ motion: m });
    },
    [persist]
  );

  const setGrayscale = useCallback(
    (v: boolean) => {
      setGrayscaleState(v);
      persist({ grayscale: v });
    },
    [persist]
  );

  const ORDEN: TextSize[] = ["chico", "normal", "grande"];

  const stepText = useCallback(
    (dir: 1 | -1) => {
      setTextSizeState((prev) => {
        const i = ORDEN.indexOf(prev);
        const next = ORDEN[Math.min(ORDEN.length - 1, Math.max(0, i + dir))];
        persist({ textSize: next });
        return next;
      });
    },
    [persist]
  );

  const reset = useCallback(() => {
    document.documentElement.classList.add("theme-switching");
    window.setTimeout(() => document.documentElement.classList.remove("theme-switching"), 500);
    setThemeState("cian");
    setTextSizeState("normal");
    setMotionState("auto");
    setGrayscaleState(false);
    try {
      localStorage.removeItem(KEY);
    } catch {
      /* sin almacenamiento disponible */
    }
  }, []);

  // Aplicar al documento
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (textSize === "normal") {
      document.documentElement.removeAttribute("data-text");
    } else {
      document.documentElement.setAttribute("data-text", textSize);
    }
  }, [textSize]);

  useEffect(() => {
    if (grayscale) {
      document.documentElement.setAttribute("data-grayscale", "on");
    } else {
      document.documentElement.removeAttribute("data-grayscale");
    }
  }, [grayscale]);

  const motionEnabled = motion === "on" ? true : motion === "off" ? false : !systemReduced;

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", motionEnabled ? "on" : "off");
  }, [motionEnabled]);

  const value = useMemo(
    () => ({
      theme, setTheme,
      textSize, setTextSize, stepText,
      motion, setMotion,
      grayscale, setGrayscale,
      reset,
      motionEnabled,
    }),
    [theme, setTheme, textSize, setTextSize, stepText, motion, setMotion, grayscale, setGrayscale, reset, motionEnabled]
  );

  return <A11yContext.Provider value={value}>{children}</A11yContext.Provider>;
}

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y debe usarse dentro de A11yProvider");
  return ctx;
}
