import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TargForm from '../components/targ/TargForm'
import FinanciarForm from '../components/targ/FinanciarForm'
import Badge from '../components/ui/Badge'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'
import { fmtDate } from '../utils/formatters'

const TABS = [
  { id: 'financiar', label: 'Date financiare' },
  { id: 'detalii',   label: 'Detalii târg' },
]

export default function TargDetail({ targuri, onUpdate, onDelete }) {
  const { id }     = useParams()
  const navigate   = useNavigate()
  const [tab, setTab]           = useState('financiar')
  const [showDelete, setShowDelete] = useState(false)

  const targ = targuri.find(t => t.id === id)

  if (!targ) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>Târgul nu a fost găsit.</p>
        <Button variant="ghost" onClick={() => navigate('/dashboard/targuri')} style={{ marginTop: '16px' }}>
          ← Înapoi la lista târguri
        </Button>
      </div>
    )
  }

  const handleSaveFinanciar = (fin) => {
    onUpdate(id, { venituri: fin.venituri, costuri: fin.costuri })
  }

  const handleSaveDetalii = (data) => {
    onUpdate(id, data)
  }

  const handleDelete = () => {
    onDelete(id)
    navigate('/dashboard/targuri')
  }

  return (
    <div style={{ maxWidth: '900px' }}>

      {/* Back + header */}
      <div style={{ marginBottom: '24px' }}>
        <button
          onClick={() => navigate('/dashboard/targuri')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.35)', fontSize: '13px', padding: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit' }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.7)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
          ← Lista târguri
        </button>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#f5f5f5', margin: '0 0 6px' }}>{targ.nume}</h2>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', margin: '0 0 8px' }}>
              {targ.locatie} · {fmtDate(targ.data)}
            </p>
            <Badge status={targ.status} />
          </div>
          <Button variant="danger" size="sm" onClick={() => setShowDelete(true)}>Șterge târgul</Button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '20px', background: '#1a1a1a', padding: '4px', borderRadius: '10px', width: 'fit-content', border: '1px solid rgba(255,255,255,0.06)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              padding:      '7px 18px',
              borderRadius: '7px',
              fontSize:     '13px',
              fontWeight:   tab === t.id ? 600 : 400,
              background:   tab === t.id ? 'rgba(196,30,58,0.15)' : 'transparent',
              border:       `1px solid ${tab === t.id ? 'rgba(196,30,58,0.25)' : 'transparent'}`,
              color:        tab === t.id ? '#c41e3a' : 'rgba(255,255,255,0.45)',
              cursor:       'pointer',
              transition:   'all 0.15s',
              fontFamily:   'inherit',
            }}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'financiar' && (
        <FinanciarForm targ={targ} onSave={handleSaveFinanciar} />
      )}
      {tab === 'detalii' && (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '12px', padding: '24px', maxWidth: '480px' }}>
          <TargForm initial={targ} onSave={handleSaveDetalii} submitLabel="Actualizează" />
        </div>
      )}

      {/* Delete modal */}
      {showDelete && (
        <Modal
          title="Șterge târgul"
          message={`Ești sigur că vrei să ștergi "${targ.nume}"? Toate datele financiare vor fi pierdute definitiv.`}
          confirmLabel="Șterge definitiv"
          onConfirm={handleDelete}
          onCancel={() => setShowDelete(false)}
        />
      )}
    </div>
  )
}
