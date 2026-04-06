import { useEffect, useRef, useState } from 'react'

function useCountUp(target, duration = 1000) {
  const [val, setVal] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (target === 0) { setVal(0); return }
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [target, duration])

  return val
}

export default function StatCard({ label, value, prefix = '', suffix = '', color = '#c41e3a', icon, trend }) {
  const animated = useCountUp(typeof value === 'number' ? value : 0)
  const display  = typeof value === 'number' ? animated : value

  return (
    <div style={{
      background:   '#1a1a1a',
      border:       '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding:      '20px 22px',
      display:      'flex',
      flexDirection:'column',
      gap:          '12px',
      transition:   'border-color 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = `${color}40`}
    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', margin: 0 }}>
          {label}
        </p>
        {icon && <span style={{ fontSize: '18px', opacity: 0.5 }}>{icon}</span>}
      </div>

      <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '28px', fontWeight: 700, color, margin: 0, lineHeight: 1 }}>
        {prefix}{display.toLocaleString('ro-RO')}{suffix}
      </p>

      {trend !== undefined && (
        <p style={{ fontSize: '12px', color: trend >= 0 ? '#10b981' : '#ef4444', margin: 0 }}>
          {trend >= 0 ? '↑' : '↓'} {Math.abs(trend).toFixed(1)}% față de medie
        </p>
      )}
    </div>
  )
}
