import { useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon, type IconName } from '../ui/Icons';

const ICONS: IconName[] = ['enquire', 'quote', 'delivery'];

export function HowToOrder() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="order" ref={ref} className="section-pad relative z-10" aria-labelledby="order-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="order-heading" tag={t.order.tag} title={t.order.title} />
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* connecting rod drawn across the steps */}
          <span data-reveal className="draw-line hidden md:block absolute top-7 left-[8%] right-[8%] h-px" aria-hidden="true" />
          {t.order.steps.map((s, i) => (
            <li key={s.title} data-reveal className="relative" style={{ '--d': `${i * 150}ms` } as React.CSSProperties}>
              <div className="w-14 h-14 rounded-full border border-orange-400/60 bg-paper flex items-center justify-center text-orange-600 relative">
                <Icon name={ICONS[i]} className="w-7 h-7" />
              </div>
              <p className="mt-6 font-barlow text-sm tracking-widest text-steel-500">0{i + 1}</p>
              <h3 className="font-barlow font-700 text-3xl uppercase text-ink">{s.title}</h3>
              <p className="mt-2 text-steel-300 max-w-xs">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
