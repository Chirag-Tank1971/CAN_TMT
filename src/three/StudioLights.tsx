import { Environment, Lightformer } from '@react-three/drei';

/**
 * Bright daylight studio for the white theme (no HDR download). Polished steel is a mirror, so the
 * environment's base colour is what the bars "are": a light cool grey reads as clean silver on a white page.
 * Orange is kept to one faint strip so edges pick up a hint of brand colour without glowing.
 */
export function StudioLights() {
  return (
    <>
      <Environment resolution={256} frames={1}>
        <color attach="background" args={['#7f8a96']} />
        <Lightformer form="rect" intensity={3} position={[0, 7, 1]} rotation-x={Math.PI / 2} scale={[16, 4, 1]} />
        <Lightformer form="rect" intensity={1.6} position={[-7, 1, 4]} rotation-y={Math.PI / 2.5} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.2} position={[7, -1, 4]} rotation-y={-Math.PI / 2.5} scale={[12, 2, 1]} />
        {/* dark floor strip: gives the chrome a crisp dark band so ribs and lettering keep their contrast */}
        <Lightformer form="rect" intensity={2} color="#1d2228" position={[0, -6, 0]} rotation-x={-Math.PI / 2} scale={[30, 6, 1]} />
        <Lightformer form="rect" intensity={0.6} color="#FF6A00" position={[0, -1.5, -9]} scale={[6, 0.8, 1]} />
        {/* softboxes beyond each end so the machined cut faces read bright silver */}
        <Lightformer form="rect" intensity={3} position={[14, 0, -2]} rotation-y={-Math.PI / 2} scale={[8, 8, 1]} />
        <Lightformer form="rect" intensity={3} position={[-14, 0, -2]} rotation-y={Math.PI / 2} scale={[8, 8, 1]} />
      </Environment>
      <directionalLight position={[3, 5, 6]} intensity={1.4} color="#ffffff" />
      <directionalLight position={[-4, 2, -6]} intensity={0.8} color="#dfe6ee" />
      <ambientLight intensity={0.1} />
    </>
  );
}
