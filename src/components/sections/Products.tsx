import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { GRADES, DIAMETERS, WEIGHT_PER_M, waLink } from '../../config/site';
import { SectionHeader } from '../ui/SectionHeader';

type Dia = (typeof DIAMETERS)[number];
const EASE = [0.16, 1, 0.3, 1] as const;

/** Side view + cut end; thickness follows the chosen diameter (8 mm → 32 mm). */
function BarPreview({ dia }: { dia: Dia }) {
  const h = 14 + (dia / 32) * 86; // px in a 0–120 viewBox band
  return (
    <svg viewBox="0 0 520 160" className="w-full h-auto" role="img" aria-label={`${dia} mm bar`}>
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e9ecef" />
          <stop offset=".35" stopColor="#9aa3ac" />
          <stop offset=".6" stopColor="#5a626b" />
          <stop offset="1" stopColor="#1c2026" />
        </linearGradient>
        <pattern id="prib" width="16" height="200" patternUnits="userSpaceOnUse" patternTransform="skewX(-30)">
          <rect width="5" height="200" rx="2" fill="rgba(14,14,16,.35)" />
        </pattern>
      </defs>
      <motion.g animate={{ y: 80 - h / 2 }} transition={{ duration: 0.6, ease: EASE }} initial={false}>
        <motion.rect x="10" width="380" rx="4" fill="url(#steel)" animate={{ height: h }} transition={{ duration: 0.6, ease: EASE }} initial={false} />
        <motion.rect x="10" width="380" rx="4" fill="url(#prib)" animate={{ height: h }} transition={{ duration: 0.6, ease: EASE }} initial={false} />
      </motion.g>
      <motion.circle cx="460" cy="80" fill="url(#steel)" stroke="#FF6A00" strokeWidth="1.5" animate={{ r: h / 2 }} transition={{ duration: 0.6, ease: EASE }} initial={false} />
      <text x="460" y="152" textAnchor="middle" className="fill-steel-300 font-barlow" fontSize="14" letterSpacing="2">ø {dia} MM</text>
    </svg>
  );
}

export function Products() {
  const { t } = useLang();
  const p = t.products;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [grade, setGrade] = useState<(typeof GRADES)[number]>(GRADES[1]);
  const [dia, setDia] = useState<Dia>(16);
  const weight = WEIGHT_PER_M[dia];
  const msg = p.waMsg.replace('{grade}', grade.label).replace('{dia}', String(dia));

  const chip = (active: boolean) =>
    `font-barlow font-700 tracking-wider transition-colors border rounded-sm ${active ? 'border-orange-400 bg-orange-400 text-white' : 'border-steel-600/60 text-steel-200 hover:border-orange-400 hover:text-orange-400'}`;

  return (
    <section id="products" ref={ref} className="section-pad relative z-10" aria-labelledby="products-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="products-heading" tag={p.tag} title={p.title} />
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-14 items-start">
          <div className="space-y-8" data-reveal>
            <fieldset>
              <legend className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-400 mb-3">{p.grade}</legend>
              <div className="flex flex-wrap gap-2">
                {GRADES.map((g) => (
                  <button key={g.id} type="button" onClick={() => setGrade(g)} aria-pressed={grade.id === g.id} className={`${chip(grade.id === g.id)} px-5 py-2.5 text-lg`}>
                    {g.label}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-xs text-steel-400">{p.dNote}</p>
            </fieldset>
            <fieldset>
              <legend className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-400 mb-3">{p.diameter} (mm)</legend>
              <div className="flex flex-wrap gap-2">
                {DIAMETERS.map((d) => (
                  <button key={d} type="button" onClick={() => setDia(d)} aria-pressed={dia === d} aria-label={`${d} mm`} className={`${chip(dia === d)} w-14 h-12 text-lg`}>
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="metal-card draw-top rounded-sm p-6 sm:p-8" data-reveal style={{ '--d': '120ms' } as React.CSSProperties}>
            <BarPreview dia={dia} />
            <AnimatePresence mode="wait" initial={false}>
              <motion.dl key={grade.id + dia} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
                className="grid grid-cols-2 gap-x-6 gap-y-5 mt-6" aria-live="polite">
                <div><dt className="text-xs uppercase tracking-widest text-steel-400 font-barlow">{p.grade}</dt><dd className="font-barlow font-800 text-3xl text-white">{grade.label}</dd></div>
                <div><dt className="text-xs uppercase tracking-widest text-steel-400 font-barlow">{p.diameter}</dt><dd className="font-barlow font-800 text-3xl text-white">{dia} mm</dd></div>
                <div><dt className="text-xs uppercase tracking-widest text-steel-400 font-barlow">{p.weight}</dt><dd className={weight ? 'font-barlow font-800 text-3xl text-white' : 'text-sm text-orange-300 mt-2'}>{weight ? `${weight} kg/m` : p.weightTodo}</dd></div>
                <div><dt className="text-xs uppercase tracking-widest text-steel-400 font-barlow">{p.bestFor}</dt><dd className="text-sm text-steel-200 mt-1">{p.uses[grade.id]}</dd></div>
              </motion.dl>
            </AnimatePresence>
            <a href={waLink(msg)} target="_blank" rel="noopener noreferrer" className="btn-primary w-full justify-center mt-8">{p.cta}</a>
            <p className="mt-3 text-xs text-steel-500 text-center">{p.advice}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
