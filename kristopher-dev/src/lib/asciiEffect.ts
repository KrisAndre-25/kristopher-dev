// Recreation of the 21st.dev "Electric Gaze" ASCII-art effect using Canvas2D.
// The full pipeline (grid sampling -> per-cell shapes -> color grade -> post-fx ->
// lights -> mask) is implemented generically so any of the documented renderModes /
// pfx layers can be toggled through AsciiEffectConfig, even though a given preset
// (see ELECTRIC_GAZE_CONFIG) only exercises a subset of them.

export type RenderMode =
  | "characters"
  | "dither"
  | "mosaic"
  | "pixel"
  | "dots"
  | "cross"
  | "diamond"
  | "voxel"
  | "lego"
  | "mixed"
  | "lines"
  | "diagonal"
  | "braille"
  | "disco"
  | "hexdump"
  | "matrix"
  | "rings"
  | "hearts"
  | "stars"
  | "hexagons"
  | "triangles"
  | "bubbles"
  | "hatch"
  | "contour"
  | "halfblocks";

export type BgMode = "none" | "blur" | "color" | "photo";
export type BlurType = "off" | "gaussian" | "directional" | "tilt" | "lens" | "progressive";
export type AnimStyle = "wave" | "pulse" | "shimmer" | "ripple" | "flicker";

export interface PfxLayer {
  enabled: boolean;
  intensity: number;
}

export interface AsciiEffectConfig {
  renderMode: RenderMode;
  bgMode: BgMode;
  bgBlur: number;
  bgOpacity: number;
  bgColor: string;
  cellSize: number;
  coverage: number;
  invert: boolean;
  charSet: string;
  customChars: string;
  brightness: number;
  contrast: number;
  edgeEmphasis: number;
  density: number;
  tint: string;
  tintOpacity: number;
  overlayBlend: GlobalCompositeOperation;
  saturation: number;
  grayscale: number;
  blurType: BlurType;
  blurAmount: number;
  pfx: Record<string, PfxLayer>;
  animated: boolean;
  animStyle: AnimStyle;
  animSpeed: { enabled: boolean; intensity: number };
  animIntensity: { enabled: boolean; intensity: number };
  lights: {
    enabled: boolean;
    points: { x: number; y: number; radius: number; intensity: number }[];
  };
  mask: { enabled: boolean; dataUrl: string | null; invert: boolean };
}

export const ELECTRIC_GAZE_CONFIG: AsciiEffectConfig = {
  renderMode: "dither",
  bgMode: "none",
  bgBlur: 12,
  bgOpacity: 90,
  bgColor: "#0f172a",
  cellSize: 9,
  coverage: 100,
  invert: false,
  charSet: "standard",
  customChars: "",
  brightness: 0,
  contrast: 158,
  edgeEmphasis: 0,
  density: 20,
  tint: "#3ca6ff",
  tintOpacity: 0,
  overlayBlend: "multiply",
  saturation: 100,
  grayscale: 0,
  blurType: "off",
  blurAmount: 35,
  pfx: {
    vignette: { enabled: false, intensity: 38 },
    scanLines: { enabled: false, intensity: 40 },
    chromatic: { enabled: false, intensity: 15 },
    bloom: { enabled: false, intensity: 25 },
    filmGrain: { enabled: false, intensity: 30 },
    glitch: { enabled: false, intensity: 20 },
    pixelate: { enabled: false, intensity: 15 },
    halftone: { enabled: false, intensity: 20 },
    filmDust: { enabled: false, intensity: 20 },
  },
  animated: true,
  animStyle: "shimmer",
  animSpeed: { enabled: true, intensity: 100 },
  animIntensity: { enabled: true, intensity: 60 },
  lights: { enabled: false, points: [] },
  mask: { enabled: false, dataUrl: null, invert: false },
};

const CHARSET_PRESETS: Record<string, string> = {
  standard: " .:-=+*#%@",
  blocks: " ░▒▓█",
  binary: " 01",
  hex: " 0123456789ABCDEF",
  extended: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
};

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}
function clamp255(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v;
}
function luminance(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}
function hash(x: number, y: number, seed = 0) {
  const s = Math.sin(x * 127.1 + y * 311.7 + seed * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

interface Cell {
  cx: number;
  cy: number;
  r: number;
  g: number;
  b: number;
  lum: number;
}

let sharedSampleCanvas: HTMLCanvasElement | null = null;
const gridCache = new Map<string, { cols: number; rows: number; cells: Cell[] }>();

function sampleGrid(
  image: HTMLImageElement,
  width: number,
  height: number,
  cellSize: number,
): { cols: number; rows: number; cells: Cell[] } {
  const cacheKey = `${image.src}|${width}x${height}|${cellSize}`;
  const cached = gridCache.get(cacheKey);
  if (cached) return cached;

  if (!sharedSampleCanvas) sharedSampleCanvas = document.createElement("canvas");
  const sample = sharedSampleCanvas;
  sample.width = width;
  sample.height = height;
  const sctx = sample.getContext("2d")!;
  sctx.drawImage(image, 0, 0, width, height);
  const { data } = sctx.getImageData(0, 0, width, height);

  const cols = Math.ceil(width / cellSize);
  const rows = Math.ceil(height / cellSize);
  const cells: Cell[] = [];

  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      const x0 = gx * cellSize;
      const y0 = gy * cellSize;
      const x1 = Math.min(x0 + cellSize, width);
      const y1 = Math.min(y0 + cellSize, height);
      let r = 0;
      let g = 0;
      let b = 0;
      let n = 0;
      for (let y = y0; y < y1; y++) {
        for (let x = x0; x < x1; x++) {
          const i = (y * width + x) * 4;
          r += data[i];
          g += data[i + 1];
          b += data[i + 2];
          n++;
        }
      }
      r /= n || 1;
      g /= n || 1;
      b /= n || 1;
      cells.push({ cx: x0, cy: y0, r, g, b, lum: luminance(r, g, b) });
    }
  }

  const result = { cols, rows, cells };
  gridCache.set(cacheKey, result);
  return result;
}

function animModifier(cfg: AsciiEffectConfig, cx: number, cy: number, w: number, h: number, t: number) {
  if (!cfg.animated || !cfg.animSpeed.enabled) return 0;
  const speed = (cfg.animSpeed.intensity / 100) * 2;
  const amp = cfg.animIntensity.enabled ? cfg.animIntensity.intensity / 100 : 0;
  const time = t * speed;
  const nx = cx / w;
  const ny = cy / h;

  switch (cfg.animStyle) {
    case "wave":
      return Math.sin(nx * 10 + time * 2) * amp;
    case "pulse":
      return Math.sin(time * 2) * amp;
    case "ripple": {
      const dx = nx - 0.5;
      const dy = ny - 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);
      return Math.sin(dist * 24 - time * 3) * amp;
    }
    case "flicker": {
      const step = Math.floor(time * 6);
      return (hash(cx, cy, step) * 2 - 1) * amp;
    }
    case "shimmer":
    default: {
      const sparkle = hash(Math.floor(cx / 3), Math.floor(cy / 3), Math.floor(time * 3));
      return (sparkle > 0.92 ? 1 : Math.sin(nx * 20 + ny * 20 + time * 4) * 0.35) * amp;
    }
  }
}

function drawCell(
  ctx: CanvasRenderingContext2D,
  mode: RenderMode,
  cell: Cell,
  size: number,
  value: number,
  color: string,
  cfg: AsciiEffectConfig,
  index: number,
) {
  const cx = cell.cx + size / 2;
  const cy = cell.cy + size / 2;
  const density = clamp01(cfg.density / 100 + 0.4);
  const scale = clamp01(value) * density;

  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  switch (mode) {
    case "dither": {
      const bayer = [
        [0, 8, 2, 10],
        [12, 4, 14, 6],
        [3, 11, 1, 9],
        [15, 7, 13, 5],
      ];
      const bx = Math.floor(cell.cx / size) % 4;
      const by = Math.floor(cell.cy / size) % 4;
      const threshold = (bayer[by][bx] + 0.5) / 16;
      if (value <= threshold) return;
      const s = Math.max(1, size * scale);
      ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
      return;
    }
    case "pixel":
      ctx.globalAlpha = clamp01(0.35 + scale);
      ctx.fillRect(cell.cx, cell.cy, size, size);
      ctx.globalAlpha = 1;
      return;
    case "mosaic": {
      const s = size * (0.55 + scale * 0.45);
      const r = s * 0.22;
      ctx.beginPath();
      roundedRect(ctx, cx - s / 2, cy - s / 2, s, s, r);
      ctx.fill();
      return;
    }
    case "dots":
    case "bubbles": {
      const radius = (size / 2) * scale;
      if (radius < 0.5) return;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();
      if (mode === "bubbles") {
        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(cx - radius * 0.3, cy - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      return;
    }
    case "cross": {
      const arm = size * 0.5 * scale;
      const thick = Math.max(1, size * 0.16 * scale);
      ctx.fillRect(cx - arm, cy - thick / 2, arm * 2, thick);
      ctx.fillRect(cx - thick / 2, cy - arm, thick, arm * 2);
      return;
    }
    case "diamond": {
      const s = (size / 2) * scale;
      ctx.beginPath();
      ctx.moveTo(cx, cy - s);
      ctx.lineTo(cx + s, cy);
      ctx.lineTo(cx, cy + s);
      ctx.lineTo(cx - s, cy);
      ctx.closePath();
      ctx.fill();
      return;
    }
    case "hexagons": {
      polygon(ctx, cx, cy, (size / 2) * scale, 6, Math.PI / 6);
      ctx.fill();
      return;
    }
    case "triangles": {
      const rot = hash(cell.cx, cell.cy) * Math.PI * 2;
      polygon(ctx, cx, cy, (size / 2) * scale, 3, rot);
      ctx.fill();
      return;
    }
    case "stars": {
      star(ctx, cx, cy, (size / 2) * scale, (size / 5) * scale);
      ctx.fill();
      return;
    }
    case "rings": {
      const r = (size / 2) * scale;
      if (r < 1) return;
      ctx.lineWidth = Math.max(1, size * 0.14);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
      return;
    }
    case "voxel": {
      const s = size * (0.6 + scale * 0.35);
      ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
      ctx.fillStyle = "rgba(255,255,255,0.28)";
      ctx.fillRect(cx - s / 2, cy - s / 2, s, s * 0.3);
      ctx.fillStyle = "rgba(0,0,0,0.25)";
      ctx.fillRect(cx - s / 2, cy + s / 2 - s * 0.22, s, s * 0.22);
      return;
    }
    case "lego": {
      const s = size * (0.6 + scale * 0.3);
      ctx.fillRect(cx - s / 2, cy - s / 2, s, s);
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.35)";
      ctx.fill();
      return;
    }
    case "lines": {
      const h = Math.max(1, size * scale);
      ctx.fillRect(cell.cx, cy - h / 2, size, h);
      return;
    }
    case "diagonal": {
      ctx.lineWidth = Math.max(1, size * 0.18 * scale);
      ctx.beginPath();
      ctx.moveTo(cell.cx, cell.cy + size);
      ctx.lineTo(cell.cx + size, cell.cy);
      ctx.stroke();
      return;
    }
    case "hatch": {
      ctx.lineWidth = Math.max(0.6, size * 0.08);
      ctx.globalAlpha = clamp01(0.3 + scale * 0.7);
      const lines = 1 + Math.round(scale * 3);
      for (let i = 0; i < lines; i++) {
        const off = (i - lines / 2) * (size / lines);
        ctx.beginPath();
        ctx.moveTo(cell.cx, cell.cy + size + off);
        ctx.lineTo(cell.cx + size, cell.cy + off);
        ctx.stroke();
        if (scale > 0.6) {
          ctx.beginPath();
          ctx.moveTo(cell.cx, cell.cy + off);
          ctx.lineTo(cell.cx + size, cell.cy + size + off);
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1;
      return;
    }
    case "contour": {
      const band = Math.floor(value * 6) / 6;
      ctx.lineWidth = 1.2;
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(cx, cy, size * 0.4, band * Math.PI * 2, band * Math.PI * 2 + Math.PI * 1.2);
      ctx.stroke();
      ctx.globalAlpha = 1;
      return;
    }
    case "halfblocks": {
      const topH = size * clamp01(value * 1.4);
      ctx.fillRect(cell.cx, cell.cy + size - topH, size * 0.48, topH);
      const botH = size * clamp01(value * 0.8);
      ctx.fillRect(cell.cx + size * 0.52, cell.cy + size - botH, size * 0.48, botH);
      return;
    }
    case "disco": {
      const hue = (index * 47 + value * 360) % 360;
      ctx.fillStyle = `hsl(${hue}deg 90% 60%)`;
      const r = (size / 2) * scale;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
      return;
    }
    case "matrix": {
      ctx.fillStyle = `rgba(60, 220, 130, ${clamp01(0.25 + scale)})`;
      const glyphs = "01アイウエオカキクケコ";
      const ch = glyphs[Math.floor(hash(cell.cx, cell.cy, index) * glyphs.length)];
      ctx.font = `${size}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(ch, cx, cy);
      return;
    }
    case "mixed": {
      const pick = Math.floor(hash(cell.cx, cell.cy) * 4);
      const modes: RenderMode[] = ["dots", "pixel", "cross", "diamond"];
      drawCell(ctx, modes[pick], cell, size, value, color, cfg, index);
      return;
    }
    case "hexdump":
    case "braille":
    case "characters":
    default: {
      const set =
        cfg.customChars ||
        (mode === "hexdump"
          ? CHARSET_PRESETS.hex
          : mode === "braille"
            ? " ⠁⠃⠇⠏⠟⠿⡿⣿"
            : CHARSET_PRESETS[cfg.charSet] || CHARSET_PRESETS.standard);
      const idx = Math.min(set.length - 1, Math.floor(clamp01(value) * set.length));
      const ch = set[idx];
      if (ch === " ") return;
      ctx.font = `${Math.max(6, size)}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(ch, cx, cy);
      return;
    }
  }
}

function roundedRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function polygon(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, sides: number, rotation: number) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = rotation + (i / sides) * Math.PI * 2;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function star(ctx: CanvasRenderingContext2D, cx: number, cy: number, outer: number, inner: number) {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i / 10) * Math.PI * 2 - Math.PI / 2;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
}

function applyColorGrade(ctx: CanvasRenderingContext2D, width: number, height: number, cfg: AsciiEffectConfig) {
  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;
  const contrastFactor = cfg.contrast / 100;
  const satFactor = cfg.saturation / 100;
  const brightnessAdd = cfg.brightness * 1.5;
  const grayMix = cfg.grayscale / 100;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) continue;
    let r = data[i] + brightnessAdd;
    let g = data[i + 1] + brightnessAdd;
    let b = data[i + 2] + brightnessAdd;

    r = (r - 128) * contrastFactor + 128;
    g = (g - 128) * contrastFactor + 128;
    b = (b - 128) * contrastFactor + 128;

    const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    r = lum + (r - lum) * satFactor;
    g = lum + (g - lum) * satFactor;
    b = lum + (b - lum) * satFactor;

    if (grayMix > 0) {
      const gLum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      r += (gLum - r) * grayMix;
      g += (gLum - g) * grayMix;
      b += (gLum - b) * grayMix;
    }

    data[i] = clamp255(r);
    data[i + 1] = clamp255(g);
    data[i + 2] = clamp255(b);
  }
  ctx.putImageData(imageData, 0, 0);
}

function applyTint(ctx: CanvasRenderingContext2D, width: number, height: number, cfg: AsciiEffectConfig) {
  if (cfg.tintOpacity <= 0) return;
  ctx.save();
  ctx.globalAlpha = clamp01(cfg.tintOpacity / 100);
  ctx.globalCompositeOperation = cfg.overlayBlend;
  ctx.fillStyle = cfg.tint;
  ctx.fillRect(0, 0, width, height);
  ctx.restore();
}

function applyBlur(ctx: CanvasRenderingContext2D, width: number, height: number, cfg: AsciiEffectConfig) {
  if (cfg.blurType === "off" || cfg.blurAmount <= 0) return;
  const px = Math.min(cfg.blurAmount / 4, 24);
  const temp = document.createElement("canvas");
  temp.width = width;
  temp.height = height;
  const tctx = temp.getContext("2d")!;
  tctx.filter = `blur(${px}px)`;
  tctx.drawImage(ctx.canvas, 0, 0);
  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(temp, 0, 0);
}

function applyPostFx(ctx: CanvasRenderingContext2D, width: number, height: number, cfg: AsciiEffectConfig, t: number) {
  const { pfx } = cfg;

  if (pfx.chromatic?.enabled) {
    const shift = (pfx.chromatic.intensity / 100) * 4;
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = 0.5;
    ctx.drawImage(ctx.canvas, -shift, 0);
    ctx.drawImage(ctx.canvas, shift, 0);
    ctx.restore();
  }

  if (pfx.bloom?.enabled) {
    const temp = document.createElement("canvas");
    temp.width = width;
    temp.height = height;
    const tctx = temp.getContext("2d")!;
    tctx.filter = `blur(${(pfx.bloom.intensity / 100) * 10}px)`;
    tctx.drawImage(ctx.canvas, 0, 0);
    ctx.save();
    ctx.globalCompositeOperation = "screen";
    ctx.globalAlpha = clamp01(pfx.bloom.intensity / 140);
    ctx.drawImage(temp, 0, 0);
    ctx.restore();
  }

  if (pfx.halftone?.enabled) {
    const step = 6;
    ctx.save();
    ctx.globalCompositeOperation = "multiply";
    ctx.globalAlpha = clamp01(pfx.halftone.intensity / 100);
    ctx.fillStyle = "#000000";
    for (let y = 0; y < height; y += step) {
      for (let x = (y / step) % 2 === 0 ? 0 : step / 2; x < width; x += step) {
        ctx.beginPath();
        ctx.arc(x, y, step * 0.28, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  if (pfx.scanLines?.enabled) {
    ctx.save();
    ctx.globalAlpha = clamp01(pfx.scanLines.intensity / 140);
    ctx.fillStyle = "#000000";
    for (let y = 0; y < height; y += 3) ctx.fillRect(0, y, width, 1);
    ctx.restore();
  }

  if (pfx.glitch?.enabled) {
    const amount = pfx.glitch.intensity / 100;
    const slices = Math.round(2 + amount * 6);
    for (let i = 0; i < slices; i++) {
      const sy = Math.floor(hash(i, Math.floor(t * 8)) * height);
      const sh = Math.max(2, Math.floor(hash(i, sy) * 10 * amount));
      const dx = (hash(i, sy, 1) - 0.5) * 20 * amount;
      ctx.drawImage(ctx.canvas, 0, sy, width, sh, dx, sy, width, sh);
    }
  }

  if (pfx.filmGrain?.enabled) {
    const amount = pfx.filmGrain.intensity / 100;
    ctx.save();
    ctx.globalAlpha = amount * 0.5;
    for (let i = 0; i < width * height * 0.02 * amount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      ctx.fillStyle = Math.random() > 0.5 ? "#ffffff" : "#000000";
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.restore();
  }

  if (pfx.filmDust?.enabled) {
    const amount = pfx.filmDust.intensity / 100;
    ctx.save();
    ctx.globalAlpha = amount * 0.6;
    ctx.strokeStyle = "#ffffff";
    for (let i = 0; i < 6 * amount; i++) {
      const x = hash(i, Math.floor(t)) * width;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + (hash(i, 1) - 0.5) * 20, height);
      ctx.lineWidth = 0.6;
      ctx.stroke();
    }
    ctx.restore();
  }

  if (pfx.pixelate?.enabled) {
    const factor = Math.max(1, Math.round((pfx.pixelate.intensity / 100) * 12));
    const w = Math.max(1, Math.floor(width / factor));
    const h = Math.max(1, Math.floor(height / factor));
    const temp = document.createElement("canvas");
    temp.width = w;
    temp.height = h;
    const tctx = temp.getContext("2d")!;
    tctx.imageSmoothingEnabled = false;
    tctx.drawImage(ctx.canvas, 0, 0, w, h);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(temp, 0, 0, w, h, 0, 0, width, height);
    ctx.imageSmoothingEnabled = true;
  }

  if (pfx.vignette?.enabled) {
    const grad = ctx.createRadialGradient(
      width / 2,
      height / 2,
      Math.min(width, height) * 0.3,
      width / 2,
      height / 2,
      Math.max(width, height) * 0.7,
    );
    grad.addColorStop(0, "rgba(0,0,0,0)");
    grad.addColorStop(1, `rgba(0,0,0,${clamp01(pfx.vignette.intensity / 100)})`);
    ctx.save();
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);
    ctx.restore();
  }
}

function applyLights(ctx: CanvasRenderingContext2D, width: number, height: number, cfg: AsciiEffectConfig) {
  if (!cfg.lights.enabled) return;
  ctx.save();
  ctx.globalCompositeOperation = "screen";
  for (const p of cfg.lights.points) {
    const cx = p.x * width;
    const cy = p.y * height;
    const r = p.radius * Math.min(width, height);
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    grad.addColorStop(0, `rgba(255,255,255,${clamp01(p.intensity / 100)})`);
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);
  }
  ctx.restore();
}

async function applyMask(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  cfg: AsciiEffectConfig,
  plainPhoto: CanvasImageSource,
) {
  if (!cfg.mask.enabled || !cfg.mask.dataUrl) return;
  const maskImg = await loadImage(cfg.mask.dataUrl);
  const maskCanvas = document.createElement("canvas");
  maskCanvas.width = width;
  maskCanvas.height = height;
  const mctx = maskCanvas.getContext("2d")!;
  mctx.drawImage(maskImg, 0, 0, width, height);
  if (cfg.mask.invert) {
    mctx.globalCompositeOperation = "difference";
    mctx.fillStyle = "#ffffff";
    mctx.fillRect(0, 0, width, height);
  }

  const revealCanvas = document.createElement("canvas");
  revealCanvas.width = width;
  revealCanvas.height = height;
  const rctx = revealCanvas.getContext("2d")!;
  rctx.drawImage(plainPhoto, 0, 0, width, height);
  rctx.globalCompositeOperation = "destination-in";
  rctx.drawImage(maskCanvas, 0, 0);

  ctx.drawImage(revealCanvas, 0, 0);
}

const imageCache = new Map<string, HTMLImageElement>();
export function loadImage(src: string): Promise<HTMLImageElement> {
  const cached = imageCache.get(src);
  if (cached) return Promise.resolve(cached);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = reject;
    img.src = src;
  });
}

function drawBackground(ctx: CanvasRenderingContext2D, image: CanvasImageSource, width: number, height: number, cfg: AsciiEffectConfig) {
  if (cfg.bgMode === "none") {
    ctx.clearRect(0, 0, width, height);
    return;
  }
  if (cfg.bgMode === "color") {
    ctx.fillStyle = cfg.bgColor;
    ctx.fillRect(0, 0, width, height);
    return;
  }
  ctx.save();
  ctx.globalAlpha = clamp01(cfg.bgOpacity / 100);
  if (cfg.bgMode === "blur") {
    ctx.filter = `blur(${cfg.bgBlur}px)`;
  }
  ctx.drawImage(image, 0, 0, width, height);
  ctx.restore();
  ctx.filter = "none";
}

export function renderAsciiFrame(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  width: number,
  height: number,
  cfg: AsciiEffectConfig,
  timeSeconds: number,
) {
  ctx.clearRect(0, 0, width, height);
  drawBackground(ctx, image, width, height, cfg);

  const { cols, cells } = sampleGrid(image, width, height, cfg.cellSize);

  cells.forEach((cell, i) => {
    const gx = Math.floor(cell.cx / cfg.cellSize);
    const gy = Math.floor(cell.cy / cfg.cellSize);
    const covered = hash(gx, gy, 99) < cfg.coverage / 100;
    if (!covered) return;

    let value = cfg.invert ? 1 - cell.lum : cell.lum;

    if (cfg.edgeEmphasis > 0) {
      const right = cells[i + 1];
      const down = cells[gx < cols - 1 ? i + 1 : i];
      const dx = right ? Math.abs(right.lum - cell.lum) : 0;
      const dy = down ? Math.abs(down.lum - cell.lum) : 0;
      value = clamp01(value + (dx + dy) * (cfg.edgeEmphasis / 100));
    }

    value = clamp01(value + animModifier(cfg, cell.cx, cell.cy, width, height, timeSeconds));

    const color = `rgba(${cell.r | 0}, ${cell.g | 0}, ${cell.b | 0}, 1)`;
    drawCell(ctx, cfg.renderMode, cell, cfg.cellSize, value, color, cfg, i);
  });

  applyColorGrade(ctx, width, height, cfg);
  applyTint(ctx, width, height, cfg);
  applyBlur(ctx, width, height, cfg);
  applyPostFx(ctx, width, height, cfg, timeSeconds);
  applyLights(ctx, width, height, cfg);
  if (cfg.mask.enabled) void applyMask(ctx, width, height, cfg, image);
}
