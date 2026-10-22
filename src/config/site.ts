// Business details: edit here once, used everywhere (navbar, footer, form, JSON-LD in index.html is separate).
export const site = {
  phone: '[NUMBER]',          // TODO: e.g. '+91 98xxxxxxx'
  whatsapp: '[NUMBER]',       // TODO: digits only with country code, e.g. '9198xxxxxxxx'
  email: '[EMAIL]',           // TODO
  address: '[ADDRESS]',       // TODO
  serviceArea: '[CITIES/STATES]', // TODO
};

/**
 * Mills we buy from and supply. Logos are the owners' trademarks: add a file to public/brands/ only with
 * permission, then set e.g. logo: '/brands/jindal.webp' (cropped to the logo, web-optimised). Until then the name is shown as text.
 * `noteKey` points at a short note in translations (brands.notes).
 */
export const BRANDS: { name: string; logo: string | null; noteKey?: 'shortLength' }[] = [
  { name: 'Kamdhenu TMT', logo: '/brands/kamdhenu.webp', noteKey: 'shortLength' },
  { name: 'Rathi TMT', logo: '/brands/rathi.webp' },
  { name: 'Sharma TMT', logo: null }, // TODO: the file supplied showed "Shree TMT Xtra 550", not Sharma
  { name: 'Jindal TMT', logo: '/brands/jindal.webp' },
  { name: 'Premier TMT', logo: '/brands/premier.webp' }, // TODO: low-res crop from a flyer; replace with a clean logo file
  { name: 'Mangalam TMT', logo: '/brands/mangalam.webp' },
];

export const GRADES = [
  { id: 'fe500', label: 'Fe 500' },
  { id: 'fe500d', label: 'Fe 500D' },
  { id: 'fe550d', label: 'Fe 550D' },
  { id: 'fe600', label: 'Fe 600' },
] as const;

export const DIAMETERS = [8, 10, 12, 16, 20, 25, 32] as const;

/** kg per metre for each diameter. TODO: fill in from your own product sheet; null shows a TODO on the site. */
export const WEIGHT_PER_M: Record<(typeof DIAMETERS)[number], number | null> = {
  8: null, 10: null, 12: null, 16: null, 20: null, 25: null, 32: null,
};

/** TODO: replace with real numbers. Shown with a visible "Placeholder" tag until `confirmed` is true. */
export const STATS = { confirmed: false, items: [
  { value: 10, suffix: '+' },
  { value: 50000, suffix: '+' },
  { value: 100, suffix: '+' },
  { value: 25, suffix: '+' },
] };

export const waLink =(msg?: string) =>
  `https://wa.me/${site.whatsapp}${msg ? `?text=${encodeURIComponent(msg)}` : ''}`;
