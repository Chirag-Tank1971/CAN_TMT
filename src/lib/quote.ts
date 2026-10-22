// Pure helpers for the quote form (no imports, so `npm test` can run them under plain Node).

/** Returns a 10-digit Indian mobile number, or null. Accepts +91 / 91 / 0 prefixes, spaces and dashes. */
export function normalizePhone(input: string): string | null {
  let d = input.replace(/\D/g, '');
  if (d.length === 12 && d.startsWith('91')) d = d.slice(2);
  else if (d.length === 11 && d.startsWith('0')) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d) ? d : null;
}

export interface QuoteFields { name: string; phone: string; city: string; quantity: string; grade: string }

/** Plain-text message used for both WhatsApp and the mailto body. Labels come from the active language. */
export function buildQuoteMessage(intro: string, labels: Record<keyof QuoteFields, string>, f: QuoteFields) {
  const rows = (Object.keys(labels) as (keyof QuoteFields)[])
    .filter((k) => f[k].trim())
    .map((k) => `${labels[k]}: ${f[k].trim()}`);
  return [intro, '', ...rows].join('\n');
}
