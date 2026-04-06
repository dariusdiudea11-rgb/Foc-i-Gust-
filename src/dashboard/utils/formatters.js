export function fmtRON(amount) {
  if (amount === null || amount === undefined) return '—'
  return new Intl.NumberFormat('ro-RO', {
    style:    'currency',
    currency: 'RON',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function fmtPct(value) {
  if (value === null || value === undefined) return '—'
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`
}

export function fmtDate(isoDate) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('ro-RO', {
    day:   '2-digit',
    month: 'long',
    year:  'numeric',
  })
}

export function fmtDateShort(isoDate) {
  if (!isoDate) return '—'
  return new Date(isoDate).toLocaleDateString('ro-RO', {
    day:   '2-digit',
    month: 'short',
  })
}
