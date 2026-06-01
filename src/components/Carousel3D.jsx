import { useState, useEffect, useRef } from 'react'

const PRODUCTS = [
  { name: 'Mici Tradițional',    pieces: '3 × 90g',               price: '18 lei', desc: 'Rețetă de familie, carne de vită și porc, preparați pe cărbuni',  category: 'GRĂTAR'    },
  { name: 'Ceafă de Porc',       pieces: '150g',                  price: '14 lei', desc: 'Ceafă marinată, gătită lent pe cărbuni cu condimente naturale',    category: 'GRĂTAR'    },
  { name: 'Piept de Pui',        pieces: '150g',                  price: '16 lei', desc: 'Piept suculent, condimentat tradițional pe jar de cărbuni',        category: 'GRĂTAR'    },
  { name: 'Cârnăciori',          pieces: '3 × 65g',               price: '27 lei', desc: 'Cârnăciori cu condimente naturale, rețetă proprie de familie',     category: 'GRĂTAR'    },
  { name: 'Aripioare la Grătar', pieces: '3 buc · ~330g',         price: '17 lei', desc: 'Aripioare marinate în condimente de casă, gătite pe jar',          category: 'GRĂTAR'    },
  { name: 'Cartofi Pai',         pieces: '200g',                  price: '10 lei', desc: 'Cartofi aurii, crocanți — garnitura perfectă la orice grătar',     category: 'GARNITURĂ' },
  { name: 'Combo Oșanul',        pieces: 'Mici · Cartofi · Suc', price: '32 lei', desc: 'Mici tradițional, cartofi prăjiți și suc la alegere',              category: 'COMBO'     },
]

const TOTAL = PRODUCTS.length
const STEP  = 360 / TOTAL

const ACCENT = {
  'GRĂTAR':    { line: '#8E1F1B', text: 'rgba(142,31,27,0.65)'  },
  'GARNITURĂ': { line: '#C2611E', text: 'rgba(194,97,30,0.65)' },
  'COMBO':     { line: '#D69A2D', text: 'rgba(214,154,45,0.65)' },
}

function FlameIcon() {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="none" aria-hidden="true">
      <path d="M6 0C6 0 10 4 10 7C10 7 8.5 6 7.5 5C7.5 5 9 8 7 10C7 10 7 8.5 5.5 7.5C5.5 7.5 6.5 11 4 13C4 13 4.5 10.5 3 10C3 10 1 12.5 2.5 15C2.5 15 0 13.5 0 10.5C0 7.5 2 6 2 6C2 6 1.5 9 3 10C3 10 2 6 6 0Z" fill="#8E1F1B" opacity="0.5"/>
    </svg>
  )
}

function OasOrnament() {
  return (
    <svg viewBox="0 0 120 16" width="120" fill="none" aria-hidden="true" style={{ display: 'block', margin: '0 auto' }}>
      {[0, 25, 50, 75, 100].map((x) => (
        <path key={x} d={`M${x+10} 8L${x} 0L${x+10} 8L${x+20} 0L${x+10} 8L${x+20} 16L${x+10} 8L${x} 16L${x+10} 8Z`} stroke="rgba(142,31,27,0.15)" strokeWidth="0.8" fill="none"/>
      ))}
    </svg>
  )
}

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoRotate, setAutoRotate]   = useState(true)
  const [isDragging, setIsDragging]   = useState(false)
  const [mouse, setMouse]             = useState({ x: 0, y: 0 })
  const [winW, setWinW]               = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  )

  const autoRef    = useRef(autoRotate)
  const dragStartX = useRef(null)
  autoRef.current  = autoRotate

  const isMobile = winW < 768
  const isLarge  = winW >= 1200

  const cardW  = isMobile ? 200 : isLarge ? 260 : 240
  const cardH  = isMobile ? 310 : isLarge ? 370 : 360
  const radius = isMobile ? 300 : isLarge ? 440 : 380
  const sceneH = isMobile ? 390 : isLarge ? 510 : 460

  useEffect(() => {
    const id = 'carousel3d-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        @keyframes carousel3d-slideIn { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes c3d-float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-15px)} }
        @keyframes c3d-float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
        @keyframes c3d-float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(15px,10px)} }
      `
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    const onResize = () => setWinW(window.innerWidth)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRef.current) setActiveIndex(prev => (prev + 1) % TOTAL)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const onMove = (e) => setMouse({
      x: (e.clientX / window.innerWidth)  * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    })
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const goTo = (i) => { setActiveIndex((i + TOTAL) % TOTAL); setAutoRotate(false) }
  const prev = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)

  const onDragStart = (clientX) => { setIsDragging(true); dragStartX.current = clientX; setAutoRotate(false) }
  const onDragMove  = (clientX) => {
    if (!isDragging || dragStartX.current === null) return
    const diff = clientX - dragStartX.current
    if (Math.abs(diff) > 60) { diff < 0 ? next() : prev(); dragStartX.current = clientX }
  }
  const onDragEnd = () => { setIsDragging(false); dragStartX.current = null }

  const scrollToMenu = () => {
    const el = document.getElementById('meniu')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const active = PRODUCTS[activeIndex]
  const accent = ACCENT[active.category]
  const b1 = { x: mouse.x * 15, y: mouse.y * 10 }
  const b2 = { x: mouse.x * -10, y: mouse.y * -8 }

  const fadeIn = (delay = 0) => ({ animation: `carousel3d-slideIn 0.6s ease ${delay}s both` })

  return (
    <div style={{
      position:      'relative',
      overflow:      'hidden',
      background:    '#F5EFE3',
      fontFamily:    '"Hanken Grotesk", sans-serif',
      paddingTop:    isMobile ? '60px' : '80px',
      paddingBottom: isMobile ? '60px' : '80px',
    }}>

      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(142,31,27,0.06), transparent)', filter: 'blur(100px)', top: '10%', left: '5%', animation: 'c3d-float1 18s ease-in-out infinite', transform: `translate(${b1.x}px,${b1.y}px)`, transition: 'transform 0.1s linear' }}/>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(184,134,11,0.04), transparent)', filter: 'blur(80px)', bottom: '10%', right: '10%', animation: 'c3d-float2 22s ease-in-out infinite', transform: `translate(${b2.x}px,${b2.y}px)`, transition: 'transform 0.1s linear' }}/>
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,42,36,0.04), transparent)', filter: 'blur(60px)', top: '50%', left: '50%', animation: 'c3d-float3 15s ease-in-out infinite' }}/>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3, backgroundImage: 'repeating-linear-gradient(0deg,rgba(46,42,36,0.015) 0 1px,transparent 1px 80px),repeating-linear-gradient(90deg,rgba(46,42,36,0.015) 0 1px,transparent 1px 80px)' }}/>
        <svg style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '150px', opacity: 0.06 }} viewBox="0 0 150 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0,0 Q120,200 40,400 Q-40,600 80,900" stroke="#8E1F1B" strokeWidth="1" fill="none"/>
        </svg>
        <svg style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '150px', opacity: 0.06, transform: 'scaleX(-1)' }} viewBox="0 0 150 900" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M0,0 Q120,200 40,400 Q-40,600 80,900" stroke="#8E1F1B" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* Header */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginBottom: isMobile ? '40px' : '56px', userSelect: 'none' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '8px', ...fadeIn(0) }}>
          <span style={{ fontFamily: '"Bitter", serif', fontSize: '18px', color: '#8E1F1B' }}>Foc</span>
          <FlameIcon />
          <span style={{ fontFamily: '"Bitter", serif', fontSize: '18px', color: '#2E2A24' }}>Gust</span>
        </div>
        <p style={{ fontSize: '11px', letterSpacing: '5px', color: 'rgba(142,31,27,0.5)', textTransform: 'uppercase', margin: '0 0 20px', ...fadeIn(0.1) }}>
          Stand de grătar tradițional
        </p>
        <div style={{ marginBottom: '20px', ...fadeIn(0.2) }}>
          <OasOrnament />
        </div>
        <h2 style={{ fontFamily: '"Bitter", serif', fontSize: 'clamp(28px, 6vw, 52px)', lineHeight: 1.1, margin: '0 0 10px', ...fadeIn(0.3) }}>
          <span style={{ color: '#2E2A24' }}>Meniul </span>
          <span style={{ color: '#8E1F1B' }}>Nostru</span>
        </h2>
        <p style={{ color: '#6E6357', fontSize: '14px', fontStyle: 'italic', margin: '0 0 6px', ...fadeIn(0.4) }}>
          Selectează un produs pentru detalii
        </p>
        <p style={{ fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(110,99,87,0.6)', margin: 0, ...fadeIn(0.5) }}>
          Țara Oașului · Județul Satu Mare
        </p>
      </div>

      {/* 3D Carousel */}
      <div
        style={{ position: 'relative', height: `${sceneH}px`, perspective: '1200px', overflow: 'visible', cursor: isDragging ? 'grabbing' : 'grab', zIndex: 1, userSelect: 'none' }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => { e.preventDefault(); onDragMove(e.touches[0].clientX) }}
        onTouchEnd={onDragEnd}
      >
        <div style={{
          position:       'absolute',
          left:           '50%',
          top:            '50%',
          transform:      `translate(-50%, -50%) rotateY(${-activeIndex * STEP}deg)`,
          transformStyle: 'preserve-3d',
          transition:     'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
          width:          '1px',
          height:         '1px',
        }}>
          {PRODUCTS.map((product, i) => {
            const isActive = i === activeIndex
            const cat = ACCENT[product.category]
            return (
              <div key={product.name}
                onClick={() => { setActiveIndex(i); setAutoRotate(false) }}
                style={{
                  position:       'absolute',
                  width:          `${cardW}px`,
                  height:         `${cardH}px`,
                  left:           `${-cardW / 2}px`,
                  top:            `${-cardH / 2}px`,
                  transform:      `rotateY(${i * STEP}deg) translateZ(${radius}px)`,
                  borderRadius:   '16px',
                  background:     'linear-gradient(160deg, rgba(46,42,36,0.97) 0%, rgba(46,42,36,0.96) 100%)',
                  border:         isActive ? `1px solid ${cat.line}50` : '1px solid rgba(255,255,255,0.05)',
                  boxShadow:      isActive ? `0 32px 80px rgba(46,42,36,0.4), 0 0 0 1px ${cat.line}20` : '0 8px 32px rgba(46,42,36,0.25)',
                  backdropFilter: 'blur(20px)',
                  overflow:       'hidden',
                  cursor:         isDragging ? 'grabbing' : 'pointer',
                  transition:     'border-color 0.5s ease, box-shadow 0.5s ease',
                  display:        'flex',
                  flexDirection:  'column',
                }}>

                {/* top accent bar */}
                <div style={{ height: '3px', background: `linear-gradient(90deg, ${cat.line}, ${cat.line}20)`, flexShrink: 0 }}/>

                {/* card body */}
                <div style={{ padding: isMobile ? '16px 16px 14px' : '20px 20px 18px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>

                  {/* watermark number */}
                  <span style={{
                    position:      'absolute',
                    right:         '-6px',
                    bottom:        '-14px',
                    fontFamily:    '"Bitter", serif',
                    fontSize:      isMobile ? '88px' : '108px',
                    lineHeight:    1,
                    color:         'rgba(245,239,227,0.025)',
                    userSelect:    'none',
                    pointerEvents: 'none',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* category label */}
                  <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: cat.text, margin: '0 0 8px', fontWeight: 600, flexShrink: 0 }}>
                    {product.category}
                  </p>

                  {/* accent dash */}
                  <div style={{ width: '20px', height: '1px', background: cat.line, opacity: 0.5, marginBottom: '10px', flexShrink: 0 }}/>

                  {/* product name */}
                  <p style={{ fontFamily: '"Bitter", serif', fontSize: isMobile ? '17px' : '20px', color: '#F5EFE3', margin: '0 0 5px', lineHeight: 1.25, flexShrink: 0 }}>
                    {product.name}
                  </p>

                  {/* gramaj / pieces */}
                  <p style={{ fontSize: '10px', color: 'rgba(245,239,227,0.28)', letterSpacing: '1px', textTransform: 'uppercase', margin: '0 0 10px', flexShrink: 0 }}>
                    {product.pieces}
                  </p>

                  {/* description */}
                  <p style={{ fontSize: '11px', color: 'rgba(245,239,227,0.38)', lineHeight: 1.6, margin: 0, flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {product.desc}
                  </p>

                  {/* price row */}
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
                    <p style={{ fontFamily: '"Bitter", serif', fontSize: isMobile ? '24px' : '30px', color: cat.line, margin: 0, lineHeight: 1, textShadow: `0 0 24px ${cat.line}50` }}>
                      {product.price}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '32px', userSelect: 'none' }}>
        <NavBtn label="←" onClick={prev} size={isMobile ? 40 : 48} aria="Produs anterior" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {PRODUCTS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              style={{ width: i === activeIndex ? '28px' : '8px', height: '8px', borderRadius: i === activeIndex ? '4px' : '50%', background: i === activeIndex ? '#8E1F1B' : 'rgba(46,42,36,0.12)', boxShadow: i === activeIndex ? '0 0 12px rgba(142,31,27,0.4)' : 'none', border: 'none', padding: 0, cursor: 'pointer', transition: 'width 0.4s ease, background 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease' }}
              aria-label={`Selectează ${PRODUCTS[i].name}`}
            />
          ))}
        </div>
        <NavBtn label="→" onClick={next} size={isMobile ? 40 : 48} aria="Produs următor" />
      </div>

      {/* Active product detail panel */}
      <div key={activeIndex}
        style={{ position: 'relative', zIndex: 1, margin: '32px auto 0', maxWidth: '500px', padding: isMobile ? '24px 16px' : '32px 24px', textAlign: 'center', animation: 'carousel3d-slideIn 0.5s ease', userSelect: 'none' }}>
        <p style={{ fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase', color: accent.text, margin: '0 0 8px', fontWeight: 600 }}>
          {active.category}
        </p>
        <p style={{ fontFamily: '"Bitter", serif', fontSize: isMobile ? '22px' : '28px', color: '#2E2A24', margin: '0 0 4px' }}>
          {active.name}
        </p>
        <p style={{ fontSize: '11px', color: '#6E6357', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 14px' }}>
          {active.pieces}
        </p>
        <p style={{ color: '#6E6357', fontSize: '14px', lineHeight: 1.65, margin: '0 0 18px' }}>
          {active.desc}
        </p>
        <p style={{ fontFamily: '"Bitter", serif', fontSize: isMobile ? '28px' : '36px', color: '#8E1F1B', textShadow: '0 0 30px rgba(142,31,27,0.15)', margin: '0 0 24px' }}>
          {active.price}
        </p>
        <button
          onClick={scrollToMenu}
          style={{ background: '#8E1F1B', color: 'white', border: 'none', padding: '14px 40px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', boxShadow: '0 8px 30px rgba(142,31,27,0.3)', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', fontFamily: '"Hanken Grotesk", sans-serif' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(142,31,27,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.boxShadow = '0 8px 30px rgba(142,31,27,0.3)' }}
        >
          Vezi meniul complet
        </button>
      </div>

      {/* Footer ornament */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', marginTop: isMobile ? '40px' : '52px', userSelect: 'none' }}>
        <OasOrnament />
        <p style={{ fontFamily: '"Bitter", serif', fontSize: '14px', color: 'rgba(142,31,27,0.3)', fontStyle: 'italic', marginTop: '12px' }}>
          Tradiția care arde, gustul care rămâne.
        </p>
      </div>

      <p style={{ position: 'relative', zIndex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(110,99,87,0.5)', fontStyle: 'italic', marginTop: '12px' }}>
        Drag sau swipe pentru a explora
      </p>
    </div>
  )
}

function NavBtn({ label, onClick, size, aria }) {
  return (
    <button
      onClick={onClick}
      style={{ width: `${size}px`, height: `${size}px`, borderRadius: '50%', background: 'rgba(46,42,36,0.04)', border: '1px solid rgba(46,42,36,0.08)', cursor: 'pointer', fontSize: size >= 48 ? '18px' : '15px', color: '#2E2A24', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.background = 'rgba(142,31,27,0.1)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(46,42,36,0.04)' }}
      aria-label={aria}
    >{label}</button>
  )
}
