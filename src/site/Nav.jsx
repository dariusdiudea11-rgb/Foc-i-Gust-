import { useState } from 'react'
import { Logo, Icon, Button } from './components'
import { FG_NAV } from './data'
import { useIsMobile } from './useIsMobile'

export default function Nav({ current, onNav }) {
  const isMobile = useIsMobile(820)
  const [open, setOpen] = useState(false)

  const go = (id) => { onNav(id); setOpen(false) }

  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 50,
      background: "rgba(245,239,227,0.86)", backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid var(--cream-line)"
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: isMobile ? "12px 18px" : "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => go("home")}><Logo size={isMobile ? 38 : 42} /></div>

        {!isMobile && (
          <nav style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {FG_NAV.map(n => (
              <button key={n.id} onClick={() => onNav(n.id)}
                className="fg-nav-link"
                style={{
                  fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15,
                  background: "transparent", border: "none", cursor: "pointer", padding: "9px 18px",
                  borderRadius: 999, color: current === n.id ? "var(--paprika)" : "var(--fg-1)",
                  position: "relative",
                }}>
                {n.label}
                {current === n.id && <span style={{ position: "absolute", left: 18, right: 18, bottom: 4, height: 2, background: "var(--paprika)", borderRadius: 2 }} />}
              </button>
            ))}
          </nav>
        )}

        {!isMobile ? (
          <Button size="sm" onClick={() => onNav("evenimente")}>Rezervați</Button>
        ) : (
          <button onClick={() => setOpen(o => !o)} aria-label="Meniu" aria-expanded={open}
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink)", display: "flex", alignItems: "center", padding: 6 }}>
            <Icon name={open ? "x" : "menu"} size={26} />
          </button>
        )}
      </div>

      {/* Mobile dropdown */}
      {isMobile && open && (
        <nav style={{
          borderTop: "1px solid var(--cream-line)", background: "rgba(245,239,227,0.98)",
          padding: "10px 18px 18px", display: "flex", flexDirection: "column", gap: 2
        }}>
          {FG_NAV.map(n => (
            <button key={n.id} onClick={() => go(n.id)}
              style={{
                textAlign: "left", fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 17,
                background: "transparent", border: "none", cursor: "pointer", padding: "13px 8px",
                borderRadius: 10, color: current === n.id ? "var(--paprika)" : "var(--fg-1)"
              }}>
              {n.label}
            </button>
          ))}
          <Button onClick={() => go("evenimente")} style={{ marginTop: 10, justifyContent: "center" }}>Rezervați un eveniment</Button>
        </nav>
      )}
    </header>
  )
}
