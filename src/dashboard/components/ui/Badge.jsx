const STYLES = {
  confirmat:    { bg: 'rgba(91,122,69,0.12)',  color: '#5B7A45', border: 'rgba(91,122,69,0.25)' },
  in_asteptare: { bg: 'rgba(214,154,45,0.12)',  color: '#D69A2D', border: 'rgba(214,154,45,0.25)' },
  finalizat:    { bg: 'rgba(194,97,30,0.12)',  color: '#C2611E', border: 'rgba(194,97,30,0.25)' },
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
