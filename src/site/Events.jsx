import { useState } from 'react'
import { Eyebrow, Button, Photo, Icon } from './components'
import { useIsMobile } from './useIsMobile'

const WHATSAPP_NUMBER = "40746170890"

function Field({ label, children }) {
  return <label style={{ display: "grid", gap: 6 }}>
    <span style={{ fontFamily: "var(--font-sans)", fontSize: 13, fontWeight: 700, color: "var(--fg-2)" }}>{label}</span>
    {children}</label>
}
const fgInput = {
  fontFamily: "var(--font-sans)", fontSize: 15, color: "var(--fg-1)", background: "var(--surface)",
  border: "1.5px solid var(--cream-line-2)", borderRadius: 10, padding: "12px 14px", outline: "none", width: "100%", boxSizing: "border-box",
}

export default function Events() {
  const isMobile = useIsMobile(820)
  const [type, setType]         = useState("Nuntă")
  const [guests, setGuests]     = useState("")
  const [locality, setLocality] = useState("")
  const [date, setDate]         = useState("")
  const [details, setDetails]   = useState("")
  const types = ["Nuntă", "Botez", "Petrecere", "Eveniment de firmă", "Masă în familie"]
  const twoCol = { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }

  const openWhatsApp = () => {
    const lines = [
      `Bună! Aș dori o ofertă pentru un eveniment: ${type.toLowerCase()}.`,
      guests   && `Număr invitați: ${guests}`,
      locality && `Localitate: ${locality}`,
      date     && `Data: ${date}`,
      details  && `Detalii: ${details}`,
    ].filter(Boolean)
    const msg = encodeURIComponent(lines.join("\n"))
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank", "noopener")
  }

  return (
    <div style={{ background: "var(--parchment)" }}>
      <section style={{ background: "var(--ink)", color: "var(--parchment)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "48px 20px" : "60px 32px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 0.9fr", gap: isMobile ? 32 : 48, alignItems: "center" }}>
          <div>
            <Eyebrow light>Evenimente private</Eyebrow>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 32 : 46, letterSpacing: "-.02em", color: "var(--parchment)", margin: "10px 0 14px", lineHeight: 1.08 }}>
              Gătim pe foc<br />pentru sărbătoarea voastră</h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.65, color: "var(--fg-on-dark-2)", margin: "0 0 24px", maxWidth: 420 }}>
              Spuneți-ne despre eveniment pe WhatsApp și revenim cu o ofertă în maximum 24 de ore. Fără bătăi de cap.</p>
            <div style={{ display: "grid", gap: 12 }}>
              {[["users", "De la 20 la 400 de invitați"], ["flame", "Gătit pe loc, pe foc"], ["check", "Ofertă în 24h, fără obligații"]].map(([ic, t]) => (
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "var(--font-sans)", fontSize: 15.5, color: "var(--parchment)" }}>
                  <span style={{ color: "var(--flame-bright)" }}><Icon name={ic} size={20} /></span>{t}</div>
              ))}
            </div>
          </div>
          <Photo seed={3} style={{ height: isMobile ? 220 : 340, borderRadius: 20, boxShadow: "var(--shadow-lg)" }} label="Foto: eveniment" />
        </div>
      </section>

      <section>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: isMobile ? "40px 20px 70px" : "56px 32px 90px" }}>
          <div style={{ background: "var(--surface)", border: "1px solid var(--cream-line)", borderRadius: 20, boxShadow: "var(--shadow-md)", overflow: "hidden" }}>
            <div style={{ padding: "18px 30px", borderBottom: "1px solid var(--cream-line)", background: "var(--parchment-2)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 38, height: 38, borderRadius: 999, background: "rgba(37,160,80,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#25a050" }}>
                <Icon name="phone" size={19} />
              </span>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>Cereți o ofertă pe WhatsApp</div>
                <div style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-2)" }}>Completați detaliile — mesajul se scrie singur.</div>
              </div>
            </div>

            <div style={{ padding: isMobile ? "24px 20px 26px" : "30px 30px 32px", display: "grid", gap: 18 }}>
              <Field label="Tip eveniment">
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {types.map(t => <button key={t} onClick={() => setType(t)} style={{
                    fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 600, padding: "9px 16px",
                    borderRadius: 999, cursor: "pointer", border: "1.5px solid",
                    borderColor: type === t ? "var(--paprika)" : "var(--cream-line-2)",
                    background: type === t ? "rgba(142,31,27,.08)" : "transparent",
                    color: type === t ? "var(--paprika)" : "var(--fg-1)"
                  }}>{t}</button>)}
                </div>
              </Field>
              <div style={twoCol}>
                <Field label="Număr invitați (opțional)">
                  <input style={fgInput} placeholder="ex. 80" value={guests} onChange={e => setGuests(e.target.value)} /></Field>
                <Field label="Localitate (opțional)">
                  <input style={fgInput} placeholder="ex. Negrești-Oaș" value={locality} onChange={e => setLocality(e.target.value)} /></Field>
              </div>
              <Field label="Data evenimentului (opțional)">
                <input style={fgInput} placeholder="zz / ll / aaaa" value={date} onChange={e => setDate(e.target.value)} /></Field>
              <Field label="Alte detalii (opțional)">
                <textarea style={{ ...fgInput, minHeight: 92, resize: "vertical" }} placeholder="Meniu dorit, preferințe, întrebări…"
                  value={details} onChange={e => setDetails(e.target.value)} /></Field>

              <button onClick={openWhatsApp} style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 16, color: "#fff",
                background: "#25a050", border: "none", borderRadius: 12, padding: "15px 24px",
                cursor: "pointer", marginTop: 4, boxShadow: "0 6px 18px rgba(37,160,80,.3)",
                transition: "transform .2s, box-shadow .2s"
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 24px rgba(37,160,80,.4)" }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(37,160,80,.3)" }}>
                <Icon name="phone" size={20} /> Trimiteți pe WhatsApp
              </button>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: 13, color: "var(--fg-3)", textAlign: "center", margin: 0, lineHeight: 1.5 }}>
                Se deschide WhatsApp cu mesajul pregătit — îl puteți modifica înainte de trimitere.<br />
                Sau sunați direct: <a href="tel:+40746170890" style={{ color: "var(--paprika)", fontWeight: 700, textDecoration: "none" }}>0746 170 890</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
