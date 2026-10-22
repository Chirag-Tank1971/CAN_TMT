import { use } from 'react';
import type { ThreeElements } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { barConfig as C, type Tier } from './barConfig';
import { loadBarAssets } from './barAssets';

type BarProps = ThreeElements['group'] & { tier: Tier };

/** One bar. Uses the procedural geometry, or the GLB at barConfig.MODEL_URL when set. */
export function Bar({ tier, ...props }: BarProps) {
  return <group {...props}>{C.MODEL_URL ? <ModelBar /> : <ProceduralBar tier={tier} />}</group>;
}

function ProceduralBar({ tier }: { tier: Tier }) {
  const a = use(loadBarAssets(tier));
  return (
    <>
      <mesh geometry={a.body} material={a.bodyMat} />
      <mesh geometry={a.caps} material={a.capMat} />
    </>
  );
}

/** Scanned model: scaled so its longest side matches the procedural bar length, centred on the origin. */
function ModelBar() {
  const { scene } = useGLTF(C.MODEL_URL);
  const box = new THREE.Box3().setFromObject(scene);
  const size = box.getSize(new THREE.Vector3());
  const s = C.length / Math.max(size.x, size.y, size.z);
  const center = box.getCenter(new THREE.Vector3());
  return <primitive object={scene} scale={s} position={center.multiplyScalar(-s)} />;
}
