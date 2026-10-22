import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

interface NavbarProps {
  scrolled: boolean;
}

export function Navbar({ scrolled }: NavbarProps) {
  const { t, lang, toggleLang } = useLang();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.links[0], href: '#why' },
    { label: t.nav.links[1], href: '#products' },
    { label: t.nav.links[2], href: '#applications' },
    { label: t.nav.links[3], href: '#contact' },
  ];

  const handleQuote = () => {
    const msg = encodeURIComponent(
      'Hello CAN TMT! I would like to get a quote for TMT bars.'
    );
    window.open(`https://wa.me/[NUMBER]?text=${msg}`, '_blank');
  };

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-charcoal-DEFAULT/80 backdrop-blur-md border-b border-steel-700/30'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group" aria-label="CAN TMT — Home">
          <span className="relative">
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" aria-hidden="true">
              {/* Rod-inspired C shape */}
              <rect x="2" y="14" width="32" height="4" rx="2" fill="#FF6A00" />
              <rect x="2" y="14" width="10" height="4" rx="2" fill="#FF6A00" />
              <rect x="2" y="8" width="26" height="3" rx="1.5" fill="#FF6A00" opacity="0.6" />
              <rect x="2" y="21" width="26" height="3" rx="1.5" fill="#FF6A00" opacity="0.6" />
            </svg>
          </span>
          <span className="font-barlow font-900 text-xl md:text-2xl tracking-widest text-white group-hover:text-orange-400 transition-colors">
            CAN TMT
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 list-none" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-barlow font-700 text-sm tracking-widest uppercase text-steel-300 hover:text-orange-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-orange-400 transition-all group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          {/* Lang toggle */}
          <button
            onClick={toggleLang}
            className="hidden md:flex items-center gap-1 text-xs font-barlow font-700 tracking-widest uppercase text-steel-400 hover:text-orange-400 transition-colors border border-steel-700/40 rounded px-2 py-1"
            aria-label={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
          >
            {lang === 'en' ? 'हि' : 'EN'}
          </button>

          <button
            onClick={handleQuote}
            className="btn-primary hidden md:flex text-sm"
            aria-label="Get a Quote via WhatsApp"
          >
            {t.nav.cta}
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-50/95 backdrop-blur-md border-t border-steel-700/30"
          >
            <ul className="flex flex-col py-4 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block px-6 py-3 font-barlow font-700 tracking-widest uppercase text-steel-300 hover:text-orange-400 hover:bg-orange-400/5 transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="px-6 pt-4">
                <button onClick={handleQuote} className="btn-primary w-full justify-center">
                  {t.nav.cta}
                </button>
              </li>
              <li className="px-6 pt-3">
                <button
                  onClick={() => { toggleLang(); setMenuOpen(false); }}
                  className="text-sm font-barlow font-700 tracking-widest uppercase text-steel-400 hover:text-orange-400"
                >
                  {lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
