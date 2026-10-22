import { useLayoutEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { Tier } from './barConfig';
import { story } from './storyState';

/**
 * Chapter 6: bars fly out of the hero bar and assemble into a reinforced concrete frame
 * (columns + beams with stirrups), then house outline and floor slabs fade in.
 */
const BASE_Y = -6;
const FLOOR = 4.5;
const XS = [-7, 0, 7], ZS = [-4.5, 4.5];

type Item = { pos: THREE.Vector3; quat: THREE.Quaternion; scale: THREE.Vector3; delay: number };

const Q_Y = new THREE.Quaternion(); // vertical (geometry default axis)
const Q_X = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, Math.PI / 2));
const Q_Z = new THREE.Quaternion().setFromEuler(new THREE.Euler(Math.PI / 2, 0, 0));

function layout(tier: Tier) {
  const floors = tier === 'low' ? 1 : 2;
  const H = floors * FLOOR;
  const step = tier === 'low' ? 1.2 : 0.6;
  const bars: Item[] = [], rings: Item[] = [];
  const r = 0.07, off = 0.24;

  // columns: 4 bars + horizontal stirrups
  XS.forEach((x, ci) => ZS.forEach((z) => {
    const d = ci * 0.04;
    for (const [dx, dz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]])
      bars.push({ pos: new THREE.Vector3(x + dx * off, BASE_Y + H / 2, z + dz * off), quat: Q_Y, scale: new THREE.Vector3(r, H + 0.6, r), delay: d });
    for (let y = 0.3; y < H; y += step)
      rings.push({ pos: new THREE.Vector3(x, BASE_Y + y, z), quat: Q_Y, scale: new THREE.Vector3(off * 2.3, 1, off * 2.3), delay: 0.25 + y / H * 0.25 });
  }));

  // beams at each floor level: along X between columns, along Z at each column line
  for (let f = 1; f <= floors; f++) {
    const y = BASE_Y + f * FLOOR - 0.25;
    const spans: [THREE.Vector3, THREE.Vector3, 'x' | 'z'][] = [];
    for (const z of ZS) for (let i = 0; i < XS.length - 1; i++) spans.push([new THREE.Vector3(XS[i], y, z), new THREE.Vector3(XS[i + 1], y, z), 'x']);
    for (const x of XS) spans.push([new THREE.Vector3(x, y, ZS[0]), new THREE.Vector3(x, y, ZS[1]), 'z']);
    spans.forEach(([a, b, axis], si) => {
      const mid = a.clone().add(b).multiplyScalar(0.5), len = a.distanceTo(b) + 0.5;
      const d = 0.35 + f * 0.12 + si * 0.012;
      for (const [dy, dw] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
        const p = mid.clone().add(new THREE.Vector3(axis === 'z' ? dw * off * 0.8 : 0, dy * off * 0.8, axis === 'x' ? dw * off * 0.8 : 0));
        bars.push({ pos: p, quat: axis === 'x' ? Q_X : Q_Z, scale: new THREE.Vector3(r * 0.9, len, r * 0.9), delay: d });
      }
      for (let t = 0.5; t < len - 0.5; t += step * 1.2) {
        const p = a.clone().lerp(b, (t - 0.25) / (len - 0.5));
        rings.push({ pos: p, quat: axis === 'x' ? Q_X : Q_Z, scale: new THREE.Vector3(off * 1.9, 1, off * 1.9), delay: d + 0.15 + t / len * 0.12 });
      }
    });
  }
  return { bars, rings, H };
}

/** Closed square tube in the XZ plane, unit size; scaled per instance. */
function ringGeometry() {
  // two points per corner → straight sides with tight rounded bends
  const pts = [[-0.42, -0.5], [0.42, -0.5], [0.5, -0.42], [0.5, 0.42], [0.42, 0.5], [-0.42, 0.5], [-0.5, 0.42], [-0.5, -0.42]]
    .map(([x, z]) => new THREE.Vector3(x, 0, z));
  const path = new THREE.CatmullRomCurve3(pts, true, 'centripetal');
  return new THREE.TubeGeometry(path, 32, 0.045, 5, true);
}

const SRC = new THREE.Vector3(0, 0, 0), SRC_Q = Q_X, ZERO = new THREE.Vector3(0.001, 0.001, 0.001);
const m = new THREE.Matrix4(), p = new THREE.Vector3(), q = new THREE.Quaternion(), s = new THREE.Vector3();
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

export function Cage({ tier }: { tier: Tier }) {
  const { bars, rings, H } = useMemo(() => layout(tier), [tier]);
  const barGeo = useMemo(() => new THREE.CylinderGeometry(1, 1, 1, 8, 1), []);
  const ringGeo = useMemo(ringGeometry, []);
  const mat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#5b5f66', metalness: 0.85, roughness: 0.38, envMapIntensity: 1.1 }), []);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ color: '#FF6A00', transparent: true, opacity: 0 }), []);
  const slabMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#8e99a4', transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }), []);
  const barRef = useRef<THREE.InstancedMesh>(null!), ringRef = useRef<THREE.InstancedMesh>(null!), group = useRef<THREE.Group>(null!);
  const last = useRef(-1);

  // House outline: frame box + gable roof
  const lines = useMemo(() => {
    const x0 = XS[0] - 0.6, x1 = XS[2] + 0.6, z0 = ZS[0] - 0.6, z1 = ZS[1] + 0.6, y0 = BASE_Y, y1 = BASE_Y + H, yr = y1 + 3.2;
    const v = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
    const seg: THREE.Vector3[] = [];
    const quad = (a: THREE.Vector3, b: THREE.Vector3, c: THREE.Vector3, d: THREE.Vector3) => seg.push(a, b, b, c, c, d, d, a);
    quad(v(x0, y0, z0), v(x1, y0, z0), v(x1, y0, z1), v(x0, y0, z1));
    quad(v(x0, y1, z0), v(x1, y1, z0), v(x1, y1, z1), v(x0, y1, z1));
    for (const [x, z] of [[x0, z0], [x1, z0], [x1, z1], [x0, z1]]) seg.push(v(x, y0, z), v(x, y1, z));
    seg.push(v(x0, y1, z0), v(x0, yr, 0), v(x0, yr, 0), v(x0, y1, z1), v(x1, y1, z0), v(x1, yr, 0), v(x1, yr, 0), v(x1, y1, z1), v(x0, yr, 0), v(x1, yr, 0));
    return new THREE.BufferGeometry().setFromPoints(seg);
  }, [H]);
  const slabs = useMemo(() => Array.from({ length: H / FLOOR }, (_, i) => BASE_Y + (i + 1) * FLOOR), [H]);

  const update = () => {
    const c = story.cage;
    group.current.visible = c > 0.001;
    lineMat.opacity = story.house * 0.85;
    slabMat.opacity = story.house * 0.07;
    if (c === last.current) return;
    last.current = c;
    for (const [mesh, items] of [[barRef.current, bars], [ringRef.current, rings]] as const) {
      items.forEach((it, i) => {
        const t = ease(Math.min(1, Math.max(0, (c - it.delay * 0.8) / 0.22)));
        if (t <= 0) m.compose(SRC, SRC_Q, ZERO);
        else {
          p.lerpVectors(SRC, it.pos, t);
          p.y += Math.sin(t * Math.PI) * 1.5; // arc in, like being lifted into place
          q.slerpQuaternions(SRC_Q, it.quat, t);
          s.lerpVectors(ZERO, it.scale, Math.min(1, t * 1.6));
          m.compose(p, q, s);
        }
        mesh.setMatrixAt(i, m);
      });
      mesh.instanceMatrix.needsUpdate = true;
    }
  };
  useLayoutEffect(update);
  useFrame(update);

  return (
    <group ref={group}>
      <instancedMesh ref={barRef} args={[barGeo, mat, bars.length]} frustumCulled={false} />
      <instancedMesh ref={ringRef} args={[ringGeo, mat, rings.length]} frustumCulled={false} />
      <lineSegments geometry={lines} material={lineMat} />
      {slabs.map((y) => (
        <mesh key={y} position={[0, y, 0]} rotation-x={-Math.PI / 2} material={slabMat}>
          <planeGeometry args={[XS[2] - XS[0] + 1.2, ZS[1] - ZS[0] + 1.2]} />
        </mesh>
      ))}
    </group>
  );
}
