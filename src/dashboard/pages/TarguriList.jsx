import { useState } from 'react'
import TargCard from '../components/targ/TargCard'
import TargForm from '../components/targ/TargForm'
import Modal from '../components/ui/Modal'
import Button from '../components/ui/Button'

export default function TarguriList({ targuri, onAdd, onDelete }) {
  const [showForm,   setShowForm]   = useState(false)
  const [deleteId,   setDeleteId]   = useState(null)
  const [filter,     setFilter]     = useState('all')

  const STATUS_FILTERS = [
    { value: 'all',          label: 'Toate' },
    { value: 'in_asteptare', label: 'În așteptare' },
    { value: 'confirmat',    label: 'Confirmate' },
    { value: 'finalizat',    label: 'Finalizate' },
  ]

  const filtered = filter === 'all' ? targuri : targuri.filter(t => t.status === filter)
  const toDelete = targuri.find(t => t.id === deleteId)

  const handleAdd = (formData) => {
    onAdd(formData)
    setShowForm(false)
  }

  return (
    <div style={{ maxWidth: '900px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {STATUS_FILTERS.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              style={{
                padding:      '6px 14px',
                borderRadius: '20px',
                fontSize:     '12px',
                fontWeight:   filter === f.value ? 600 : 400,
                background:   filter === f.value ? 'rgba(196,30,58,0.15)' : 'rgba(255,255,255,0.04)',
                border:       `1px solid ${filter === f.value ? 'rgba(196,30,58,0.3)' : 'rgba(255,255,255,0.06)'}`,
                color:        filter === f.value ? '#c41e3a' : 'rgba(255,255,255,0.5)',
                cursor:       'pointer',
                transition:   'all 0.15s',
                fontFamily:   'inherit',
              }}>
              {f.label}
            </button>
          ))}
        </div>
        <Button onClick={() => setShowForm(true)}>+ Adaugă târg</Button>
      </div>

      {/* Add form inline */}
      {showForm && (
        <div style={{ background: '#1a1a1a', border: '1px solid rgba(196,30,58,0.2)', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#f5f5f5', margin: '0 0 20px' }}>Târg nou</h3>
          <TargForm onSave={handleAdd} onCancel={() => setShowForm(false)} submitLabel="Adaugă" />
        </div>
      )}

      {/* List */}
      {filtered.length > 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filtered.map(targ => (
            <TargCard key={targ.id} targ={targ} onDelete={id => setDeleteId(id)} />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '60px 20px', background: '#1a1a1a', borderRadius: '12px', border: '1px dashed rgba(255,255,255,0.08)' }}>
          <p style={{ fontSize: '28px', margin: '0 0 10px' }}>📭</p>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)', margin: 0 }}>
            {filter === 'all' ? 'Niciun târg înregistrat. Adaugă primul!' : `Niciun târg cu statusul "${STATUS_FILTERS.find(f => f.value === filter)?.label}".`}
          </p>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteId && (
        <Modal
          title="Șterge târgul"
          message={`Ești sigur că vrei să ștergi "${toDelete?.nume}"? Toate datele financiare asociate vor fi pierdute.`}
          confirmLabel="Șterge definitiv"
          onConfirm={() => { onDelete(deleteId); setDeleteId(null) }}
          onCancel={() => setDeleteId(null)}
        />
      )}
    </div>
  )
}
