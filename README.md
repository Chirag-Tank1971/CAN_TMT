# CAN TMT — marketing website

"Yes, we CAN build it." · मज़बूत नींव, मज़बूत घर।

A static site for CAN TMT bars. The 3D TMT bar is generated in code (no model files) and changes chapter by chapter as you scroll.

**Stack:** Vite, React, TypeScript, Tailwind CSS, three.js + React Three Fiber + drei, GSAP ScrollTrigger, Lenis and Framer Motion. There is no backend: the quote form opens WhatsApp, with email as a fallback.

## Setup

Requires Node 22.18 or newer (the test script runs TypeScript directly).

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview   # serve dist/ on http://localhost:4173
npm test          # quote-form helpers (phone check, message builder)
npm run lint
```

Useful URLs while developing:

| URL | What it shows |
|---|---|
| `/?test` | 3D lab (dev only): sliders for polished ↔ mill-scale, bend, cross-section, heat and fan. Add `&low` for the phone-quality bar and `&view=closeup\|end\|bundle` to pick a camera. |
| `/?low` | Forces the low-end device tier on the real page. |
| `/?no3d` | The page with the static image instead of WebGL. |
| `/?lang=hi` | Opens in Hindi on a first visit. After that, the visitor's choice is remembered. |

## Before going live: fill the placeholders

Search the project for `TODO`, `[NUMBER]`, `[EMAIL]`, `[ADDRESS]`, `[CITIES/STATES]`, `[CITY/STATE]` and `YOUR-DOMAIN`.

| What | Where |
|---|---|
| Phone, WhatsApp number (digits with country code, e.g. `9198…`), email, address, service area | `src/config/site.ts` |
| Weight per metre for each diameter (shows "TODO" until filled) | `WEIGHT_PER_M` in `src/config/site.ts` |
| Stat numbers. Set `confirmed: true` to hide the "Placeholder" tags. | `STATS` in `src/config/site.ts` |
| ISI/BIS licence, IS 1786 details, welding/corrosion claims, delivery times | `[TODO: …]` strings in `src/translations/en.ts` and `hi.ts` |
| Domain, city/state keywords, JSON-LD business details | `index.html`, `public/robots.txt`, `public/sitemap.xml` |

Do not add certifications, test results or numbers until they are confirmed.

## Editing content

All copy lives in `src/translations/en.ts` (English) and `src/translations/hi.ts` (Hindi). Both files have the same shape, and TypeScript will flag a key missing from `hi.ts`. Inside titles, `\n` splits the white first line from the orange second line.

## Tweaking the bar

Everything lives in `src/three/barConfig.ts`, and the page rebuilds the bar on reload. Use `/?test` to see changes up close.

| Setting | Effect |
|---|---|
| `ribAngle` | Rib angle to the bar axis in degrees (90 = a ring around the bar) |
| `ribSpacing`, `ribWidth`, `ribHeight`, `ribBow` | Rib pitch, width, height and crescent curve |
| `ribGap`, `longRibHeight`, `longRibWidth` | The two longitudinal ribs and the clear strip beside them |
| `radius`, `length` | Bar size (1 unit = 1 bar diameter) |
| `tiers` | Mesh segments and texture size for desktop (`high`) and phones (`low`) |

How it works:
- `heightMap.ts` draws the ribs and lettering onto a canvas that wraps around the bar. From it, it builds a height field and a normal map; the normal map's alpha channel marks the recesses.
- `barGeometry.ts` pushes the mesh vertices out by that height, which gives the real silhouette.
- `barMaterial.ts` uses the normal map for the fine detail. The uniform `uMix` blends polished steel into mill-scale, and rust appears only where the alpha channel marks a recess.

### Changing the embossed text

Set `embossText` (default `CAN TMT`), `embossSize`, `embossHeight` and `embossEvery` (spacing along the bar) in `barConfig.ts`. The square "C" mark is drawn next to it in `heightMap.ts`. Look for `strokeRect` and `fillText('C'`.

## Swapping in a scanned model (GLB)

1. Put the file in `public/models/bar.glb`.
2. Set `MODEL_URL: '/models/bar.glb'` in `src/three/barConfig.ts`.

`Bar.tsx` then loads it with `useGLTF` instead of the procedural geometry, scaled to the bar length and centred. Limits:
- The scroll story's bundle, slice, bend and material blend still use the procedural bar. To drive a scan with them, apply the scan's geometry to `createBarMaterials()` in `Bundle.tsx` and `StoryCanvas.tsx`.
- The GLB path has not been tested with a real file yet.

## Scroll story

`src/components/sections/Story.tsx` holds one GSAP timeline, scrubbed over 700 vh on desktop and 450 vh on phones. Chapter start points are listed in `CHAPTERS` in `src/three/storyState.ts`. The timeline tweens a plain `story` object plus the material uniforms, and the 3D scene reads them every frame. Callout labels are HTML elements pinned to 3D points through `anchors` in `storyState.ts`.

Performance choices:
- WebGL starts on the visitor's first interaction (pointer, touch, scroll or key). Until then the static `public/fallback-bar.webp` shows. Visitors with no WebGL keep the image.
- Reduced-motion visitors get a static, unpinned version.
- Phones use the `low` tier: a smaller mesh and maps, one storey and fewer stirrups in chapter 6.

## Deploying to Vercel

1. Push the repo to GitHub, GitLab or Bitbucket.
2. In Vercel, choose **New Project** and import the repo. The Vite preset is detected: build command `npm run build`, output directory `dist`.
3. Deploy. `vercel.json` already sets the SPA rewrite, long caching for `/assets` and `/fonts`, and basic security headers.
4. Add your domain, then replace `YOUR-DOMAIN.in` in `index.html`, `robots.txt` and `sitemap.xml`.

From the command line, `npx vercel` followed by `npx vercel --prod` does the same.

## Lighthouse (local production preview, 22 Oct 2026)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop | 92 | 100 | 100 | 100 |
| Mobile (simulated slow 4G + 4× CPU) | 78–84 | 100 | 100 | 100 |

Mobile performance is held back by the time to the first render of a client-rendered React app (LCP about 3 s). The next step to reach 90+ would be prerendering the HTML at build time.
