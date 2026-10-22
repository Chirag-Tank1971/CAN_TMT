import { useEffect, type RefObject } from 'react';

/**
 * Adds `.in` to every [data-reveal] inside `root` when it scrolls into view (once).
 * Motion lives in CSS (index.css), so reduced-motion users simply see content.
 * Stagger with style={{ '--d': '120ms' }}.
 */
export function useReveal(root: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const els = root.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!els?.length) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -12% 0px' },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [root]);
}
