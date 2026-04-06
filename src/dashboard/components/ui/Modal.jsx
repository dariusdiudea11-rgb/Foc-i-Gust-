import Button from './Button'

export default function Modal({ title, message, onConfirm, onCancel, confirmLabel = 'Confirmă', variant = 'danger' }) {
  return (
    <div style={{
      position:       'fixed',
      inset:          0,
      background:     'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(4px)',
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      zIndex:         1000,
    }}
    onClick={onCancel}>
      <div style={{
        background:   '#1a1a1a',
        border:       '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px',
        padding:      '28px',
        maxWidth:     '400px',
        width:        '90%',
      }}
      onClick={e => e.stopPropagation()}>
        <h3 style={{ color: '#f5f5f5', fontSize: '16px', fontWeight: 700, margin: '0 0 10px' }}>{title}</h3>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', lineHeight: 1.5, margin: '0 0 24px' }}>{message}</p>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onCancel}>Anulează</Button>
          <Button variant={variant} onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  )
}
