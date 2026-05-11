import http from 'node:http'
import { existsSync, mkdirSync } from 'node:fs'
import {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
} from '@whiskeysockets/baileys'
import { Boom } from '@hapi/boom'
import pino from 'pino'
import QRCode from 'qrcode-terminal'
import { processMessage } from './agent.js'

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production' ? { target: 'pino-pretty' } : undefined,
})

const AUTH_PATH   = process.env.AUTH_PATH   || './auth_info'
const PORT        = parseInt(process.env.PORT || '3000', 10)
const OWNER_PHONE = process.env.OWNER_PHONE

if (!OWNER_PHONE) {
  logger.error('OWNER_PHONE lipsește. Setează variabila de mediu cu numărul tău (ex: 40712345678).')
  process.exit(1)
}

if (!process.env.ANTHROPIC_API_KEY) {
  logger.error('ANTHROPIC_API_KEY lipsește.')
  process.exit(1)
}

// Mesajele din "Mesaje salvate" au remoteJid = propriul JID al utilizatorului
const SELF_JID = `${OWNER_PHONE}@s.whatsapp.net`

if (!existsSync(AUTH_PATH)) mkdirSync(AUTH_PATH, { recursive: true })

// ── HTTP Health Server ─────────────────────────────────────────────

let isConnected = false

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', connected: isConnected }))
    return
  }
  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, () => logger.info({ port: PORT }, 'Health server pornit'))

// ── Deduplicare mesaje (previne procesarea duplicatelor la reconectare) ──

const processedIds = new Set()
const DEDUP_TTL_MS = 60_000

// ── WhatsApp Connection ────────────────────────────────────────────

let sock = null
let reconnectTimer = null
const RECONNECT_DELAY_MS = 5_000

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState(AUTH_PATH)
  const { version } = await fetchLatestBaileysVersion()

  sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys:  makeCacheableSignalKeyStore(state.keys, logger),
    },
    logger:                    logger.child({ module: 'baileys' }),
    printQRInTerminal:         false,
    browser:                   ['Foc si Gust Bot', 'Chrome', '1.0.0'],
    markOnlineOnConnect:       false,
    generateHighQualityLinkPreview: false,
  })

  sock.ev.on('connection.update', async update => {
    const { connection, lastDisconnect, qr } = update

    if (qr) {
      logger.info('─── Scanează QR-ul de mai jos în WhatsApp → Dispozitive conectate → Conectează un dispozitiv ───')
      QRCode.generate(qr, { small: true })
    }

    if (connection === 'open') {
      isConnected = true
      logger.info({ jid: sock.user?.id }, 'WhatsApp conectat cu succes!')
      // Mesaj de bun venit la prima conectare
      try {
        await sock.sendMessage(SELF_JID, {
          text: '✅ Botul Foc și Gust este activ!\n\nTrimite-mi comenzi în română, de exemplu:\n• "câte târguri am?"\n• "adaugă târg: Zilele Orașului, data 2026-07-15"\n• "statistici sezon 2026"',
        })
      } catch { /* ignoră dacă eșuează */ }
    }

    if (connection === 'close') {
      isConnected = false
      const code = new Boom(lastDisconnect?.error)?.output?.statusCode
      logger.warn({ code }, 'Conexiune WhatsApp închisă')

      if (code === DisconnectReason.loggedOut) {
        logger.error('Deconectat. Șterge directorul auth_info/ și repornește pentru a rescan QR.')
        process.exit(1)
      } else {
        logger.info(`Reconectare în ${RECONNECT_DELAY_MS / 1000}s...`)
        reconnectTimer = setTimeout(connectToWhatsApp, RECONNECT_DELAY_MS)
      }
    }
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('messages.upsert', async ({ messages: msgs, type }) => {
    // Procesează doar mesaje noi, nu istoricul de sincronizare
    if (type !== 'notify') return

    for (const msg of msgs) {
      // Procesează DOAR mesajele din "Mesaje salvate" (self-chat)
      if (msg.key.remoteJid !== SELF_JID) continue

      // fromMe=true = mesaj scris de owner (vrem asta)
      // fromMe=false = răspunsul botului (skip, previne bucle infinite)
      if (!msg.key.fromMe) continue

      // Deduplicare
      const msgId = msg.key.id
      if (processedIds.has(msgId)) continue
      processedIds.add(msgId)
      setTimeout(() => processedIds.delete(msgId), DEDUP_TTL_MS)

      const text = (
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        ''
      ).trim()

      if (!text) continue

      // Ignoră mesajul de bun venit trimis chiar de bot
      if (text.startsWith('✅ Botul Foc și Gust')) continue

      logger.info({ msgId, text: text.slice(0, 100) }, 'Mesaj primit')

      try {
        const reply = await processMessage(text)
        if (reply) {
          await sock.sendMessage(SELF_JID, { text: reply })
          logger.info({ msgId }, 'Răspuns trimis')
        }
      } catch (err) {
        logger.error({ err, msgId }, 'Eroare la procesarea mesajului')
        try {
          await sock.sendMessage(SELF_JID, {
            text: '⚠️ A apărut o eroare. Verifică logurile sau încearcă din nou.',
          })
        } catch { /* ignoră */ }
      }
    }
  })
}

// ── Startup ────────────────────────────────────────────────────────

connectToWhatsApp().catch(err => {
  logger.error({ err }, 'Eroare fatală la pornire')
  process.exit(1)
})

// ── Graceful shutdown ──────────────────────────────────────────────

async function shutdown(signal) {
  logger.info({ signal }, 'Oprire gracioasă...')
  if (reconnectTimer) clearTimeout(reconnectTimer)
  if (sock) sock.end()
  server.close()
  process.exit(0)
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT',  () => shutdown('SIGINT'))
