import { lazy, Suspense, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../../lib/LangContext';
import { useDevicePerf } from '../../hooks/useDevicePerf';

const RodCanvas = lazy(() =>
  import('../three/RodCanvas').then((m) => ({ default: m.RodCanvas }))
);

interface HeroProps {
  scrollPhase: number;
}

export function Hero({ scrollPhase }: HeroProps) {
  const { t } = useLang();
  const { isLowPower, prefersReducedMotion } = useDevicePerf();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [canvasReady, setCanvasReady] = useState(false);

  const handleMouse = useCallback((e: MouseEvent) => {
    setMouse({
      x: (e.clientX / window.innerWidth - 0.5) * 2,
      y: -(e.clientY / window.innerHeight - 0.5) * 2,
    });
  }, []);

  useEffect(() => {
    if (!isLowPower && !prefersReducedMotion) {
      window.addEventListener('mousemove', handleMouse, { passive: true });
      return () => window.removeEventListener('mousemove', handleMouse);
    }
  }, [isLowPower, prefersReducedMotion, handleMouse]);

  useEffect(() => {
    // Delay canvas init for performance (LCP)
    const timer = setTimeout(() => setCanvasReady(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleQuote = () => {
    window.open(`https://wa.me/${t.contact.whatsappNumber}?text=${encodeURIComponent('Hello CAN TMT! I would like to get a quote.')}`, '_blank');
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${t.contact.whatsappNumber}`, '_blank');
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        {canvasReady && (
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-orange-400 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <RodCanvas
              scrollPhase={scrollPhase}
              isLowPerf={isLowPower || prefersReducedMotion}
              mouseX={mouse.x}
              mouseY={mouse.y}
            />
          </Suspense>
        )}
        {/* Gradient overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-DEFAULT/90 via-charcoal-DEFAULT/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-DEFAULT via-transparent to-charcoal-DEFAULT/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-tag mb-6"
          >
            {t.hero.tagline}
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="display-heading text-white mb-4"
          >
            {t.hero.headline.split('\n').map((line, i) => (
              <span key={i} className={i === 0 ? '' : 'orange-gradient-text block'}>
                {line}
                {i === 0 && <br />}
              </span>
            ))}
          </motion.h1>

          {/* Hindi sub-tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="font-barlow font-600 text-2xl text-orange-300 mb-4 tracking-wide"
          >
            {t.hero.subTagline}
          </motion.p>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="font-inter text-steel-300 text-lg leading-relaxed mb-10 max-w-xl"
          >
            {t.hero.subheadline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="flex flex-wrap gap-4"
          >
            <button onClick={handleQuote} className="btn-primary glow-orange" aria-label="Get a Quote">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
              </svg>
              {t.hero.ctaPrimary}
            </button>

            <button onClick={handleWhatsApp} className="btn-secondary" aria-label="Chat on WhatsApp">
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.83 6.82L2 30l7.36-1.79A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.37 19c-.35-.17-2.07-1.02-2.39-1.14-.32-.12-.56-.17-.79.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.49-.55-2.84-1.75-1.05-.94-1.76-2.1-1.96-2.45-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.62.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.17-.79-1.91-1.09-2.62-.29-.69-.58-.59-.79-.6l-.68-.01c-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92s1.25 3.39 1.42 3.62c.17.23 2.46 3.76 5.96 5.27.83.36 1.48.57 1.99.73.84.27 1.6.23 2.2.14.67-.1 2.07-.85 2.36-1.67.29-.82.29-1.52.2-1.67-.08-.15-.32-.24-.67-.41z"/>
              </svg>
              {t.hero.ctaSecondary}
            </button>
          </motion.div>

          {/* IS 1786 badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-10 flex items-center gap-3"
          >
            <div className="w-px h-8 bg-steel-700" />
            <p className="text-xs text-steel-500 font-inter">
              IS 1786 Compliant · BIS Certified [TODO] · Fe 500 to Fe 600
            </p>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-500">
          {t.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-5 h-8 border border-steel-600 rounded-full flex justify-center pt-1.5"
        >
          <div className="w-1 h-2 bg-orange-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
