import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TMTRodProps {
  diameterMm?: number;       // display diameter in mm (8-32)
  isLowPerf?: boolean;
  scrollPhase?: number;      // 0-1 overall scroll progress
}

/**
 * Procedural TMT rebar geometry:
 * - Main cylinder (brushed dark steel)
 * - 2 longitudinal ribs (extruded boxes)
 * - Angled transverse ribs (like IS 1786 pattern)
 * - Rim light: warm orange point light behind camera
 */
export function TMTRod({ diameterMm = 20, isLowPerf = false, scrollPhase = 0 }: TMTRodProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const mainMatRef = useRef<THREE.MeshStandardMaterial>(null!);

  const scale = (diameterMm / 20) * 0.5;
  const ribCount = isLowPerf ? 8 : 14;

  // Build transverse rib geometries once
  const transRibGeo = useMemo(() => {
    const ribGeos: THREE.BoxGeometry[] = [];
    for (let i = 0; i < ribCount; i++) {
      ribGeos.push(new THREE.BoxGeometry(0.18, 0.06, 0.52));
    }
    return ribGeos;
  }, [ribCount]);

  // Animate: float + rotate in hero, tilt in features, color-shift in process
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    if (scrollPhase < 0.2) {
      // Hero: float + slow Y rotation
      groupRef.current.rotation.y += 0.004;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    } else if (scrollPhase < 0.4) {
      // Why section: tilt
      const phaseProg = (scrollPhase - 0.2) / 0.2;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(0, Math.PI * 0.18, phaseProg);
      groupRef.current.position.x = THREE.MathUtils.lerp(0, 1.2, phaseProg);
      groupRef.current.position.y = 0;
    } else if (scrollPhase < 0.6) {
      // Cross-section: align for reveal
      groupRef.current.rotation.z = Math.PI * 0.18;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.3, (scrollPhase - 0.4) / 0.2);
      groupRef.current.position.x = 0;
    } else if (scrollPhase < 0.8) {
      // Heat & quench: color shift orange → steel
      const heatProg = (scrollPhase - 0.6) / 0.2;
      if (mainMatRef.current) {
        mainMatRef.current.emissive.setRGB(
          THREE.MathUtils.lerp(0.8, 0, heatProg),
          THREE.MathUtils.lerp(0.15, 0, heatProg),
          THREE.MathUtils.lerp(0, 0, heatProg),
        );
        mainMatRef.current.roughness = THREE.MathUtils.lerp(0.3, 0.55, heatProg);
      }
      groupRef.current.rotation.z = 0;
      groupRef.current.rotation.x = 0;
    } else {
      // Products: steady
      groupRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      {/* Main cylinder */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 4.5, isLowPerf ? 16 : 32]} />
        <meshStandardMaterial
          ref={mainMatRef}
          color="#2c3038"
          roughness={0.55}
          metalness={0.85}
          envMapIntensity={1.2}
        />
      </mesh>

      {/* Longitudinal rib A */}
      <mesh position={[0.52, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 4.5, 0.12]} />
        <meshStandardMaterial color="#1e2226" roughness={0.6} metalness={0.8} />
      </mesh>

      {/* Longitudinal rib B */}
      <mesh position={[-0.52, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 4.5, 0.12]} />
        <meshStandardMaterial color="#1e2226" roughness={0.6} metalness={0.8} />
      </mesh>

      {/* Transverse ribs */}
      {transRibGeo.map((geo, i) => {
        const yPos = -2.0 + (i / (ribCount - 1)) * 4.0;
        const angle = (i % 2 === 0 ? 1 : -1) * 0.45; // alternate lean like real TMT
        return (
          <mesh key={i} position={[0, yPos, 0.5]} rotation={[0, 0, angle]} castShadow>
            <primitive object={geo} attach="geometry" />
            <meshStandardMaterial color="#1e2226" roughness={0.6} metalness={0.8} />
          </mesh>
        );
      })}

      {/* Orange rim light (warm highlight) */}
      <pointLight position={[-3, 2, -2]} color="#FF6A00" intensity={3} distance={8} />
    </group>
  );
}
