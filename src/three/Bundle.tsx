import { use, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { barConfig as C, type Tier } from './barConfig';
import { loadBarAssets } from './barAssets';

const COUNT = 5;
const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), p = new THREE.Vector3(), s = new THREE.Vector3(1, 1, 1);
const PIVOT = new THREE.Vector3(-C.length * 0.42, 0, 0);

/** Instance i's matrix for fan 0 (all on the centre bar) … 1 (bars splayed from a common point near the left end). */
function fanMatrix(i: number, fan: number) {
  const k = i - (COUNT - 1) / 2;
  e.set(k * 0.9 * fan, -k * 0.06 * fan, k * 0.06 * fan); // twist (shows ribs at different angles), depth, spread
  q.setFromEuler(e);
  p.copy(PIVOT).sub(PIVOT.clone().applyQuaternion(q));
  p.y += k * 1.04 * fan; // touching at the pivot, splayed at the far end
  p.z -= Math.abs(k) * 0.3 * fan;
  return m.compose(p, q, s);
}

/** Fanned bundle of bars, one draw call each for body and caps. `fan` is read every frame. */
export function Bundle({ tier, fan }: { tier: Tier; fan: { value: number } }) {
  const a = use(loadBarAssets(tier));
  const body = useRef<THREE.InstancedMesh>(null!);
  const caps = useRef<THREE.InstancedMesh>(null!);
  const last = useRef(-1);

  const update = () => {
    if (fan.value === last.current) return;
    last.current = fan.value;
    // collapsed: draw only the centre bar (others would z-fight on top of it)
    const n = fan.value < 0.002 ? 1 : COUNT;
    for (const mesh of [body.current, caps.current]) {
      mesh.count = n;
      for (let i = 0; i < n; i++) mesh.setMatrixAt(i, fanMatrix(n === 1 ? (COUNT - 1) / 2 : i, fan.value));
      mesh.instanceMatrix.needsUpdate = true;
      mesh.computeBoundingSphere();
    }
  };
  useLayoutEffect(update);
  useFrame(update);

  return (
    <group>
      <instancedMesh ref={body} args={[a.body, a.bodyMat, COUNT]} frustumCulled={false} />
      <instancedMesh ref={caps} args={[a.caps, a.capMat, COUNT]} frustumCulled={false} />
    </group>
  );
}
