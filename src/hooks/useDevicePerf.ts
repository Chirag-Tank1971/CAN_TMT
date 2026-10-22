import type { Tier } from '../three/barConfig';

const nav = navigator as Navigator & { deviceMemory?: number };

/** 'low' for phones, small screens and weak hardware: fewer segments, smaller maps, simpler chapter 6. */
export function getTier(): Tier {
  if (new URLSearchParams(location.search).has('low')) return 'low';
  const weak = (nav.hardwareConcurrency ?? 4) <= 4 || (nav.deviceMemory ?? 8) <= 4;
  const phone = matchMedia('(pointer: coarse)').matches || innerWidth < 768;
  return weak || phone ? 'low' : 'high';
}

export const prefersReducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

/** WebGL available at all? Otherwise the static image fallback is shown. */
export function hasWebGL() {
  if (new URLSearchParams(location.search).has('no3d')) return false; // debug: static fallback only
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

export function useDevicePerf() {
  return { tier: getTier(), isLowPower: getTier() === 'low', prefersReducedMotion: prefersReducedMotion() };
}
