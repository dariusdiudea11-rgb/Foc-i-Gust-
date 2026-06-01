#!/usr/bin/env node
// Driver for the "Foc și Gust" Vite + React site.
// Drives the running dev/preview server with Playwright: screenshots and
// text dumps of any route, at desktop or mobile viewport.
//
// Playwright is installed GLOBALLY in this container (not in the project),
// and its browsers live in /opt/pw-browsers. ESM `import "playwright"` cannot
// see global packages via NODE_PATH, so we resolve it through createRequire
// pointed at the global npm root.
//
// Usage (server must already be running — see SKILL.md):
//   node driver.mjs shot [path] [--out=FILE] [--mobile] [--full]
//   node driver.mjs text [path]
//   node driver.mjs scroll-shot [path] [--out=FILE]   # full-page, desktop
//
// `path` is appended to the base URL and defaults to "" (home).
// Base URL defaults to http://localhost:5173/Foc-i-Gust-/  (override with BASE_URL).

import { createRequire } from 'module'
import { execSync } from 'child_process'

const globalRoot = execSync('npm root -g').toString().trim()
const require = createRequire(globalRoot + '/')
const { chromium } = require('playwright')

process.env.PLAYWRIGHT_BROWSERS_PATH ||= '/opt/pw-browsers'

const BASE = (process.env.BASE_URL || 'http://localhost:5173/Foc-i-Gust-/').replace(/\/$/, '/')

const args = process.argv.slice(2)
const cmd = args[0] || 'shot'
const path = args.find((a, i) => i > 0 && !a.startsWith('--')) || ''
const flag = (name) => args.includes('--' + name)
const opt = (name, def) => {
  const hit = args.find(a => a.startsWith(`--${name}=`))
  return hit ? hit.split('=')[1] : def
}

const url = BASE + path.replace(/^\//, '')
const mobile = flag('mobile')
const viewport = mobile ? { width: 390, height: 844 } : { width: 1440, height: 900 }

const browser = await chromium.launch()
const page = await browser.newPage()
await page.setViewportSize(viewport)

try {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
} catch (e) {
  console.error(`Failed to load ${url}\nIs the dev server running? (npm run dev)\n${e.message}`)
  await browser.close()
  process.exit(1)
}
await page.waitForTimeout(1200) // let entrance animations settle

if (cmd === 'text') {
  const title = await page.title()
  const heads = await page.locator('h1, h2, h3').allInnerTexts()
  console.log('URL:   ', url)
  console.log('TITLE: ', title)
  console.log('HEADINGS:')
  for (const h of heads) console.log('  - ' + h.replace(/\n/g, ' '))
} else {
  const out = opt('out', `/tmp/focsigust-${mobile ? 'mobile' : 'desktop'}.png`)
  const full = flag('full') || cmd === 'scroll-shot'
  await page.screenshot({ path: out, fullPage: full })
  console.log(`screenshot -> ${out}  (${viewport.width}x${viewport.height}${full ? ', full page' : ''})`)
}

await browser.close()
