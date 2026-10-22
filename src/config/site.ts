// Business details: edit here once, used everywhere (navbar, footer, form, JSON-LD in index.html is separate).
export const site = {
  phone: '[NUMBER]',          // TODO: e.g. '+91 98xxxxxxx'
  whatsapp: '[NUMBER]',       // TODO: digits only with country code, e.g. '9198xxxxxxxx'
  email: '[EMAIL]',           // TODO
  address: '[ADDRESS]',       // TODO
  serviceArea: '[CITIES/STATES]', // TODO
};

export const waLink = (msg?: string) =>
  `https://wa.me/${site.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
