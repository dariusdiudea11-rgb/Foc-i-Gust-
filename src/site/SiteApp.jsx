import { useState } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Menu from './Menu'
import Events from './Events'
import About from './About'

export default function SiteApp() {
  const [screen, setScreen] = useState("home")

  const nav = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }) }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--parchment)" }}>
      <Nav current={screen} onNav={nav} />
      <main style={{ flex: 1 }}>
        {screen === "home" && <Home onNav={nav} />}
        {screen === "meniu" && <Menu />}
        {screen === "evenimente" && <Events />}
        {screen === "despre" && <About onNav={nav} />}
      </main>
      <Footer onNav={nav} />
    </div>
  )
}
