import { useLang } from '../../lib/LangContext';
import { site, waLink } from '../../config/site';
import { Logo } from './Logo';

const HREFS = ['#why', '#brands', '#products', '#applications', '#contact', '#faq'];

export function Footer() {
  const { t } = useLang();
  const labels = [...t.nav.links, 'FAQ'];

  return (
    <footer className="relative z-10 bg-paper-300 border-t border-steel-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          <div>
            <a href="#top" className="inline-block mb-4" aria-label="CAN TMT home"><Logo /></a>
            <p className="font-barlow font-600 text-orange-600 text-lg uppercase tracking-wide">{t.hero.tagline}</p>
            <p className="font-inter text-sm text-steel-300 mb-3">{t.footer.tagline}</p>
            <p className="font-inter text-xs text-steel-500 leading-relaxed">{t.footer.isoNote}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-barlow font-700 text-xs uppercase tracking-widest text-steel-400 mb-4">{t.footer.quickLinks}</h2>
            <ul className="space-y-2" role="list">
              {HREFS.map((href, i) => (
                <li key={href}>
                  <a href={href} className="font-inter text-sm text-steel-300 hover:text-orange-600 transition-colors">{labels[i]}</a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic">
            <h2 className="font-barlow font-700 text-xs uppercase tracking-widest text-steel-400 mb-4">{t.footer.contact}</h2>
            <ul className="space-y-2 text-sm font-inter text-steel-300" role="list">
              <li><a href={`tel:${site.phone}`} className="hover:text-orange-600">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-orange-600">{site.email}</a></li>
              <li>{site.address}</li>
              <li className="text-steel-500">{site.serviceArea}</li>
            </ul>
            <a href={waLink(t.wa.general)} target="_blank" rel="noopener noreferrer"
              className="mt-5 inline-flex font-barlow font-700 text-sm tracking-widest uppercase text-[#25D366] hover:text-[#4be08a]">
              {t.hero.ctaSecondary} →
            </a>
          </address>
        </div>

        <div className="steel-divider mb-6" />
        <p className="text-xs text-steel-500 font-inter text-center sm:text-left">
          © {new Date().getFullYear()} CAN TMT. {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
