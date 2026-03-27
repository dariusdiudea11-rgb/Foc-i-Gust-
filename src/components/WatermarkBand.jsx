export default function WatermarkBand({ text = 'FOCUL REAL DĂ GUSTUL REAL', variant = 'light' }) {
  const textColor =
    variant === 'light'
      ? 'text-[#c41e3a]/[0.04]'
      : 'text-[#faf3e8]/[0.03]'

  const repeated = `${text} · ${text} · ${text} · ${text} · `

  return (
    <div className="py-12 md:py-20 overflow-hidden w-full select-none pointer-events-none">
      <div className="animate-marquee">
        {[0, 1].map((i) => (
          <span
            key={i}
            className={`text-[4rem] md:text-[8rem] lg:text-[10rem] whitespace-nowrap uppercase ${textColor}`}
            style={{ fontFamily: '"DM Serif Display", serif', lineHeight: 1 }}
          >
            {repeated}
          </span>
        ))}
      </div>
    </div>
  )
}
