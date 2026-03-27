function OasSeparator() {
  return (
    <svg viewBox="0 0 240 20" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-[240px] mx-auto mb-10" aria-hidden="true">
      {[0, 40, 80, 120, 160, 200].map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M20 1 L39 10 L20 19 L1 10 Z" stroke="rgba(196,30,58,0.2)" strokeWidth="1" fill="none"/>
          <line x1="20" y1="1" x2="20" y2="19" stroke="rgba(196,30,58,0.2)" strokeWidth="0.5"/>
          <line x1="1"  y1="10" x2="39" y2="10" stroke="rgba(196,30,58,0.2)" strokeWidth="0.5"/>
          <circle cx="20" cy="10" r="1.5" fill="rgba(196,30,58,0.25)"/>
        </g>
      ))}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#1a1520] border-t border-white/[0.05] pt-12 pb-10 px-6 text-center">
      <OasSeparator/>
      <p className="text-xl mb-2" style={{ fontFamily: '"DM Serif Display", serif', color: 'rgba(196,30,58,0.8)' }}>
        Foc și Gust Tradițional
      </p>
      <p className="text-sm italic mb-6" style={{ color: 'rgba(250,243,232,0.3)' }}>
        Tradiția care arde, gustul care rămâne.
      </p>
      <p className="text-xs" style={{ color: 'rgba(250,243,232,0.2)' }}>
        © 2026 Foc și Gust Tradițional · Toate drepturile rezervate.
      </p>
    </footer>
  )
}
