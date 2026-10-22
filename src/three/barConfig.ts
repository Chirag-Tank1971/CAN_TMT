/**
 * Every knob for the procedural TMT bar. Units: 1 = bar diameter.
 * Change values here and reload — geometry, height map and normal map all regenerate.
 */
export const barConfig = {
  radius: 0.5,
  length: 14,

  // Transverse ribs (crescent shaped, alternate tilt on the two faces)
  ribAngle: 58,        // degrees between rib and bar axis (90 = ring around the bar)
  ribSpacing: 0.5,     // distance between ribs along the bar, per face
  ribHeight: 0.065,    // how far a rib stands out from the core
  ribWidth: 0.13,      // rib width at its middle (tapers to 0 at the ends)
  ribBow: 0.06,        // crescent curvature
  ribGap: 0.16,        // clear space (along the circumference) beside each longitudinal rib

  // Longitudinal ribs (two, at top and bottom)
  longRibHeight: 0.03,
  longRibWidth: 0.07,

  // Embossed lettering + mark, repeated along the bar on one face
  embossText: 'CAN TMT',
  embossEvery: 6,      // one band every N units along the bar
  embossHeight: 0.03,
  embossFont: '800 1px "Barlow Condensed", "Arial Narrow", sans-serif',
  embossSize: 0.44,    // letter height

  // Resolution per device tier
  tiers: {
    high: { radial: 128, segments: 1100, mapW: 768 },
    low: { radial: 48, segments: 420, mapW: 384 },
  },

  // Set to e.g. '/models/bar.glb' to use a scanned model instead (see README).
  MODEL_URL: '' as string,
};

export type Tier = keyof typeof barConfig.tiers;
