import { motion } from 'framer-motion'

function OasMotif() {
  return (
    <svg
      viewBox="0 0 320 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-xs opacity-30"
      aria-hidden="true"
    >
      {/* Repeating diamond + cross motif inspired by Oaș embroidery */}
      {[0, 40, 80, 120, 160, 200, 240, 280].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`}>
          <path d="M20 2 L38 12 L20 22 L2 12 Z" stroke="#e8a838" strokeWidth="1" fill="none" />
          <line x1="20" y1="2" x2="20" y2="22" stroke="#e8a838" strokeWidth="0.5" />
          <line x1="2" y1="12" x2="38" y2="12" stroke="#e8a838" strokeWidth="0.5" />
          <circle cx="20" cy="12" r="2" fill="#e8a838" />
        </g>
      ))}
    </svg>
  )
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-[#0d0d0d]">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-[#7a7368]/20 text-xs uppercase tracking-widest max-w-sm text-center leading-loose">
            [HERO IMAGE: Grătar Weber pe cărbuni cu mici și cârnăciori, fum ridicându-se, lumină caldă de apus, cort 3×6m în fundal]
          </p>
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d]/60 via-[#0d0d0d]/40 to-[#0d0d0d]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h1
            className="text-5xl md:text-7xl text-[#e8a838] leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Foc și Gust
            <br />
            <span className="text-4xl md:text-5xl text-[#c4882a]">Tradițional</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-[#f0ece4] italic"
          style={{ fontFamily: '"DM Serif Display", serif' }}
        >
          „Tradiția care arde, gustul care rămâne."
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-[#7a7368] tracking-widest uppercase"
        >
          Stand de grătar tradițional · Târguri și festivaluri · Județul Satu Mare
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mt-4"
        >
          <button
            onClick={() => scrollTo('meniu')}
            className="px-8 py-3 bg-[#e8a838] text-[#0d0d0d] font-semibold rounded-sm hover:bg-[#f5c563] transition-all duration-200 hover:shadow-[0_0_20px_rgba(232,168,56,0.4)] tracking-wide"
          >
            Vezi meniul
          </button>
          <button
            onClick={() => scrollTo('catering')}
            className="px-8 py-3 border border-[#e8a838] text-[#e8a838] font-semibold rounded-sm hover:bg-[#e8a838] hover:text-[#0d0d0d] transition-all duration-200 tracking-wide"
          >
            Rezervă pentru eveniment
          </button>
        </motion.div>

        {/* Oaș decorative motif */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8"
        >
          <OasMotif />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#e8a838] to-transparent"
        />
      </motion.div>
    </section>
  )
}
