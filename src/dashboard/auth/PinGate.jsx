import { useState, useRef, useEffect } from 'react'

const PIN_LENGTH = 4

export default function PinGate({ onLogin }) {
  const [digits, setDigits]   = useState(['', '', '', ''])
  const [shake, setShake]     = useState(false)
  const [error, setError]     = useState(false)
  const [hint, setHint]       = useState(false)
  const inputs = useRef([])

  useEffect(() => {
    inputs.current[0]?.focus()
    // Show PIN hint if first visit
    const hasPin = localStorage.getItem('fg_pin')
    if (!hasPin) setHint(true)
  }, [])

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return
    const next = [...digits]
    next[i] = val
    setDigits(next)
    setError(false)
    if (val && i < PIN_LENGTH - 1) inputs.current[i + 1]?.focus()
    if (val && i === PIN_LENGTH - 1) {
      const pin = [...next.slice(0, 3), val].join('')
      if (pin.length === PIN_LENGTH) submit(pin)
    }
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputs.current[i - 1]?.focus()
    }
  }

  const submit = (pin) => {
    const ok = onLogin(pin)
    if (!ok) {
      setShake(true)
      setError(true)
      setDigits(['', '', '', ''])
      setTimeout(() => { setShake(false); inputs.current[0]?.focus() }, 600)
    }
  }

  return (
    <div style={{
      minHeight:      '100vh',
      background:     '#0f0f0f',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      fontFamily:     '"DM Sans", system-ui, sans-serif',
      cursor:         'auto',
    }}>
      <div style={{ textAlign: 'center', width: '320px' }}>
        {/* Logo */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '24px', color: '#c41e3a', margin: '0 0 4px' }}>
            Foc și Gust
          </p>
          <p style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', margin: 0 }}>
            Dashboard intern
          </p>
        </div>

        {/* PIN box */}
        <div style={{
          background:   '#1a1a1a',
          border:       `1px solid ${error ? 'rgba(196,30,58,0.4)' : 'rgba(255,255,255,0.06)'}`,
          borderRadius: '16px',
          padding:      '32px 24px',
          transition:   'border-color 0.3s',
          animation:    shake ? 'pin-shake 0.5s ease' : 'none',
        }}>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', marginBottom: '24px' }}>
            Introdu PIN-ul
          </p>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={el => inputs.current[i] = el}
                type="password"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={e => handleChange(i, e.target.value)}
                onKeyDown={e => handleKeyDown(i, e)}
                style={{
                  width:       '52px',
                  height:      '60px',
                  textAlign:   'center',
                  fontSize:    '24px',
                  fontWeight:  700,
                  background:  '#0f0f0f',
                  border:      `1px solid ${error ? 'rgba(196,30,58,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius:'10px',
                  color:       '#fff',
                  outline:     'none',
                  cursor:      'auto',
                  transition:  'border-color 0.2s',
                }}
                onFocus={e => e.target.style.borderColor = '#c41e3a'}
                onBlur={e  => e.target.style.borderColor = error ? 'rgba(196,30,58,0.5)' : 'rgba(255,255,255,0.1)'}
              />
            ))}
          </div>

          {error && (
            <p style={{ color: '#c41e3a', fontSize: '12px', marginTop: 0, marginBottom: '8px' }}>
              PIN incorect. Încearcă din nou.
            </p>
          )}

          {hint && (
            <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', marginTop: '8px' }}>
              PIN implicit: 1234
            </p>
          )}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.15)', fontSize: '11px', marginTop: '20px' }}>
          Acces restricționat · Uz intern
        </p>
      </div>

      <style>{`
        @keyframes pin-shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  )
}
