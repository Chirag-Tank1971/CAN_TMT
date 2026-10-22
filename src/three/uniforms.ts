import { barConfig as C } from './barConfig';

/**
 * Shared by every bar material; the scroll timeline writes these directly (no React re-render).
 * Kept free of `three` imports so the page can drive them without pulling three.js into the main bundle.
 */
export const barUniforms = {
  uMix: { value: 0 },     // 0 = polished new steel, 1 = mill-scale + rust
  uBend: { value: 0 },    // 0 = straight, 1 = full arc
  uSection: { value: 0 }, // caps: 0 = machined cut end, 1 = etched cross-section
  uHeat: { value: 0 },    // caps: glow of the still-hot core
  uLength: { value: C.length },
};
