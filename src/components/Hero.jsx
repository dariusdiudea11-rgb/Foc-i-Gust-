import { useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import StaggerText from './ui/StaggerText'

/*
  PARALLAX LAYERS HERO
  ──────────────────────────────────────────────────────────────
  Structură inspirată din Osmo Parallax Image Layers.
  Fiecare strat se mișcă cu o viteză diferită la scroll,
  creând iluzia de adâncime (depth).

  IMAGINI NECESARE (pune în /public/images/):
  ┌ layer-1.png ── ie tradițională Oaș (fundal, mișcare 60%)
  ├ layer-2.png ── opțional: o decupare a bordurii / colțurilor
  └                (sau lasă liber — se folosește gradient CSS)

  Dacă imaginile lipsesc, placeholder-ul CSS se afișează automat.
  ──────────────────────────────────────────────────────────────
*/

function MagneticButton({ children, className, onClick }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 180, damping: 28 })
  const springY = useSpring(y, { stiffness: 180, damping: 28 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35)
  }

  return (
    <motion.button ref={ref} style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      onClick={onClick}
      className={className}
      whileTap={{ scale: 0.96 }}>
      {children}
    </motion.button>
  )
}

function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function Hero() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // ── viteze de parallax per strat ──────────────────────────
  // Stratul din spate se mișcă cel mai mult → adâncime vizuală
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%'])  // ie – fundal
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])  // ceață / gradient
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])  // titlu + CTA
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '10%'])  // prim-plan / colțuri

  return (
    /*
      Containerul are height: 250vh → secțiunea "se lipește" (sticky)
      100vh și rămâne vizibilă cât timp scrollezi prin 250vh.
      Efectul: straturile se mișcă la viteze diferite în timp ce
      secțiunea stă fixată, creând profunzime.
    */
    <section id="hero" ref={containerRef} style={{ height: '250vh', position: 'relative' }}>

      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', overflow: 'hidden',
        background: '#faf3e8',
      }}>

        {/* ── STRAT 1 — ie tradițională (fundal, mișcare maximă) ── */}
        <motion.div
          style={{
            y: y1,
            position: 'absolute', inset: 0,
            height: '125%', top: '-25%',
            willChange: 'transform',
          }}>
          <img
            src={`${import.meta.env.BASE_URL}images/layer-1.svg`}
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }}
          />
        </motion.div>

        {/* ── STRAT 2 — ceață / vigneta centrală ── */}
        <motion.div
          style={{
            y: y2,
            position: 'absolute', inset: 0,
            height: '125%', top: '-25%',
            pointerEvents: 'none',
            willChange: 'transform',
          }}>
          {/* Radial warm glow din centru */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(250,243,232,0.85) 0%, rgba(250,243,232,0.3) 55%, transparent 100%)',
          }} />
          {/* Borduri ușor estompate */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `
              linear-gradient(to right,  rgba(250,243,232,0.6) 0%, transparent 18%),
              linear-gradient(to left,   rgba(250,243,232,0.6) 0%, transparent 18%),
              linear-gradient(to bottom, rgba(250,243,232,0.5) 0%, transparent 15%),
              linear-gradient(to top,    rgba(250,243,232,0.5) 0%, transparent 15%)
            `,
          }} />
        </motion.div>

        {/* ── STRAT 3 — titlu + CTA (viteză medie) ── */}
        <motion.div
          style={{
            y: y3,
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 10,
            willChange: 'transform',
          }}>

          {/* Ornament Oaș */}
          <motion.svg viewBox="0 0 120 16" width="100"
            style={{ marginBottom: '24px' }} fill="none" aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.6, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}>
            {[0, 44, 88].map((x, i) => (
              <motion.g key={x} transform={`translate(${x},0)`}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.12, duration: 0.5, ease: 'backOut' }}>
                <path d="M16 1 L31 8 L16 15 L1 8 Z" stroke="#c41e3a" strokeWidth="1" fill="none"/>
                <circle cx="16" cy="8" r="1.5" fill="#c41e3a"/>
              </motion.g>
            ))}
          </motion.svg>

          {/* Etichetă */}
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontSize: '11px', letterSpacing: '0.38em',
              color: 'rgba(196,30,58,0.65)', textTransform: 'uppercase',
              marginBottom: '20px', fontFamily: '"DM Sans", sans-serif',
            }}>
            Stand de grătar tradițional
          </motion.p>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: 'easeOut' }}
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(56px, 12vw, 140px)',
              lineHeight: '0.92',
              color: '#1a1520',
              textAlign: 'center',
              margin: 0,
            }}>
            Foc și{' '}
            <span style={{
              background: 'linear-gradient(90deg, #c41e3a, #e85068, #ff8c42)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              Gust
            </span>
          </motion.h1>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: 'easeOut' }}
            style={{
              fontFamily: '"DM Serif Display", serif',
              fontSize: 'clamp(42px, 9vw, 100px)',
              lineHeight: '0.95',
              color: 'rgba(26,21,32,0.55)',
              fontWeight: 'normal', textAlign: 'center',
              margin: '8px 0 0',
            }}>
            Tradițional
          </motion.h2>

          {/* Citat */}
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontFamily: '"DM Sans", sans-serif',
              color: 'rgba(26,21,32,0.38)', fontStyle: 'italic',
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              textAlign: 'center', marginTop: '18px',
            }}>
            „Tradiția care arde, gustul care rămâne."
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6, ease: 'easeOut' }}
            style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '36px', alignItems: 'center', width: '100%', maxWidth: '340px', padding: '0 24px', boxSizing: 'border-box' }}>
            <MagneticButton
              onClick={() => scrollTo('meniu')}
              className="btn-stagger w-full py-4 bg-[#c41e3a] text-white font-bold text-sm uppercase tracking-wider rounded-full hover:shadow-[0_0_40px_rgba(196,30,58,0.4)] transition-shadow duration-300">
              <StaggerText text="Vezi meniul" />
            </MagneticButton>
            <MagneticButton
              onClick={() => scrollTo('catering')}
              className="btn-stagger w-full py-4 border border-[#c41e3a]/40 text-[#c41e3a] text-sm uppercase tracking-wider rounded-full hover:bg-[#c41e3a]/8 hover:border-[#c41e3a] transition-all duration-300">
              <StaggerText text="Rezervă eveniment" />
            </MagneticButton>
          </motion.div>

        </motion.div>

        {/* ── STRAT 4 — ie în colțuri, prim-plan (mișcare minimă) ── */}
        <motion.div
          style={{
            y: y4,
            position: 'absolute', inset: 0,
            height: '125%', top: '-25%',
            pointerEvents: 'none',
            willChange: 'transform',
          }}>
          {/* Colțuri decorative cu pattern-ul ie-ului */}
          <img
            src={`${import.meta.env.BASE_URL}images/layer-1.svg`}
            alt="" aria-hidden="true"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover',
              opacity: 0.50,
              /* Arată doar marginile, ascunde centrul */
              WebkitMaskImage: `radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, black 100%)`,
              maskImage:       `radial-gradient(ellipse 55% 55% at 50% 50%, transparent 40%, black 100%)`,
            }}
          />
          {/* Glow roșu subtil la baza prim-planului */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '30%',
            background: 'radial-gradient(ellipse at 50% 100%, rgba(196,30,58,0.06) 0%, transparent 70%)',
          }} />
        </motion.div>

        {/* ── Gradient fade la baza hero-ului ── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '22%',
          background: 'linear-gradient(to top, #faf3e8 0%, rgba(250,243,232,0) 100%)',
          zIndex: 20, pointerEvents: 'none',
        }} />

        {/* ── Indicator scroll ── */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            position: 'absolute', bottom: '32px', left: '50%',
            transform: 'translateX(-50%)', zIndex: 20,
          }}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            style={{
              width: '1px', height: '60px',
              background: 'linear-gradient(to bottom, rgba(196,30,58,0.5), transparent)',
              margin: '0 auto',
            }}
          />
        </motion.div>

      </div>
    </section>
  )
}
