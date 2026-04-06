const STYLES = {
  confirmat:    { bg: 'rgba(16,185,129,0.12)',  color: '#10b981', border: 'rgba(16,185,129,0.25)' },
  in_asteptare: { bg: 'rgba(245,158,11,0.12)',  color: '#f59e0b', border: 'rgba(245,158,11,0.25)' },
  finalizat:    { bg: 'rgba(99,102,241,0.12)',  color: '#818cf8', border: 'rgba(99,102,241,0.25)' },
}

const LABELS = {
  confirmat:    'Confirmat',
  in_asteptare: 'În așteptare',
  finalizat:    'Finalizat',
}

export default function Badge({ status }) {
  const s = STYLES[status] || STYLES.in_asteptare
  return (
    <span style={{
      display:      'inline-block',
      padding:      '3px 10px',
      borderRadius: '20px',
      fontSize:     '11px',
      fontWeight:   600,
      letterSpacing:'0.3px',
      background:   s.bg,
      color:        s.color,
      border:       `1px solid ${s.border}`,
    }}>
      {LABELS[status] || status}
    </span>
  )
}
