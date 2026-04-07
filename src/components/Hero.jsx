import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'

function OasDecor() {
  return (
    <svg viewBox="0 0 120 16" fill="none" xmlns="http://www.w3.org/2000/svg"
      className="w-[120px] mx-auto mb-8" aria-hidden="true">
      {[0, 44, 88].map((x, i) => (
        <motion.g key={x} transform={`translate(${x},0)`}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.3 + i * 0.15, duration: 0.5, ease: 'backOut' }}>
          <path d="M16 1 L31 8 L16 15 L1 8 Z" stroke="#c41e3a" strokeWidth="1" fill="none"/>
          <circle cx="16" cy="8" r="1.5" fill="#c41e3a"/>
        </motion.g>
      ))}
    </svg>
  )
}

function CurveLeft() {
  return (
    <svg className="absolute left-0 top-0 h-full w-[300px] md:w-[400px] pointer-events-none"
      viewBox="0 0 400 800" preserveAspectRatio="xMinYMid meet"
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <motion.path
        d="M 380 0 C 300 150, 50 200, 80 400 C 110 600, 320 650, 380 800"
        stroke="#c41e3a" strokeWidth="1" strokeOpacity="0.15" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeInOut' }}
      />
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
      <motion.path
        d="M 20 0 C 100 150, 350 200, 320 400 C 290 600, 80 650, 20 800"
        stroke="#c41e3a" strokeWidth="1" strokeOpacity="0.15" fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 0.7, ease: 'easeInOut' }}
      />
      <path d="M 50 0 C 150 200, 390 250, 370 450 C 350 650, 120 700, 50 800"
        stroke="#c41e3a" strokeWidth="0.5" strokeOpacity="0.07" fill="none"/>
    </svg>
  )
}

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 28 })
  const springY = useSpring(y, { stiffness: 180, damping: 28 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = (e.clientX - centerX) * 0.35
    const dy = (e.clientY - centerY) * 0.35
    x.set(dx)
    y.set(dy)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.96 }}>
      {children}
    </motion.button>
  )
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const heroRef = useRef(null)
  const contentRef = useRef(null)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 600], [0, -80])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 150, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-400, 400], [-8, 8]), { stiffness: 150, damping: 30 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left - rect.width / 2)
      mouseY.set(e.clientY - rect.top - rect.height / 2)
    }
    const handleMouseLeave = () => {
      mouseX.set(0)
      mouseY.set(0)
    }
    const el = heroRef.current
    el?.addEventListener('mousemove', handleMouseMove)
    el?.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      el?.removeEventListener('mousemove', handleMouseMove)
      el?.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY])

  return (
    <section id="hero" ref={heroRef}
      className="relative min-h-screen overflow-hidden flex items-center justify-center bg-[#faf3e8]"
      style={{ perspective: '1200px' }}>

      {/* Floating gradient mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            top: '20%', left: '10%',
            background: 'rgba(196,30,58,0.07)',
            filter: 'blur(120px)',
            animation: 'float1 20s ease-in-out infinite',
          }}/>
        <div className="absolute w-[400px] h-[400px] rounded-full"
          style={{
            bottom: '20%', right: '15%',
            background: 'rgba(196,30,58,0.04)',
            filter: 'blur(120px)',
            animation: 'float2 25s ease-in-out infinite',
          }}/>
        <div className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            top: '50%', left: '50%',
            background: 'rgba(254,243,199,0.05)',
            filter: 'blur(100px)',
            animation: 'float3 15s ease-in-out infinite',
          }}/>
      </div>

      {/* Radial warm glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, rgba(196,30,58,0.06) 0%, transparent 65%)' }}/>

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(26,21,32,0.03) 0px, rgba(26,21,32,0.03) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(26,21,32,0.03) 0px, rgba(26,21,32,0.03) 1px, transparent 1px, transparent 60px)
          `,
        }}/>

      <CurveLeft/>
      <CurveRight/>

      <motion.div
        ref={contentRef}
        style={{ y: contentY, rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto w-full">

        <OasDecor/>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs tracking-[0.4em] text-[#c41e3a]/70 uppercase mb-4">
          Stand de grătar tradițional
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="flex flex-col items-center" style={{ transform: 'translateZ(40px)' }}>
          <h1 className="text-[#c41e3a]"
            style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(56px, 12vw, 140px)', lineHeight: '0.92', textShadow: '0 0 80px rgba(196,30,58,0.2)' }}>
            Foc și{' '}
            <span style={{ background: 'linear-gradient(90deg, #c41e3a, #e85068, #ff8c42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Gust</span>
          </h1>
          <h2 className="text-[#1a1520] font-normal mt-2"
            style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(42px, 9vw, 100px)', lineHeight: '0.95' }}>
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
          <MagneticButton
            onClick={() => scrollTo('meniu')}
            className="px-8 py-4 bg-[#c41e3a] text-white font-bold text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_40px_rgba(196,30,58,0.45)] transition-shadow duration-300">
            Vezi meniul
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo('catering')}
            className="px-8 py-4 border border-[#c41e3a]/40 text-[#c41e3a] text-sm uppercase tracking-wider rounded-full hover:bg-[#c41e3a]/10 hover:border-[#c41e3a] transition-all duration-300">
            Rezervă eveniment
          </MagneticButton>
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
