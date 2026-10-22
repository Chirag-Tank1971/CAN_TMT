import { useEffect, useRef } from 'react';

/**
 * Detects low-performance devices based on navigator.hardwareConcurrency
 * and navigator.deviceMemory (where available).
 */
export function useDevicePerf() {
  const isLowPower =
    (navigator.hardwareConcurrency ?? 4) <= 2 ||
    ((navigator as any).deviceMemory ?? 4) <= 2;

  const prefersReducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return { isLowPower, prefersReducedMotion };
}

/** Returns current scroll progress 0→1 for a given element ref */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const progress = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const total = rect.height + windowH;
      const scrolled = windowH - rect.top;
      progress.current = Math.max(0, Math.min(1, scrolled / total));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}
