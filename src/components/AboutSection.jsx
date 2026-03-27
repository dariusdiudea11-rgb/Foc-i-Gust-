import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { number: '150+', label: 'Porții pe zi' },
  { number: '100%', label: 'Cărbuni naturali' },
  { number: '0%',   label: 'Conservanți' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="despre" className="relative py-32 px-6 bg-black overflow-hidden">

      {/* Background layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(120,60,0,0.07) 0%, transparent 65%)' }} />
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px)
            `,
          }} />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

        {/* Text — col 7 */}
        <motion.div
          className="md:col-span-7 flex flex-col gap-7"
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#e8a838]" />
            <span className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">Povestea noastră</span>
          </div>

          {/* Title */}
          <h2 className="text-4xl md:text-5xl text-[#f0ece4] leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Din Țara <span className="text-[#e8a838]">Oașului</span>,
            <br />pentru toată lumea
          </h2>

          {/* Paragraphs */}
          <p className="text-[#f0ece4]/70 text-lg leading-relaxed">
            Suntem doi tineri din Țara Oașului care au crescut cu gustul micilor de la bunici.
            Am transformat rețetele de familie în ceva ce vrem să împărțim cu toată lumea —
            carne aleasă, pregătită pe cărbuni, cu dragoste și răbdare.
          </p>
          <p className="text-[#f0ece4]/70 text-lg leading-relaxed">
            Carnea vine exclusiv de la carmangeria familiei — rețete proprii de mici și
            cârnăciori pe care nu le găsești în comerț. Focul real dă gustul real.
          </p>

          {/* Stats */}
          <div className="flex gap-8 md:gap-12 mt-4 pt-10 border-t border-white/5">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <span className="text-3xl text-[#e8a838]"
                  style={{ fontFamily: '"DM Serif Display", serif' }}>
                  {s.number}
                </span>
                <span className="text-xs text-[#7a7368] uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Image — col 5, offset down */}
        <motion.div
          className="md:col-span-5 md:mt-16"
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          {/* Wrapper with 3D frame effect */}
          <div className="relative">
            {/* Offset decorative frame */}
            <div className="absolute inset-0 border-2 border-[#e8a838]/20 rounded-2xl translate-x-4 translate-y-4 pointer-events-none" />

            {/* Main image card */}
            <div className="relative aspect-[3/4] bg-[#1a1a1a] rounded-2xl overflow-hidden flex items-center justify-center">
              <p className="text-[#7a7368] text-xs text-center px-6 leading-relaxed">
                [POZĂ: Noi doi la stand]
              </p>
            </div>

            {/* Caption band */}
            <div className="mt-3 px-4 py-2 bg-[#e8a838]/10 rounded-lg inline-flex">
              <span className="text-xs text-[#e8a838] tracking-wider">Est. 2026 · Negrești-Oaș</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
