function OasSeparator() {
  return (
    <svg
      viewBox="0 0 240 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[240px] opacity-15 mx-auto mb-8"
      aria-hidden="true"
    >
      {[0, 32, 64, 96, 128, 160, 192].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`}>
          <path d="M16 1 L31 8 L16 15 L1 8 Z" stroke="#e8a838" strokeWidth="1" fill="none" />
          <circle cx="16" cy="8" r="1.5" fill="#e8a838" />
        </g>
      ))}
    </svg>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#e8a838]/10 pt-10 pb-8 px-6 text-center">
      <OasSeparator />
      <p className="text-[#7a7368] text-sm">
        © 2026 Foc și Gust Tradițional
      </p>
      <p className="text-[#e8a838]/50 text-xs italic mt-1">
        Tradiția care arde, gustul care rămâne.
      </p>
    </footer>
  )
}
