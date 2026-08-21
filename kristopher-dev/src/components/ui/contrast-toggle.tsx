"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useUiStrings } from "@/data/ui-strings";

const STORAGE_KEY = "high-contrast";

const STYLES = `
.kd-switch-container {
  position: relative;
  width: 56px;
  height: 28px;
  background: linear-gradient(145deg, #232326, #16161a);
  border-radius: 999px;
  box-shadow:
    inset -3px -3px 6px rgba(255,255,255,0.04),
    inset 3px 3px 6px rgba(0,0,0,0.55);
}
.kd-toggle-checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
.kd-switch {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  overflow: hidden;
  cursor: pointer;
}
.kd-toggle {
  position: absolute;
  width: 24px;
  height: 24px;
  top: 2px;
  left: 2px;
  border-radius: 999px;
  background: linear-gradient(145deg, #3a3a3f, #232326);
  box-shadow: -2px -2px 4px rgba(255,255,255,0.06), 2px 2px 4px rgba(0,0,0,0.6);
  transition: all 0.3s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
}
.kd-led {
  width: 8px;
  height: 8px;
  background: #52525b;
  border-radius: 999px;
  box-shadow: 0 0 6px 1px rgba(0,0,0,0.4);
  transition: all 0.3s ease-in-out;
}
.kd-toggle-checkbox:checked + .kd-switch .kd-toggle {
  left: 30px;
  background: linear-gradient(145deg, #38bdf8, #0ea5e9);
  box-shadow: -2px -2px 4px rgba(255,255,255,0.15), 2px 2px 4px rgba(0,0,0,0.5);
}
.kd-toggle-checkbox:checked + .kd-switch .kd-led {
  background: #facc15;
  box-shadow: 0 0 8px 2px rgba(250,204,21,0.8);
}
.kd-switch:hover .kd-toggle {
  box-shadow: -2px -2px 6px rgba(255,255,255,0.1), 2px 2px 6px rgba(0,0,0,0.65);
}
.kd-toggle-checkbox:focus-visible + .kd-switch {
  outline: 2px solid #38bdf8;
  outline-offset: 2px;
}
`;

function readInitial() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "1";
}

export function ContrastToggle({ className }: { className?: string }) {
  const t = useUiStrings();
  const [active, setActive] = useState(readInitial);

  useEffect(() => {
    document.documentElement.classList.toggle("high-contrast", active);
    window.localStorage.setItem(STORAGE_KEY, active ? "1" : "0");
  }, [active]);

  return (
    <div className={cn("kd-switch-container shrink-0", className)}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      <input
        id="contrast-toggle"
        className="kd-toggle-checkbox"
        type="checkbox"
        role="switch"
        checked={active}
        aria-label={t.a11y.contrastLabel}
        onChange={() => setActive((v) => !v)}
      />
      <label htmlFor="contrast-toggle" className="kd-switch">
        <span className="kd-toggle">
          <span className="kd-led" />
        </span>
      </label>
    </div>
  );
}
