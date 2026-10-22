import { useRef, useState } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { SectionHeader } from '../ui/SectionHeader';

export function FAQ() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="section-pad relative z-10" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader id="faq-heading" tag={t.faq.tag} title={t.faq.title} />
        <div className="border-t border-steel-700/50">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-steel-700/50" data-reveal style={{ '--d': `${i * 70}ms` } as React.CSSProperties}>
                <h3>
                  <button id={`faq-q-${i}`} aria-expanded={isOpen} aria-controls={`faq-a-${i}`} onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-6 py-6 text-left font-barlow font-700 text-xl sm:text-2xl uppercase text-ink hover:text-orange-600 transition-colors">
                    {item.q}
                    <span className={`shrink-0 w-8 h-8 border border-steel-600 rounded-full grid place-items-center transition-transform duration-500 ${isOpen ? 'rotate-45 border-orange-400 text-orange-600' : ''}`} aria-hidden="true">+</span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                  className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden" inert={!isOpen}>
                    <p className="pb-6 pr-12 text-steel-300 leading-relaxed">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
