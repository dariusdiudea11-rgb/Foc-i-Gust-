export default function Input({ label, type = 'text', value, onChange, placeholder, min, step, required, hint }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && (
        <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>
          {label}{required && <span style={{ color: '#c41e3a' }}> *</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        required={required}
        style={{
          background:  '#0f0f0f',
          border:      '1px solid rgba(255,255,255,0.1)',
          borderRadius:'8px',
          padding:     '9px 12px',
          fontSize:    '14px',
          color:       '#f5f5f5',
          outline:     'none',
          fontFamily:  'inherit',
          cursor:      'auto',
          width:       '100%',
          boxSizing:   'border-box',
          transition:  'border-color 0.2s',
        }}
        onFocus={e => e.target.style.borderColor = '#c41e3a'}
        onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
      />
      {hint && <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>{hint}</p>}
    </div>
  )
}
