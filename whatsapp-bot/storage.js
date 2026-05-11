import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { v4 as uuidv4 } from 'uuid'

const DB_PATH = process.env.DB_PATH || './db.json'

const dir = dirname(DB_PATH)
if (dir && dir !== '.' && !existsSync(dir)) mkdirSync(dir, { recursive: true })

export function emptyFinanciar() {
  return {
    venituri: { mici: 0, ceafa: 0, carnaciori: 0, cartofi: 0, bauturi: 0, alte: 0 },
    costuri:  { carne: 0, carbuni: 0, transport: 0, taxeStand: 0, personal: 0, alte: 0 },
  }
}

function load() {
  if (!existsSync(DB_PATH)) return { targuri: [] }
  try {
    return JSON.parse(readFileSync(DB_PATH, 'utf8'))
  } catch {
    return { targuri: [] }
  }
}

function save(db) {
  writeFileSync(DB_PATH, JSON.stringify(db, null, 2), 'utf8')
}

// ── Calcule (identice cu src/dashboard/utils/calculations.js) ──────

export function totalVenituri(targ) {
  const v = targ.venituri
  return (v.mici + v.ceafa + v.carnaciori + v.cartofi + v.bauturi + v.alte) || 0
}

export function totalCosturi(targ) {
  const c = targ.costuri
  return (c.carne + c.carbuni + c.transport + c.taxeStand + c.personal + c.alte) || 0
}

export function profitTarg(targ) {
  return totalVenituri(targ) - totalCosturi(targ)
}

// ── CRUD ───────────────────────────────────────────────────────────

export function listTarguri(filters = {}) {
  const db = load()
  let result = db.targuri
  if (filters.status) result = result.filter(t => t.status === filters.status)
  if (filters.luna)   result = result.filter(t => t.data && t.data.startsWith(filters.luna))
  return result
}

export function addTarg(data) {
  const db = load()
  const targ = {
    id:        uuidv4(),
    nume:      data.nume     || 'Târg fără nume',
    locatie:   data.locatie  || '',
    data:      data.data     || new Date().toISOString().slice(0, 10),
    status:    data.status   || 'in_asteptare',
    ...emptyFinanciar(),
    createdAt: new Date().toISOString(),
  }
  db.targuri.push(targ)
  save(db)
  return targ
}

export function updateTarg(id, patch) {
  const db = load()
  const idx = db.targuri.findIndex(t => t.id === id)
  if (idx === -1) return null
  const existing = db.targuri[idx]
  const updated = { ...existing }
  // Deep merge pentru venituri/costuri — nu suprascrie câmpuri nelegate
  if (patch.venituri) updated.venituri = { ...existing.venituri, ...patch.venituri }
  if (patch.costuri)  updated.costuri  = { ...existing.costuri,  ...patch.costuri }
  for (const key of ['nume', 'locatie', 'data', 'status']) {
    if (patch[key] !== undefined) updated[key] = patch[key]
  }
  db.targuri[idx] = updated
  save(db)
  return updated
}

export function deleteTarg(id) {
  const db = load()
  const before = db.targuri.length
  db.targuri = db.targuri.filter(t => t.id !== id)
  save(db)
  return db.targuri.length < before
}

export function statsSezon(an) {
  const db = load()
  const year = an || new Date().getFullYear().toString()
  const targuri = db.targuri.filter(t => t.data && t.data.startsWith(year))
  const total = targuri.reduce(
    (acc, t) => ({
      venituri: acc.venituri + totalVenituri(t),
      costuri:  acc.costuri  + totalCosturi(t),
      profit:   acc.profit   + profitTarg(t),
    }),
    { venituri: 0, costuri: 0, profit: 0 }
  )
  return {
    an: year,
    numarTarguri: targuri.length,
    finalizate: targuri.filter(t => t.status === 'finalizat').length,
    ...total,
  }
}

export function topTarguri(n = 3, an) {
  const db = load()
  return db.targuri
    .filter(t => t.status === 'finalizat' && (!an || t.data?.startsWith(an)))
    .sort((a, b) => profitTarg(b) - profitTarg(a))
    .slice(0, n)
}
