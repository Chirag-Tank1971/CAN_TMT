import { useEffect, useState } from 'react';
import { useLang } from '../../lib/LangContext';
import { scrollToTarget } from '../../lib/scroll';
import { Logo } from './Logo';

const HREFS = ['#why', '#brands', '#products', '#applications', '#contact'];

export function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    scrollToTarget(href);
  };

  const LangToggle = (
    <button
      onClick={toggleLang}
      className="flex items-center border border-steel-600/50 rounded-sm font-barlow font-700 text-xs tracking-widest overflow-hidden"
      aria-pressed={lang === 'hi'}
    >
      <span className="sr-only">{lang === 'en' ? 'हिंदी में देखें / ' : 'View in English / '}</span>
      <span className={`px-2 py-1 ${lang === 'en' ? 'bg-orange-400 text-ink' : 'text-steel-400'}`}>EN</span>
      <span className={`px-2 py-1 ${lang === 'hi' ? 'bg-orange-400 text-ink' : 'text-steel-400'}`}>हिं</span>
    </button>
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
        scrolled || menuOpen ? 'bg-paper/75 backdrop-blur-md border-steel-700/40' : 'bg-transparent border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20" aria-label="Main">
        <a href="#top" onClick={go('#top')} aria-label="CAN TMT home">
          <Logo />
        </a>

        <ul className="hidden lg:flex items-center gap-7" role="list">
          {HREFS.map((href, i) => (
            <li key={href}>
              <a href={href} onClick={go(href)}
                className="font-barlow font-700 text-sm tracking-widest uppercase text-steel-300 hover:text-orange-600 transition-colors">
                {t.nav.links[i]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {LangToggle}
          <a href="#contact" onClick={go('#contact')} className="btn-primary hidden md:inline-flex !py-2.5 !px-5 text-sm">
            {t.nav.cta}
          </a>
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* CSS grid-rows collapse; `inert` keeps hidden links out of the tab order */}
      <div id="mobile-menu" className={`lg:hidden grid transition-[grid-template-rows] duration-300 ease-out ${menuOpen ? 'grid-rows-[1fr] border-t border-steel-700/40' : 'grid-rows-[0fr]'}`} inert={!menuOpen}>
        <ul className="overflow-hidden" role="list">
          {HREFS.map((href, i) => (
            <li key={href}>
              <a href={href} onClick={go(href)}
                className="block px-6 py-3 font-barlow font-700 tracking-widest uppercase text-steel-200 hover:text-orange-600">
                {t.nav.links[i]}
              </a>
            </li>
          ))}
          <li className="px-6 py-3">
            <a href="#contact" onClick={go('#contact')} className="btn-primary w-full justify-center">{t.nav.cta}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
