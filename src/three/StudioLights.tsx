import { Environment, Lightformer } from '@react-three/drei';

/** Procedural studio environment (no HDR download) with a warm molten-orange rim behind the subject. */
export function StudioLights() {
  return (
    <>
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={2.2} position={[0, 6, 1]} rotation-x={Math.PI / 2} scale={[14, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[-7, 1, 3]} rotation-y={Math.PI / 2.5} scale={[10, 2, 1]} />
        <Lightformer form="rect" intensity={0.8} position={[7, -1, 4]} rotation-y={-Math.PI / 2.5} scale={[10, 1.5, 1]} />
        <Lightformer form="rect" intensity={3} color="#FF6A00" position={[0, -1.5, -9]} scale={[7, 1.2, 1]} />
        <Lightformer form="ring" intensity={2.5} position={[6, 3, -5]} scale={3} />
        {/* softboxes beyond each end so the machined cut faces read bright silver */}
        <Lightformer form="rect" intensity={3} position={[14, 0, -2]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={3} position={[-14, 0, -2]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
      <directionalLight position={[3, 5, 6]} intensity={1.6} color="#f2efe9" />
      <directionalLight position={[-4, 1, -6]} intensity={2.4} color="#FF6A00" />
      <ambientLight intensity={0.08} />
    </>
  );
}
