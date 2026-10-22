import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export let lenis: Lenis | null = null;

/** One RAF loop: Lenis is driven by gsap.ticker so ScrollTrigger scrub stays in sync. */
export function initSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  lenis = new Lenis({ duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 4) });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}

export function scrollToTarget(target: string | number) {
  if (lenis) lenis.scrollTo(target, { offset: 0 });
  else if (typeof target === 'number') window.scrollTo({ top: target });
  else document.querySelector(target)?.scrollIntoView();
}
