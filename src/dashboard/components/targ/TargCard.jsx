import { useNavigate } from 'react-router-dom'
import Badge from '../ui/Badge'
import { totalVenituri, totalCosturi, profit } from '../../utils/calculations'
import { fmtRON, fmtDate } from '../../utils/formatters'

export default function TargCard({ targ, onDelete }) {
  const navigate = useNavigate()
  const ven  = totalVenituri(targ)
  const cost = totalCosturi(targ)
  const prof = profit(targ)
  const hasData = ven > 0 || cost > 0

  return (
    <div style={{
      background:   '#1a1a1a',
      border:       '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px',
      padding:      '20px',
      cursor:       'pointer',
      transition:   'border-color 0.2s, transform 0.2s',
      display:      'flex',
      flexDirection:'column',
      gap:          '14px',
    }}
    onClick={() => navigate(`/dashboard/targuri/${targ.id}`)}
    onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(196,30,58,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)' }}>

      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontSize: '15px', fontWeight: 700, color: '#f5f5f5', margin: '0 0 4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {targ.nume}
          </p>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            {targ.locatie} · {fmtDate(targ.data)}
          </p>
        </div>
        <div style={{ flexShrink: 0 }}>
          <Badge status={targ.status} />
        </div>
      </div>

      {/* Financial summary */}
      {hasData ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          {[
            { label: 'Venituri',  value: fmtRON(ven),  color: '#10b981' },
            { label: 'Costuri',   value: fmtRON(cost), color: '#f59e0b' },
            { label: 'Profit',    value: fmtRON(prof), color: prof >= 0 ? '#c41e3a' : '#ef4444' },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ background: '#0f0f0f', borderRadius: '8px', padding: '10px 8px', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '0 0 3px' }}>{label}</p>
              <p style={{ fontSize: '13px', fontWeight: 700, color, margin: 0 }}>{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', fontStyle: 'italic', margin: 0 }}>
          Nicio dată financiară introdusă
        </p>
      )}

      {/* Footer actions */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}
        onClick={e => e.stopPropagation()}>
        <button
          onClick={() => onDelete(targ.id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.2)', fontSize: '12px', padding: '2px 6px', transition: 'color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.color = '#c41e3a'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.2)'}
        >
          Șterge
        </button>
      </div>
    </div>
  )
}
