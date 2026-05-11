import { Telegraf } from 'telegraf'
import { processMessage } from './agent.js'

const BOT_TOKEN      = process.env.TELEGRAM_BOT_TOKEN
const OWNER_ID       = parseInt(process.env.OWNER_TELEGRAM_ID, 10)

if (!BOT_TOKEN)  { console.error('TELEGRAM_BOT_TOKEN lipsește'); process.exit(1) }
if (!OWNER_ID)   { console.error('OWNER_TELEGRAM_ID lipsește'); process.exit(1) }
if (!process.env.ANTHROPIC_API_KEY) { console.error('ANTHROPIC_API_KEY lipsește'); process.exit(1) }

const bot = new Telegraf(BOT_TOKEN)

// Filtrează — răspunde DOAR proprietarului
bot.use(async (ctx, next) => {
  if (ctx.from?.id !== OWNER_ID) return
  return next()
})

bot.command('start', async ctx => {
  await ctx.reply(
    '👋 Salut! Sunt asistentul tău pentru *Foc și Gust Tradițional*.\n\n' +
    'Trimite-mi comenzi în română, de exemplu:\n' +
    '• _câte târguri am?_\n' +
    '• _adaugă târg: Zilele Orașului, data 2026-07-15_\n' +
    '• _statistici sezon 2026_\n' +
    '• _profit luna asta_',
    { parse_mode: 'Markdown' }
  )
})

bot.on('text', async ctx => {
  const text = ctx.message.text.trim()
  if (!text) return

  // Afișează că procesează
  await ctx.sendChatAction('typing')

  try {
    const reply = await processMessage(text)
    // Telegram are limite de 4096 caractere per mesaj
    if (reply.length <= 4096) {
      await ctx.reply(reply, { parse_mode: 'Markdown' })
    } else {
      // Împarte în bucăți dacă e prea lung
      for (let i = 0; i < reply.length; i += 4000) {
        await ctx.reply(reply.slice(i, i + 4000), { parse_mode: 'Markdown' })
      }
    }
  } catch (err) {
    console.error('Eroare la procesarea mesajului:', err)
    await ctx.reply('⚠️ A apărut o eroare. Încearcă din nou.')
  }
})

// Pornire
bot.launch()
console.log('✅ Bot Telegram pornit! Trimite /start în Telegram.')

// Graceful shutdown
process.once('SIGINT',  () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
