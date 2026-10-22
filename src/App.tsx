import { useEffect, useRef, useState } from 'react';
import { LangProvider } from './lib/LangContext';
import { Navbar } from './components/layout/Navbar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { WhyCAN } from './components/sections/WhyCAN';
import { CrossSection } from './components/sections/CrossSection';
import { Products } from './components/sections/Products';
import { Applications } from './components/sections/Applications';
import { Stats } from './components/sections/Stats';
import { HowToOrder } from './components/sections/HowToOrder';
import { DealerContact } from './components/sections/DealerContact';
import { FAQ } from './components/sections/FAQ';

function AppInner() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollPhase, setScrollPhase] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);

      // Compute global scroll phase 0→1 over 5x viewport
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      setScrollPhase(totalHeight > 0 ? y / totalHeight : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Optional: Lenis smooth scroll (graceful fallback if not installed)
  useEffect(() => {
    let lenis: any = null;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }).catch(() => {
      // Lenis not available — use native smooth scroll
    });

    return () => {
      if (lenis) lenis.destroy();
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <Navbar scrolled={scrolled} />

      <main id="main-content">
        <Hero scrollPhase={scrollPhase} />
        <WhyCAN />
        <CrossSection />
        <Products />
        <Applications />
        <Stats />
        <HowToOrder />
        <DealerContact />
        <FAQ />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  );
}
