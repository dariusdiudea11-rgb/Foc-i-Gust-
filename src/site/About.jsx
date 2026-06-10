import { Eyebrow, Button, Photo, FolkDivider, Icon, Reveal, emblem } from './components'
import { useIsMobile } from './useIsMobile'

export default function About({ onNav }) {
  const isMobile = useIsMobile(820)
  const values = [
    { icon: "flame", t: "Pe foc, mereu", d: "Nu folosim scurtături. Gătim pe foc și jar, cum am învățat de la părinți." },
    { icon: "leaf", t: "De la producători locali", d: "Legume, carne și brânză de la oameni pe care îi cunoaștem." },
    { icon: "users", t: "Pentru toți", d: "Mâncare bună pentru oameni obișnuiți, nu pentru locuri pretențioase." },
  ]
  return (
    <div style={{ background: "var(--parchment)" }}>
      <section>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: isMobile ? "52px 20px 24px" : "72px 32px 24px", textAlign: "center" }}>
          <img src={emblem} alt="" className="fg-flame" style={{ width: 92, height: 92, objectFit: "contain", marginBottom: 18 }} />
          <Eyebrow style={{ textAlign: "center" }}>Despre noi</Eyebrow>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 34 : 50, letterSpacing: "-.02em", color: "var(--ink)", margin: "10px 0 18px", lineHeight: 1.06 }}>
            O tradiție care merge mai departe</h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: isMobile ? 17 : 19, lineHeight: 1.7, color: "var(--fg-2)", maxWidth: 620, margin: "0 auto" }}>
            Foc Și Gust Tradițional s-a născut dintr-o vatră de familie și din dorința de a duce gustul
            mâncării românești mai departe — de la masa bunicii, la târg, și la sărbătoarea voastră.</p>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "32px 20px" : "40px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 28 }}>
            <Photo seed={2} style={{ height: isMobile ? 240 : 320, borderRadius: 20 }} label="Foto: la ceaun" />
            <div style={{ alignSelf: "center" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: isMobile ? 26 : 30, color: "var(--ink)", margin: "0 0 14px" }}>Gătim cum se făcea acasă</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)", margin: "0 0 14px" }}>
                Suntem o familie care de ani buni cară grătarul de la un târg la altul.
                Frământăm micii cu mâna, facem cârnăciorii în casă și punem carnea pe jar, la comandă.</p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.7, color: "var(--fg-2)", margin: 0 }}>
                Nu ne interesează locurile pretențioase. Ne interesează ca mâncarea să aibă gustul pe care
                îl știți de acasă — și să vă bucure.</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "32px 20px 16px" : "48px 32px 24px" }}>
          <FolkDivider style={{ marginBottom: 44 }} />
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 26 }}>
            {values.map((v, i) => (
              <Reveal key={v.t} delay={i * 90}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--cream-line)", borderRadius: 16, padding: "26px 24px", boxShadow: "var(--shadow-sm)", height: "100%", boxSizing: "border-box" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: "rgba(142,31,27,.09)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paprika)", marginBottom: 14 }}><Icon name={v.icon} size={24} /></div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, color: "var(--ink)", margin: "0 0 7px" }}>{v.t}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 14.5, lineHeight: 1.6, color: "var(--fg-2)", margin: 0 }}>{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: isMobile ? "40px 20px 70px" : "56px 32px 90px" }}>
          <div style={{ background: "var(--parchment-2)", border: "1px solid var(--cream-line)", borderRadius: 24, padding: isMobile ? "36px 24px" : "48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 28 : 34, color: "var(--ink)", margin: "0 0 12px", letterSpacing: "-.01em" }}>Vă așteptăm la masă</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, color: "var(--fg-2)", margin: "0 auto 26px", maxWidth: 440 }}>
              Veniți să ne găsiți la târg sau invitați-ne la evenimentul vostru.</p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Button onClick={() => onNav("meniu")}>Vezi meniul</Button>
              <Button variant="ghost" onClick={() => onNav("evenimente")} icon="arrowRight">Rezervați un eveniment</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
