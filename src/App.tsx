import { lazy, Suspense, useEffect } from 'react';
import { LangProvider, useLang } from './lib/LangContext';
import { initSmoothScroll } from './lib/scroll';
import { Navbar } from './components/layout/Navbar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Story } from './components/sections/Story';
import { WhyCAN } from './components/sections/WhyCAN';
import { Brands } from './components/sections/Brands';
import { Process } from './components/sections/Process';
// below the fold: keeps framer-motion out of the initial bundle
const Products = lazy(() => import('./components/sections/Products').then((m) => ({ default: m.Products })));
import { Applications } from './components/sections/Applications';
import { Stats } from './components/sections/Stats';
import { HowToOrder } from './components/sections/HowToOrder';
import { DealerContact } from './components/sections/DealerContact';
import { FAQ } from './components/sections/FAQ';

function SkipLink() {
  const { t } = useLang();
  return <a href="#main-content" className="skip-link">{t.nav.skip}</a>;
}

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <LangProvider>
      <div id="top" />
      <SkipLink />
      <Navbar />
      <main id="main-content">
        <Story />
        <WhyCAN />
        <Brands />
        <Process />
        <Suspense fallback={<div id="products" className="min-h-[900px]" />}><Products /></Suspense>
        <Applications />
        <Stats />
        <HowToOrder />
        <DealerContact />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </LangProvider>
  );
}
