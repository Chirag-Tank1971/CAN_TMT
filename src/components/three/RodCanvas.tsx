import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import { TMTRod } from './TMTRod';

interface RodCanvasProps {
  scrollPhase: number;
  isLowPerf: boolean;
  mouseX?: number;
  mouseY?: number;
  diameterMm?: number;
}

function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();
  useFrame(() => {
    // Gentle parallax tilt based on mouse
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX * 0.8, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouseY * 0.5 + 0.5, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function EmberParticles({ active }: { active: boolean }) {
  const particlesRef = useRef<THREE.Points>(null!);
  const count = 80;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 2] = -1 + Math.random() * 0.5;
  }

  useFrame((state) => {
    if (!particlesRef.current || !active) return;
    const t = state.clock.elapsedTime;
    const pos = particlesRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.008;
      if (pos[i * 3 + 1] > 2.5) {
        pos[i * 3 + 1] = -2.5;
        pos[i * 3] = (Math.random() - 0.5) * 2.5;
      }
    }
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    (particlesRef.current.material as THREE.PointsMaterial).opacity = Math.max(0, Math.sin(t * 0.3) * 0.4 + 0.5);
  });

  if (!active) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#FF6A00"
        size={0.04}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export function RodCanvas({
  scrollPhase,
  isLowPerf,
  mouseX = 0,
  mouseY = 0,
  diameterMm = 20,
}: RodCanvasProps) {
  const showEmbers = scrollPhase < 0.2;

  return (
    <Canvas
      camera={{ position: [0, 0.5, 5], fov: 42 }}
      shadows={!isLowPerf}
      dpr={isLowPerf ? [1, 1] : [1, 2]}
      gl={{ antialias: !isLowPerf, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      aria-hidden="true"
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      {/* Ambient + directional */}
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.4}
        color="#e8eaed"
        castShadow={!isLowPerf}
      />
      <directionalLight position={[-4, -2, 2]} intensity={0.4} color="#FF6A00" />

      {/* Environment for metallic reflections */}
      <Environment preset="night" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />

      <Suspense fallback={null}>
        <TMTRod diameterMm={diameterMm} isLowPerf={isLowPerf} scrollPhase={scrollPhase} />
        <EmberParticles active={showEmbers} />
      </Suspense>
    </Canvas>
  );
}
