import { useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { BRANDS, waLink } from '../../config/site';
import { SectionHeader } from '../ui/SectionHeader';

/** Mills we supply. Shows a logo when one is set in config (with the owner's permission), otherwise the name. */
export function Brands() {
  const { t } = useLang();
  const b = t.brands;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="brands" ref={ref} className="section-pad relative z-10" aria-labelledby="brands-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="brands-heading" tag={b.tag} title={b.title} body={b.body} />
        <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-px bg-steel-700/30 border border-steel-700/30" role="list">
          {BRANDS.map((brand, i) => (
            <li key={brand.name} data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
              <a
                href={waLink(b.waMsg.replace('{brand}', brand.name))}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between gap-6 h-full min-h-44 sm:min-h-52 p-5 sm:p-8 bg-charcoal hover:bg-charcoal-50 transition-colors"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-barlow text-sm tracking-widest text-steel-500">0{i + 1}</span>
                  {brand.noteKey && (
                    <span className="text-[10px] sm:text-xs uppercase tracking-widest text-orange-300 border border-orange-400/40 px-1.5 py-0.5 text-right">
                      {b.notes[brand.noteKey]}
                    </span>
                  )}
                </span>
                {brand.logo ? (
                  // logos are artwork on white/colour backgrounds: show them on a uniform white plate
                  <span className="flex items-center justify-center h-20 sm:h-28 rounded-sm bg-white p-2 sm:p-3 ring-1 ring-transparent group-hover:ring-orange-400 transition">
                    <img src={brand.logo} alt={brand.name} loading="lazy" decoding="async" className="max-h-full max-w-full object-contain" />
                  </span>
                ) : (
                  <span className="font-barlow font-800 uppercase leading-none text-white text-3xl sm:text-5xl group-hover:text-orange-400 transition-colors">
                    {brand.name.replace(/ TMT$/, '')}
                    <span className="block text-base sm:text-xl text-steel-400 tracking-[0.3em] mt-1">TMT</span>
                  </span>
                )}
                <span className="font-barlow font-700 text-xs sm:text-sm tracking-widest uppercase text-steel-300 group-hover:text-orange-400 transition-colors">
                  {b.cta} →
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-steel-500" data-reveal>{b.note}</p>
      </div>
    </section>
  );
}
