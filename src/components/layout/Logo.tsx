/** CAN wordmark with a rod-inspired mark: a ribbed bar bent into a C. */
export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`flex items-center gap-2 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
        <path d="M27 8.5A12 12 0 1 0 27 25.5" stroke="#FF6A00" strokeWidth="4.5" strokeLinecap="round" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line key={i} x1="0" y1="-2.4" x2="0" y2="2.4" stroke="#0E0E10" strokeWidth="1.2"
            transform={`translate(17 17) rotate(${-140 + i * 70}) translate(12 0) rotate(25)`} />
        ))}
      </svg>
      <span className="font-barlow font-800 text-xl md:text-2xl tracking-[0.18em] text-white leading-none whitespace-nowrap">
        CAN<span className="text-orange-400"> TMT</span>
      </span>
    </span>
  );
}
