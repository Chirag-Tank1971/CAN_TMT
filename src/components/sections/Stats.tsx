import { useEffect, useRef } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { STATS } from '../../config/site';
import { SectionHeader } from '../ui/SectionHeader';

const fmt = new Intl.NumberFormat('en-IN');

/** Counts up once when the row scrolls into view (instantly under reduced motion). */
export function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const nums = useRef<(HTMLSpanElement | null)[]>([]);
  useReveal(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now(), dur = reduced ? 0 : 1800;
      const tick = (now: number) => {
        const k = dur ? Math.min(1, (now - t0) / dur) : 1, ease = 1 - Math.pow(1 - k, 4);
        STATS.items.forEach((s, i) => { const n = nums.current[i]; if (n) n.textContent = fmt.format(Math.round(s.value * ease)); });
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="stats" ref={ref} className="section-pad relative z-10 border-y border-steel-700/30 bg-paper-100/60" aria-labelledby="stats-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeader id="stats-heading" tag={t.stats.tag} title={t.stats.title} />
        <dl className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
          {STATS.items.map((s, i) => (
            <div key={i} data-reveal style={{ '--d': `${i * 90}ms` } as React.CSSProperties} className="border-l border-orange-400/50 pl-5 flex flex-col">
              <dt className="font-barlow font-600 uppercase tracking-widest text-sm text-steel-300">{t.stats.labels[i]}</dt>
              <dd className="stat-value -order-1 mb-2">
                <span ref={(n) => { nums.current[i] = n; }}>0</span>{s.suffix}
              </dd>
              {!STATS.confirmed && <dd className="mt-2"><span className="inline-block text-[10px] uppercase tracking-widest text-orange-600 border border-orange-400/40 px-1.5 py-0.5">TODO · {t.stats.todo}</span></dd>}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
