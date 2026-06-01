import { useState } from 'react'
import { Eyebrow, Button, Photo, Icon } from './components'
import { useIsMobile } from './useIsMobile'

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
  const [step, setStep] = useState(1)
  const [type, setType] = useState("Nuntă")
  const types = ["Nuntă", "Botez", "Petrecere", "Eveniment de firmă", "Masă în familie"]
  const steps = ["Detalii", "Date", "Trimis"]
  const twoCol = { display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 16 }

  return (
    <div style={{ background: "var(--parchment)" }}>
      <section style={{ background: "var(--ink)", color: "var(--parchment)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: isMobile ? "48px 20px" : "60px 32px", display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 0.9fr", gap: isMobile ? 32 : 48, alignItems: "center" }}>
          <div>
            <Eyebrow light>Evenimente private</Eyebrow>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: isMobile ? 32 : 46, letterSpacing: "-.02em", color: "var(--parchment)", margin: "10px 0 14px", lineHeight: 1.08 }}>
              Gătim pe foc<br />pentru sărbătoarea voastră</h1>
            <p style={{ fontFamily: "var(--font-sans)", fontSize: 17, lineHeight: 1.65, color: "var(--fg-on-dark-2)", margin: "0 0 24px", maxWidth: 420 }}>
              Spuneți-ne despre eveniment și revenim cu o ofertă în maximum 24 de ore. Fără bătăi de cap.</p>
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
            {/* stepper */}
            <div style={{ display: "flex", borderBottom: "1px solid var(--cream-line)" }}>
              {steps.map((s, i) => {
                const n = i + 1, done = step > n, on = step === n
                return <div key={s} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                  padding: "16px 8px", background: on ? "var(--parchment-2)" : "transparent",
                  borderBottom: on ? "2px solid var(--paprika)" : "2px solid transparent"
                }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: 999, fontSize: 12, fontWeight: 800,
                    fontFamily: "var(--font-sans)", display: "flex", alignItems: "center", justifyContent: "center",
                    background: done || on ? "var(--paprika)" : "var(--cream-line)", color: done || on ? "#fff" : "var(--fg-3)"
                  }}>
                    {done ? <Icon name="check" size={14} /> : n}</span>
                  {!isMobile && <span style={{ fontFamily: "var(--font-sans)", fontSize: 14, fontWeight: 700, color: on ? "var(--ink)" : "var(--fg-3)" }}>{s}</span>}
                </div>
              })}
            </div>

            <div style={{ padding: isMobile ? "24px 20px 26px" : "30px 30px 32px" }}>
              {step === 1 && <div style={{ display: "grid", gap: 18 }}>
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
                  <Field label="Număr invitați"><input style={fgInput} placeholder="ex. 80" /></Field>
                  <Field label="Localitate"><input style={fgInput} placeholder="ex. Cluj-Napoca" /></Field>
                </div>
                <Field label="Spuneți-ne despre eveniment">
                  <textarea style={{ ...fgInput, minHeight: 92, resize: "vertical" }} placeholder="Meniu dorit, preferințe, întrebări…" /></Field>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                  <Button onClick={() => setStep(2)} icon="arrowRight">Continuați</Button>
                </div>
              </div>}

              {step === 2 && <div style={{ display: "grid", gap: 18 }}>
                <div style={twoCol}>
                  <Field label="Nume"><input style={fgInput} placeholder="Numele vostru" /></Field>
                  <Field label="Telefon"><input style={fgInput} placeholder="07.." /></Field>
                </div>
                <div style={twoCol}>
                  <Field label="Email"><input style={fgInput} placeholder="email@exemplu.ro" /></Field>
                  <Field label="Data evenimentului"><input style={fgInput} placeholder="zz / ll / aaaa" /></Field>
                </div>
                <label style={{ display: "flex", gap: 10, alignItems: "flex-start", fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--fg-2)", lineHeight: 1.5 }}>
                  <input type="checkbox" style={{ marginTop: 3, accentColor: "var(--paprika)" }} defaultChecked />
                  Sunt de acord să fiu contactat cu privire la această cerere.</label>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <Button variant="ghost" onClick={() => setStep(1)}>Înapoi</Button>
                  <Button onClick={() => setStep(3)} icon="check">Trimiteți cererea</Button>
                </div>
              </div>}

              {step === 3 && <div style={{ textAlign: "center", padding: "20px 10px 12px" }}>
                <div style={{ width: 72, height: 72, borderRadius: 999, margin: "0 auto 20px", background: "rgba(91,122,69,.14)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--herb)" }}><Icon name="check" size={36} /></div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--ink)", margin: "0 0 8px" }}>Cererea a fost trimisă!</h3>
                <p style={{ fontFamily: "var(--font-sans)", fontSize: 16, color: "var(--fg-2)", margin: "0 auto 24px", maxWidth: 400, lineHeight: 1.6 }}>
                  Mulțumim! Revenim cu o ofertă pentru <strong style={{ color: "var(--paprika)" }}>{type.toLowerCase()}</strong> în maximum 24 de ore.</p>
                <Button variant="ghost" onClick={() => setStep(1)}>Trimiteți o nouă cerere</Button>
              </div>}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
