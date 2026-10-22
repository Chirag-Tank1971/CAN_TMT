import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

function CounterItem({
  item,
  inView,
  delay,
}: {
  item: { value: string; suffix: string; label: string };
  inView: boolean;
  delay: number;
}) {
  const [displayed, setDisplayed] = useState('0');
  const isNumeric = !isNaN(Number(item.value));

  useEffect(() => {
    if (!inView || !isNumeric) {
      setDisplayed(item.value);
      return;
    }
    const target = Number(item.value);
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    let step = 0;

    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        step++;
        current = Math.min(Math.round(increment * step), target);
        setDisplayed(String(current));
        if (step >= steps) clearInterval(interval);
      }, duration / steps);
      return () => clearInterval(interval);
    }, delay * 1000);

    return () => clearTimeout(delayTimeout);
  }, [inView, item.value, isNumeric, delay]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center"
      role="figure"
      aria-label={`${item.value}${item.suffix} ${item.label}`}
    >
      <div className="stat-value" aria-hidden="true">
        {displayed}
        <span>{item.suffix}</span>
      </div>
      <p className="font-barlow font-700 text-sm uppercase tracking-widest text-steel-500 mt-2">
        {item.label}
      </p>
    </motion.div>
  );
}

export function Stats() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="stats"
      ref={sectionRef}
      className="py-20 relative z-10 overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Glow bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(255,106,0,0.05) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag justify-center mb-4"
          >
            {t.stats.sectionTag}
          </motion.div>
          <motion.h2
            id="stats-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-white"
          >
            {t.stats.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {t.stats.items.map((item, i) => (
            <CounterItem key={i} item={item} inView={inView} delay={0.2 + i * 0.1} />
          ))}
        </div>
      </div>

      <div className="steel-divider mt-16" />
    </section>
  );
}
