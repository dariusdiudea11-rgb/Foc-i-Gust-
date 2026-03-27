function OasSeparator() {
  return (
    <svg viewBox="0 0 160 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-[160px] opacity-20 mx-auto mb-10" aria-hidden="true">
      {[0, 48, 96].map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M32 1 L63 8 L32 15 L1 8 Z" stroke="#e8a838" strokeWidth="1" fill="none"/>
          <circle cx="32" cy="8" r="2" fill="#e8a838"/>
          <line x1="1" y1="8" x2="32" y2="8" stroke="#e8a838" strokeWidth="0.5" strokeOpacity="0.4"/>
          <line x1="32" y1="8" x2="63" y2="8" stroke="#e8a838" strokeWidth="0.5" strokeOpacity="0.4"/>
        </g>
      ))}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/[0.05] pt-12 pb-10 px-6 text-center">
      <OasSeparator />
      <p className="text-xl text-[#e8a838]/80 mb-2"
        style={{ fontFamily: '"DM Serif Display", serif' }}>
        Foc și Gust Tradițional
      </p>
      <p className="text-sm italic text-[#f0ece4]/30 mb-6">
        Tradiția care arde, gustul care rămâne.
      </p>
      <p className="text-xs text-[#7a7368]">
        © 2026 Foc și Gust Tradițional · Toate drepturile rezervate.
      </p>
    </footer>
  )
}
