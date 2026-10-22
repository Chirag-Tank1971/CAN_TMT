import { useEffect } from 'react';
import { LangProvider } from './lib/LangContext';
import { initSmoothScroll } from './lib/scroll';
import { Navbar } from './components/layout/Navbar';
import { FloatingWhatsApp } from './components/layout/FloatingWhatsApp';
import { Footer } from './components/layout/Footer';
import { Story } from './components/sections/Story';
import { WhyCAN } from './components/sections/WhyCAN';
import { CrossSection } from './components/sections/CrossSection';
import { Products } from './components/sections/Products';
import { Applications } from './components/sections/Applications';
import { Stats } from './components/sections/Stats';
import { HowToOrder } from './components/sections/HowToOrder';
import { DealerContact } from './components/sections/DealerContact';
import { FAQ } from './components/sections/FAQ';

export default function App() {
  useEffect(() => initSmoothScroll(), []);

  return (
    <LangProvider>
      <div id="top" />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content">
        <Story />
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
    </LangProvider>
  );
}
