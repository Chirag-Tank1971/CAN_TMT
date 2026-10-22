// All site copy. Keep it short and confident. Never state certifications, test results or numbers
// that aren't confirmed — use a visible [TODO: …] instead. hi.ts must mirror this shape exactly.
export const en = {
  nav: {
    links: ['Why CAN TMT', 'Products', 'Applications', 'Contact'],
    cta: 'Get a Quote',
    skip: 'Skip to content',
  },
  hero: {
    tagline: 'Yes, we CAN build it.',
    ctaSecondary: 'WhatsApp Us',
  },
  story: {
    chapters: ['The Bar', 'Grip', 'Identity', 'Inside', 'Flex', 'Your Home'],
    scroll: 'Scroll',
    ch1: { tag: 'Yes, we CAN build it.', title: 'Steel that holds\nyour home together', body: 'CAN TMT bars for homes and every kind of construction. Mazboot Neev, Mazboot Ghar.' },
    ch2: { tag: '01 — Grip', title: 'Grip that\ndoesn\'t let go', body: 'Angled ribs lock into concrete, so steel and concrete work as one.', ribs: 'Angled ribs lock into concrete', longRib: 'Longitudinal rib' },
    ch3: { tag: '02 — Identity', title: 'Every bar\ncarries our mark', body: 'Look for the raised CAN TMT mark along the bar. No mark, not ours.', mark: 'Embossed CAN TMT mark' },
    ch4: { tag: '03 — Inside', title: 'Hard outside.\nTough inside.', body: 'Quenching hardens the outer ring. The core stays soft and ductile, so the bar is strong and still bends.', ring: 'Hard tempered outer ring', core: 'Soft, ductile core', hot: 'Hot core', cool: 'Quenched skin' },
    ch5: { tag: '04 — Flex', title: 'Bends before\nit breaks', body: 'Ductility lets the bar absorb shocks. That is what keeps a structure standing in an earthquake.' },
    ch6: { tag: '05 — Your Home', title: 'From one bar\nto your whole home', body: 'Columns, beams and stirrups. Built with CAN TMT, built to last.' },
  },
  why: {
    tag: 'Why CAN TMT',
    title: 'Built for the way\nIndia builds',
    items: [
      { title: 'Strength', body: 'High-strength steel that carries heavy loads, floor after floor.' },
      { title: 'Ductility', body: 'A soft, tough core lets the bar bend instead of snapping.' },
      { title: 'Earthquake resistance', body: 'Bars that flex absorb shocks, so the frame holds together when the ground moves.' },
      { title: 'Weldability', body: 'Made for clean joints on site. [TODO: confirm carbon-equivalent / welding spec]' },
      { title: 'Corrosion resistance', body: 'A dense outer layer helps protect the steel from rust. [TODO: confirm with test data]' },
    ],
    cert: '[TODO: ISI / BIS licence number and IS 1786 compliance details]',
  },
  process: {
    tag: 'How it\'s made',
    title: 'Fire. Water. Air.',
    steps: [
      { title: 'Quenching', body: 'The red-hot bar leaves the rolling mill and passes through high-pressure water. The outer skin cools fast and turns hard.' },
      { title: 'Self-tempering', body: 'Heat from the still-hot core flows outward and tempers the skin, making it tough instead of brittle.' },
      { title: 'Atmospheric cooling', body: 'The bar cools slowly in open air. The core becomes soft and ductile.' },
    ],
    skin: 'Skin',
    core: 'Core',
  },
  products: {
    tag: 'Product range',
    title: 'Pick your grade\nand size',
    grade: 'Grade',
    diameter: 'Diameter',
    weight: 'Weight per metre',
    weightTodo: '[TODO: add kg/m]',
    bestFor: 'Typical use',
    uses: {
      fe500: 'General building work',
      fe500d: 'Homes and buildings in earthquake-prone areas',
      fe550d: 'Heavier structures and multi-storey buildings',
      fe600: 'Large infrastructure projects',
    },
    dNote: '"D" grades have higher ductility.',
    advice: 'Always follow your structural engineer\'s drawings.',
    cta: 'Get price for this size',
    waMsg: 'Hello CAN TMT! Please share the price for {grade}, {dia} mm TMT bars.',
  },
  applications: {
    tag: 'Applications',
    title: 'From one room\nto a city skyline',
    items: [
      { title: 'Homes', body: 'From the foundation to the roof slab of your family home.' },
      { title: 'Apartments', body: 'The same quality on every floor of a multi-storey building.' },
      { title: 'Bridges', body: 'Long spans and heavy loads that need steel you can trust.' },
      { title: 'Commercial buildings', body: 'Offices, shops and malls built to last for decades.' },
      { title: 'Industrial buildings', body: 'Factories, warehouses and plants that carry heavy machines.' },
    ],
    hint: 'Tap a card',
  },
  stats: {
    tag: 'Track record',
    title: 'Numbers that\nbuild trust',
    labels: ['Years of experience', 'Tons supplied', 'Dealers', 'Cities'],
    todo: 'Placeholder',
  },
  order: {
    tag: 'How to order',
    title: 'Three simple steps',
    steps: [
      { title: 'Enquire', body: 'Call, WhatsApp or fill the form. Tell us the grade, size and quantity.' },
      { title: 'Quote', body: 'We send you a clear price for your order. [TODO: response time]' },
      { title: 'Delivery', body: 'We deliver to your site. [TODO: delivery areas and lead time]' },
    ],
  },
  contact: {
    tag: 'Dealer & contact',
    title: 'Find a dealer.\nGet a bulk quote.',
    body: 'Send us your requirement on WhatsApp. We will get back to you with a price and your nearest dealer.',
    form: {
      name: 'Name',
      phone: 'Phone',
      city: 'City',
      quantity: 'Quantity (tons)',
      grade: 'Grade',
      gradeAny: 'Not sure',
      submit: 'Send on WhatsApp',
      email: 'Send by email instead',
      required: 'Please fill this in',
      phoneInvalid: 'Enter a 10-digit mobile number',
      subject: 'Bulk quote request',
      intro: 'Hello CAN TMT! I need a quote.',
    },
    labels: { whatsapp: 'WhatsApp', phone: 'Phone', email: 'Email', address: 'Address', area: 'Service area' },
  },
  faq: {
    tag: 'FAQ',
    title: 'Questions we\nhear every day',
    items: [
      {
        q: 'What is the difference between TMT bars and ordinary saria?',
        a: 'Ordinary saria (mild steel) is the same all the way through. A TMT bar is quenched and self-tempered, which gives it a hard outer layer and a soft, ductile core. The result is a bar that is strong and still bends without cracking.',
      },
      {
        q: 'How do I check bar quality on site?',
        a: 'Check that the ribs are even and sharp along the whole length. Look for the maker\'s mark and grade on the bar. A good bar bends without cracks on the outside of the bend. Ask for the mill test certificate for your batch.',
      },
      {
        q: 'Which grade should I use for my house?',
        a: 'Most homes use Fe 500 or Fe 500D. "D" grades have higher ductility, which helps in earthquake-prone areas. Always follow your structural engineer\'s drawings.',
      },
      {
        q: 'How do I identify genuine CAN TMT bars?',
        a: 'Every genuine bar carries the raised CAN TMT mark at regular intervals along its length. Buy from an authorised dealer and always ask for a bill. [TODO: add licence number / dealer verification]',
      },
    ],
  },
  wa: {
    label: 'Chat on WhatsApp',
    general: 'Hello CAN TMT! I need TMT bars for my project.',
  },
  footer: {
    tagline: 'Mazboot Neev, Mazboot Ghar.',
    copyright: 'All rights reserved.',
    quickLinks: 'Quick links',
    contact: 'Contact',
    isoNote: '[TODO: ISI / BIS licence and IS 1786 details]',
  },
};

export type Translations = typeof en;
