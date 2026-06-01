---
name: run-foc-i-gust
description: Build, run, and screenshot the "Foc și Gust" website (React 19 + Vite + Tailwind). Use when asked to run, start, serve, preview, or screenshot the site, or to confirm a UI change works in the real running app.
---

# Run: Foc și Gust

A single-page marketing site for a Romanian traditional-grill business —
React 19 + Vite 8 + Tailwind 4 + Framer Motion, deployed to GitHub Pages.
It is driven headlessly with **Playwright** via
`.claude/skills/run-foc-i-gust/driver.mjs`, which takes screenshots and
text dumps of any route at desktop or mobile viewport.

> Paths below are relative to the repo root (the unit). All commands were
> run and verified in this container.

## Prerequisites

Node 22 + npm are already present. Playwright 1.56 is installed **globally**
(not in the project) with browsers under `/opt/pw-browsers`; the driver finds
both automatically. No `apt-get` was needed — the bundled Playwright Chromium
runs headless out of the box.

## Build / install

```bash
npm install          # installs project deps (vite, react, tailwind, framer-motion)
npm run build        # optional: production build into dist/ (gitignored). ~0.6s
```

## Run (agent path — driver)

Start the dev server in the background, then drive it:

```bash
npm run dev > /tmp/vite.log 2>&1 &
sleep 4 && cat /tmp/vite.log        # confirm: "Local: http://localhost:5173/Foc-i-Gust-/"
```

> ⚠️ The dev server serves under the base path **`/Foc-i-Gust-/`** (set in
> `vite.config.js`), not `/`. The driver already targets the correct URL.
>
> ⚠️ If port 5173 is already taken, Vite silently picks the next free port
> (5174, …). Check the `Local:` line in `/tmp/vite.log`; if it isn't 5173,
> either `pkill -f vite` the straggler first, or pass the right port via
> `BASE_URL="http://localhost:<port>/Foc-i-Gust-/"` to the driver.

Then run the driver (no env vars needed):

```bash
# Text dump — title + all h1/h2/h3 (fast way to confirm what rendered)
node .claude/skills/run-foc-i-gust/driver.mjs text

# Desktop screenshot (1440x900) -> /tmp/focsigust-desktop.png
node .claude/skills/run-foc-i-gust/driver.mjs shot

# Full-page desktop screenshot -> /tmp/focsigust-full.png
node .claude/skills/run-foc-i-gust/driver.mjs scroll-shot --out=/tmp/focsigust-full.png

# Mobile screenshot (390x844) -> /tmp/focsigust-mobile.png
node .claude/skills/run-foc-i-gust/driver.mjs shot --mobile

# Any route / custom output:
node .claude/skills/run-foc-i-gust/driver.mjs shot meniu --out=/tmp/menu.png
```

**Always open the resulting PNG and look at it** — a green exit code only means
the page loaded, not that it looks right.

To drive the **preview** (built `dist`) server instead of dev, point the driver
at its port:

```bash
npm run preview > /tmp/preview.log 2>&1 &
sleep 3
BASE_URL="http://localhost:4173/Foc-i-Gust-/" node .claude/skills/run-foc-i-gust/driver.mjs text
```

Stop servers when done: `pkill -f vite`.

## Run (human path)

`npm run dev` and open `http://localhost:5173/Foc-i-Gust-/` in a browser.
Useless headless — use the driver above instead.

## Gotchas (verified in this container)

- **Base path `/Foc-i-Gust-/`.** Navigating to `http://localhost:5173/` (no
  trailing path) does NOT serve the app. The driver appends the base for you.
- **External images are blank in this container.** Several sections pull photos
  from `images.pexels.com`, which is blocked from the sandbox — screenshots show
  large empty gaps where those photos sit. This is environmental; the same
  images load fine in a real browser on GitHub Pages. Don't "fix" missing photos
  based on a sandbox screenshot.
- **`/dashboard` route falls back to the main site.** There is a
  `react-router` route for `/dashboard/*`, but `BrowserRouter` has no `basename`
  matching the `/Foc-i-Gust-/` Vite base, so `/Foc-i-Gust-/dashboard` renders the
  public site, not the dashboard. (Note this if you're testing dashboard work.)
- **Playwright is global, not a project dep.** ESM `import "playwright"` fails
  via `NODE_PATH`; the driver resolves it with `createRequire(npm root -g)` and
  defaults `PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers`. If you write your own
  script, copy that resolution shim from `driver.mjs`.
- **Entrance animations.** Framer Motion fades sections in on scroll/load; the
  driver waits 1.2s after load so screenshots aren't caught mid-animation.

## Troubleshooting

- `Failed to load … Is the dev server running?` → the dev/preview server isn't
  up (or crashed). Start it and check `/tmp/vite.log`.
- `Cannot find package 'playwright'` → you're not using `driver.mjs`. Use the
  driver, or resolve playwright from the global npm root via `createRequire`.
- Blank/partial screenshot → almost always the Pexels image gotcha above, not a
  bug. Confirm with the `text` command that headings rendered.
