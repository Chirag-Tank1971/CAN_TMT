/** Tag + two-tone uppercase heading ("\n" splits white / orange lines) + optional intro. */
export function SectionHeader({ id, tag, title, body, center = false }: { id: string; tag: string; title: string; body?: string; center?: boolean }) {
  const [a, b] = title.split('\n');
  return (
    <header className={`mb-12 md:mb-16 ${center ? 'text-center flex flex-col items-center' : ''}`}>
      <p className={`section-tag mb-4 ${center ? 'justify-center' : ''}`} data-reveal>{tag}</p>
      <h2 id={id} className="section-heading text-ink" data-reveal style={{ '--d': '80ms' } as React.CSSProperties}>
        {a}{' '}
        {b &&<span className="block text-orange-600">{b}</span>}
      </h2>
      {body && <p className="mt-5 max-w-xl text-steel-300" data-reveal style={{ '--d': '160ms' } as React.CSSProperties}>{body}</p>}
    </header>
  );
}
