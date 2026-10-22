# CAN TMT — Marketing Website

> **"Yes, we CAN build it." | मजबूत नींव, मजबूत घर।**

Premium marketing website for CAN TMT, an Indian TMT steel bars supplier.
Built with Vite + React + TypeScript, Three.js, GSAP, Lenis, and Framer Motion.

---

## Quick Start

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

---

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx           # Sticky navbar with blur on scroll, mobile menu
│   │   ├── Footer.tsx           # Footer with brand, links, contact
│   │   └── FloatingWhatsApp.tsx # Fixed WhatsApp button
│   ├── sections/
│   │   ├── Hero.tsx             # 3D canvas + headline + CTAs
│   │   ├── WhyCAN.tsx           # 6 animated feature cards
│   │   ├── CrossSection.tsx     # Ring diagram + manufacturing steps
│   │   ├── Products.tsx         # Grade/diameter selector + rod visual
│   │   ├── Applications.tsx     # 5 hover-reveal application cards
│   │   ├── Stats.tsx            # Animated stat counters
│   │   ├── HowToOrder.tsx       # 3-step order process
│   │   ├── DealerContact.tsx    # WhatsApp form + contact info
│   │   └── FAQ.tsx              # Accordion FAQ
│   └── three/
│       ├── TMTRod.tsx           # Procedural rebar geometry (R3F)
│       └── RodCanvas.tsx        # R3F Canvas wrapper with particles
├── hooks/
│   └── useDevicePerf.ts         # Low-power device detection
├── lib/
│   └── LangContext.tsx          # EN/Hindi language toggle context
├── translations/
│   ├── en.ts                    # All English copy (source of truth)
│   └── hi.ts                    # Hindi translations
├── App.tsx                      # Root: Lenis scroll, scroll phase, section assembly
├── main.tsx                     # React entry
└── index.css                    # Global styles, brand tokens, utilities
```

---

## Editing Content

### Copy & Text
All website copy lives in **`src/translations/en.ts`** (English) and **`src/translations/hi.ts`** (Hindi).

### TODO Placeholders to Fill

| Location | What to add |
|----------|-------------|
| `src/translations/en.ts` → `contact.phone` | Your phone number |
| `src/translations/en.ts` → `contact.email` | Your email address |
| `src/translations/en.ts` → `contact.address` | Your full address |
| `src/translations/en.ts` → `contact.whatsappNumber` | WhatsApp number (no + prefix) |
| `src/translations/en.ts` → `stats.items` | Years, tons, dealers, cities |
| `index.html` → JSON-LD schema | Address, phone, email |
| `index.html` → meta tags | Update `cantmt.in` to real domain |
| `why.features[5].body` | BIS/ISI certification & license no. |

### WhatsApp Number Format
International format without `+` sign: `919876543210` for +91 98765 43210.

---

## 3D Rod — Swapping in a Real GLB Model

1. Put your `.glb` file in `public/models/tmt-rod.glb`
2. Edit `src/components/three/TMTRod.tsx`:

```tsx
import { useGLTF } from '@react-three/drei';

export function TMTRod({ ... }) {
  const { scene } = useGLTF('/models/tmt-rod.glb');
  return <primitive object={scene} ref={groupRef} scale={scale} />;
}
```

The scroll-phase animation will continue to apply since it targets `groupRef`.

---

## Language Toggle

- `src/translations/en.ts` — English (source of truth, TypeScript type)
- `src/translations/hi.ts` — Hindi translations
- Toggle button appears in the desktop navbar and mobile menu

---

## Deploying to Vercel

```bash
npm i -g vercel
vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard:
- **Framework**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

The `vercel.json` configures SPA routing and long-term asset caching.

---

## SEO Checklist

- [x] Title, meta description, keywords
- [x] Open Graph and Twitter Cards
- [x] JSON-LD LocalBusiness schema
- [x] sitemap.xml and robots.txt
- [ ] Update domain `cantmt.in` everywhere
- [ ] Add real OG image at `public/og-image.jpg` (1200×630px)
- [ ] Add city/state to keyword list
- [ ] Submit sitemap to Google Search Console

---

## Credits

Built for CAN TMT — Chirag, Aakash, Nipendra.
