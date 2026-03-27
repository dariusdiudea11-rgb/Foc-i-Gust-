import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function OasDecor() {
  return (
    <svg viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-[120px] mx-auto mb-8" style={{ opacity: 0.4 }} aria-hidden="true">
      {[0, 44, 88].map((x) => (
        <g key={x} transform={`translate(${x},0)`}>
          <path d="M16 1 L31 8 L16 15 L1 8 Z" stroke="#c41e3a" strokeWidth="1" fill="none"/>
          <circle cx="16" cy="8" r="1.5" fill="#c41e3a"/>
        </g>
      ))}
    </svg>
  )
}

function CurveLeft() {
  return (
    <svg className="absolute left-0 top-0 h-full w-[300px] md:w-[400px] pointer-events-none"
      viewBox="0 0 400 800" preserveAspectRatio="xMinYMid meet"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 380 0 C 300 150, 50 200, 80 400 C 110 600, 320 650, 380 800"
        stroke="#c41e3a" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
      <path d="M 350 0 C 250 200, 10 250, 30 450 C 50 650, 280 700, 350 800"
        stroke="#c41e3a" strokeWidth="0.5" strokeOpacity="0.07" fill="none"/>
    </svg>
  )
}

function CurveRight() {
  return (
    <svg className="absolute right-0 top-0 h-full w-[300px] md:w-[400px] pointer-events-none"
      viewBox="0 0 400 800" preserveAspectRatio="xMaxYMid meet"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M 20 0 C 100 150, 350 200, 320 400 C 290 600, 80 650, 20 800"
        stroke="#c41e3a" strokeWidth="1" strokeOpacity="0.15" fill="none"/>
      <path d="M 50 0 C 150 200, 390 250, 370 450 C 350 650, 120 700, 50 800"
        stroke="#c41e3a" strokeWidth="0.5" strokeOpacity="0.07" fill="none"/>
    </svg>
  )
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const heroRef = useRef(null)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -80])

  return (
    <section id="hero" ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#faf3e8]"
      style={{ perspective: '1000px' }}>

      {/* Floating gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '20%', left: '10%',
            background: 'rgba(196,30,58,0.06)',
            filter: 'blur(120px)',
            animation: 'float1 20s ease-in-out infinite',
          }}/>
        <div className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '20%', right: '15%',
            background: 'rgba(251,207,232,0.04)',
            filter: 'blur(120px)',
            animation: 'float2 25s ease-in-out infinite',
          }}/>
        <div className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            top: '50%', left: '50%',
            background: 'rgba(254,243,199,0.03)',
            filter: 'blur(100px)',
            animation: 'float3 15s ease-in-out infinite',
          }}/>
      </div>

      {/* Radial warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(196,30,58,0.05) 0%, transparent 65%)' }}/>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(26,21,32,0.03) 0px, rgba(26,21,32,0.03) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(26,21,32,0.03) 0px, rgba(26,21,32,0.03) 1px, transparent 1px, transparent 60px)
          `,
        }}/>

      {/* Noise grain */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}/>

      <CurveLeft/>
      <CurveRight/>

      <motion.div style={{ y: contentY, transformStyle: 'preserve-3d' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto w-full">

        <motion.div initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}>
          <OasDecor/>
        </motion.div>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.4em] text-[#c41e3a]/70 uppercase mb-4">
          Stand de grătar tradițional
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col items-center">
          <h1 className="text-6xl md:text-8xl lg:text-9xl leading-none text-[#c41e3a]"
            style={{ fontFamily: '"DM Serif Display", serif', textShadow: '0 0 80px rgba(196,30,58,0.2)' }}>
            Foc și Gust
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl leading-none text-[#1a1520] font-normal mt-2"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Tradițional
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-6 flex flex-col items-center gap-2">
          <p className="text-lg md:text-xl text-[#1a1520]/50 italic"
            style={{ fontFamily: '"DM Sans", sans-serif' }}>
            „Tradiția care arde, gustul care rămâne."
          </p>
          <p className="text-sm text-[#8a7e6d] tracking-wider">
            Țara Oașului · Județul Satu Mare
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.72 }}
          className="mt-10 flex flex-col sm:flex-row gap-4">
          <button onClick={() => scrollTo('meniu')}
            className="px-8 py-4 bg-[#c41e3a] text-white font-bold text-sm uppercase tracking-wider rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(196,30,58,0.35)] transition-all duration-300">
            Vezi meniul
          </button>
          <button onClick={() => scrollTo('catering')}
            className="px-8 py-4 border border-[#c41e3a]/40 text-[#c41e3a] text-sm uppercase tracking-wider rounded-full hover:bg-[#c41e3a]/10 hover:border-[#c41e3a] transition-all duration-300">
            Rezervă eveniment
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }} className="mt-16">
          <motion.div animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px h-[60px] mx-auto"
            style={{ background: 'linear-gradient(to bottom, #c41e3a, transparent)' }}/>
        </motion.div>
      </motion.div>
    </section>
  )
}
