export default function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', disabled = false, fullWidth = false, style: extraStyle }) {
  const base = {
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            '8px',
    fontFamily:     'inherit',
    fontWeight:     600,
    cursor:         disabled ? 'not-allowed' : 'pointer',
    border:         'none',
    borderRadius:   '8px',
    transition:     'all 0.2s',
    opacity:        disabled ? 0.5 : 1,
    width:          fullWidth ? '100%' : undefined,
  }
  const sizes = {
    sm: { padding: '6px 12px', fontSize: '12px' },
    md: { padding: '9px 18px', fontSize: '13px' },
    lg: { padding: '12px 24px', fontSize: '14px' },
  }
  const variants = {
    primary: { background: '#8E1F1B', color: '#F5EFE3' },
    ghost:   { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.08)' },
    danger:  { background: 'rgba(142,31,27,0.12)', color: '#8E1F1B', border: '1px solid rgba(142,31,27,0.2)' },
    success: { background: 'rgba(91,122,69,0.12)', color: '#5B7A45', border: '1px solid rgba(91,122,69,0.2)' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant], ...extraStyle }}
      onMouseEnter={e => { if (!disabled) e.currentTarget.style.filter = 'brightness(1.15)' }}
      onMouseLeave={e => { e.currentTarget.style.filter = 'none' }}
    >
      {children}
    </button>
  )
}
