import { Suspense, use, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { barConfig as C, type Tier } from './barConfig';
import { loadBarAssets } from './barAssets';
import { createBarMaterials } from './barMaterial';
import { Bundle } from './Bundle';
import { Cage } from './Cage';
import { StudioLights } from './StudioLights';
import { story, anchors, pointer, SLICE_X } from './storyState';

const T = new THREE.Vector3(), P = new THREE.Vector3(), V = new THREE.Vector3();
const NEG_X = new THREE.Vector3(-1, 0, 0), POS_X = new THREE.Vector3(1, 0, 0);

/** Camera follows story.cx/cy/cz → tx/ty/tz; portrait screens back off and lift the subject above the text. */
function Rig() {
  const sm = useRef({ x: 0, y: 0 });
  useFrame(({ camera, size }) => {
    const cam = camera as THREE.PerspectiveCamera, s = story;
    sm.current.x += (pointer.x - sm.current.x) * 0.05;
    sm.current.y += (pointer.y - sm.current.y) * 0.05;
    const portrait = size.width < size.height;
    T.set(s.tx, s.ty, s.tz);
    P.set(s.cx, s.cy, s.cz).sub(T).multiplyScalar(portrait ? 1.7 : 1).add(T);
    if (portrait) { const lift = P.distanceTo(T) * 0.1 * s.shift; T.y -= lift; P.y -= lift; }
    P.x += sm.current.x * 0.8 * s.parallax;
    P.y += sm.current.y * 0.5 * s.parallax;
    cam.position.copy(P);
    cam.lookAt(T);
    const film = size.width >= 1024 ? -7 * s.shift : 0;
    if (cam.filmOffset !== film) { cam.filmOffset = film; cam.updateProjectionMatrix(); }
  });
  return null;
}

function StoryBar({ tier, onReady }: { tier: Tier; onReady: () => void }) {
  const a = use(loadBarAssets(tier));
  const group = useRef<THREE.Group>(null!), piece = useRef<THREE.Group>(null!), disc = useRef<THREE.Mesh>(null!);
  const fan = useMemo(() => ({ get value() { return story.fan; } }), []);
  const pieceMat = useMemo(() => createBarMaterials(a.normalMap), [a]);
  const planes = useMemo(() => ({ main: new THREE.Plane(), cut: new THREE.Plane() }), []);

  useLayoutEffect(() => {
    a.bodyMat.clippingPlanes = a.capMat.clippingPlanes = [planes.main];
    pieceMat.body.clippingPlanes = pieceMat.cap.clippingPlanes = [planes.cut];
    onReady();
    return () => { a.bodyMat.clippingPlanes = a.capMat.clippingPlanes = null; };
  }, [a, pieceMat, planes, onReady]);

  useFrame(({ clock, camera, size }) => {
    const t = clock.elapsedTime, g = group.current, s = story;
    g.rotation.set(s.rotX + s.idle * Math.sin(t * 0.35) * 0.5, s.rotY + s.idle * Math.sin(t * 0.2) * 0.18, s.rotZ);
    g.scale.setScalar(Math.max(s.barScale, 1e-3));
    g.visible = s.barScale > 0.002;
    g.updateMatrixWorld();

    // Chapter 4: keep x < SLICE_X on the bar, x > SLICE_X on the piece that lifts away
    const cutting = s.slice > 0.001;
    planes.main.set(NEG_X, cutting ? SLICE_X : 1e3).applyMatrix4(g.matrixWorld);
    piece.current.visible = disc.current.visible = cutting;
    piece.current.position.set(0.6 * s.slice, 2.4 * s.slice, -1.4 * s.slice);
    piece.current.rotation.set(0, 0.5 * s.slice, 0.5 * s.slice);
    piece.current.updateMatrixWorld();
    planes.cut.set(POS_X, -SLICE_X).applyMatrix4(piece.current.matrixWorld);

    // pin HTML callouts to their 3D points
    for (const an of anchors) {
      if (!an.el) continue;
      V.set(...an.p).applyMatrix4(g.matrixWorld).project(camera);
      an.el.style.transform = `translate3d(${((V.x + 1) / 2) * size.width}px, ${((1 - V.y) / 2) * size.height}px, 0)`;
    }
  });

  return (
    <group ref={group}>
      <Bundle tier={tier} fan={fan} />
      {/* caps geometry holds both ends; shifted so its +X end sits on the cut (the −X end hides inside the bar) */}
      <mesh ref={disc} geometry={a.caps} material={a.capMat} position-x={SLICE_X - C.length / 2 - 0.002} />
      <group ref={piece}>
        <mesh geometry={a.body} material={pieceMat.body} />
        <mesh geometry={a.caps} material={pieceMat.cap} />
      </group>
    </group>
  );
}

export default function StoryCanvas({ tier, active, onReady }: { tier: Tier; active: boolean; onReady: () => void }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={[1, 1.5]}
      camera={{ fov: 30, near: 0.1, far: 200, position: [story.cx, story.cy, story.cz] }}
      gl={{ antialias: tier === 'high', powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => { gl.localClippingEnabled = true; }}
      aria-hidden="true"
    >
      <StudioLights />
      <Rig />
      <Suspense fallback={null}>
        <StoryBar tier={tier} onReady={onReady} />
        <Cage tier={tier} />
      </Suspense>
    </Canvas>
  );
}
