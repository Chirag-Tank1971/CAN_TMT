import { useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { TEAM } from '../../config/site';
import { SectionHeader } from '../ui/SectionHeader';

/** The founders. Their initials, side by side, spell the brand: C · A · N. */
export function Team() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);

  return (
    <section id="team" ref={ref} className="section-pad relative z-10" aria-labelledby="team-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="team-heading" tag={t.team.tag} title={t.team.title} body={t.team.body} />
        <ul className="grid gap-6 sm:grid-cols-3" role="list">
          {TEAM.map((m, i) => (
            <li key={m.name} data-reveal style={{ '--d': `${i * 120}ms` } as React.CSSProperties}
              className="metal-card rounded-sm overflow-hidden">
              <div className="relative aspect-[4/3] bg-paper-100 border-b border-steel-700/60 flex items-center justify-center">
                {m.photo ? (
                  <img src={m.photo} alt={t.team.photoAlt.replace('{name}', m.name)} loading="lazy" decoding="async"
                    className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <span className="font-barlow font-800 text-[9rem] leading-none text-orange-400 select-none" aria-hidden="true">
                    {m.name[0]}
                  </span>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-barlow font-700 text-3xl uppercase text-ink leading-tight">
                  <span className="text-orange-600">{m.name[0]}</span>{m.name.slice(1)}
                </h3>
                <p className={`mt-1 text-sm ${m.role ? 'text-steel-300' : 'text-orange-600'}`}>{m.role ?? t.team.roleTodo}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
