import { useState, useEffect, useRef } from 'react'
import StaggerText from './ui/StaggerText'

const PRODUCTS = [
  {
    num:   '01',
    name:  'Mici Tradițional',
    pieces:'3 bucăți',
    price: '25 lei',
    desc:  'Rețetă de familie, carne de vită și porc, preparați pe cărbuni',
    tag:   'Bestseller',
  },
  {
    num:   '02',
    name:  'Ceafă de Porc',
    pieces:'200g',
    price: '30 lei',
    desc:  'Ceafă marinată, gătită lent pe cărbuni cu condimente naturale',
    tag:   null,
  },
  {
    num:   '03',
    name:  'Piept de Pui',
    pieces:'200g',
    price: '25 lei',
    desc:  'Piept suculent, condimentat tradițional pe jar de cărbuni',
    tag:   null,
  },
  {
    num:   '04',
    name:  'Cârnăciori',
    pieces:'3 bucăți',
    price: '20 lei',
    desc:  'Cârnăciori cu condimente naturale, rețetă proprie de familie',
    tag:   null,
  },
  {
    num:   '05',
    name:  'Cartofi Prăjiți',
    pieces:'porție',
    price: '15 lei',
    desc:  'Cartofi aurii, crocanți, porție generoasă',
    tag:   'Garnitură',
  },
  {
    num:   '06',
    name:  'Combo Oșanul',
    pieces:'mici + cartofi + suc',
    price: '35 lei',
    desc:  'Mici tradițional, cartofi prăjiți și suc la alegere',
    tag:   'Ofertă',
  },
]

const TOTAL   = PRODUCTS.length
const CARD_W  = 260
const CARD_H  = 360
const SPREAD  = 190   // px offset between card centers

function getTransform(dist) {
  const absD   = Math.abs(dist)
  const clamp  = Math.min(absD, 2)
  const rotateY  = -dist * 46
  const translateX = dist * SPREAD
  const scale    = 1 - clamp * 0.13
  const opacity  = absD === 0 ? 1 : absD === 1 ? 0.55 : 0.22
  const zIndex   = 20 - absD * 5

  return { rotateY, translateX, scale, opacity, zIndex, visible: absD <= 2 }
}

function scrollToMenu() {
  document.getElementById('meniu')?.scrollIntoView({ behavior: 'smooth' })
}

export default function Carousel3D() {
  const [active, setActive]       = useState(0)
  const [autoOn, setAutoOn]       = useState(true)
  const [winW,   setWinW]         = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const [isDrag, setIsDrag]       = useState(false)
  const autoRef   = useRef(true)
  const pauseRef  = useRef(false)
  const dragRef   = useRef(null)
  autoRef.current = autoOn

  const isMobile = winW < 640

  /* inject styles once */
  useEffect(() => {
    const id = 'coverflow-styles'
    if (document.getElementById(id)) return
    const s = document.createElement('style')
    s.id = id
    s.textContent = `
      @keyframes cf-fadein { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes cf-float  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    `
    document.head.appendChild(s)
  }, [])

  /* resize */
  useEffect(() => {
    const fn = () => setWinW(window.innerWidth)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  /* auto-advance */
  useEffect(() => {
    const t = setInterval(() => {
      if (autoRef.current && !pauseRef.current) setActive(p => (p + 1) % TOTAL)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  const goTo = (i) => { setActive((i + TOTAL) % TOTAL); setAutoOn(false) }
  const prev = () => goTo(active - 1)
  const next = () => goTo(active + 1)

  /* drag/swipe */
  const onStart = (x) => { setIsDrag(false); dragRef.current = x }
  const onMove  = (x) => {
    if (dragRef.current === null) return
    const diff = x - dragRef.current
    if (Math.abs(diff) > 52) {
      setIsDrag(true)
      diff < 0 ? next() : prev()
      dragRef.current = x
      setAutoOn(false)
    }
  }
  const onEnd = () => { dragRef.current = null }

  /* effective card size for mobile */
  const cW = isMobile ? 200 : CARD_W
  const cH = isMobile ? 280 : CARD_H
  const spread = isMobile ? 130 : SPREAD

  const product = PRODUCTS[active]

  return (
    <div style={{ background: '#faf3e8', overflow: 'hidden', position: 'relative', fontFamily: '"DM Sans", sans-serif', paddingBottom: '60px' }}>

      {/* ── subtle grid bg ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: 'repeating-linear-gradient(0deg,rgba(26,21,32,0.018) 0 1px,transparent 1px 80px),repeating-linear-gradient(90deg,rgba(26,21,32,0.018) 0 1px,transparent 1px 80px)' }} />

      {/* ── header ── */}
      <div style={{ textAlign: 'center', paddingTop: isMobile ? '56px' : '72px', paddingBottom: isMobile ? '36px' : '48px', position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(196,30,58,0.5)', textTransform: 'uppercase', margin: '0 0 14px', animation: 'cf-fadein 0.5s ease both' }}>
          Stand de grătar tradițional
        </p>

        {/* Oaș ornament */}
        <svg viewBox="0 0 120 16" width="100" style={{ display: 'block', margin: '0 auto 18px', animation: 'cf-fadein 0.5s 0.1s ease both' }} fill="none" aria-hidden="true">
          {[0,25,50,75,100].map(x => (
            <path key={x} d={`M${x+10} 8L${x} 0L${x+10} 8L${x+20} 0L${x+10} 8L${x+20} 16L${x+10} 8L${x} 16L${x+10} 8Z`}
              stroke="rgba(196,30,58,0.2)" strokeWidth="0.8" fill="none" />
          ))}
        </svg>

        <h2 style={{ fontFamily: '"DM Serif Display", serif', fontSize: `clamp(26px, 5.5vw, 50px)`, lineHeight: 1.05, margin: '0 0 10px', animation: 'cf-fadein 0.5s 0.15s ease both' }}>
          <span style={{ color: '#1a1520' }}>Meniul </span>
          <span style={{ background: 'linear-gradient(90deg, #c41e3a, #e85068, #ff8c42)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Nostru</span>
        </h2>
        <p style={{ color: '#8a7e6d', fontSize: '13px', fontStyle: 'italic', margin: 0, animation: 'cf-fadein 0.5s 0.25s ease both' }}>
          Alege un produs — Țara Oașului · Satu Mare
        </p>
      </div>

      {/* ── coverflow scene ── */}
      <div
        style={{ position: 'relative', height: `${cH + 60}px`, perspective: '1100px', cursor: isDrag ? 'grabbing' : 'grab', touchAction: 'pan-y', zIndex: 1 }}
        onMouseEnter={() => { pauseRef.current = true }}
        onMouseLeave={() => { pauseRef.current = false; onEnd() }}
        onMouseDown={e => onStart(e.clientX)}
        onMouseMove={e => onMove(e.clientX)}
        onMouseUp={onEnd}
        onTouchStart={e => onStart(e.touches[0].clientX)}
        onTouchMove={e => onMove(e.touches[0].clientX)}
        onTouchEnd={onEnd}
      >
        {PRODUCTS.map((p, i) => {
          const dist = i - active
          const { rotateY, translateX, scale, opacity, zIndex, visible } = getTransform(dist)
          if (!visible) return null

          const isActive = dist === 0

          return (
            <div key={p.num}
              onClick={() => { if (!isDrag) { isActive ? null : goTo(i) } }}
              style={{
                position:    'absolute',
                width:       `${cW}px`,
                height:      `${cH}px`,
                left:        `calc(50% - ${cW / 2}px)`,
                top:         '30px',
                transform:   `translateX(${translateX * (isMobile ? 0.68 : 1)}px) rotateY(${rotateY}deg) scale(${scale})`,
                transformOrigin: 'center center',
                opacity,
                zIndex,
                transition:  'transform 0.65s cubic-bezier(0.23,1,0.32,1), opacity 0.65s ease',
                cursor:      isActive ? 'default' : 'pointer',
                borderRadius:'18px',
                overflow:    'hidden',
                background:  'linear-gradient(160deg, #1e1a25 0%, #16121c 100%)',
                border:      isActive ? '1px solid rgba(196,30,58,0.35)' : '1px solid rgba(255,255,255,0.05)',
                boxShadow:   isActive
                  ? '0 32px 80px rgba(0,0,0,0.45), 0 0 50px rgba(196,30,58,0.12)'
                  : '0 8px 32px rgba(0,0,0,0.25)',
                userSelect:  'none',
              }}>

              {/* top shine */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50%', background: 'linear-gradient(180deg,rgba(255,255,255,0.04),transparent)', pointerEvents: 'none', borderRadius: '18px 18px 0 0' }} />

              {/* left accent bar */}
              <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '2px', background: isActive ? 'linear-gradient(to bottom, transparent, #c41e3a, transparent)' : 'transparent', transition: 'background 0.5s' }} />

              {/* card number */}
              <div style={{ position: 'absolute', top: '16px', right: '18px', fontFamily: '"DM Serif Display", serif', fontSize: '13px', color: 'rgba(196,30,58,0.25)', letterSpacing: '1px' }}>
                {p.num}
              </div>

              {/* tag badge */}
              {p.tag && (
                <div style={{ position: 'absolute', top: '16px', left: '18px', background: 'rgba(196,30,58,0.15)', border: '1px solid rgba(196,30,58,0.25)', borderRadius: '20px', padding: '3px 10px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px', color: '#c41e3a', textTransform: 'uppercase' }}>
                  {p.tag}
                </div>
              )}

              {/* decorative background number */}
              <div style={{ position: 'absolute', bottom: '-10px', right: '-8px', fontFamily: '"DM Serif Display", serif', fontSize: '120px', lineHeight: 1, color: 'rgba(196,30,58,0.04)', pointerEvents: 'none', userSelect: 'none' }}>
                {p.num}
              </div>

              {/* content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '0 22px 24px', display: 'flex', flexDirection: 'column', gap: '7px' }}>
                <div style={{ width: '28px', height: '2px', background: 'rgba(196,30,58,0.6)', marginBottom: '2px' }} />

                <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: isMobile ? '17px' : '21px', color: '#faf3e8', margin: 0, lineHeight: 1.15 }}>
                  {p.name}
                </p>

                <p style={{ fontSize: '10px', color: 'rgba(250,243,232,0.3)', textTransform: 'uppercase', letterSpacing: '1.2px', margin: 0 }}>
                  {p.pieces}
                </p>

                <p style={{ fontSize: '11px', color: 'rgba(250,243,232,0.38)', lineHeight: 1.55, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {p.desc}
                </p>

                <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: isMobile ? '22px' : '28px', color: '#c41e3a', margin: '4px 0 0', lineHeight: 1, textShadow: '0 0 24px rgba(196,30,58,0.3)' }}>
                  {p.price}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* ── navigation ── */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginTop: '24px' }}>

        {/* prev */}
        <button onClick={prev}
          style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(26,21,32,0.06)', border: '1px solid rgba(26,21,32,0.1)', cursor: 'pointer', fontSize: '16px', color: '#1a1520', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.1)'; e.currentTarget.style.transform = 'scale(1.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,21,32,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}
          aria-label="Anterior">←</button>

        {/* dots */}
        <div style={{ display: 'flex', gap: '7px', alignItems: 'center' }}>
          {PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === active ? '24px' : '7px', height: '7px', borderRadius: i === active ? '4px' : '50%', background: i === active ? '#c41e3a' : 'rgba(26,21,32,0.15)', boxShadow: i === active ? '0 0 10px rgba(196,30,58,0.4)' : 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'all 0.35s cubic-bezier(0.23,1,0.32,1)' }}
              aria-label={`Produs ${i + 1}`}
            />
          ))}
        </div>

        {/* next */}
        <button onClick={next}
          style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(26,21,32,0.06)', border: '1px solid rgba(26,21,32,0.1)', cursor: 'pointer', fontSize: '16px', color: '#1a1520', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(196,30,58,0.1)'; e.currentTarget.style.transform = 'scale(1.12)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(26,21,32,0.06)'; e.currentTarget.style.transform = 'scale(1)' }}
          aria-label="Următor">→</button>
      </div>

      {/* ── active product detail ── */}
      <div key={active} style={{ textAlign: 'center', maxWidth: '480px', margin: '28px auto 0', padding: '0 24px', animation: 'cf-fadein 0.45s ease both', position: 'relative', zIndex: 1 }}>
        <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: isMobile ? '21px' : '26px', color: '#1a1520', margin: '0 0 8px' }}>
          {product.name}
        </p>
        <p style={{ color: '#8a7e6d', fontSize: '13px', lineHeight: 1.65, margin: '0 0 16px' }}>
          {product.desc}
        </p>
        <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: isMobile ? '28px' : '34px', color: '#c41e3a', textShadow: '0 0 28px rgba(196,30,58,0.15)', margin: '0 0 22px' }}>
          {product.price}
        </p>

        <button onClick={scrollToMenu}
          className="btn-stagger"
          style={{ background: '#c41e3a', color: '#fff', border: 'none', padding: '13px 38px', borderRadius: '50px', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 8px 28px rgba(196,30,58,0.3)', cursor: 'pointer', transition: 'transform 0.25s, box-shadow 0.25s', fontFamily: 'inherit' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.06)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(196,30,58,0.42)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(196,30,58,0.3)' }}>
          <StaggerText text="Vezi meniul complet" />
        </button>
      </div>

      {/* ── footer ornament ── */}
      <div style={{ textAlign: 'center', marginTop: '44px', position: 'relative', zIndex: 1 }}>
        <svg viewBox="0 0 120 16" width="100" style={{ display: 'block', margin: '0 auto 10px' }} fill="none" aria-hidden="true">
          {[0,25,50,75,100].map(x => (
            <path key={x} d={`M${x+10} 8L${x} 0L${x+10} 8L${x+20} 0L${x+10} 8L${x+20} 16L${x+10} 8L${x} 16L${x+10} 8Z`}
              stroke="rgba(196,30,58,0.15)" strokeWidth="0.8" fill="none" />
          ))}
        </svg>
        <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '13px', color: 'rgba(196,30,58,0.3)', fontStyle: 'italic', margin: 0 }}>
          Tradiția care arde, gustul care rămâne.
        </p>
        <p style={{ fontSize: '11px', color: 'rgba(138,126,109,0.4)', fontStyle: 'italic', marginTop: '8px' }}>
          Drag sau swipe pentru a naviga
        </p>
      </div>
    </div>
  )
}
