import { useState } from 'react'
import { profit, totalVenituri, totalCosturi } from '../../utils/calculations'
import { fmtRON, fmtDateShort } from '../../utils/formatters'

const CHART_H  = 160   // drawable area height (px in SVG units)
const BAR_W    = 28
const BAR_GAP  = 14
const PADDING  = { top: 16, right: 16, bottom: 40, left: 60 }

export default function BarChart({ targuri }) {
  const [tooltip, setTooltip] = useState(null)

  const finished = targuri.filter(t => t.status === 'finalizat' || totalVenituri(t) > 0)

  if (finished.length === 0) {
    return (
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '13px', fontStyle: 'italic', margin: 0 }}>
          Nicio dată financiară disponibilă pentru grafic
        </p>
      </div>
    )
  }

  const values  = finished.map(t => profit(t))
  const maxAbs  = Math.max(...values.map(Math.abs), 1)
  const zeroY   = PADDING.top + CHART_H / 2

  const totalW  = PADDING.left + finished.length * (BAR_W + BAR_GAP) - BAR_GAP + PADDING.right
  const totalH  = PADDING.top + CHART_H + PADDING.bottom
  const svgW    = Math.max(totalW, 320)

  const barX = (i) => PADDING.left + i * (BAR_W + BAR_GAP)
  const barH = (val) => (Math.abs(val) / maxAbs) * (CHART_H / 2)

  return (
    <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px', position: 'relative', overflowX: 'auto' }}>
      <h3 style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.8px', margin: '0 0 16px' }}>
        Profit per târg
      </h3>

      <svg width={svgW} height={totalH} style={{ display: 'block', minWidth: '100%' }}>
        {/* Zero line */}
        <line
          x1={PADDING.left - 8} y1={zeroY}
          x2={svgW - PADDING.right} y2={zeroY}
          stroke="rgba(255,255,255,0.1)" strokeWidth="1"
        />

        {/* Y-axis labels */}
        {[maxAbs, 0, -maxAbs].map((val, i) => {
          const y = PADDING.top + (i / 2) * CHART_H
          return (
            <text key={val} x={PADDING.left - 12} y={y + 4}
              textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.25)">
              {val === 0 ? '0' : fmtRON(val).replace(' RON', '')}
            </text>
          )
        })}

        {/* Bars */}
        {finished.map((targ, i) => {
          const val  = values[i]
          const h    = barH(val)
          const x    = barX(i)
          const isPos = val >= 0
          const y    = isPos ? zeroY - h : zeroY
          const color = isPos ? '#c41e3a' : '#ef4444'

          return (
            <g key={targ.id}
              onMouseEnter={() => setTooltip({ i, targ, val })}
              onMouseLeave={() => setTooltip(null)}
              style={{ cursor: 'pointer' }}>
              <rect
                x={x} y={y} width={BAR_W} height={Math.max(h, 2)}
                fill={tooltip?.i === i ? color : `${color}99`}
                rx="4"
                style={{ transition: 'fill 0.15s' }}
              />
              {/* X label */}
              <text
                x={x + BAR_W / 2} y={totalH - 6}
                textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.3)">
                {fmtDateShort(targ.data)}
              </text>
            </g>
          )
        })}

        {/* Tooltip */}
        {tooltip && (() => {
          const x = barX(tooltip.i)
          const tx = Math.min(x + BAR_W + 8, svgW - 130)
          return (
            <g>
              <rect x={tx} y={PADDING.top} width={120} height={70}
                fill="#111" rx="6" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
              <text x={tx + 8} y={PADDING.top + 16} fontSize="11" fill="#f5f5f5" fontWeight="600">
                {tooltip.targ.nume.slice(0, 16)}{tooltip.targ.nume.length > 16 ? '…' : ''}
              </text>
              <text x={tx + 8} y={PADDING.top + 32} fontSize="10" fill="rgba(255,255,255,0.4)">
                Venituri: {fmtRON(totalVenituri(tooltip.targ))}
              </text>
              <text x={tx + 8} y={PADDING.top + 46} fontSize="10" fill="rgba(255,255,255,0.4)">
                Costuri: {fmtRON(totalCosturi(tooltip.targ))}
              </text>
              <text x={tx + 8} y={PADDING.top + 62} fontSize="11"
                fill={tooltip.val >= 0 ? '#c41e3a' : '#ef4444'} fontWeight="700">
                Profit: {fmtRON(tooltip.val)}
              </text>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}
