import { barConfig as C, type Tier } from './barConfig';
import { buildBarMaps } from './heightMap';
import { buildBarGeometry } from './barGeometry';
import { createBarMaterials } from './barMaterial';

export type BarAssets = Awaited<ReturnType<typeof build>>;

async function build(tier: Tier) {
  const t = C.tiers[tier];
  const t0 = performance.now();
  const maps = await buildBarMaps(t.mapW);
  const { body, caps } = buildBarGeometry(maps, t.radial, t.segments);
  if (import.meta.env.DEV) console.info(`[bar] ${tier} tier built in ${Math.round(performance.now() - t0)}ms (${maps.w}×${maps.h} map)`);
  const mat = createBarMaterials(maps.normalMap);
  return { body, caps, bodyMat: mat.body, capMat: mat.cap, normalMap: maps.normalMap };
}

const cache = new Map<Tier, Promise<BarAssets>>();
/** Built once per tier and shared by every bar on the page; read it with React's use() inside <Suspense>. */
export const loadBarAssets = (tier: Tier) => {
  if (!cache.has(tier)) cache.set(tier, build(tier));
  return cache.get(tier)!;
};
