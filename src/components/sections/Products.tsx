import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

function RodVisual({ diameterMm, grade }: { diameterMm: number; grade: string }) {
  const scale = 0.3 + (diameterMm / 32) * 0.7;
  const isHighGrade = grade === 'fe550d' || grade === 'fe600';

  return (
    <div className="flex items-center justify-center py-10" aria-label={`Rod visual: ${diameterMm}mm ${grade}`}>
      <motion.div
        key={`${diameterMm}-${grade}`}
        initial={{ scaleX: 0.6, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
        style={{ width: `${Math.min(scale * 280, 260)}px` }}
        aria-hidden="true"
      >
        {/* Rod body */}
        <div
          className="rounded-sm relative overflow-hidden"
          style={{
            height: `${Math.max(diameterMm * 1.8, 20)}px`,
            background: isHighGrade
              ? 'linear-gradient(180deg, #3a4450 0%, #1e2226 40%, #3a4450 100%)'
              : 'linear-gradient(180deg, #2c3038 0%, #1a1c20 40%, #2c3038 100%)',
            boxShadow: isHighGrade
              ? '0 0 20px rgba(255,106,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)'
              : 'inset 0 1px 0 rgba(255,255,255,0.04)',
          }}
        >
          {/* Transverse ribs */}
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute bg-steel-700/60"
              style={{
                left: `${10 + i * 16}%`,
                top: '10%',
                width: '8%',
                height: '80%',
                transform: 'skewX(-8deg)',
              }}
            />
          ))}
          {/* Longitudinal rib */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-steel-700/40" />
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-steel-700/40" />
          {/* Orange rim highlight */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 via-transparent to-transparent" />
        </div>

        {/* Diameter label */}
        <div className="text-center mt-3">
          <span className="font-barlow font-800 text-2xl text-orange-400">ø {diameterMm}</span>
          <span className="text-steel-500 font-inter text-sm ml-1">mm</span>
        </div>
      </motion.div>
    </div>
  );
}

export function Products() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [selectedGrade, setSelectedGrade] = useState(t.products.grades[1]); // Fe 500D default
  const [selectedDiameter, setSelectedDiameter] = useState(16);

  const handleQuote = () => {
    const msg = encodeURIComponent(
      `Hello CAN TMT! I need a quote for ${selectedGrade.label} TMT bars, ${selectedDiameter}mm diameter.`
    );
    window.open(`https://wa.me/${t.contact.whatsappNumber}?text=${msg}`, '_blank');
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-pad relative z-10"
      aria-labelledby="products-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="section-tag justify-center mb-4"
          >
            {t.products.sectionTag}
          </motion.div>
          <motion.h2
            id="products-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-heading text-white mb-4"
          >
            {t.products.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="text-steel-400 font-inter"
          >
            {t.products.subheading}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Selector panel */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-10"
          >
            {/* Grade selector */}
            <div>
              <p className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-4">
                Grade
              </p>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Select grade">
                {t.products.grades.map((grade) => (
                  <button
                    key={grade.id}
                    onClick={() => setSelectedGrade(grade)}
                    className={`grade-chip ${selectedGrade.id === grade.id ? 'active' : ''}`}
                    aria-pressed={selectedGrade.id === grade.id}
                    aria-label={`Grade ${grade.label}`}
                  >
                    {grade.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Diameter selector */}
            <div>
              <p className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-4">
                Diameter ({t.products.diameterUnit})
              </p>
              <div className="flex flex-wrap gap-3" role="group" aria-label="Select diameter">
                {t.products.diameters.map((d) => (
                  <button
                    key={d}
                    onClick={() => setSelectedDiameter(d)}
                    className={`diameter-chip ${selectedDiameter === d ? 'active' : ''}`}
                    aria-pressed={selectedDiameter === d}
                    aria-label={`${d}mm diameter`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Spec card */}
            <motion.div
              key={selectedGrade.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="metal-card rounded-sm p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-barlow font-900 text-2xl text-white uppercase">{selectedGrade.label}</h3>
                <span className="text-xs font-barlow font-700 text-orange-400 border border-orange-400/30 px-2 py-1 rounded">
                  IS 1786
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-steel-500 font-inter mb-1">Yield Strength</p>
                  <p className="font-barlow font-800 text-white text-lg">{selectedGrade.yieldStrength}</p>
                </div>
                <div>
                  <p className="text-steel-500 font-inter mb-1">Diameter</p>
                  <p className="font-barlow font-800 text-white text-lg">ø {selectedDiameter} mm</p>
                </div>
                <div className="col-span-2">
                  <p className="text-steel-500 font-inter mb-1">Best For</p>
                  <p className="font-inter text-steel-300 text-sm">{selectedGrade.application}</p>
                </div>
              </div>
              <button
                onClick={handleQuote}
                className="btn-primary w-full justify-center mt-2"
                aria-label={`Request price for ${selectedGrade.label} ${selectedDiameter}mm`}
              >
                {t.products.ctaQuote}
              </button>
            </motion.div>
          </motion.div>

          {/* Rod visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="metal-card rounded-sm p-8"
          >
            <RodVisual diameterMm={selectedDiameter} grade={selectedGrade.id} />
            <p className="text-center text-xs text-steel-600 font-inter mt-2">
              Proportional cross-section illustration · Not to scale
            </p>
          </motion.div>
        </div>
      </div>

      <div className="steel-divider mt-20" />
    </section>
  );
}
