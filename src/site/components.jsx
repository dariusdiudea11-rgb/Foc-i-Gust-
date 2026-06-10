/* =========================================================
   Foc Și Gust — shared website components
   Ported from the brand design-system UI kit to ES modules.
   ========================================================= */
import { useState, useEffect, useRef } from 'react'
import emblem from '../assets/brand/emblem.png'

export { emblem }

/* ---------- Icon (Lucide-style, 2px stroke) ---------- */
const FG_ICONS = {
  flame: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z",
  mapPin: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z|circle:12,10,3",
  calendar: "M8 2v4 M16 2v4 M3 10h18|rect:3,4,18,18,2",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z",
  mail: "m22 7-10 5L2 7|rect:2,4,20,16,2",
  arrowRight: "M5 12h14 M12 5l7 7-7 7",
  check: "M20 6 9 17l-5-5",
  users: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75|circle:9,7,4",
  clock: "M12 6v6l4 2|circle:12,12,10",
  menu: "M3 6h18 M3 12h18 M3 18h18",
  x: "M18 6 6 18 M6 6l12 12",
  plus: "M5 12h14 M12 5v14",
  minus: "M5 12h14",
  chevronRight: "m9 18 6-6-6-6",
  chevronDown: "m6 9 6 6 6-6",
  instagram: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01|rect:2,2,20,20,5",
  facebook: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  leaf: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z M2 21c0-3 1.85-5.36 5.08-6",
}

export function Icon({ name, size = 22, stroke = 2, fill = "none", style }) {
  const raw = FG_ICONS[name] || ""
  const [pathsPart, ...shapes] = raw.split("|")
  const paths = pathsPart.trim().split(/\s+(?=M|m)/).filter(Boolean)
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      {paths.map((d, i) => <path key={i} d={d} />)}
      {shapes.map((s, i) => {
        const [t, ...n] = s.split(":")
        const v = n.join(":").split(",").map(Number)
        if (t === "circle") return <circle key={"c" + i} cx={v[0]} cy={v[1]} r={v[2]} />
        if (t === "rect") return <rect key={"r" + i} x={v[0]} y={v[1]} width={v[2]} height={v[3]} rx={v[4]} />
        return null
      })}
    </svg>
  )
}

/* ---------- Eyebrow ---------- */
export function Eyebrow({ children, light, style }) {
  return <div style={{
    fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13,
    letterSpacing: "0.14em", textTransform: "uppercase",
    color: light ? "var(--flame-bright)" : "var(--paprika)", ...style
  }}>{children}</div>
}

/* ---------- Button ---------- */
export function Button({ children, variant = "primary", size = "md", icon, onClick, style, type }) {
  const [h, setH] = useState(false)
  const base = {
    fontFamily: "var(--font-sans)", fontWeight: 700, border: "none", cursor: "pointer",
    borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 9,
    transition: "transform .16s var(--ease-soft), background .26s, box-shadow .26s, border-color .26s",
    fontSize: size === "sm" ? 14 : 16, padding: size === "sm" ? "9px 18px" : "13px 26px", whiteSpace: "nowrap",
  }
  const variants = {
    primary: { background: h ? "var(--paprika-deep)" : "var(--paprika)", color: "var(--parchment)", boxShadow: "var(--shadow-ember)" },
    secondary: { background: h ? "#a9521a" : "var(--flame)", color: "#fff" },
    ghost: { background: h ? "rgba(142,31,27,.06)" : "transparent", color: "var(--paprika)", border: "1.5px solid", borderColor: h ? "var(--paprika)" : "var(--cream-line-2)" },
    light: { background: h ? "#fff" : "var(--parchment)", color: "var(--paprika)" },
    onDark: { background: h ? "var(--paprika-deep)" : "var(--paprika)", color: "var(--parchment)" },
  }
  return (
    <button type={type} onClick={onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ ...base, ...variants[variant], transform: h ? "translateY(-1px)" : "none", ...style }}>
      {children}{icon && <span className="fg-btn-icon"><Icon name={icon} size={size === "sm" ? 16 : 18} /></span>}
    </button>
  )
}

/* ---------- Badge ---------- */
export function Badge({ children, tone = "paprika", dot }) {
  const tones = {
    paprika: { background: "rgba(142,31,27,.1)", color: "var(--paprika)" },
    flame: { background: "rgba(194,97,30,.14)", color: "#a9521a" },
    honey: { background: "rgba(214,154,45,.18)", color: "#9a6c12" },
    green: { background: "rgba(91,122,69,.16)", color: "var(--herb-deep)" },
    ink: { background: "var(--ink)", color: "var(--parchment)" },
    out: { background: "transparent", color: "var(--fg-2)", border: "1.5px solid var(--cream-line-2)" },
  }
  return <span style={{
    fontFamily: "var(--font-sans)", fontSize: 12, fontWeight: 700,
    padding: "6px 13px", borderRadius: 999, letterSpacing: ".02em", display: "inline-flex",
    alignItems: "center", gap: 6, ...tones[tone]
  }}>
    {dot && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "currentColor" }} />}
    {children}</span>
}

/* ---------- Logo ---------- */
export function Logo({ size = 40, light, stacked }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 11, flexDirection: stacked ? "column" : "row" }}>
      <img src={emblem} alt="" className="fg-flame" style={{ width: size, height: size, borderRadius: 8, objectFit: "contain" }} />
      <div style={{ lineHeight: 1.04, textAlign: stacked ? "center" : "left", whiteSpace: "nowrap" }}>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: size * 0.42,
          color: light ? "var(--parchment)" : "var(--ink)", letterSpacing: "-.01em" }}>Foc Și Gust</div>
        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: size * 0.28,
          color: light ? "var(--flame-bright)" : "var(--paprika)", marginTop: 2 }}>Tradițional</div>
      </div>
    </div>
  )
}

/* ---------- Photo placeholder (warm, with emblem watermark) ---------- */
const FG_GRADS = [
  "linear-gradient(135deg,#EFE3CE,#E0C49B)",
  "linear-gradient(135deg,#E9D2B6,#D9B07F)",
  "linear-gradient(140deg,#E7D3B3,#C99B6A)",
  "linear-gradient(135deg,#ECDAC0,#D7B68A)",
  "linear-gradient(140deg,#E3CBA6,#CDA877)",
]
export function Photo({ seed = 0, label, tag, tagTone, style, rounded = 16, children }) {
  return (
    <div style={{
      position: "relative", background: FG_GRADS[seed % FG_GRADS.length],
      borderRadius: rounded, overflow: "hidden", display: "flex", alignItems: "center",
      justifyContent: "center", ...style
    }}>
      <img src={emblem} alt="" style={{ width: "34%", maxWidth: 120, opacity: .42, mixBlendMode: "multiply" }} />
      {tag && <span style={{ position: "absolute", top: 14, left: 14 }}><Badge tone={tagTone || "ink"}>{tag}</Badge></span>}
      {label && <span style={{
        position: "absolute", bottom: 12, right: 14, fontFamily: "var(--font-sans)",
        fontSize: 11, fontWeight: 600, color: "rgba(46,42,36,.5)", letterSpacing: ".04em"
      }}>{label}</span>}
      {children}
    </div>
  )
}

/* ---------- Folk lozenge divider ---------- */
export function FolkDivider({ style }) {
  const D = ({ c, big, hollow }) => <span style={{
    width: big ? 17 : 12, height: big ? 17 : 12, transform: "rotate(45deg)",
    background: hollow ? "transparent" : c, border: hollow ? "2px solid var(--ink)" : "none", display: "block"
  }} />
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 13, ...style }}>
      <span style={{ height: 2, width: 80, maxWidth: "22vw", background: "linear-gradient(90deg,transparent,var(--cream-line-2))" }} />
      <span style={{ display: "flex", gap: 9, alignItems: "center" }}>
        <D c="var(--ink)" /><D c="var(--paprika)" big /><D c="var(--flame)" /><D c="var(--paprika)" big /><D c="var(--ink)" />
      </span>
      <span style={{ height: 2, width: 80, maxWidth: "22vw", background: "linear-gradient(90deg,var(--cream-line-2),transparent)" }} />
    </div>
  )
}

/* ---------- Tilt3D wrapper (perspective tilt following mouse) ---------- */
export function Tilt3D({ children, style, strength = 10 }) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [over, setOver] = useState(false)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    setRot({ x: -ny * strength, y: nx * strength })
  }
  return (
    <div ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => { setOver(false); setRot({ x: 0, y: 0 }) }}
      style={{
        transform: over
          ? `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.025,1.025,1.025)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: over ? "transform .08s linear" : "transform .55s var(--ease-out)",
        willChange: "transform",
        ...style,
      }}>
      {children}
    </div>
  )
}

/* ---------- Dish card ---------- */
export function DishCard({ dish }) {
  const ref = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })
  const [over, setOver] = useState(false)
  const onMove = (e) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    const nx = (e.clientX - r.left) / r.width - 0.5
    const ny = (e.clientY - r.top) / r.height - 0.5
    setRot({ x: -ny * 14, y: nx * 14 })
  }
  const sheenX = (rot.y / 14 + 0.5) * 100
  const sheenY = (-rot.x / 14 + 0.5) * 100
  return (
    <div ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => { setOver(false); setRot({ x: 0, y: 0 }) }}
      style={{
        position: "relative",
        background: "var(--surface)", border: "1px solid var(--cream-line)", borderRadius: 16,
        boxShadow: over ? "var(--shadow-lg)" : "var(--shadow-sm)", overflow: "hidden",
        transform: over
          ? `perspective(900px) rotateX(${rot.x}deg) rotateY(${rot.y}deg) scale3d(1.03,1.03,1.03)`
          : "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)",
        transition: over
          ? "box-shadow .3s, transform .08s linear"
          : "box-shadow .4s var(--ease-out), transform .55s var(--ease-out)",
        willChange: "transform",
      }}>
      <Photo seed={dish.seed} tag={dish.tag} tagTone={dish.tagTone} style={{ height: 168 }} />
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 21, margin: 0, color: "var(--fg-1)" }}>{dish.name}</h3>
        </div>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: 13.5, color: "var(--fg-2)", margin: "5px 0 15px", lineHeight: 1.5 }}>{dish.desc}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--paprika)" }}>{dish.price}</span>
        </div>
      </div>
      {/* moving light sheen */}
      {over && <div aria-hidden="true" style={{
        position: "absolute", inset: 0, borderRadius: 16, pointerEvents: "none",
        background: `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,.22) 0%, transparent 62%)`,
      }} />}
    </div>
  )
}

/* ---------- Marquee band (slow scrolling specialties strip) ---------- */
export function MarqueeBand({ items }) {
  const Diamond = () => <span aria-hidden="true" style={{
    width: 8, height: 8, transform: "rotate(45deg)", background: "var(--honey)",
    display: "inline-block", margin: "0 26px", flexShrink: 0
  }} />
  const row = items.map((t, i) => (
    <span key={i} style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap" }}>
      <span style={{
        fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 17,
        color: "var(--parchment)", letterSpacing: ".02em"
      }}>{t}</span>
      <Diamond />
    </span>
  ))
  return (
    <div className="fg-marquee" aria-hidden="true" style={{
      background: "var(--paprika)", overflow: "hidden", padding: "13px 0",
      borderTop: "1px solid rgba(245,239,227,.12)", borderBottom: "1px solid rgba(245,239,227,.12)"
    }}>
      <div className="fg-marquee-track">
        <div style={{ display: "flex", alignItems: "center" }}>{row}</div>
        <div style={{ display: "flex", alignItems: "center" }}>{row}</div>
      </div>
    </div>
  )
}

/* ---------- Reveal (scroll-in fade + rise) ---------- */
export function Reveal({ children, delay = 0, y = 18 }) {
  const ref = useRef(null)
  const [v, setV] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === "undefined") { setV(true); return }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); io.disconnect() }
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} style={{
    opacity: v ? 1 : 0, transform: v ? "none" : `translateY(${y}px)`,
    transition: `opacity .6s var(--ease-out) ${delay}ms, transform .6s var(--ease-out) ${delay}ms`
  }}>{children}</div>
}
