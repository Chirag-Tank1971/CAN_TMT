# CLAUDE.md

Static marketing site for CAN TMT, a brand of TMT steel bars (Vite + React + TS + Tailwind 3 + R3F + GSAP).

## Commands
- `npm run dev` / `npm run build` (runs `tsc -b`) / `npm test` / `npm run lint`
- Dev 3D lab: `/?test` (`&low`, `&view=closeup|end|bundle`, `&uMix=1` …). Also `/?low`, `/?no3d`, `/?lang=hi`.

## Structure
- `src/config/site.ts`: contact placeholders, grades, diameters, kg/m (`null` = TODO), stats. Business data lives here, not in components.
- `src/translations/en.ts` + `hi.ts`: all copy. `hi.ts` is typed as `Translations`, so both must have the same keys.
- `src/three/`: everything WebGL.
  - `barConfig.ts` (knobs) → `heightMap.ts` (canvas height + normal/cavity map) → `barGeometry.ts` → `barMaterial.ts` (onBeforeCompile shader edits).
  - `barAssets.ts` caches the built bar per tier; read it with `use()` inside `<Suspense>`.
  - `uniforms.ts`: shared shader uniforms, kept free of `three` imports so page code can drive them without pulling three into the main bundle.
  - `storyState.ts`: `story` object, `CHAPTERS`, callout `anchors`. GSAP writes, `useFrame` reads. Never put per-frame values in React state.
  - `StoryCanvas.tsx` (lazy chunk): camera rig, bar + slice, `Cage.tsx`. `TestScene.tsx` is dev-only.
- `src/components/sections/`: one file per page section. `Story.tsx` and `Process.tsx` own pinned ScrollTrigger timelines (`useGSAP` with scope).
- `src/lib/`: `scroll.ts` (Lenis driven by `gsap.ticker`, `scrollToTarget`), `useReveal.ts` (IntersectionObserver → `.in`), `LangContext.tsx`, `quote.ts` (pure, tested by `scripts/quote.test.mjs`).

## Conventions
- **Content:** never invent certifications, test results or numbers. Use visible `[TODO: …]`.
- **Motion:**
  - Scroll-linked motion uses GSAP.
  - Simple reveals use `data-reveal` + CSS.
  - Framer Motion is used only inside `Products.tsx`, which is lazy-loaded, behind `LazyMotion`. Don't import framer elsewhere: it would re-enter the main bundle.
- **Reduced motion:** every animated section has a static path. Check with DevTools → Rendering → `prefers-reduced-motion`.
- **GSAP + StrictMode:**
  - Initial states go inside the timeline (`tl.set(..., 0)` or `fromTo`), not a standalone `gsap.set`. Revert would wipe it.
  - Never pass an object that is also a React `style` prop to GSAP. React freezes it in dev.
- **SVG:** CSS variables must go in `style`, not presentation attributes.
- **Styling:**
  - Light theme. Tailwind tokens: `paper` (page/card surfaces), `ink` (text), `orange`, `steel`.
  - `steel` is inverted for the light theme: 50–500 are text greys (300/400/500 ≥4.5:1 on paper), 600–900 are borders and fills.
  - Orange: `orange-400` (#FF6A00) only for fills, lines and dots. Orange text uses `orange-600` / `--color-accent-text`, since #FF6A00 text fails contrast on light.
  - Primary buttons use ink text on orange, for contrast.
  - After editing `tailwind.config.js`, restart `npm run dev`: a running dev server keeps the old tokens.
  - Component classes live in `@layer components`, so utilities can override them.
- **Fonts** are self-hosted in `public/fonts` with fixed URLs (preloaded in `index.html`). Hindi falls back to the system Devanagari font, and `:lang(hi)` rules tighten tracking.
- Commit per milestone. Keep `npm run build` and `npm test` green.
