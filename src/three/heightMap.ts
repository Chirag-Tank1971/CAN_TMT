import * as THREE from 'three';
import { barConfig as C } from './barConfig';

/**
 * The bar surface unwrapped onto a canvas: x = around the circumference (s), y = along the bar (z).
 * Both axes share one scale (k px per unit) so shapes keep their real proportions.
 */
export interface BarMaps {
  heights: Float32Array; // world-unit height above the core, w*h
  w: number;
  h: number;
  normalMap: THREE.DataTexture; // rgb = tangent-space normal, a = cavity (drives rust)
}

const CIRC = 2 * Math.PI * C.radius;

// ponytail: yields between phases split one long main-thread task into several (smoother scroll on phones).
// Upgrade to an OffscreenCanvas worker if generation still shows up as jank on low-end devices.
const yieldToMain = () => new Promise<void>((r) => setTimeout(r, 0));

/** Separable box blur, run twice (≈ gaussian). Wraps around the circumference, clamps along the length. */
function blur(src: Float32Array, w: number, h: number, r: number) {
  r = Math.max(1, Math.round(r));
  let a = src.slice();
  const b = new Float32Array(src.length);
  const n = 2 * r + 1;
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 0; y < h; y++) {
      const row = y * w;
      let sum = 0;
      for (let x = -r; x <= r; x++) sum += a[row + ((x % w) + w) % w];
      for (let x = 0; x < w; x++) {
        b[row + x] = sum / n;
        sum += a[row + (x + r + 1) % w] - a[row + ((x - r) % w + w) % w];
      }
    }
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let y = -r; y <= r; y++) sum += b[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = sum / n;
        sum += b[Math.min(h - 1, y + r + 1) * w + x] - b[Math.max(0, y - r) * w + x];
      }
    }
  }
  return a;
}

function canvasToFloat(ctx: CanvasRenderingContext2D, w: number, h: number) {
  const px = ctx.getImageData(0, 0, w, h).data;
  const out = new Float32Array(w * h);
  for (let i = 0; i < out.length; i++) out[i] = px[i * 4] / 255;
  return out;
}

function newCanvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d', { willReadFrequently: true })!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  return ctx;
}

export async function buildBarMaps(mapW: number): Promise<BarMaps> {
  await document.fonts.load(C.embossFont.replace('1px', '40px')).catch(() => {});

  const k = mapW / CIRC;
  const w = mapW;
  const h = Math.round(C.length * k);

  // ── Emboss bands: lettering + square mark, measured first so ribs can leave room
  const fontPx = (C.embossSize * k) / 0.7; // cap height ≈ 0.7em
  const font = C.embossFont.replace('1px', `${fontPx}px`);
  const text = newCanvas(w, h);
  text.font = font;
  const markPx = C.embossSize * 1.15 * k;
  const gapPx = 0.25 * k;
  const bandPx = markPx + gapPx + text.measureText(C.embossText).width;
  const bands: [number, number][] = [];
  for (let zc = C.embossEvery / 2; zc < C.length; zc += C.embossEvery) {
    const z0 = zc * k - bandPx / 2;
    bands.push([z0 / k - 0.15, (z0 + bandPx) / k + 0.15]);
    // Glyph "up" points to -s and the baseline runs along +z so the text reads left→right
    // when the bar lies along +X with this face toward the camera (the transform mirrors canvas space on purpose).
    text.setTransform(0, 1, 1, 0, (CIRC / 4) * k, z0);
    text.fillStyle = '#fff';
    text.strokeStyle = '#fff';
    text.lineWidth = 0.075 * k;
    const lw = text.lineWidth;
    text.strokeRect(lw / 2, -markPx / 2 + lw / 2, markPx - lw, markPx - lw);
    text.font = font.replace(`${fontPx}px`, `${fontPx * 0.62}px`);
    text.textAlign = 'center';
    text.textBaseline = 'middle';
    text.fillText('C', markPx / 2, fontPx * 0.03);
    text.font = font;
    text.textAlign = 'left';
    text.fillText(C.embossText, markPx + gapPx, fontPx * 0.04);
  }

  // ── Ribs
  const ribs = newCanvas(w, h);
  ribs.setTransform(k, 0, 0, k, 0, 0);
  ribs.fillStyle = `rgb(${(255 * C.longRibHeight) / C.ribHeight | 0},0,0)`;
  for (const s of [0, CIRC / 2, CIRC]) ribs.fillRect(s - C.longRibWidth / 2, 0, C.longRibWidth, C.length);

  ribs.fillStyle = '#fff';
  const cot = 1 / Math.tan((C.ribAngle * Math.PI) / 180);
  for (const face of [0, 1]) {
    const s0 = (face * CIRC) / 2 + C.ribGap;
    const s1 = ((face + 1) * CIRC) / 2 - C.ribGap;
    const dz = (face ? -1 : 1) * cot * (s1 - s0);
    const len = Math.hypot(s1 - s0, dz);
    const nx = -dz / len, ny = (s1 - s0) / len;
    for (let z0 = -2 + face * C.ribSpacing / 2; z0 < C.length + 2; z0 += C.ribSpacing) {
      const lo = Math.min(z0, z0 + dz) - C.ribWidth, hi = Math.max(z0, z0 + dz) + C.ribWidth;
      if (face === 0 && bands.some(([a, b]) => hi > a && lo < b)) continue;
      const N = 28;
      const top: [number, number][] = [], bot: [number, number][] = [];
      for (let i = 0; i <= N; i++) {
        const t = i / N;
        const bow = C.ribBow * Math.sin(Math.PI * t);
        const half = (C.ribWidth / 2) * Math.pow(Math.sin(Math.PI * t), 0.7);
        const cx = s0 + (s1 - s0) * t + nx * bow, cy = z0 + dz * t + ny * bow;
        top.push([cx + nx * half, cy + ny * half]);
        bot.push([cx - nx * half, cy - ny * half]);
      }
      ribs.beginPath();
      [...top, ...bot.reverse()].forEach(([x, y], i) => (i ? ribs.lineTo(x, y) : ribs.moveTo(x, y)));
      ribs.fill();
    }
  }

  await yieldToMain();
  const ribH = blur(canvasToFloat(ribs, w, h), w, h, C.ribWidth * 0.22 * k);
  await yieldToMain();
  const txtH = blur(canvasToFloat(text, w, h), w, h, 0.01 * k);
  const heights = new Float32Array(w * h);
  for (let i = 0; i < heights.length; i++) heights[i] = ribH[i] * C.ribHeight + txtH[i] * C.embossHeight;

  // ── Normal map (rgb) + cavity (a): cavity = how far a pixel sits below its blurred surroundings
  await yieldToMain();
  const wide = blur(heights, w, h, 0.05 * k);
  await yieldToMain();
  const data = new Uint8Array(w * h * 4);
  const step = 2 / k;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = y * w + x;
      const dx = (heights[y * w + (x + 1) % w] - heights[y * w + (x - 1 + w) % w]) / step;
      const dy = (heights[Math.min(h - 1, y + 1) * w + x] - heights[Math.max(0, y - 1) * w + x]) / step;
      const inv = 1 / Math.hypot(dx, dy, 1);
      data[i * 4] = (-dx * inv * 0.5 + 0.5) * 255;
      data[i * 4 + 1] = (-dy * inv * 0.5 + 0.5) * 255;
      data[i * 4 + 2] = (inv * 0.5 + 0.5) * 255;
      data[i * 4 + 3] = Math.min(1, Math.max(0, (wide[i] - heights[i]) / (C.ribHeight * 0.3))) * 255;
    }
  }
  const normalMap = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.magFilter = THREE.LinearFilter;
  normalMap.minFilter = THREE.LinearMipmapLinearFilter;
  normalMap.generateMipmaps = true;
  normalMap.anisotropy = 8;
  normalMap.needsUpdate = true;

  return { heights, w, h, normalMap };
}
