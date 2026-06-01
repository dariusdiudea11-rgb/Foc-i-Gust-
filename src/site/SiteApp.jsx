import { useState, useRef } from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Home from './Home'
import Menu from './Menu'
import Events from './Events'
import About from './About'
import { Icon } from './components'

function Toast({ msg, show }) {
  return <div style={{
    position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${show ? 0 : 24}px)`,
    opacity: show ? 1 : 0, pointerEvents: "none", transition: "all .35s var(--ease-out)", zIndex: 100,
    background: "var(--ink)", color: "var(--parchment)", padding: "13px 22px", borderRadius: 999,
    boxShadow: "var(--shadow-lg)", display: "flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, maxWidth: "90vw"
  }}>
    <span style={{ color: "var(--flame-bright)" }}><Icon name="check" size={18} /></span>{msg}</div>
}

export default function SiteApp() {
  const [screen, setScreen] = useState("home")
  const [cart, setCart] = useState(0)
  const [toast, setToast] = useState({ show: false, msg: "" })
  const tRef = useRef(null)

  const nav = (s) => { setScreen(s); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const add = (dish) => {
    setCart(c => c + 1)
    setToast({ show: true, msg: `„${dish.name}" adăugat` })
    clearTimeout(tRef.current)
    tRef.current = setTimeout(() => setToast(t => ({ ...t, show: false })), 1900)
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--parchment)" }}>
      <Nav current={screen} onNav={nav} cartCount={cart} />
      <main style={{ flex: 1 }}>
        {screen === "home" && <Home onNav={nav} onAdd={add} />}
        {screen === "meniu" && <Menu onAdd={add} />}
        {screen === "evenimente" && <Events />}
        {screen === "despre" && <About onNav={nav} />}
      </main>
      <Footer onNav={nav} />
      <Toast msg={toast.msg} show={toast.show} />
    </div>
  )
}
