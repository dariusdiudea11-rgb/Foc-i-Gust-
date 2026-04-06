import { useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'

const STATUS_OPTIONS = [
  { value: 'in_asteptare', label: 'În așteptare' },
  { value: 'confirmat',    label: 'Confirmat' },
  { value: 'finalizat',    label: 'Finalizat' },
]

export default function TargForm({ initial = {}, onSave, onCancel, submitLabel = 'Salvează' }) {
  const [form, setForm] = useState({
    nume:    initial.nume    || '',
    locatie: initial.locatie || '',
    data:    initial.data    || new Date().toISOString().slice(0, 10),
    status:  initial.status  || 'in_asteptare',
  })

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.nume.trim()) return
    onSave(form)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Input
        label="Numele târgului"
        value={form.nume}
        onChange={e => set('nume', e.target.value)}
        placeholder="ex. Târgul de Primăvară Negrești-Oaș"
        required
      />
      <Input
        label="Locația"
        value={form.locatie}
        onChange={e => set('locatie', e.target.value)}
        placeholder="ex. Negrești-Oaș, Piața Centrală"
      />
      <Input
        label="Data"
        type="date"
        value={form.data}
        onChange={e => set('data', e.target.value)}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Status</label>
        <select
          value={form.status}
          onChange={e => set('status', e.target.value)}
          style={{
            background:   '#0f0f0f',
            border:       '1px solid rgba(255,255,255,0.1)',
            borderRadius: '8px',
            padding:      '9px 12px',
            fontSize:     '14px',
            color:        '#f5f5f5',
            outline:      'none',
            cursor:       'pointer',
            fontFamily:   'inherit',
          }}>
          {STATUS_OPTIONS.map(o => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', paddingTop: '8px' }}>
        {onCancel && <Button variant="ghost" type="button" onClick={onCancel}>Anulează</Button>}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  )
}
