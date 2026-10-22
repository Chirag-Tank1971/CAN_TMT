import * as THREE from 'three';
import { barConfig as C } from './barConfig';
import type { BarMaps } from './heightMap';

/** Bilinear height lookup; u wraps (circumference), v clamps (length). */
function sampler({ heights, w, h }: BarMaps) {
  return (u: number, v: number) => {
    const x = (((u * w) % w) + w) % w, y = Math.min(h - 1, Math.max(0, v * (h - 1)));
    const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0;
    const x1 = (x0 + 1) % w, y1 = Math.min(h - 1, y0 + 1);
    const a = heights[y0 * w + x0], b = heights[y0 * w + x1];
    const c = heights[y1 * w + x0], d = heights[y1 * w + x1];
    return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
  };
}

/**
 * Bar along +X, centred on the origin. Vertices are displaced by the height map (true silhouette);
 * normals stay radial because all shading detail comes from the matching normal map.
 */
export function buildBarGeometry(maps: BarMaps, radial: number, segments: number) {
  const height = sampler(maps);
  const row = radial + 1;
  const pos = new Float32Array(row * (segments + 1) * 3);
  const nor = new Float32Array(pos.length);
  const uv = new Float32Array(row * (segments + 1) * 2);

  for (let j = 0; j <= segments; j++) {
    const v = j / segments;
    const x = v * C.length - C.length / 2;
    for (let i = 0; i <= radial; i++) {
      const u = i / radial, t = u * Math.PI * 2;
      const r = C.radius + height(u, v);
      const k = j * row + i;
      pos.set([x, r * Math.cos(t), r * Math.sin(t)], k * 3);
      nor.set([0, Math.cos(t), Math.sin(t)], k * 3);
      uv.set([u, v], k * 2);
    }
  }
  const index: number[] = [];
  for (let j = 0; j < segments; j++)
    for (let i = 0; i < radial; i++) {
      const a = j * row + i, b = a + 1, c = a + row, d = c + 1;
      index.push(a, b, c, b, d, c);
    }

  const body = new THREE.BufferGeometry();
  body.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  body.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  body.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  body.setIndex(index);
  body.computeBoundingSphere();

  return { body, caps: buildCaps(height, radial) };
}

/** Both cut ends as flat fans whose outline follows the ribs at that end. */
function buildCaps(height: (u: number, v: number) => number, radial: number) {
  const pos: number[] = [], nor: number[] = [], uv: number[] = [], index: number[] = [];
  for (const end of [-1, 1]) {
    const x = (end * C.length) / 2, v = end > 0 ? 1 : 0;
    const base = pos.length / 3;
    pos.push(x, 0, 0); nor.push(end, 0, 0); uv.push(0.5, 0.5);
    for (let i = 0; i < radial; i++) {
      const t = (i / radial) * Math.PI * 2, r = C.radius + height(i / radial, v);
      pos.push(x, r * Math.cos(t), r * Math.sin(t));
      nor.push(end, 0, 0);
      uv.push(0.5 + Math.cos(t) * 0.5, 0.5 + Math.sin(t) * 0.5);
    }
    for (let i = 0; i < radial; i++) {
      const p = base + 1 + i, q = base + 1 + ((i + 1) % radial);
      if (end > 0) index.push(base, p, q);
      else index.push(base, q, p);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(index);
  return g;
}
