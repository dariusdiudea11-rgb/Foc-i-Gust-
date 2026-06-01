import { useState } from 'react'
import { Eyebrow, FolkDivider, DishCard, Reveal } from './components'
import { FG_MENU } from './data'
import { useIsMobile } from './useIsMobile'

export default function Menu({ onAdd }) {
  const isMobile = useIsMobile(820)
  const cats = ["Toate", "Combouri", "Grătar", "Garnituri", "Băuturi"]
  const [active, setActive] = useState("Toate")
  const list = active === "Toate" ? FG_MENU : FG_MENU.filter(d => d.cat === active)
  const wrap = { maxWidth: 1180, margin: "0 auto" }

  return (
    <div style={{ background: "var(--parchment)", minHeight: "60vh" }}>
      {/* header band */}
      <section style={{ background: "var(--parchment-2)", borderBottom: "1px solid var(--cream-line)" }}>
        <div style={{ ...wrap, padding: isMobile ? "44px 20px 24px" : "56px 32px 28px", textAlign: "center" }}>
          <Eyebrow style={{ textAlign: "center" }}>Meniul nostru</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 38 : 48, letterSpacing: "-.02em", color: "var(--ink)", margin: "10px 0 8px" }}>Gust de acasă</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-2)", maxWidth: 460, margin: "0 auto" }}>
            Totul proaspăt, pe grătar, la comandă. Mici frământați în casă și carne pe jar.</p>
          <FolkDivider style={{ marginTop: 26 }} />
        </div>
      </section>

      {/* sticky tabs */}
      <div style={{
        position: "sticky", top: isMobile ? 62 : 71, zIndex: 30, background: "rgba(245,239,227,.92)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid var(--cream-line)"
      }}>
        <div style={{ ...wrap, padding: "14px 20px", display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} style={{
              fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, padding: "9px 18px",
              borderRadius: 999, cursor: "pointer", transition: "all .2s", border: "1.5px solid",
              borderColor: active === c ? "var(--paprika)" : "var(--cream-line-2)",
              background: active === c ? "var(--paprika)" : "transparent",
              color: active === c ? "var(--parchment)" : "var(--fg-1)"
            }}>{c}</button>
          ))}
        </div>
      </div>

      <section>
        <div style={{ ...wrap, padding: isMobile ? "32px 20px 70px" : "40px 32px 80px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
          {list.map((d, i) => <Reveal key={d.name + active} delay={(i % 3) * 70}><DishCard dish={d} onAdd={onAdd} /></Reveal>)}
        </div>
      </section>
    </div>
  )
}
