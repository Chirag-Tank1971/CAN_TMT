import { useRef, useState } from 'react';
import { useLang } from '../../lib/LangContext';
import { useReveal } from '../../lib/useReveal';
import { BRANDS, GRADES, site, waLink } from '../../config/site';
import { buildQuoteMessage, normalizePhone, type QuoteFields } from '../../lib/quote';
import { SectionHeader } from '../ui/SectionHeader';

const EMPTY: QuoteFields = { name: '', phone: '', city: '', quantity: '', brand: '', grade: '' };
type Errors = Partial<Record<keyof QuoteFields, string>>;

export function DealerContact() {
  const { t } = useLang();
  const c = t.contact, f = c.form;
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  const [data, setData] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const labels = { name: f.name, phone: f.phone, city: f.city, quantity: f.quantity, brand: f.brand, grade: f.grade };
  const set = (k: keyof QuoteFields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  /** Validates; returns the message (with the normalised phone) or null and shows errors. */
  const validate = () => {
    const errs: Errors = {};
    if (!data.name.trim()) errs.name = f.required;
    if (!data.city.trim()) errs.city = f.required;
    const phone = normalizePhone(data.phone);
    if (!phone) errs.phone = data.phone.trim() ? f.phoneInvalid : f.required;
    setErrors(errs);
    const first = Object.keys(errs)[0];
    if (first) { document.getElementById(`q-${first}`)?.focus(); return null; }
    return buildQuoteMessage(f.intro, labels, { ...data, phone: phone!, brand: data.brand || f.brandAny, grade: data.grade || f.gradeAny });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = validate();
    if (msg) window.open(waLink(msg), '_blank', 'noopener');
  };
  const onEmail = () => {
    const msg = validate();
    if (msg) location.href = `mailto:${site.email}?subject=${encodeURIComponent(f.subject)}&body=${encodeURIComponent(msg)}`;
  };

  const field = (k: keyof QuoteFields, input: React.ReactNode) => (
    <div>
      <label htmlFor={`q-${k}`} className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-300 mb-2">{labels[k]}{(k === 'name' || k === 'phone' || k === 'city') && ' *'}</label>
      {input}
      {errors[k] && <p id={`q-${k}-err`} className="mt-1.5 text-xs text-orange-600" role="alert">{errors[k]}</p>}
    </div>
  );
  const inputCls = (k: keyof QuoteFields) =>
    `w-full bg-paper-50 border ${errors[k] ? 'border-orange-400' : 'border-steel-600/50'} rounded-sm px-4 py-3 text-ink placeholder-steel-500 focus:border-orange-400 focus:outline-none transition-colors`;
  const aria = (k: keyof QuoteFields) => ({ id: `q-${k}`, 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `q-${k}-err` : undefined });

  const contacts = [
    { label: c.labels.whatsapp, value: site.phone, href: waLink(t.wa.general), ext: true },
    { label: c.labels.phone, value: site.phone, href: `tel:${site.phone}` },
    { label: c.labels.email, value: site.email, href: `mailto:${site.email}` },
    { label: c.labels.address, value: site.address, href: `https://maps.google.com/?q=${encodeURIComponent(site.address)}`, ext: true },
    { label: c.labels.area, value: site.serviceArea },
  ];

  return (
    <section id="contact" ref={ref} className="section-pad relative z-10" aria-labelledby="contact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <SectionHeader id="contact-heading" tag={c.tag} title={c.title} body={c.body} />
          <dl className="grid sm:grid-cols-2 gap-px bg-steel-700/30 border border-steel-700/30" data-reveal>
            {contacts.map((x) => (
              <div key={x.label} className="bg-paper p-5 min-w-0">
                <dt className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-400">{x.label}</dt>
                <dd className="mt-1 text-ink break-words">
                  {x.href ? <a href={x.href} {...(x.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="hover:text-orange-600 transition-colors">{x.value}</a> : x.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <form onSubmit={onSubmit} noValidate className="metal-card draw-top rounded-sm p-6 sm:p-8 space-y-5 self-start" data-reveal style={{ '--d': '120ms' } as React.CSSProperties} aria-labelledby="contact-heading">
          {field('name', <input {...aria('name')} className={inputCls('name')} autoComplete="name" value={data.name} onChange={set('name')} />)}
          <div className="grid sm:grid-cols-2 gap-5">
            {field('phone', <input {...aria('phone')} type="tel" inputMode="tel" autoComplete="tel" placeholder="98xxxxxxxx" className={inputCls('phone')} value={data.phone} onChange={set('phone')} />)}
            {field('city', <input {...aria('city')} autoComplete="address-level2" className={inputCls('city')} value={data.city} onChange={set('city')} />)}
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {field('quantity', <input {...aria('quantity')} type="number" min="0" step="0.5" inputMode="decimal" className={inputCls('quantity')} value={data.quantity} onChange={set('quantity')} />)}
            {field('brand', (
              <select {...aria('brand')} className={inputCls('brand')} value={data.brand} onChange={set('brand')}>
                <option value="">{f.brandAny}</option>
                {BRANDS.map((b) => <option key={b.name} value={b.name}>{b.name}</option>)}
              </select>
            ))}
          </div>
          {field('grade', (
            <select {...aria('grade')} className={inputCls('grade')} value={data.grade} onChange={set('grade')}>
              <option value="">{f.gradeAny}</option>
              {GRADES.map((g) => <option key={g.id} value={g.label}>{g.label}</option>)}
            </select>
          ))}
          <button type="submit" className="btn-primary w-full justify-center !py-4">{f.submit}</button>
          <button type="button" onClick={onEmail} className="w-full text-sm text-steel-300 underline underline-offset-4 hover:text-orange-600">{f.email}</button>
        </form>
      </div>
    </section>
  );
}
