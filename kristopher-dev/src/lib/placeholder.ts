/**
 * Genera imágenes de respaldo (gradientes SVG en data URI) para tarjetas o
 * badges cuando no existe una captura o logo real en /public. Determinista
 * por `seed`, así cada proyecto o tecnología conserva siempre el mismo color.
 */
function hueFromSeed(seed: string) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % 360;
}

export function gradientThumb(seed: string, label?: string) {
  const hue = hueFromSeed(seed);
  const hue2 = (hue + 55) % 360;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="800" viewBox="0 0 640 800">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="hsl(${hue},70%,14%)" />
        <stop offset="100%" stop-color="hsl(${hue2},70%,22%)" />
      </linearGradient>
      <radialGradient id="r" cx="80%" cy="10%" r="60%">
        <stop offset="0%" stop-color="hsl(${hue},90%,55%)" stop-opacity="0.35" />
        <stop offset="100%" stop-color="hsl(${hue},90%,55%)" stop-opacity="0" />
      </radialGradient>
    </defs>
    <rect width="640" height="800" fill="url(#g)" />
    <rect width="640" height="800" fill="url(#r)" />
    ${label
      ? `<text x="40" y="740" font-family="ui-monospace,monospace" font-size="28" fill="hsla(0,0%,100%,0.55)">${label}</text>`
      : ""}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function screenshotThumb(
  title: string,
  columns: { heading: string; items: readonly string[] }[],
) {
  const width = 1400;
  const height = 875;
  const colWidth = (width - 120) / columns.length;

  const colsSvg = columns
    .map((col, ci) => {
      const x = 60 + ci * colWidth;
      const heading = `<text x="${x}" y="140" font-family="ui-monospace,monospace" font-size="22" font-weight="700" letter-spacing="2" fill="#38bdf8">${col.heading.toUpperCase()}</text>`;
      const items = col.items
        .map((item, ii) => {
          const y = 190 + ii * 46;
          return `<circle cx="${x + 5}" cy="${y - 6}" r="3.5" fill="#38bdf8" />
            <text x="${x + 22}" y="${y}" font-family="ui-monospace,monospace" font-size="21" fill="#e5e5e5">${item}</text>`;
        })
        .join("");
      return heading + items;
    })
    .join("");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#0a0a0a" />
    <rect x="0" y="0" width="${width}" height="70" fill="#111111" />
    <circle cx="34" cy="35" r="8" fill="#ef4444" />
    <circle cx="60" cy="35" r="8" fill="#f59e0b" />
    <circle cx="86" cy="35" r="8" fill="#22c55e" />
    <text x="${width / 2}" y="90" text-anchor="middle" font-family="ui-monospace,monospace" font-size="30" font-weight="700" fill="#ffffff">${title}</text>
    ${colsSvg}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export function badgeThumb(seed: string, initials: string) {
  const hue = hueFromSeed(seed);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
    <rect width="200" height="200" rx="28" fill="hsl(${hue},35%,14%)" />
    <rect width="200" height="200" rx="28" fill="none" stroke="hsl(${hue},70%,45%)" stroke-opacity="0.4" stroke-width="2" />
    <text x="100" y="118" text-anchor="middle" font-family="ui-monospace,monospace" font-size="52" font-weight="700" fill="hsl(${hue},80%,72%)">${initials}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
