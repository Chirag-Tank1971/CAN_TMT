import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.1,
      ease: 'easeOut' as const,
    },
  }),
};

export function WhyCAN() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      id="why"
      ref={sectionRef}
      className="section-pad relative z-10"
      aria-labelledby="why-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="section-tag justify-center mb-4"
          >
            {t.why.sectionTag}
          </motion.div>
          <motion.h2
            id="why-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-white mb-4"
          >
            {t.why.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-steel-400 max-w-2xl mx-auto font-inter"
          >
            {t.why.subheading}
          </motion.p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.why.features.map((feature, i) => (
            <motion.article
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="metal-card rounded-sm p-8 transition-all duration-300 group cursor-default"
              aria-label={feature.title}
            >
              {/* Icon */}
              <div className="text-4xl mb-5" role="img" aria-label={feature.title}>
                {feature.icon}
              </div>

              {/* Orange accent line */}
              <div className="w-8 h-0.5 bg-orange-400 mb-4 transition-all duration-300 group-hover:w-16" />

              <h3 className="font-barlow font-800 text-xl text-white uppercase tracking-wide mb-3">
                {feature.title}
              </h3>
              <p className="font-inter text-steel-400 text-sm leading-relaxed">
                {feature.body}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Divider */}
        <div className="steel-divider mt-20" />
      </div>
    </section>
  );
}
