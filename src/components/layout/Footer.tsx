import { useLang } from '../../lib/LangContext';

export function Footer() {
  const { t } = useLang();

  const navLinks = [
    { label: t.nav.links[0], href: '#why' },
    { label: t.nav.links[1], href: '#products' },
    { label: t.nav.links[2], href: '#applications' },
    { label: t.nav.links[3], href: '#contact' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <footer className="relative z-10 bg-charcoal-300/80 border-t border-steel-700/30" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <a href="#hero" className="flex items-center gap-2 mb-4" aria-label="CAN TMT Home">
              <svg width="32" height="32" viewBox="0 0 36 36" fill="none" aria-hidden="true">
                <rect x="2" y="14" width="32" height="4" rx="2" fill="#FF6A00" />
                <rect x="2" y="8" width="26" height="3" rx="1.5" fill="#FF6A00" opacity="0.6" />
                <rect x="2" y="21" width="26" height="3" rx="1.5" fill="#FF6A00" opacity="0.6" />
              </svg>
              <span className="font-barlow font-900 text-xl tracking-widest text-white">CAN TMT</span>
            </a>
            <p className="font-barlow font-600 text-orange-300 text-sm italic mb-3">
              {t.footer.tagline}
            </p>
            <p className="font-inter text-xs text-steel-600 leading-relaxed">
              {t.footer.isoNote}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-barlow font-700 text-xs uppercase tracking-widest text-steel-500 mb-4">Quick Links</h3>
            <ul className="space-y-2 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-inter text-sm text-steel-400 hover:text-orange-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact snippet */}
          <div>
            <h3 className="font-barlow font-700 text-xs uppercase tracking-widest text-steel-500 mb-4">Contact</h3>
            <div className="space-y-2 text-sm font-inter text-steel-400">
              <p>📞 {t.contact.phone}</p>
              <p>✉️ {t.contact.email}</p>
              <p>📍 {t.contact.address}</p>
            </div>
            <a
              href={`https://wa.me/${t.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs font-barlow font-700 tracking-widest uppercase text-[#25D366] hover:text-[#1fa350] transition-colors"
              aria-label="WhatsApp us"
            >
              <span>WhatsApp Us →</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="steel-divider mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steel-700 font-inter">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            {t.footer.links.map((link) => (
              <a key={link} href="#" className="hover:text-steel-400 transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
