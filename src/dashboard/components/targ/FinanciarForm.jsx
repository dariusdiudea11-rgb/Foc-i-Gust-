import { useState } from 'react'
import Button from '../ui/Button'
import { totalVenituri, totalCosturi, profit, marjaProfit } from '../../utils/calculations'
import { fmtRON, fmtPct } from '../../utils/formatters'

const VENITURI_FIELDS = [
  { key: 'mici',       label: 'Mici tradițional' },
  { key: 'ceafa',      label: 'Ceafă de porc' },
  { key: 'carnaciori', label: 'Cârnăciori' },
  { key: 'cartofi',    label: 'Cartofi prăjiți' },
  { key: 'bauturi',    label: 'Băuturi' },
  { key: 'alte',       label: 'Alte venituri' },
]

const COSTURI_FIELDS = [
  { key: 'carne',     label: 'Carne / Materii prime' },
  { key: 'carbuni',   label: 'Cărbuni' },
  { key: 'transport', label: 'Transport' },
  { key: 'taxeStand', label: 'Taxă stand / Loc' },
  { key: 'personal',  label: 'Personal' },
  { key: 'alte',      label: 'Alte costuri' },
]

function NumberInput({ label, value, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <label style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', flex: 1 }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <input
          type="number"
          min="0"
          step="1"
          value={value || ''}
          placeholder="0"
          onChange={e => onChange(Number(e.target.value) || 0)}
          style={{
            width:        '100px',
            background:   '#0f0f0f',
            border:       '1px solid rgba(255,255,255,0.08)',
            borderRadius: '6px',
            padding:      '6px 8px',
            fontSize:     '13px',
            color:        '#f5f5f5',
            textAlign:    'right',
            outline:      'none',
            fontFamily:   'inherit',
            cursor:       'auto',
          }}
          onFocus={e => e.target.style.borderColor = '#c41e3a'}
          onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
        />
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.25)', width: '28px' }}>lei</span>
      </div>
    </div>
  )
}

function SectionTotal({ label, value, color = '#f5f5f5' }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderTop: '1px solid rgba(255,255,255,0.08)', marginTop: '4px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>{label}</span>
      <span style={{ fontSize: '16px', fontWeight: 700, color }}>{fmtRON(value)}</span>
    </div>
  )
}

export default function FinanciarForm({ targ, onSave }) {
  const [venituri, setVenituri] = useState({ ...targ.venituri })
  const [costuri,  setCosturi]  = useState({ ...targ.costuri })
  const [saved,    setSaved]    = useState(false)

  const draft = { ...targ, venituri, costuri }
  const ven   = totalVenituri(draft)
  const cost  = totalCosturi(draft)
  const prof  = profit(draft)
  const marja = marjaProfit(draft)

  const setV = (key, val) => { setVenituri(v => ({ ...v, [key]: val })); setSaved(false) }
  const setC = (key, val) => { setCosturi(c => ({ ...c, [key]: val })); setSaved(false) }

  const handleSave = () => {
    onSave({ venituri, costuri })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>

      {/* Venituri */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px' }}>
          Venituri
        </h3>
        {VENITURI_FIELDS.map(f => (
          <NumberInput key={f.key} label={f.label} value={venituri[f.key]} onChange={v => setV(f.key, v)} />
        ))}
        <SectionTotal label="Total venituri" value={ven} color="#10b981" />
      </div>

      {/* Costuri */}
      <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 16px' }}>
          Costuri
        </h3>
        {COSTURI_FIELDS.map(f => (
          <NumberInput key={f.key} label={f.label} value={costuri[f.key]} onChange={v => setC(f.key, v)} />
        ))}
        <SectionTotal label="Total costuri" value={cost} color="#f59e0b" />
      </div>

      {/* Profit summary + save */}
      <div style={{ gridColumn: '1 / -1' }}>
        <div style={{ background: '#1a1a1a', border: `1px solid ${prof >= 0 ? 'rgba(196,30,58,0.2)' : 'rgba(239,68,68,0.2)'}`, borderRadius: '12px', padding: '20px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { label: 'Venituri totale', value: fmtRON(ven),  color: '#10b981' },
              { label: 'Costuri totale',  value: fmtRON(cost), color: '#f59e0b' },
              { label: 'Profit net',      value: fmtRON(prof), color: prof >= 0 ? '#c41e3a' : '#ef4444' },
              { label: 'Marjă profit',    value: fmtPct(marja),color: prof >= 0 ? '#818cf8' : '#ef4444' },
            ].map(({ label, value, color }) => (
              <div key={label}>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
                <p style={{ fontSize: '22px', fontWeight: 700, color, margin: 0, fontFamily: '"DM Serif Display", serif' }}>{value}</p>
              </div>
            ))}
          </div>
          <Button onClick={handleSave} size="lg" style={{ minWidth: '140px' }}>
            {saved ? '✓ Salvat' : 'Salvează'}
          </Button>
        </div>
      </div>
    </div>
  )
}
