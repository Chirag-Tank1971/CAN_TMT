import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

const APPLICATION_ICONS: Record<string, string> = {
  home: '🏠',
  apartment: '🏢',
  bridge: '🌉',
  commercial: '🏪',
  industrial: '🏭',
};

const APPLICATION_COLORS: Record<string, string> = {
  home: 'from-orange-400/20',
  apartment: 'from-steel-500/20',
  bridge: 'from-blue-900/20',
  commercial: 'from-purple-900/20',
  industrial: 'from-amber-900/20',
};

export function Applications() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="applications"
      ref={sectionRef}
      className="section-pad relative z-10"
      aria-labelledby="applications-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag justify-center mb-4"
          >
            {t.applications.sectionTag}
          </motion.div>
          <motion.h2
            id="applications-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-white"
          >
            {t.applications.heading}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.applications.items.map((app, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`metal-card rounded-sm overflow-hidden group cursor-default ${i === 2 ? 'lg:col-span-1' : ''}`}
            >
              {/* Image area — colour gradient with icon */}
              <div
                className={`relative h-40 bg-gradient-to-br ${APPLICATION_COLORS[app.image] || 'from-steel-800/20'} to-transparent flex items-center justify-center overflow-hidden`}
                aria-hidden="true"
              >
                <span className="text-6xl transform transition-transform duration-500 group-hover:scale-110">
                  {APPLICATION_ICONS[app.image]}
                </span>
                {/* Subtle horizontal line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-400/20 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-barlow font-800 text-lg uppercase text-white mb-2 tracking-wide">
                  {app.title}
                </h3>
                <p className="font-inter text-sm text-steel-400 leading-relaxed">{app.description}</p>

                {/* Reveal on hover */}
                <div className="mt-4 h-0.5 bg-orange-400/0 group-hover:bg-orange-400/60 transition-all duration-500 rounded-full" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div className="steel-divider mt-20" />
    </section>
  );
}
