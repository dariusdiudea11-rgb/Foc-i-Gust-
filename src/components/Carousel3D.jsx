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

export default function Carousel3D() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoRotate, setAutoRotate]   = useState(true)
  const [isDragging, setIsDragging]   = useState(false)
  const autoRef    = useRef(autoRotate)
  const dragStartX = useRef(null)
  autoRef.current  = autoRotate

  /* inject keyframes once */
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
      `
      document.head.appendChild(style)
    }
  }, [])

  /* auto-rotate */
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoRef.current) setActiveIndex(prev => (prev + 1) % TOTAL)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  /* navigation helpers */
  const goTo = (i) => {
    setActiveIndex((i + TOTAL) % TOTAL)
    setAutoRotate(false)
  }
  const prev = () => goTo(activeIndex - 1)
  const next = () => goTo(activeIndex + 1)

  /* drag / swipe */
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
  const onDragEnd = () => {
    setIsDragging(false)
    dragStartX.current = null
  }

  const active = PRODUCTS[activeIndex]

  return (
    <div style={{ userSelect: 'none' }}>

      {/* ── 3D scene ── */}
      <div
        style={{
          position: 'relative',
          height:   '450px',
          perspective: '1200px',
          overflow: 'visible',
          cursor:   isDragging ? 'grabbing' : 'grab',
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
                    fontSize:          '12px',
                    color:             'rgba(250,243,232,0.4)',
                    lineHeight:        1.5,
                    margin:            0,
                    display:           '-webkit-box',
                    WebkitLineClamp:   2,
                    WebkitBoxOrient:   'vertical',
                    overflow:          'hidden',
                    flex:              1,
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '24px', marginTop: '32px' }}>

        {/* prev button */}
        <button
          onClick={prev}
          style={{
            width:        '48px',
            height:       '48px',
            borderRadius: '50%',
            background:   'rgba(26,21,32,0.04)',
            border:       '1px solid rgba(26,21,32,0.08)',
            cursor:       'pointer',
            fontSize:     '18px',
            color:        '#1a1520',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            transition:   'all 0.3s',
            flexShrink:   0,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.background = 'rgba(196,30,58,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(26,21,32,0.04)' }}
          aria-label="Produs anterior"
        >
          ←
        </button>

        {/* dots */}
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

        {/* next button */}
        <button
          onClick={next}
          style={{
            width:        '48px',
            height:       '48px',
            borderRadius: '50%',
            background:   'rgba(26,21,32,0.04)',
            border:       '1px solid rgba(26,21,32,0.08)',
            cursor:       'pointer',
            fontSize:     '18px',
            color:        '#1a1520',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            transition:   'all 0.3s',
            flexShrink:   0,
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.15)'; e.currentTarget.style.background = 'rgba(196,30,58,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)';    e.currentTarget.style.background = 'rgba(26,21,32,0.04)' }}
          aria-label="Produs următor"
        >
          →
        </button>
      </div>

      {/* ── Active product detail ── */}
      <div
        key={activeIndex}
        style={{
          margin:    '32px auto 0',
          maxWidth:  '500px',
          padding:   '32px 24px',
          textAlign: 'center',
          animation: 'carousel3d-slideIn 0.5s ease',
        }}
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

      {/* hint */}
      <p style={{ textAlign: 'center', fontSize: '11px', color: 'rgba(138,126,109,0.5)', fontStyle: 'italic', marginTop: '12px' }}>
        Drag sau swipe pentru a explora
      </p>

    </div>
  )
}
