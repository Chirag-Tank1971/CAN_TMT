import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLang } from '../../lib/LangContext';

export function DealerContact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    grade: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello CAN TMT!\n\nName: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nGrade Required: ${formData.grade}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${t.contact.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmailFallback = (e: React.MouseEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent('CAN TMT Quote Request');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nPhone: ${formData.phone}\nCity: ${formData.city}\nGrade: ${formData.grade}\nMessage: ${formData.message}`
    );
    window.location.href = `mailto:${t.contact.email}?subject=${subject}&body=${body}`;
  };

  const inputClass =
    'w-full bg-steel-800/30 border border-steel-700/40 rounded-sm px-4 py-3 font-inter text-sm text-white placeholder-steel-600 focus:border-orange-400 focus:outline-none transition-colors';

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-pad relative z-10"
      aria-labelledby="contact-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left: contact info */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="section-tag mb-6">{t.contact.sectionTag}</div>
            <h2
              id="contact-heading"
              className="section-heading text-white mb-4"
            >
              {t.contact.heading}
            </h2>
            <p className="font-inter text-steel-400 mb-10 leading-relaxed">
              {t.contact.subheading}
            </p>

            {/* Contact details */}
            <div className="space-y-6">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.36 1.902.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.92a16 16 0 0 0 6.29 6.29l.87-.87a2 2 0 0 1 2.11-.45c.908.34 1.85.573 2.81.7A2 2 0 0 1 21.88 17z"/>
                    </svg>
                  ),
                  label: 'Phone / WhatsApp',
                  value: t.contact.phone,
                  href: `tel:${t.contact.phone}`,
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                  ),
                  label: 'Email',
                  value: t.contact.email,
                  href: `mailto:${t.contact.email}`,
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                  ),
                  label: 'Address',
                  value: t.contact.address,
                  href: `https://maps.google.com/?q=${encodeURIComponent(t.contact.address)}`,
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.label === 'Address' ? '_blank' : undefined}
                  rel={item.label === 'Address' ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4 text-steel-400 hover:text-orange-400 transition-colors group"
                  aria-label={`${item.label}: ${item.value}`}
                >
                  <span className="text-orange-400 mt-0.5 shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-xs font-barlow font-700 tracking-widest uppercase text-steel-600 mb-0.5">
                      {item.label}
                    </p>
                    <p className="font-inter text-sm group-hover:text-orange-400 transition-colors">{item.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* WhatsApp direct */}
            <motion.a
              href={`https://wa.me/${t.contact.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="mt-10 flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-sm px-5 py-4 text-[#25D366] hover:bg-[#25D366]/20 transition-colors"
              aria-label="Chat directly on WhatsApp"
            >
              <svg width="24" height="24" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.83 6.82L2 30l7.36-1.79A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2zm6.37 19c-.35-.17-2.07-1.02-2.39-1.14-.32-.12-.56-.17-.79.17-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.17-1.49-.55-2.84-1.75-1.05-.94-1.76-2.1-1.96-2.45-.2-.35-.02-.54.15-.71.16-.16.35-.41.52-.62.17-.2.23-.35.35-.58.12-.23.06-.44-.03-.62-.09-.17-.79-1.91-1.09-2.62-.29-.69-.58-.59-.79-.6l-.68-.01c-.23 0-.61.09-.93.44-.32.35-1.22 1.2-1.22 2.92s1.25 3.39 1.42 3.62c.17.23 2.46 3.76 5.96 5.27.83.36 1.48.57 1.99.73.84.27 1.6.23 2.2.14.67-.1 2.07-.85 2.36-1.67.29-.82.29-1.52.2-1.67-.08-.15-.32-.24-.67-.41z"/>
              </svg>
              <span className="font-barlow font-700 tracking-wide">Chat on WhatsApp</span>
            </motion.a>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <form
              onSubmit={handleWhatsAppSubmit}
              className="metal-card rounded-sm p-8 space-y-5"
              aria-label="Quote request form"
              noValidate
            >
              <h3 className="font-barlow font-800 text-xl uppercase text-white mb-2">
                Request a Quote
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-2">
                    {t.contact.formName} *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ramesh Kumar"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-2">
                    {t.contact.formPhone} *
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-city" className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-2">
                    {t.contact.formCity}
                  </label>
                  <input
                    id="contact-city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Jaipur"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-grade" className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-2">
                    {t.contact.formGrade}
                  </label>
                  <select
                    id="contact-grade"
                    name="grade"
                    value={formData.grade}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select grade…</option>
                    <option value="Fe 500">Fe 500</option>
                    <option value="Fe 500D">Fe 500D</option>
                    <option value="Fe 550D">Fe 550D</option>
                    <option value="Fe 600">Fe 600</option>
                    <option value="Not sure">Not sure, need advice</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-barlow font-700 tracking-widest uppercase text-steel-500 mb-2">
                  {t.contact.formMessage}
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="E.g. 5 MT of Fe 500D, 16mm, for residential project in [city]"
                  className={inputClass + ' resize-none'}
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full justify-center"
                aria-label="Submit quote request via WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                  <path d="M16 2C8.28 2 2 8.28 2 16c0 2.48.67 4.8 1.83 6.82L2 30l7.36-1.79A13.94 13.94 0 0 0 16 30c7.72 0 14-6.28 14-14S23.72 2 16 2z"/>
                </svg>
                {t.contact.formSubmit}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleEmailFallback}
                  className="text-xs text-steel-600 hover:text-orange-400 transition-colors font-inter underline underline-offset-2"
                  aria-label="Send via email instead"
                >
                  {t.contact.formFallback}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="steel-divider mt-20" />
    </section>
  );
}
