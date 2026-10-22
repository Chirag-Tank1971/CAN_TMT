import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

const STEP_ICONS = ['💬', '📋', '🚛'];

export function HowToOrder() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="how-to-order"
      ref={sectionRef}
      className="section-pad relative z-10"
      aria-labelledby="how-to-order-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag justify-center mb-4"
          >
            {t.howToOrder.sectionTag}
          </motion.div>
          <motion.h2
            id="how-to-order-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-white"
          >
            {t.howToOrder.heading}
          </motion.h2>
        </div>

        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 left-1/6 right-1/6 h-px bg-gradient-to-r from-transparent via-orange-400/30 to-transparent"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {t.howToOrder.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Step circle */}
                <div
                  className="w-24 h-24 rounded-full border border-steel-700 flex items-center justify-center mb-6 relative"
                  style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.08) 0%, transparent 70%)' }}
                  aria-hidden="true"
                >
                  <span className="text-3xl">{STEP_ICONS[i]}</span>
                  {/* Step number badge */}
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-orange-400 text-white font-barlow font-900 text-xs flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>

                <h3 className="font-barlow font-800 text-xl uppercase text-white mb-3">{step.title}</h3>
                <p className="font-inter text-sm text-steel-400 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-14 text-center"
        >
          <a
            href="#contact"
            className="btn-primary inline-flex"
            aria-label="Start the order process"
          >
            Start My Order →
          </a>
        </motion.div>
      </div>

      <div className="steel-divider mt-20" />
    </section>
  );
}
