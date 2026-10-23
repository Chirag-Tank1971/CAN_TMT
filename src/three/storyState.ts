import { barConfig as C } from './barConfig';

/** Chapter start times on the story timeline, which runs from 0 to STORY_END. */
export const STARTS = [0, 0.14, 0.3, 0.46, 0.62, 0.78, 1.0];
export const STORY_END = 1.22;
/** The same starts as 0–1 scroll progress of the pinned story (end = next start, last ends at 1). */
export const CHAPTERS = STARTS.map((t) => t / STORY_END);

/** Plain mutable object: GSAP tweens it, useFrame reads it. Initial values = chapter 1 pose. */
export const story = {
  // camera position / look-at target (world), horizontal film shift (desktop: pushes subject right of the text)
  cx: 0, cy: 2.8, cz: 31, tx: -2,  ty: 0, tz: 0, shift: 1,
  // bar group rotation + scale, idle sway amount (chapter 1 only)
  rotX: -0.4, rotY: 0, rotZ: 0.08, barScale: 1, idle: 1,
  fan: 1,          // bundle splay 1 → single bar 0
  slice: 0,        // cross-section opening 0 → 1
  cage: 0,         // rebar cage assembly 0 → 1
  house: 0,        // house frame lines/slabs 0 → 1
  parallax: 1,
  px: 2,           // portrait only: sideways recentre (desktop framing leaves room for text on the left)
};

/** Where the bar is cut in chapter 4 (local X). */
export const SLICE_X = C.length / 2 - 0.9;

/** HTML callouts pinned to points on the bar (local coordinates of the bar group). Elements register on mount. */
export const anchors: { id: string; p: [number, number, number]; el: HTMLElement | null }[] = [
  { id: 'ribs', p: [4.6, 0.12, 0.55], el: null },
  { id: 'longRib', p: [3.4, 0.54, 0.02], el: null },
  { id: 'mark', p: [1.1, -0.05, 0.53], el: null },
  { id: 'ring', p: [SLICE_X, 0.44, 0.08], el: null },
  { id: 'core', p: [SLICE_X, -0.05, 0.12], el: null },
];

/** Pointer position −1…1 for parallax (desktop only), written by Story. */
export const pointer = { x: 0, y: 0 };
