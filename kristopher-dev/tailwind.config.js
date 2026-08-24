/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      animation: {
        marquee: "marquee var(--duration,40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration,40s) linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "retro-grid": "retro-grid 25s linear infinite",
        "canvas-text-flow": "canvas-text-flow var(--ctf-duration,10s) linear infinite",
        "border-beam": "border-beam calc(var(--duration,6)*1s) infinite linear",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap,1rem)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-50% - var(--gap,1rem)))" },
        },
        "retro-grid": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "0 64px" },
        },
        "canvas-text-flow": {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "var(--ctf-travel,240px) 0" },
        },
        "border-beam": {
          "100%": { offsetDistance: "100%" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
