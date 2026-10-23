import { useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon, type IconName } from '../ui/Icons';

const ICONS: IconName[] = ['strength', 'ductility', 'earthquake', 'weld', 'corrosion'];

export function WhyCAN() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="why" ref={ref} className="section-pad relative z-10" aria-labelledby="why-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="why-heading" tag={t.why.tag} title={t.why.title} />
        <ul className="grid gap-px bg-steel-700/30 sm:grid-cols-2 lg:grid-cols-5 border border-steel-700/30" role="list">
          {t.why.items.map((item, i) => (
            <li key={item.title} data-reveal className="draw-top metal-card !border-0 p-7 lg:p-8 flex flex-col gap-5 transition-colors"
              style={{ '--d': `${i * 90}ms` } as React.CSSProperties}>
              <Icon name={ICONS[i]} className="w-11 h-11 text-orange-600" />
              <h3 className="font-barlow font-700 text-2xl uppercase text-ink leading-tight">{item.title}</h3>
              <p className="text-sm text-steel-300 leading-relaxed">{item.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-steel-500" data-reveal>{t.why.cert}</p>
      </div>
    </section>
  );
}
