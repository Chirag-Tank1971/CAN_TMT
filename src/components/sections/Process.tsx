import { useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLang } from '../../lib/LangContext';
import { prefersReducedMotion } from '../../hooks/useDevicePerf';

gsap.registerPlugin(ScrollTrigger);

// Heat states: [skin, core, glow strength]. Hot bar → quenched skin → self-tempered → cooled steel.
const HOT = { '--skin': '#ffd27a', '--core': '#ffb347', '--glow': 1, '--water': 0, '--embers': 1 };
const STATES = [
  { '--skin': '#2a2e34', '--core': '#ff8a1f', '--glow': 0.75, '--water': 1, '--embers': 0.5 },
  { '--skin': '#6e3b1f', '--core': '#e2561a', '--glow': 0.45, '--water': 0, '--embers': 0.15 },
  { '--skin': '#3b4047', '--core': '#8e99a4', '--glow': 0, '--water': 0, '--embers': 0 },
];

function BarVisual() {
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto overflow-visible" aria-hidden="true">
      <defs>
        <pattern id="ribs" width="22" height="60" patternUnits="userSpaceOnUse" patternTransform="skewX(-28)">
          <rect x="0" y="0" width="7" height="60" rx="3" fill="rgba(0,0,0,.28)" />
        </pattern>
        <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".45" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity=".45" />
        </linearGradient>
        <radialGradient id="coreGlow">
          <stop offset="0" style={{ stopColor: '#fff6d8', stopOpacity: 'var(--glow)' }} />
          <stop offset="1" style={{ stopColor: 'var(--core)' }} />
        </radialGradient>
      </defs>

      {/* side view: skin band around a core strip */}
      <g style={{ filter: 'drop-shadow(0 0 calc(var(--glow) * 28px) rgba(255,106,0,calc(var(--glow) * .9)))' }}>
        <rect x="20" y="105" width="360" height="90" rx="10" style={{ fill: 'var(--skin)' }} />
        <rect x="20" y="125" width="360" height="50" style={{ fill: 'var(--core)' }} opacity=".85" />
        <rect x="20" y="105" width="360" height="90" rx="10" fill="url(#ribs)" />
        <rect x="20" y="105" width="360" height="90" rx="10" fill="url(#shade)" />
      </g>

      {/* water spray (quench) */}
      <g style={{ opacity: 'var(--water)' }} stroke="#9ad4ff" strokeWidth="2" strokeLinecap="round">
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i} transform={`translate(${60 + i * 36} 0)`}>
            <line x1="0" y1="40" x2="-8" y2="92" className="spray" style={{ animationDelay: `${i * 90}ms` }} />
            <line x1="0" y1="260" x2="-8" y2="208" className="spray" style={{ animationDelay: `${i * 70}ms` }} />
          </g>
        ))}
      </g>

      {/* ember sparks while the steel is still glowing */}
      <g style={{ opacity: 'var(--embers)' }} fill="#ffb347">
        {Array.from({ length: 10 }, (_, i) => (
          <circle key={i} cx={40 + i * 34} cy={100} r={i % 3 ? 1.6 : 2.4} className="ember" style={{ animationDelay: `${(i * 0.37) % 2}s` }} />
        ))}
      </g>

      {/* cross-section */}
      <g transform="translate(490 150)" style={{ filter: 'drop-shadow(0 0 calc(var(--glow) * 30px) rgba(255,106,0,calc(var(--glow) * .8)))' }}>
        <circle r="92" style={{ fill: 'var(--skin)' }} />
        <circle r="70" fill="url(#coreGlow)" />
        <circle r="92" fill="none" stroke="rgba(255,255,255,.15)" />
      </g>
    </svg>
  );
}

export function Process() {
  const { t } = useLang();
  const p = t.process;
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const reduced = useMemo(prefersReducedMotion, []);
  const [step, setStep] = useState(reduced ? 2 : -1);

  useGSAP(() => {
    if (reduced) return;
    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut', duration: 1 },
      scrollTrigger: {
        trigger: root.current, start: 'top top', end: () => `+=${innerHeight * 2.2}`, pin: true, scrub: 1, invalidateOnRefresh: true,
        onUpdate: (self) => setStep(self.progress < 0.08 ? -1 : Math.min(2, Math.floor((self.progress - 0.08) / 0.3))),
      },
    });
    tl.set(visual.current, { ...HOT }, 0); // inside the timeline so StrictMode revert/re-run restores it
    tl.to({}, { duration: 0.3 }); // hold on the glowing bar first
    // explicit fromTo for each step: start values never depend on what was on the element at creation time
    [HOT, ...STATES].slice(0, -1).forEach((from, i) => tl.fromTo(visual.current, { ...from }, { ...STATES[i], immediateRender: false }).to({}, { duration: 0.35 }));
  }, { scope: root, dependencies: [reduced] });

  return (
    <section id="process" ref={root} className="relative z-10 min-h-[100svh] flex items-center overflow-hidden py-24 lg:py-0" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <div className="order-2 lg:order-1">
          <p className="section-tag mb-4">{p.tag}</p>
          <h2 id="process-heading" className="section-heading text-ink mb-8 lg:mb-12">{p.title}</h2>
          <ol className="space-y-6 relative border-l border-steel-700/50 pl-6">
            {p.steps.map((s, i) => (
              <li key={s.title}
                className={`relative transition-all duration-500 ${step === i || reduced ? 'opacity-100' : 'opacity-35 max-lg:hidden'} ${step === -1 && i === 0 ? 'max-lg:!block' : ''}`}
                aria-current={step === i ? 'step' : undefined}>
                <span className={`absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full transition-colors ${step >= i ? 'bg-orange-400 shadow-[0_0_12px_#FF6A00]' : 'bg-steel-600'}`} />
                <h3 className="font-barlow font-700 text-2xl uppercase text-ink"><span className="text-orange-600 mr-3">0{i + 1}</span>{s.title}</h3>
                <p className="mt-2 text-steel-300 max-w-md">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div ref={visual} className="order-1 lg:order-2" style={{ ...(reduced ? STATES[2] : HOT) } as React.CSSProperties}>
          <BarVisual />
          <div className="flex justify-center gap-6 mt-4 text-xs font-barlow tracking-widest uppercase text-steel-400" aria-hidden="true">
            <span className="flex items-center gap-2"><i className="w-3 h-3 rounded-full" style={{ background: 'var(--skin)' }} />{p.skin}</span>
            <span className="flex items-center gap-2"><i className="w-3 h-3 rounded-full" style={{ background: 'var(--core)' }} />{p.core}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
