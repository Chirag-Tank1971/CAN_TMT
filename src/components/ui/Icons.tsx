/** Line icons drawn with pathLength=1 so `.icon-draw` can animate them in (see index.css). */
const P = (d: string) => <path d={d} pathLength={1} />;

const ICONS = {
  strength: <>{P('M6 10h36M6 38h36M24 10v28')}{P('M14 10v-3h20v3M14 38v3h20v-3')}</>,
  ductility: <>{P('M6 34c10 0 10-20 18-20s8 20 18 20')}{P('M6 40h36')}</>,
  earthquake: <>{P('M4 26h6l3-8 5 18 5-24 5 22 4-12 3 4h9')}</>,
  weld: <>{P('M6 30h16M26 30h16')}{P('M24 22v-8M18 18l-4-4M30 18l4-4M24 30l0 0')}{P('M20 30a4 4 0 0 0 8 0')}</>,
  corrosion: <>{P('M24 6l14 6v10c0 10-6 17-14 20-8-3-14-10-14-20V12z')}{P('M18 24l4 4 8-9')}</>,
  home: <>{P('M8 22L24 9l16 13')}{P('M12 19v20h24V19')}{P('M20 39V28h8v11')}</>,
  apartment: <>{P('M10 42V8h18v34M28 18h10v24M6 42h36')}{P('M15 14h3M21 14h3M15 21h3M21 21h3M15 28h3M21 28h3M32 25h2M32 32h2')}</>,
  bridge: <>{P('M4 30h40M4 30c6-14 14-18 20-18s14 4 20 18')}{P('M12 30v10M24 30v10M36 30v10M14 22v8M34 22v8M24 12v18')}</>,
  commercial: <>{P('M8 42V16h32v26M6 42h36M8 16l4-8h24l4 8')}{P('M14 24h6v6h-6zM28 24h6v6h-6zM20 42v-8h8v8')}</>,
  industrial: <>{P('M6 42V24l10 6v-6l10 6v-6l10 6V10h6v32z')}{P('M6 42h36M14 36h4M24 36h4')}</>,
  enquire: <>{P('M8 10h32v22H20l-8 7v-7H8z')}{P('M16 19h16M16 25h10')}</>,
  quote: <>{P('M12 6h18l8 8v28H12z')}{P('M30 6v8h8M18 22h14M18 28h14M18 34h8')}</>,
  delivery: <>{P('M4 14h24v20H4zM28 20h9l7 7v7H28z')}{P('M12 38a3 3 0 1 0 0-.1M36 38a3 3 0 1 0 0-.1')}</>,
} as const;

export type IconName = keyof typeof ICONS;

export function Icon({ name, className = 'w-10 h-10' }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={`icon-draw ${className}`} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}
