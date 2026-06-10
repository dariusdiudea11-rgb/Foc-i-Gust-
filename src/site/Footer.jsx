import { Logo, Icon } from './components'
import { FG_NAV } from './data'
import { useIsMobile } from './useIsMobile'

export default function Footer({ onNav }) {
  const isMobile = useIsMobile(820)
  return (
    <footer style={{ background: "var(--ink)", color: "var(--fg-on-dark-2)" }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: isMobile ? "44px 22px 28px" : "56px 32px 32px",
        display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1.4fr 1fr 1fr 1.2fr", gap: isMobile ? 28 : 40
      }}>
        <div style={{ gridColumn: isMobile ? "1 / -1" : "auto" }}>
          <Logo size={44} light />
          <p style={{ fontFamily: "var(--font-sans)", fontSize: 14, lineHeight: 1.6, marginTop: 16, maxWidth: 280, color: "var(--fg-on-dark-2)" }}>
            Mâncare românească gătită pe foc, la târguri și la evenimentele voastre. O tradiție care merge mai departe.
          </p>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", color: "var(--parchment)", fontSize: 16, margin: "4px 0 14px" }}>Navigare</h4>
          {FG_NAV.map(n => (
            <div key={n.id} onClick={() => onNav(n.id)} className="fg-footer-link"
              style={{ fontFamily: "var(--font-sans)", fontSize: 14, padding: "5px 0", cursor: "pointer", color: "var(--fg-on-dark-2)" }}>{n.label}</div>
          ))}
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", color: "var(--parchment)", fontSize: 16, margin: "4px 0 14px" }}>Contact</h4>
          <a href="tel:+40746170890" className="fg-footer-link" style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14, padding: "5px 0", color: "var(--fg-on-dark-2)", textDecoration: "none" }}><Icon name="phone" size={16} /> 0746 170 890</a>
          <a href="mailto:darius.diudea11@gmail.com" className="fg-footer-link" style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14, padding: "5px 0", wordBreak: "break-all", color: "var(--fg-on-dark-2)", textDecoration: "none" }}><Icon name="mail" size={16} /> darius.diudea11@gmail.com</a>
          <div style={{ display: "flex", alignItems: "center", gap: 9, fontFamily: "var(--font-sans)", fontSize: 14, padding: "5px 0", color: "var(--fg-on-dark-2)" }}><Icon name="mapPin" size={16} /> România · la târguri</div>
        </div>
        <div>
          <h4 style={{ fontFamily: "var(--font-display)", color: "var(--parchment)", fontSize: 16, margin: "4px 0 14px" }}>Urmăriți-ne</h4>
          <div style={{ display: "flex", gap: 10 }}>
            <a href="https://www.instagram.com/foc_si_gust_traditional" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              style={{
                width: 40, height: 40, borderRadius: 999, border: "1px solid #4a443a",
                display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--parchment)"
              }}><Icon name="instagram" size={19} /></a>
          </div>
        </div>
      </div>
      <div style={{
        borderTop: "1px solid #403a32", padding: "18px 32px", textAlign: "center",
        fontFamily: "var(--font-sans)", fontSize: 12.5, color: "#8a8073"
      }}>
        © 2026 Diudea Grup S.R.L. · Foc Și Gust Tradițional · Toate drepturile rezervate.
      </div>
    </footer>
  )
}
