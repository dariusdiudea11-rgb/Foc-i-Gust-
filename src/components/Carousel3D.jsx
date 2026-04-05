import { useState, useEffect, useRef } from 'react'

const PRODUCTS = [
  { name: "Mici Tradițional",  pieces: "3 bucăți",             price: "25 lei", desc: "Rețetă de familie, carne de vită și porc, preparați pe cărbuni",      emoji: "🔥" },
  { name: "Ceafă de Porc",     pieces: "200g",                 price: "30 lei", desc: "Ceafă marinată, gătită lent pe cărbuni cu condimente naturale",        emoji: "🥩" },
  { name: "Piept de Pui",      pieces: "200g",                 price: "25 lei", desc: "Piept suculent, condimentat tradițional pe jar de cărbuni",            emoji: "🍗" },
  { name: "Cârnăciori",        pieces: "3 bucăți",             price: "20 lei", desc: "Cârnăciori cu condimente naturale, rețetă proprie de familie",         emoji: "🌭" },
  { name: "Cartofi Prăjiți",   pieces: "porție",               price: "15 lei", desc: "Cartofi aurii, crocanți, porție generoasă",                            emoji: "🍟" },
  { name: "Combo Oșanul",      pieces: "mici + cartofi + suc", price: "35 lei", desc: "Mici tradițional, cartofi prăjiți și suc la alegere",                  emoji: "⭐" },
]

const TOTAL  = PRODUCTS.length
const STEP   = 360 / TOTAL
const RADIUS = 320

/* ── Oaș ornament ── */
function OasOrnament() {
  return (
    <svg
      viewBox="0 0 120 16"
      width="120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', margin: '0 auto' }}
      aria-hidden="true"
    >
      {[0, 25, 50, 75, 100].map((x) => (
        <path
          key={x}
          d={`M${x + 10} 8L${x} 0L${x + 10} 8L${x + 20} 0L${x + 10} 8L${x + 20} 16L${x + 10} 8L${x} 16L${x + 10} 8Z`}
          stroke="rgba(196,30,58,0.15)"
          strokeWidth="0.8"
          fill="none"
        />
      ))}
    </svg>
  )
}

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoRotate, setAutoRotate]   = useState(true)
  const [isDragging, setIsDragging]   = useState(false)
  const [mouse, setMouse]             = useState({ x: 0, y: 0 })

  const autoRef    = useRef(autoRotate)
  const dragStartX = useRef(null)
  const wrapperRef = useRef(null)
  autoRef.current  = autoRotate

  /* ── inject keyframes once ── */
  useEffect(() => {
    const id = 'carousel3d-styles'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = `
        @keyframes carousel3d-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes carousel3d-slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes c3d-float1 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(25px, -15px); }
        }
        @keyframes c3d-float2 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(-20px, 20px); }
        }
        @keyframes c3d-float3 {
          0%, 100% { transform: translate(0, 0); }
          50%       { transform: translate(15px, 10px); }
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  /* ── auto-rotate ── */
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRef.current) setActiveIndex(prev => (prev + 1) % TOTAL)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  /* ── mouse parallax (desktop only) ── */
  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth)  * 2 - 1,   // -1 … 1
        y: (e.clientY / window.innerHeight) * 2 - 1,
      })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  /* ── navigation ── */
  const goTo = (i) => { setActiveIndex((i + TOTAL) % TOTAL); setAutoRotate(false) }
  const prev = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)

  /* ── drag / swipe ── */
  const onDragStart = (clientX) => {
    setIsDragging(true)
    dragStartX.current = clientX
    setAutoRotate(false)
  }
  const onDragMove = (clientX) => {
    if (!isDragging || dragStartX.current === null) return
    const diff = clientX - dragStartX.current
    if (Math.abs(diff) > 60) {
      diff < 0 ? next() : prev()
      dragStartX.current = clientX
    }
  }
  const onDragEnd = () => { setIsDragging(false); dragStartX.current = null }

  const active = PRODUCTS[activeIndex]

  /* parallax offsets for blobs */
  const b1 = { x: mouse.x * 15, y: mouse.y * 10 }
  const b2 = { x: mouse.x * -10, y: mouse.y * -8 }

  return (
    <div ref={wrapperRef} style={{ userSelect: 'none', position: 'relative' }}>

      {/* ── Oaș ornament — header ── */}
      <div style={{ marginBottom: '24px' }}>
        <OasOrnament />
      </div>

      {/* ── Background layer (mesh + grid + curves) ── */}
      <div style={{
        position:      'absolute',
        inset:         0,
        pointerEvents: 'none',
        overflow:      'hidden',
        zIndex:        0,
      }}>
        {/* Blob 1 */}
        <div style={{
          position:     'absolute',
          width:        '500px',
          height:       '500px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(196,30,58,0.06), transparent)',
          filter:       'blur(100px)',
          top:          '10%',
          left:         '5%',
          animation:    'c3d-float1 18s ease-in-out infinite',
          transform:    `translate(${b1.x}px, ${b1.y}px)`,
          transition:   'transform 0.1s linear',
        }}/>

        {/* Blob 2 */}
        <div style={{
          position:     'absolute',
          width:        '400px',
          height:       '400px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(184,134,11,0.04), transparent)',
          filter:       'blur(80px)',
          bottom:       '10%',
          right:        '10%',
          animation:    'c3d-float2 22s ease-in-out infinite',
          transform:    `translate(${b2.x}px, ${b2.y}px)`,
          transition:   'transform 0.1s linear',
        }}/>

        {/* Blob 3 */}
        <div style={{
          position:     'absolute',
          width:        '300px',
          height:       '300px',
          borderRadius: '50%',
          background:   'radial-gradient(circle, rgba(26,21,32,0.04), transparent)',
          filter:       'blur(60px)',
          top:          '50%',
          left:         '50%',
          animation:    'c3d-float3 15s ease-in-out infinite',
        }}/>

        {/* Grid pattern */}
        <div style={{
          position:        'absolute',
          inset:           0,
          opacity:         0.3,
          backgroundImage: `
            repeating-linear-gradient(0deg,   rgba(26,21,32,0.015) 0 1px, transparent 1px 80px),
            repeating-linear-gradient(90deg,  rgba(26,21,32,0.015) 0 1px, transparent 1px 80px)
          `,
        }}/>

        {/* Decorative curve — left */}
        <svg
          style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '150px', opacity: 0.06 }}
          viewBox="0 0 150 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0,0 Q120,200 40,400 Q-40,600 80,900" stroke="#c41e3a" strokeWidth="1" fill="none"/>
        </svg>

        {/* Decorative curve — right (mirror) */}
        <svg
          style={{ position: 'absolute', right: 0, top: 0, height: '100%', width: '150px', opacity: 0.06, transform: 'scaleX(-1)' }}
          viewBox="0 0 150 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M0,0 Q120,200 40,400 Q-40,600 80,900" stroke="#c41e3a" strokeWidth="1" fill="none"/>
        </svg>
      </div>

      {/* ── 3D scene ── */}
      <div
        style={{
          position:    'relative',
          height:      '450px',
          perspective: '1200px',
          overflow:    'visible',
          cursor:      isDragging ? 'grabbing' : 'grab',
          zIndex:      1,
        }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        {/* rotating ring */}
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
            return (
              <div
                key={product.name}
                onClick={() => { setActiveIndex(i); setAutoRotate(false) }}
                style={{
                  position:       'absolute',
                  width:          '240px',
                  height:         '350px',
                  left:           '-120px',
                  top:            '-175px',
                  transform:      `rotateY(${i * STEP}deg) translateZ(${RADIUS}px)`,
                  borderRadius:   '20px',
                  background:     'linear-gradient(135deg, rgba(26,21,32,0.95), rgba(26,21,32,0.85))',
                  border:         isActive ? '1px solid rgba(196,30,58,0.4)' : '1px solid rgba(255,255,255,0.06)',
                  boxShadow:      isActive ? '0 30px 80px rgba(196,30,58,0.2), 0 0 40px rgba(196,30,58,0.1)' : 'none',
                  backdropFilter: 'blur(20px)',
                  overflow:       'hidden',
                  cursor:         isDragging ? 'grabbing' : 'pointer',
                  transition:     'border-color 0.5s ease, box-shadow 0.5s ease',
                  display:        'flex',
                  flexDirection:  'column',
                }}
              >
                {/* top reflection */}
                <div style={{
                  position:      'absolute',
                  top: 0, left: 0, right: 0,
                  height:        '80px',
                  background:    'linear-gradient(180deg, rgba(255,255,255,0.04), transparent)',
                  pointerEvents: 'none',
                  zIndex:        3,
                  borderRadius:  '20px 20px 0 0',
                }}/>

                {/* icon area */}
                <div style={{
                  height:         '140px',
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  position:       'relative',
                  flexShrink:     0,
                }}>
                  <div style={{
                    position:     'absolute',
                    width:        '120px',
                    height:       '120px',
                    borderRadius: '50%',
                    background:   'radial-gradient(circle, rgba(196,30,58,0.12), transparent)',
                    filter:       'blur(30px)',
                  }}/>
                  {isActive && (
                    <div style={{
                      position:     'absolute',
                      width:        '90px',
                      height:       '90px',
                      border:       '1px solid rgba(196,30,58,0.1)',
                      borderRadius: '50%',
                      animation:    'carousel3d-spin 20s linear infinite',
                    }}/>
                  )}
                  <span style={{
                    fontSize:   '52px',
                    position:   'relative',
                    zIndex:     2,
                    filter:     'drop-shadow(0 4px 12px rgba(0,0,0,0.3))',
                    lineHeight: 1,
                  }}>
                    {product.emoji}
                  </span>
                </div>

                {/* text area */}
                <div style={{ padding: '0 20px 20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ width: '30px', height: '2px', background: 'rgba(196,30,58,0.5)', marginBottom: '6px', flexShrink: 0 }}/>
                  <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '20px', color: '#faf3e8', margin: 0, lineHeight: 1.2 }}>
                    {product.name}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(250,243,232,0.35)', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
                    {product.pieces}
                  </p>
                  <p style={{
                    fontSize:        '12px',
                    color:           'rgba(250,243,232,0.4)',
                    lineHeight:      1.5,
                    margin:          0,
                    display:         '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow:        'hidden',
                    flex:            1,
                  }}>
                    {product.desc}
                  </p>
                  <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '26px', color: '#c41e3a', textShadow: '0 0 20px rgba(196,30,58,0.3)', margin: '4px 0 0', lineHeight: 1 }}>
                    {product.price}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Navigation (buttons + dots) ── */}
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '32px' }}>

        <button
          onClick={prev}
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(26,21,32,0.04)', border: '1px solid rgba(26,21,32,0.08)', cursor: 'pointer', fontSize: '18px', color: '#1a1520', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.background = 'rgba(196,30,58,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(26,21,32,0.04)' }}
          aria-label="Produs anterior"
        >←</button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {PRODUCTS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width:        i === activeIndex ? '28px' : '8px',
                height:       '8px',
                borderRadius: i === activeIndex ? '4px' : '50%',
                background:   i === activeIndex ? '#c41e3a' : 'rgba(26,21,32,0.12)',
                boxShadow:    i === activeIndex ? '0 0 12px rgba(196,30,58,0.4)' : 'none',
                border:       'none',
                padding:      0,
                cursor:       'pointer',
                transition:   'width 0.4s ease, background 0.4s ease, box-shadow 0.4s ease, border-radius 0.4s ease',
              }}
              aria-label={`Selectează ${PRODUCTS[i].name}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(26,21,32,0.04)', border: '1px solid rgba(26,21,32,0.08)', cursor: 'pointer', fontSize: '18px', color: '#1a1520', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s', flexShrink: 0 }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.background = 'rgba(196,30,58,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(26,21,32,0.04)' }}
          aria-label="Produs următor"
        >→</button>
      </div>

      {/* ── Active product detail ── */}
      <div
        key={activeIndex}
        style={{ position: 'relative', zIndex: 1, margin: '32px auto 0', maxWidth: '500px', padding: '32px 24px', textAlign: 'center', animation: 'carousel3d-slideIn 0.5s ease' }}
      >
        <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '28px', color: '#1a1520', margin: '0 0 10px' }}>
          {active.name}
        </p>
        <p style={{ color: '#8a7e6d', fontSize: '14px', lineHeight: 1.6, margin: '0 0 16px' }}>
          {active.desc}
        </p>
        <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '36px', color: '#c41e3a', textShadow: '0 0 30px rgba(196,30,58,0.15)', margin: 0 }}>
          {active.price}
        </p>
      </div>

      {/* ── Oaș ornament — footer ── */}
      <div style={{ position: 'relative', zIndex: 1, marginTop: '20px' }}>
        <OasOrnament />
      </div>

      {/* hint */}
      <p style={{ position: 'relative', zIndex: 1, textAlign: 'center', fontSize: '11px', color: 'rgba(138,126,109,0.5)', fontStyle: 'italic', marginTop: '12px' }}>
        Drag sau swipe pentru a explora
      </p>

    </div>
  )
}
