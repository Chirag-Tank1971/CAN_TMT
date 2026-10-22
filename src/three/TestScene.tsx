import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Bar } from './Bar';
import { Bundle } from './Bundle';
import { StudioLights } from './StudioLights';
import { barUniforms } from './barMaterial';
import { getTier } from '../hooks/useDevicePerf';

const fan = { value: 1 };
const VIEWS = {
  closeup: { position: [-0.4, 0.9, 4.6], target: [0.6, 0, 0] },
  end: { position: [8.8, 0.5, 1.4], target: [7, 0, 0] },
  bundle: { position: [0, 2, 19], target: [0, 0, 0] },
} as const;

/** Dev-only material/shape lab at /?test (add &low to see the low tier). */
export default function TestScene() {
  const tier = getTier();
  const [view, setView] = useState<keyof typeof VIEWS>(() => (new URLSearchParams(location.search).get('view') as keyof typeof VIEWS) || 'closeup');
  const [, force] = useState(0);
  const slider = (key: 'uMix' | 'uBend' | 'uSection' | 'uHeat') => (
    <label key={key} className="flex items-center gap-2">
      <span className="w-20">{key}</span>
      <input type="range" min={0} max={1} step={0.01} defaultValue={barUniforms[key].value}
        onChange={(e) => { barUniforms[key].value = +e.target.value; force((n) => n + 1); }} />
    </label>
  );
  const v = VIEWS[view];
  const params = new URLSearchParams(location.search);
  for (const k of ['uMix', 'uBend', 'uSection', 'uHeat'] as const) if (params.has(k)) barUniforms[k].value = +params.get(k)!;

  return (
    <div className="fixed inset-0 bg-paper">
      <Canvas key={view} camera={{ position: [...v.position], fov: 35 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#0E0E10']} />
        <StudioLights />
        <Suspense fallback={null}>
          {view === 'bundle' ? <Bundle tier={tier} fan={fan} /> : <Bar tier={tier} />}
        </Suspense>
        <OrbitControls target={[...v.target]} />
      </Canvas>
      <div className="absolute top-4 left-4 space-y-2 text-xs text-steel-200 bg-black/60 p-3 font-inter">
        <div>tier: {tier}</div>
        <div className="flex gap-2">
          {Object.keys(VIEWS).map((k) => (
            <button key={k} className={`px-2 py-1 border ${k === view ? 'border-orange-400' : 'border-steel-600'}`} onClick={() => setView(k as keyof typeof VIEWS)}>{k}</button>
          ))}
        </div>
        {(['uMix', 'uBend', 'uSection', 'uHeat'] as const).map(slider)}
        <label className="flex items-center gap-2">
          <span className="w-20">fan</span>
          <input type="range" min={0} max={1} step={0.01} defaultValue={1} onChange={(e) => (fan.value = +e.target.value)} />
        </label>
      </div>
    </div>
  );
}
