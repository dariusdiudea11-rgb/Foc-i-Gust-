import {
  listTarguri, addTarg, updateTarg, deleteTarg,
  statsSezon, topTarguri,
  totalVenituri, totalCosturi, profitTarg,
} from './storage.js'

function fmtRON(n) {
  return new Intl.NumberFormat('ro-RO', {
    style: 'currency', currency: 'RON', maximumFractionDigits: 0,
  }).format(n || 0)
}

function fmtDate(iso) {
  if (!iso) return '—'
  return new Date(iso + 'T00:00:00').toLocaleDateString('ro-RO', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

function statusLabel(s) {
  return { in_asteptare: 'În așteptare', confirmat: 'Confirmat', finalizat: 'Finalizat' }[s] || s
}

function findTarg(id) {
  const all = listTarguri()
  return all.find(t => t.id === id || t.id.startsWith(id)) || null
}

// ── listare_targuri ────────────────────────────────────────────────

const listareTarguriSchema = {
  name: 'listare_targuri',
  description: 'Listează târgurile/evenimentele înregistrate. Poate filtra după status sau lună.',
  input_schema: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        enum: ['in_asteptare', 'confirmat', 'finalizat'],
        description: 'Filtrează după status',
      },
      luna: {
        type: 'string',
        description: 'Filtrează după lună în format YYYY-MM, ex: 2026-06',
      },
    },
    required: [],
  },
}

function executeListareTarguri({ status, luna } = {}) {
  const list = listTarguri({ status, luna })
  if (list.length === 0) return 'Nu există târguri înregistrate cu aceste filtre.'
  const lines = list.map(t => {
    const v = totalVenituri(t)
    const p = profitTarg(t)
    const fin = v > 0 ? ` | Venituri: ${fmtRON(v)} | Profit: ${fmtRON(p)}` : ''
    return `• *${t.nume}* (ID: \`${t.id.slice(0, 8)}\`)\n  ${t.locatie || '—'} · ${fmtDate(t.data)} · ${statusLabel(t.status)}${fin}`
  })
  return `*${list.length} târguri:*\n\n${lines.join('\n\n')}`
}

// ── detalii_targ ───────────────────────────────────────────────────

const detaliiTargSchema = {
  name: 'detalii_targ',
  description: 'Afișează detaliile complete și financiare ale unui târg.',
  input_schema: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'ID-ul târgului (sau primele 8 caractere)' },
    },
    required: ['id'],
  },
}

function executeDetaliiTarg({ id }) {
  const t = findTarg(id)
  if (!t) return `Nu am găsit niciun târg cu ID-ul "${id}".`
  const v = t.venituri
  const c = t.costuri
  const ven = totalVenituri(t)
  const cost = totalCosturi(t)
  const prof = profitTarg(t)
  const marja = ven > 0 ? ((prof / ven) * 100).toFixed(1) : '0'
  return `*${t.nume}*
ID: \`${t.id}\`
Locație: ${t.locatie || '—'}
Data: ${fmtDate(t.data)}
Status: ${statusLabel(t.status)}

*Venituri:*
• Mici: ${fmtRON(v.mici)}
• Ceafă: ${fmtRON(v.ceafa)}
• Cârnăciori: ${fmtRON(v.carnaciori)}
• Cartofi: ${fmtRON(v.cartofi)}
• Băuturi: ${fmtRON(v.bauturi)}
• Alte: ${fmtRON(v.alte)}
*Total venituri: ${fmtRON(ven)}*

*Costuri:*
• Carne/MP: ${fmtRON(c.carne)}
• Cărbuni: ${fmtRON(c.carbuni)}
• Transport: ${fmtRON(c.transport)}
• Taxă stand: ${fmtRON(c.taxeStand)}
• Personal: ${fmtRON(c.personal)}
• Alte: ${fmtRON(c.alte)}
*Total costuri: ${fmtRON(cost)}*

*Profit net: ${fmtRON(prof)}*
Marjă profit: ${marja}%`
}

// ── adauga_targ ────────────────────────────────────────────────────

const adaugaTargSchema = {
  name: 'adauga_targ',
  description: 'Adaugă un târg/eveniment nou în sistem.',
  input_schema: {
    type: 'object',
    properties: {
      nume:    { type: 'string', description: 'Numele târgului sau evenimentului' },
      locatie: { type: 'string', description: 'Locația evenimentului' },
      data:    { type: 'string', description: 'Data în format YYYY-MM-DD' },
      status:  {
        type: 'string',
        enum: ['in_asteptare', 'confirmat', 'finalizat'],
        description: 'Statusul inițial (implicit: in_asteptare)',
      },
    },
    required: ['nume'],
  },
}

function executeAdaugaTarg({ nume, locatie, data, status }) {
  const t = addTarg({ nume, locatie, data, status })
  return `Târgul *"${t.nume}"* a fost adăugat!\nID: \`${t.id}\`\nData: ${fmtDate(t.data)}\nStatus: ${statusLabel(t.status)}`
}

// ── actualizeaza_targ ──────────────────────────────────────────────

const actualizeazaTargSchema = {
  name: 'actualizeaza_targ',
  description: 'Actualizează detaliile sau datele financiare ale unui târg. Poți actualiza câmpuri individuale din venituri/costuri fără a le reseta pe celelalte.',
  input_schema: {
    type: 'object',
    properties: {
      id:      { type: 'string', description: 'ID-ul târgului' },
      nume:    { type: 'string' },
      locatie: { type: 'string' },
      data:    { type: 'string', description: 'Format YYYY-MM-DD' },
      status:  { type: 'string', enum: ['in_asteptare', 'confirmat', 'finalizat'] },
      venituri: {
        type: 'object',
        description: 'Câmpuri de venituri de actualizat (doar cele menționate)',
        properties: {
          mici:       { type: 'number' },
          ceafa:      { type: 'number' },
          carnaciori: { type: 'number' },
          cartofi:    { type: 'number' },
          bauturi:    { type: 'number' },
          alte:       { type: 'number' },
        },
      },
      costuri: {
        type: 'object',
        description: 'Câmpuri de costuri de actualizat (doar cele menționate)',
        properties: {
          carne:     { type: 'number' },
          carbuni:   { type: 'number' },
          transport: { type: 'number' },
          taxeStand: { type: 'number' },
          personal:  { type: 'number' },
          alte:      { type: 'number' },
        },
      },
    },
    required: ['id'],
  },
}

function executeActualizeazaTarg({ id, ...patch }) {
  const t = findTarg(id)
  if (!t) return `Nu am găsit niciun târg cu ID-ul "${id}".`
  const updated = updateTarg(t.id, patch)
  const ven = totalVenituri(updated)
  const prof = profitTarg(updated)
  return `Târgul *"${updated.nume}"* a fost actualizat.\nVenituri: ${fmtRON(ven)} | Profit: ${fmtRON(prof)}`
}

// ── sterge_targ ────────────────────────────────────────────────────

const stergeTargSchema = {
  name: 'sterge_targ',
  description: 'Șterge definitiv un târg și toate datele sale.',
  input_schema: {
    type: 'object',
    properties: {
      id:         { type: 'string', description: 'ID-ul târgului' },
      confirmare: { type: 'boolean', description: 'Trebuie să fie true pentru a confirma ștergerea' },
    },
    required: ['id', 'confirmare'],
  },
}

function executeSterge({ id, confirmare }) {
  if (!confirmare) return 'Ștergerea nu a fost confirmată. Retrimite comanda cu confirmare explicită.'
  const t = findTarg(id)
  if (!t) return `Nu am găsit niciun târg cu ID-ul "${id}".`
  const name = t.nume
  deleteTarg(t.id)
  return `Târgul *"${name}"* a fost șters definitiv.`
}

// ── statistici_sezon ───────────────────────────────────────────────

const statisticiSezonSchema = {
  name: 'statistici_sezon',
  description: 'Calculează statistici agregate pentru un an: total venituri, costuri, profit, număr târguri.',
  input_schema: {
    type: 'object',
    properties: {
      an: { type: 'string', description: 'Anul în format YYYY (implicit: anul curent)' },
    },
    required: [],
  },
}

function executeStatisticiSezon({ an } = {}) {
  const s = statsSezon(an)
  const marja = s.venituri > 0 ? ((s.profit / s.venituri) * 100).toFixed(1) : '0'
  return `*Statistici sezon ${s.an}:*
Târguri: ${s.numarTarguri} total (${s.finalizate} finalizate)
Venituri totale: ${fmtRON(s.venituri)}
Costuri totale: ${fmtRON(s.costuri)}
*Profit net: ${fmtRON(s.profit)}*
Marjă profit: ${marja}%`
}

// ── top_targuri ────────────────────────────────────────────────────

const topTarguriSchema = {
  name: 'top_targuri',
  description: 'Afișează cele mai profitabile târguri finalizate.',
  input_schema: {
    type: 'object',
    properties: {
      n:  { type: 'number', description: 'Numărul de târguri (implicit: 3)' },
      an: { type: 'string', description: 'Filtrează după an (implicit: toate)' },
    },
    required: [],
  },
}

function executeTopTarguri({ n = 3, an } = {}) {
  const list = topTarguri(n, an)
  if (list.length === 0) return 'Nu există târguri finalizate.'
  const lines = list.map((t, i) => {
    const prof = profitTarg(t)
    return `${i + 1}. *${t.nume}* — ${fmtRON(prof)}\n   ${t.locatie || '—'} · ${fmtDate(t.data)}`
  })
  return `*Top ${list.length} târguri după profit:*\n\n${lines.join('\n\n')}`
}

// ── schimba_status ─────────────────────────────────────────────────

const schimbaStatusSchema = {
  name: 'schimba_status',
  description: 'Schimbă rapid statusul unui târg.',
  input_schema: {
    type: 'object',
    properties: {
      id:     { type: 'string', description: 'ID-ul târgului' },
      status: { type: 'string', enum: ['in_asteptare', 'confirmat', 'finalizat'] },
    },
    required: ['id', 'status'],
  },
}

function executeSchimbaStatus({ id, status }) {
  const t = findTarg(id)
  if (!t) return `Nu am găsit niciun târg cu ID-ul "${id}".`
  updateTarg(t.id, { status })
  return `Statusul târgului *"${t.nume}"* a fost schimbat în: ${statusLabel(status)}`
}

// ── Export ─────────────────────────────────────────────────────────

export const TOOLS_SCHEMA = [
  listareTarguriSchema,
  detaliiTargSchema,
  adaugaTargSchema,
  actualizeazaTargSchema,
  stergeTargSchema,
  statisticiSezonSchema,
  topTarguriSchema,
  schimbaStatusSchema,
]

const TOOL_HANDLERS = {
  listare_targuri:   executeListareTarguri,
  detalii_targ:      executeDetaliiTarg,
  adauga_targ:       executeAdaugaTarg,
  actualizeaza_targ: executeActualizeazaTarg,
  sterge_targ:       executeSterge,
  statistici_sezon:  executeStatisticiSezon,
  top_targuri:       executeTopTarguri,
  schimba_status:    executeSchimbaStatus,
}

export function executeTool(name, params) {
  const fn = TOOL_HANDLERS[name]
  if (!fn) return `Unealtă necunoscută: "${name}"`
  try {
    return fn(params)
  } catch (err) {
    return `Eroare la execuție: ${err.message}`
  }
}
