import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import useCountUp from '../hooks/useCountUp'

const statsDef = [
  { target: 150, suffix: '+', label: 'Porții pe zi' },
  { target: 100, suffix: '%', label: 'Cărbuni naturali' },
  { target: 0,   suffix: '%', label: 'Conservanți' },
]

function StatItem({ target, suffix, label }) {
  const { ref, count } = useCountUp(target, 2000)
  return (
    <div ref={ref} className="flex flex-col gap-1">
      <span
        className="text-4xl md:text-5xl text-[#c41e3a]"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        {count}{suffix}
      </span>
      <span className="text-xs text-[#faf3e8]/40 uppercase tracking-wider">{label}</span>
    </div>
  )
}

export default function AboutSection() {
  const sectionRef = useRef(null)
  const inViewRef  = useRef(null)
  const imgRef     = useRef(null)
  const inView = useInView(inViewRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section id="despre" ref={sectionRef} className="relative py-32 px-6 overflow-hidden bg-[#1a1520]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at top right, rgba(196,30,58,0.05) 0%, transparent 65%)' }}/>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px)
            `,
          }}/>
      </div>

      <div ref={inViewRef} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

        {/* Text column */}
        <motion.div className="md:col-span-7 flex flex-col gap-7"
          initial={{ opacity: 0, x: -40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Povestea noastră</span>
          </div>
          <h2 className="text-[#faf3e8] leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-1px', marginBottom: '8px' }}>
            Din Țara{' '}
            <span style={{ background: 'linear-gradient(90deg, #c41e3a, #e63950, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Oașului</span>,<br/>pentru toată lumea
          </h2>
          <p className="text-[#faf3e8]/70 text-lg leading-relaxed">
            Suntem doi tineri din Țara Oașului care au crescut cu gustul preparatelor tradiționale.
            Am transformat pasiunea pentru grătarul pe cărbuni în ceva ce vrem să împărțim cu toată lumea —
            carne aleasă, pregătită cu dragoste și răbdare. Fiecare porție e făcută ca pentru ai noștri.
          </p>
          <p className="text-[#faf3e8]/70 text-lg leading-relaxed">
            Carnea provine de la persoane cu peste 10 ani experiență în domeniu, care folosesc produse
            100% românești. Rețetele de mici și cârnăciori sunt proprii — nu le găsești în comerț.
            Focul real dă gustul real.
          </p>
          <div className="flex gap-8 md:gap-12 mt-4 pt-10 border-t border-white/5">
            {statsDef.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </motion.div>

        {/* Image column */}
        <motion.div className="md:col-span-5 md:mt-16"
          initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}>
          <div className="relative">
            <div className="absolute inset-0 border-2 border-[#c41e3a]/20 rounded-2xl translate-x-4 translate-y-4 pointer-events-none"/>
            <div ref={imgRef} className="relative aspect-[3/4] bg-[#231e2a] rounded-2xl overflow-hidden flex items-center justify-center">
              <motion.div style={{ y: imgY }} className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#7a7080] text-xs text-center px-6 leading-relaxed">
                  [POZĂ: Noi doi la stand]
                </p>
              </motion.div>
            </div>
            <div className="mt-3 px-4 py-2 bg-[#c41e3a]/10 rounded-lg inline-flex">
              <span className="text-xs text-[#c41e3a] tracking-wider">Est. 2026 · Negrești-Oaș</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
