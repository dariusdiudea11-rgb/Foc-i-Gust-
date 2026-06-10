import { Eyebrow, Button, Photo, FolkDivider, DishCard, Icon, Reveal, emblem } from './components'
import { FG_MENU, FG_FAIRS } from './data'
import { useIsMobile } from './useIsMobile'

export default function Home({ onNav }) {
  const isMobile = useIsMobile(820)
  const triad = [
    { icon: "flame", t: "Foc", d: "Gătim pe foc și jar, cum se făcea dintotdeauna. Fără scurtături." },
    { icon: "leaf", t: "Gust", d: "Ingrediente de la producători locali și rețete de familie." },
    { icon: "users", t: "Tradiție", d: "Aducem masa românească la târg și la sărbătoarea voastră." },
  ]
  const featured = FG_MENU.filter(d => ["Combo Duo", "Mici", "Meniu Mixt Grătar"].includes(d.name))
  const wrap = { maxWidth: 1180, margin: "0 auto" }

  return (
    <div>
      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden", background: "var(--parchment)" }}>
        <div style={{
          ...wrap, padding: isMobile ? "40px 20px 52px" : "72px 32px 80px",
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.05fr 0.95fr",
          gap: isMobile ? 40 : 56, alignItems: "center"
        }}>
          <div>
            <Reveal><Eyebrow>Mâncare românească · gătită pe foc</Eyebrow></Reveal>
            <Reveal delay={80}><h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(2.4rem,8vw,4.4rem)", lineHeight: 1.05, letterSpacing: "-.02em",
              color: "var(--ink)", margin: "14px 0 0"
            }}>O tradiție care<br />merge mai departe</h1></Reveal>
            <Reveal delay={160}><p style={{
              fontFamily: "var(--font-sans)", fontSize: isMobile ? 17 : 19, lineHeight: 1.65,
              color: "var(--fg-2)", margin: "20px 0 0", maxWidth: 460
            }}>
              Gătim mâncare de acasă, pe foc, pentru oameni care iubesc gustul adevărat — la târguri,
              festivaluri și la evenimentele voastre.</p></Reveal>
            <Reveal delay={240}><div style={{ display: "flex", gap: 14, marginTop: 32, flexWrap: "wrap" }}>
              <Button onClick={() => onNav("meniu")} icon="arrowRight">Vezi meniul</Button>
              <Button variant="ghost" onClick={() => onNav("evenimente")}>Rezervați un eveniment</Button>
            </div></Reveal>
          </div>
          <Reveal delay={180} y={28}>
            <div style={{ position: "relative" }}>
              <Photo seed={1} style={{ height: isMobile ? 300 : 460, borderRadius: 24, boxShadow: "var(--shadow-lg)" }} label="Foto: fel principal" />
              <div style={{
                position: "absolute", bottom: -22, left: isMobile ? 12 : -22, background: "var(--surface)",
                border: "1px solid var(--cream-line)", borderRadius: 16, padding: "14px 18px",
                boxShadow: "var(--shadow-md)", display: "flex", alignItems: "center", gap: 12
              }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 999, background: "rgba(142,31,27,.1)",
                  display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paprika)"
                }}><Icon name="flame" size={22} /></div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, color: "var(--ink)" }}>Gătit pe foc</div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: 12.5, color: "var(--fg-2)" }}>zilnic, proaspăt</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TRIAD */}
      <section style={{ background: "var(--parchment-2)", borderTop: "1px solid var(--cream-line)", borderBottom: "1px solid var(--cream-line)" }}>
        <div style={{ ...wrap, padding: isMobile ? "48px 20px" : "64px 32px" }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 26 }}>
            {triad.map((t, i) => (
              <Reveal key={t.t} delay={i * 90}>
                <div style={{ textAlign: "center", padding: "8px 16px" }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: 999, margin: "0 auto 16px",
                    background: "var(--surface)", border: "1px solid var(--cream-line)", boxShadow: "var(--shadow-sm)",
                    display: "flex", alignItems: "center", justifyContent: "center", color: "var(--paprika)"
                  }}><Icon name={t.icon} size={26} /></div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 26, margin: "0 0 8px", color: "var(--ink)" }}>{t.t}</h3>
                  <p style={{ fontFamily: "var(--font-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--fg-2)", margin: "0 auto", maxWidth: 280 }}>{t.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <FolkDivider style={{ marginTop: 48 }} />
        </div>
      </section>

      {/* FEATURED DISHES */}
      <section style={{ background: "var(--parchment)" }}>
        <div style={{ ...wrap, padding: isMobile ? "52px 20px" : "72px 32px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32, gap: 16, flexWrap: "wrap" }}>
            <div>
              <Eyebrow>De pe grătar</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 30 : 38, letterSpacing: "-.02em", color: "var(--ink)", margin: "8px 0 0" }}>Specialitățile casei</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={() => onNav("meniu")} icon="arrowRight">Tot meniul</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 24 }}>
            {featured.map((d, i) => <Reveal key={d.name} delay={i * 80}><DishCard dish={d} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* WHERE TO FIND US */}
      <section style={{ background: "var(--ink)", color: "var(--parchment)" }}>
        <div style={{ ...wrap, padding: isMobile ? "52px 20px" : "72px 32px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "0.85fr 1.15fr", gap: isMobile ? 32 : 56, alignItems: "center" }}>
          <div>
            <Eyebrow light>Unde ne găsiți</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 30 : 38, letterSpacing: "-.02em", color: "var(--parchment)", margin: "10px 0 16px" }}>Ne vedem la târg</h2>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, lineHeight: 1.65, color: "var(--fg-on-dark-2)", margin: 0, maxWidth: 340 }}>
              Suntem mereu pe drumuri, de la un târg la altul. Veniți să simțiți mirosul de fum și mâncare bună.</p>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            {FG_FAIRS.map((f, i) => (
              <Reveal key={f.place} delay={i * 80} y={12}>
                <div style={{ background: "rgba(245,239,227,.06)", border: "1px solid #403a32", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 18 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "rgba(194,97,30,.18)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--flame-bright)", flex: "none" }}><Icon name="mapPin" size={22} /></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 19, color: "var(--parchment)" }}>{f.place}</div>
                    <div style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--fg-on-dark-2)", marginTop: 2 }}>{f.city}</div>
                  </div>
                  <div style={{ textAlign: "right", flex: "none" }}>
                    <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 14, color: "var(--parchment)" }}>{f.dates}</div>
                    {f.home && <span style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 5, fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700, color: "var(--flame-bright)" }}>
                      <span style={{ width: 7, height: 7, borderRadius: 999, background: "var(--flame-bright)" }} />Acasă</span>}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS CTA */}
      <section style={{ background: "var(--parchment)" }}>
        <div style={{ ...wrap, padding: isMobile ? "52px 20px" : "72px 32px" }}>
          <div style={{
            position: "relative", borderRadius: 24, overflow: "hidden", background: "var(--paprika)",
            padding: isMobile ? "40px 26px" : "56px 56px", display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1.3fr 0.7fr", gap: 40, alignItems: "center"
          }}>
            <div>
              <Eyebrow light>Evenimente private</Eyebrow>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 30 : 40, letterSpacing: "-.02em", color: "var(--parchment)", margin: "10px 0 14px", lineHeight: 1.08 }}>
                Aducem târgul la masa voastră</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.6, color: "rgba(245,239,227,.85)", margin: "0 0 28px", maxWidth: 440 }}>
                Nuntă, botez, petrecere de firmă sau o masă în familie — gătim pe foc pentru voi, oriunde.</p>
              <Button variant="light" onClick={() => onNav("evenimente")} icon="arrowRight">Cereți o ofertă</Button>
            </div>
            {!isMobile && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={emblem} alt="" style={{ width: 180, opacity: .9, filter: "drop-shadow(0 12px 24px rgba(0,0,0,.25))" }} />
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
