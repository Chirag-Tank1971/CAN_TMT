import { useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { SectionHeader } from '../ui/SectionHeader';
import { Icon, type IconName } from '../ui/Icons';

const ICONS: IconName[] = ['home', 'apartment', 'bridge', 'commercial', 'industrial'];

/** Hover (desktop) / focus / tap reveals each card's text; touch screens show it by default. */
export function Applications() {
  const { t } = useLang();
  const a = t.applications;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="applications" ref={ref} className="section-pad relative z-10" aria-labelledby="applications-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="applications-heading" tag={a.tag} title={a.title} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5" role="list">
          {a.items.map((item, i) => (
            <li key={item.title} data-reveal style={{ '--d': `${i * 80}ms` } as React.CSSProperties}>
              <div tabIndex={0} className="app-card group metal-card rounded-sm h-72 lg:h-96 p-6 flex flex-col justify-between overflow-hidden cursor-default focus-visible:outline-orange-400">
                <span className="font-barlow text-sm tracking-widest text-steel-500">0{i + 1}</span>
                <Icon name={ICONS[i]} className="w-20 h-20 text-steel-300 group-hover:text-orange-400 group-focus:text-orange-400 transition-colors duration-500 mx-auto" />
                <div>
                  <h3 className="font-barlow font-700 text-2xl uppercase text-white">{item.title}</h3>
                  <p className="app-reveal text-sm text-steel-300 leading-relaxed"><span className="min-h-0">{item.body}</span></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
