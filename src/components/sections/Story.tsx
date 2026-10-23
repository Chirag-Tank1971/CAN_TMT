import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLang } from '../../lib/LangContext';
import { scrollToTarget } from '../../lib/scroll';
import { waLink } from '../../config/site';
import { getTier, hasWebGL, prefersReducedMotion } from '../../hooks/useDevicePerf';
import { story, anchors, pointer, CHAPTERS } from '../../three/storyState';
import { barUniforms } from '../../three/uniforms';

gsap.registerPlugin(ScrollTrigger);

const StoryCanvas = lazy(() => import('../../three/StoryCanvas'));

// initial values, restored on unmount so HMR / remounts start from chapter 1
const STORY0 = { ...story };
const U0 = { uMix: 0, uBend: 0, uSection: 0, uHeat: 0 };

function Callout({ id, label }: { id: string; label: string }) {
  return (
    <div
      ref={(el) => { const a = anchors.find((x) => x.id === id); if (a) a.el = el; }}
      data-callout={id}
      className="callout"
      style={{ '--draw': 0 } as React.CSSProperties}
    >
      <span className="callout-dot" />
      <span className="callout-line" />
      <span className="callout-label">{label}</span>
    </div>
  );
}

export function Story() {
  const { t } = useLang();
  const s = t.story;
  const root = useRef<HTMLElement>(null);
  const reduced = useMemo(prefersReducedMotion, []);
  const tier = useMemo(getTier, []);
  const webgl = useMemo(hasWebGL, []);
  const [mountCanvas, setMountCanvas] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(true);
  const [chapter, setChapter] = useState(0);
  const trigger = useRef<ScrollTrigger | null>(null);
  const onReady = useCallback(() => setReady(true), []);

  // Start WebGL on the first interaction: the headline + fallback image paint immediately and the heavy
  // 3D init never competes with page load on slow phones. Visitors who never interact keep the still image.
  useEffect(() => {
    if (!webgl) return;
    const events = ['pointerdown', 'pointermove', 'touchstart', 'wheel', 'keydown', 'scroll'] as const;
    const start = () => { setMountCanvas(true); stop(); };
    const stop = () => events.forEach((e) => removeEventListener(e, start));
    events.forEach((e) => addEventListener(e, start, { passive: true }));
    return stop;
  }, [webgl]);

  // Desktop pointer parallax
  useEffect(() => {
    if (reduced || !matchMedia('(pointer: fine)').matches) return;
    const move = (e: PointerEvent) => { pointer.x = (e.clientX / innerWidth) * 2 - 1; pointer.y = -((e.clientY / innerHeight) * 2 - 1); };
    addEventListener('pointermove', move, { passive: true });
    return () => removeEventListener('pointermove', move);
  }, [reduced]);

  useGSAP(() => {
    if (reduced) return;
    const q = gsap.utils.selector(root);
    const panels = q('[data-panel]');
    const callout = (id: string) => q(`[data-callout="${id}"]`);
    const draw = (targets: Element[], at: number, out: number) => {
      tl.fromTo(targets, { '--draw': 0 }, { '--draw': 1, duration: 0.04, ease: 'power2.out' }, at);
      tl.to(targets, { '--draw': 0, duration: 0.025, ease: 'power2.in' }, out);
    };
    const panel = (i: number, at: number, out?: number) => {
      tl.fromTo(panels[i], { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.03, ease: 'power3.out' }, at);
      if (out !== undefined) tl.to(panels[i], { opacity: 0, y: -30, duration: 0.025, ease: 'power2.in' }, out);
    };

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      scrollTrigger: {
        trigger: root.current,
        start: 'top top',
        end: () => `+=${innerHeight * (tier === 'low' ? 4.5 : 7)}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          let i = 0;
          while (i < CHAPTERS.length - 1 && self.progress >= CHAPTERS[i + 1] - 0.005) i++;
          setChapter(i);
        },
        onToggle: (self) => setActive(self.isActive || self.progress < 1),
      },
    });
    trigger.current = tl.scrollTrigger ?? null;
    const U = barUniforms;

    // Ch1 → Ch2: bundle collapses to one bar, camera pushes along its length to the ribs
    tl.to(panels[0], { opacity: 0, y: -30, duration: 0.03, ease: 'power2.in' }, 0.1);
    tl.to(story, { fan: 0, idle: 0, rotX: -0.35, rotY: 0, rotZ: 0, duration: 0.07 }, 0.14);
    tl.to(story, { cx: 9.2, cy: 1.3, cz: 3.6, tx: 4.4, ty: 0, tz: 0, shift: 0.55, px: 0.9, duration: 0.09 }, 0.14);
    panel(1, 0.19, 0.27);
    draw([...callout('ribs'), ...callout('longRib')], 0.21, 0.27);

    // Ch3: rotate to the lettering, polished → mill-scale
    tl.to(story, { rotX: 0, cx: 0.9, cy: 0.6, cz: 5.6, tx: 1.3, ty: 0, px: 0.8, duration: 0.07 }, 0.3);
    tl.to(U.uMix, { value: 1, duration: 0.09, ease: 'none' }, 0.33);
    panel(2, 0.35, 0.43);
    draw(callout('mark'), 0.37, 0.43);

    // Ch4: cut end to camera, slice opens into the cross-section
    tl.to(story, { cx: 11.6, cy: 1.1, cz: 3.2, tx: 6.0, ty: 0.2, shift: 0.5, px: 0.3, duration: 0.06 }, 0.46);
    tl.to(story, { slice: 1, duration: 0.05 }, 0.52);
    tl.to(U.uSection, { value: 1, duration: 0.03 }, 0.52);
    tl.to(U.uHeat, { value: 1, duration: 0.04, ease: 'power1.out' }, 0.53);
    panel(3, 0.5, 0.59);
    draw([...callout('ring'), ...callout('core')], 0.56, 0.59);

    // Ch5: piece returns, side view, bar flexes and springs back
    tl.to(story, { slice: 0, duration: 0.04 }, 0.62);
    tl.to([U.uSection, U.uHeat], { value: 0, duration: 0.03 }, 0.62);
    tl.to(story, { cx: 0, cy: 1.6, cz: 27, tx: 0, ty: 1.2, tz: 0, rotX: 0, shift: 0.7, px: 0, duration: 0.06 }, 0.62);
    tl.to(U.uBend, { value: 1, duration: 0.05, ease: 'power2.inOut' }, 0.67);
    tl.to(U.uBend, { value: 0, duration: 0.055, ease: 'elastic.out(1, 0.45)' }, 0.72);
    panel(4, 0.66, 0.75);

    // Ch6: bar multiplies into a rebar cage, camera pulls back to the house frame
    tl.to(story, { barScale: 0, duration: 0.035, ease: 'power2.in' }, 0.79);
    tl.to(story, { cage: 1, duration: 0.13, ease: 'none' }, 0.8);
    tl.to(story, { cx: 25, cy: 11, cz: 37, tx: 0, ty: -0.6, tz: 0, shift: 0.8, duration: 0.15 }, 0.79);
    tl.to(story, { house: 1, duration: 0.05 }, 0.91);
    panel(5, 0.88);
    tl.set({}, {}, 1); // pin the timeline length to exactly 1 so CHAPTERS map 1:1 to progress

    return () => {
      Object.assign(story, STORY0);
      for (const k of Object.keys(U0) as (keyof typeof U0)[]) barUniforms[k].value = U0[k];
    };
  }, { scope: root, dependencies: [reduced, tier] });

  const goTo = (i: number) => {
    const st = trigger.current;
    if (!st) return;
    const p = i === 0 ? 0 : CHAPTERS[i] + (i === 5 ? 0.18 : 0.08);
    scrollToTarget(st.start + (st.end - st.start) * p);
  };

  const quote = (e: React.MouseEvent) => { e.preventDefault(); scrollToTarget('#contact'); };
  const CTAs = (
    <div className="story-cta flex flex-wrap gap-3 mt-8">
      <a href="#contact" onClick={quote} className="btn-primary">{t.nav.cta}</a>
      <a href={waLink(t.wa.general)} target="_blank" rel="noopener noreferrer" className="btn-secondary">{t.hero.ctaSecondary}</a>
    </div>
  );
  const Title = ({ text, as: H = 'h2' }: { text: string; as?: 'h1' | 'h2' }) => (
    <H className="story-title">{text.split('\n').map((l, i) => <span key={i} className="block">{l}{' '}</span>)}</H>
  );
  const chapters = [s.ch1, s.ch2, s.ch3, s.ch4, s.ch5, s.ch6];
  const TAGS: string[][] = [[], [s.ch2.ribs, s.ch2.longRib], [s.ch3.mark], [s.ch4.ring, s.ch4.core], [], []];

  if (reduced) {
    return (
      <section id="story" aria-label={s.chapters[0]} className="relative pt-28 pb-16">
        <img src="/fallback-bar.webp" alt="TMT steel bars with angled ribs and an embossed maker's mark" width={1280} height={720} className="w-full max-w-5xl mx-auto opacity-90" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-16 mt-10">
          {chapters.map((c, i) => (
            <div key={i}>
              <p className="section-tag mb-4">{c.tag}</p>
              <Title text={c.title} as={i === 0 ? 'h1' : 'h2'} />
              <p className="story-body">{c.body}</p>
              {(i === 0 || i === 5) && CTAs}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={root} id="story" aria-label={s.chapters[0]} className="relative h-[100svh] overflow-hidden">
      <img
        src="/fallback-bar.webp"
        alt="TMT steel bars with angled ribs and an embossed maker's mark"
        width={1280}
        height={720}
        fetchPriority="high"
        className={`absolute inset-0 w-full h-full object-cover object-[70%_50%] transition-opacity duration-700 ${ready ? 'opacity-0' : 'opacity-60'}`}
      />
      {/* cool galvanised pool of light so silver steel has something to sit on (white alone washes it out) */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_45%_at_50%_32%,#e3e8ee_0%,#f1f4f7_45%,transparent_75%)] lg:bg-[radial-gradient(ellipse_45%_55%_at_68%_50%,#e3e8ee_0%,#f1f4f7_45%,transparent_75%)]" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        {mountCanvas && (
          <Suspense fallback={null}>
            <StoryCanvas tier={tier} active={active} onReady={onReady} />
          </Suspense>
        )}
      </div>
      {/* readability: white fade only behind the text column (left on desktop, bottom on mobile), never over the steel */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-paper from-20% via-paper/60 via-35% to-transparent to-55% lg:bg-gradient-to-r lg:from-paper lg:from-15% lg:via-paper/60 lg:via-30% lg:to-transparent lg:to-48%" />

      {/* 3D-pinned callouts need room; on phones the same labels appear as tags in the panel instead */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block" aria-hidden="true">
        <Callout id="ribs" label={s.ch2.ribs} />
        <Callout id="longRib" label={s.ch2.longRib} />
        <Callout id="mark" label={s.ch3.mark} />
        <Callout id="ring" label={s.ch4.ring} />
        <Callout id="core" label={s.ch4.core} />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6">
        {chapters.map((c, i) => (
          // outer div positions (CSS transform), inner div is animated by GSAP (its own transform)
          // flex (not top offsets) keeps tall panels inside the pinned viewport: bottom-aligned on phones, centred on desktop
          <div key={i} className={`absolute inset-x-4 sm:inset-x-6 inset-y-0 flex flex-col justify-end pt-24 pb-20 lg:justify-center lg:pb-0 lg:max-w-xl ${chapter === i ? '' : 'pointer-events-none'}`}>
          <div data-panel style={{ opacity: i === 0 ? 1 : 0 }}>
            <p className="section-tag mb-4">{c.tag}</p>
            <Title text={c.title} as={i === 0 ? 'h1' : 'h2'} />
            <p className="story-body">{c.body}</p>
            {TAGS[i].length > 0 && (
              <ul className="sm:hidden flex flex-wrap gap-2 mt-4" role="list">
                {TAGS[i].map((tag) => (
                  <li key={tag} className="font-barlow font-700 text-xs uppercase tracking-wider text-ink bg-paper/70 border-l-2 border-orange-400 px-2 py-1">{tag}</li>
                ))}
              </ul>
            )}
            {i === 3 && (
              <div className="mt-6 max-w-xs" aria-hidden="true">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-[#fff1c2] via-[#ff6a00] to-[#23262b]" />
                <div className="flex justify-between text-xs text-steel-300 mt-2 font-barlow tracking-widest uppercase">
                  <span>{s.ch4.hot}</span><span>{s.ch4.cool}</span>
                </div>
              </div>
            )}
            {(i === 0 || i === 5) && CTAs}
          </div>
          </div>
        ))}

        <div className={`scroll-cue absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity ${chapter === 0 ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true">
          <span className="text-[11px] font-barlow tracking-[0.3em] uppercase text-steel-400">{s.scroll}</span>
          <span className="block w-px h-10 bg-gradient-to-b from-orange-400 to-transparent animate-scroll-cue" />
        </div>
      </div>

      <nav aria-label="Story chapters" className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-10">
        {s.chapters.map((name, i) => (
          <button key={i} onClick={() => goTo(i)} aria-current={chapter === i ? 'step' : undefined}
            className="group relative flex items-center justify-end p-1.5">
            <span className="absolute right-7 whitespace-nowrap font-barlow text-xs tracking-widest uppercase text-steel-300 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">{name}</span>
            <span className={`block rounded-full transition-all duration-300 ${chapter === i ? 'w-2.5 h-2.5 bg-orange-400 shadow-[0_0_12px_#FF6A00]' : 'w-1.5 h-1.5 bg-steel-500'}`} />
          </button>
        ))}
      </nav>
    </section>
  );
}
