import { useNavigate } from 'react-router-dom'
import StatCard from '../components/stats/StatCard'
import BarChart from '../components/stats/BarChart'
import Badge from '../components/ui/Badge'
import { totaleSezon, topTarguri, profit } from '../utils/calculations'
import { fmtRON, fmtDate } from '../utils/formatters'

export default function Overview({ targuri }) {
  const navigate  = useNavigate()
  const totale    = totaleSezon(targuri)
  const top3      = topTarguri(targuri, 3)
  const finalizate = targuri.filter(t => t.status === 'finalizat').length
  const total     = targuri.length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '1100px' }}>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <StatCard label="Venituri sezon"  value={totale.venituri} suffix=" lei" color="#10b981" icon="💰" />
        <StatCard label="Costuri sezon"   value={totale.costuri}  suffix=" lei" color="#f59e0b" icon="📦" />
        <StatCard label="Profit net"      value={totale.profit}   suffix=" lei" color={totale.profit >= 0 ? '#c41e3a' : '#ef4444'} icon="📈" />
        <StatCard label="Târguri sezon"   value={total}           color="#818cf8" icon="🏪"
          trend={total > 0 ? ((finalizate / total) * 100 - 50) : undefined} />
      </div>

      {/* Chart */}
      <BarChart targuri={targuri} />

      {/* Top 3 */}
      {top3.length > 0 && (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
          <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 16px' }}>
            Top târguri după profit
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {top3.map((targ, i) => (
              <div key={targ.id}
                onClick={() => navigate(`/dashboard/targuri/${targ.id}`)}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '12px', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: i === 0 ? '#f59e0b' : 'rgba(255,255,255,0.2)', width: '24px', textAlign: 'center' }}>
                  {i + 1}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: '#f5f5f5', margin: '0 0 2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {targ.nume}
                  </p>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
                    {targ.locatie} · {fmtDate(targ.data)}
                  </p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '15px', fontWeight: 700, color: '#c41e3a', margin: '0 0 2px', fontFamily: '"DM Serif Display", serif' }}>
                    {fmtRON(profit(targ))}
                  </p>
                  <Badge status={targ.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {targuri.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#1a1a1a', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '32px', margin: '0 0 12px' }}>🏪</p>
          <p style={{ fontSize: '16px', fontWeight: 600, color: 'rgba(255,255,255,0.5)', margin: '0 0 6px' }}>Niciun târg înregistrat</p>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            Mergi la <strong style={{ color: 'rgba(255,255,255,0.4)' }}>Târguri</strong> și adaugă primul eveniment al sezonului.
          </p>
        </div>
      )}
    </div>
  )
}
