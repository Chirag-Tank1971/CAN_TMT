import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

function CrossSectionDiagram({ inView }: { inView: boolean }) {
  return (
    <div className="relative w-full max-w-xs mx-auto aspect-square">
      {/* Outer ring — Martensite */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 rounded-full border-8 border-steel-600"
        style={{ background: 'radial-gradient(circle, transparent 55%, #2a2e34 55%)' }}
        aria-hidden="true"
      />

      {/* Transition zone */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-8 rounded-full"
        style={{ background: 'radial-gradient(circle, transparent 50%, rgba(100,70,20,0.4) 50%)' }}
        aria-hidden="true"
      />

      {/* Core — Ferrite-Pearlite */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-16 rounded-full"
        style={{ background: 'radial-gradient(circle, #4a3820 0%, #3a2c18 100%)' }}
        aria-hidden="true"
      />

      {/* Glowing outer rim */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 1 }}
        className="absolute inset-0 rounded-full"
        style={{ boxShadow: 'inset 0 0 30px rgba(255,106,0,0.15), 0 0 40px rgba(255,106,0,0.1)' }}
        aria-hidden="true"
      />

      {/* Label callouts */}
      {/* Outer */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.1 }}
        className="absolute top-3 right-0 translate-x-full pl-3"
      >
        <div className="flex items-center gap-2">
          <div className="w-6 h-px bg-orange-400" />
          <span className="text-xs font-barlow font-700 text-orange-400 uppercase whitespace-nowrap">Outer Layer</span>
        </div>
      </motion.div>

      {/* Core */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 left-0 -translate-x-full pr-3"
      >
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs font-barlow font-700 text-amber-600 uppercase whitespace-nowrap">Core</span>
          <div className="w-6 h-px bg-amber-600" />
        </div>
      </motion.div>
    </div>
  );
}

export function CrossSection() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="cross-section"
      ref={sectionRef}
      className="section-pad relative z-10 overflow-hidden"
      aria-labelledby="cross-section-heading"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,106,0,0.06) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Diagram */}
          <div className="flex justify-center">
            <CrossSectionDiagram inView={inView} />
          </div>

          {/* Right: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="section-tag mb-6"
            >
              {t.crossSection.sectionTag}
            </motion.div>

            <motion.h2
              id="cross-section-heading"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="section-heading text-white mb-10"
            >
              {t.crossSection.heading}
            </motion.h2>

            {/* Layer descriptions */}
            {[
              { label: t.crossSection.outerLabel, desc: t.crossSection.outerDesc, color: 'border-steel-500', delay: 0.2 },
              { label: t.crossSection.transitionLabel, desc: t.crossSection.transitionDesc, color: 'border-amber-800', delay: 0.35 },
              { label: t.crossSection.coreLabel, desc: t.crossSection.coreDesc, color: 'border-amber-700', delay: 0.5 },
            ].map((layer, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 32 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: layer.delay + 0.4 }}
                className={`border-l-2 ${layer.color} pl-5 mb-7`}
              >
                <h3 className="font-barlow font-800 text-base uppercase tracking-widest text-white mb-1 whitespace-pre-line">
                  {layer.label}
                </h3>
                <p className="font-inter text-sm text-steel-400 leading-relaxed">{layer.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Manufacturing Process */}
        <div className="mt-24">
          <div className="text-center mb-14">
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
              className="section-tag justify-center mb-4"
            >
              {t.process.sectionTag}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="section-heading text-white"
            >
              {t.process.heading}
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {t.process.steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-start md:items-center text-left md:text-center px-8 py-10 metal-card rounded-sm"
              >
                {/* Step number */}
                <div
                  className="font-barlow font-900 text-7xl leading-none mb-4 pointer-events-none select-none"
                  style={{ color: 'rgba(255,106,0,0.1)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>

                {/* Heat indicator for step 1 */}
                {i === 0 && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-orange-400 animate-pulse" aria-hidden="true" />
                )}
                {i === 1 && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-amber-700 animate-pulse" aria-hidden="true" />
                )}
                {i === 2 && (
                  <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-steel-500" aria-hidden="true" />
                )}

                <div className="w-8 h-0.5 bg-orange-400 mb-4" aria-hidden="true" />
                <h3 className="font-barlow font-800 text-xl uppercase text-white mb-3">{step.title}</h3>
                <p className="font-inter text-sm text-steel-400 leading-relaxed">{step.body}</p>

                {/* Connector arrow (between cards) */}
                {i < t.process.steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-steel-600" aria-hidden="true">
                    →
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="steel-divider mt-20" />
    </section>
  );
}
