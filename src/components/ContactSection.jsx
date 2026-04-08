import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

const contacts = [
  { icon: Phone,  label: '+40 7XX XXX XXX',         href: 'tel:+40700000000',         note: 'Luni – Sâmbătă, 9:00–20:00' },
  { icon: Mail,   label: 'contact@focusgust.ro',     href: 'mailto:contact@focusgust.ro', note: 'Răspundem în 24h' },
  { icon: MapPin, label: 'Negrești-Oaș, Satu Mare',  href: null,                       note: 'Țara Oașului, România' },
]

function FbIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IgIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="contact" className="relative py-32 px-6 bg-[#faf3e8] overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(ellipse at bottom right, rgba(196,30,58,0.05) 0%, transparent 65%)' }}/>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px)
            `,
          }}/>
      </div>

      <div ref={ref} className="relative max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Suntem la dispoziția ta</span>
          </div>
          <h2 className="text-4xl md:text-6xl text-[#1a1520] leading-tight max-w-2xl"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Vino să guști <span className="text-[#c41e3a]">tradiția</span>
          </h2>
        </motion.div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

          {/* Contact cards */}
          <div className="flex flex-col gap-4">
            {contacts.map(({ icon: Icon, label, href, note }, i) => {
              const inner = (
                <motion.div
                  initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: 'easeOut' }}
                  className="group flex items-center gap-5 bg-white/80 border border-[#1a1520]/5 rounded-2xl p-6 hover:border-[#c41e3a]/25 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(196,30,58,0.08)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-[#c41e3a]/8 flex items-center justify-center shrink-0 group-hover:bg-[#c41e3a]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#c41e3a]" strokeWidth={1.5}/>
                  </div>
                  <div>
                    <p className="text-[#1a1520] font-semibold text-sm">{label}</p>
                    <p className="text-[#8a7e6d] text-xs mt-0.5">{note}</p>
                  </div>
                </motion.div>
              )
              return href
                ? <a key={label} href={href} className="block">{inner}</a>
                : <div key={label}>{inner}</div>
            })}
          </div>

          {/* Social + tagline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col justify-between gap-8">
            <div className="bg-[#1a1520] rounded-2xl p-8">
              <p className="text-[#faf3e8]/70 text-sm leading-relaxed mb-6">
                Urmărește-ne pe rețelele sociale pentru programul actualizat, locații noi și surprize culinare.
              </p>
              <div className="flex gap-4">
                <a href="#"
                  className="flex-1 flex items-center justify-center gap-2.5 bg-white/[0.06] border border-white/[0.08] text-[#faf3e8]/70 hover:text-[#faf3e8] hover:border-[#c41e3a]/30 hover:bg-[#c41e3a]/10 rounded-xl py-3 text-sm font-medium transition-all duration-300">
                  <FbIcon/> Facebook
                </a>
                <a href="#"
                  className="flex-1 flex items-center justify-center gap-2.5 bg-white/[0.06] border border-white/[0.08] text-[#faf3e8]/70 hover:text-[#faf3e8] hover:border-[#c41e3a]/30 hover:bg-[#c41e3a]/10 rounded-xl py-3 text-sm font-medium transition-all duration-300">
                  <IgIcon/> Instagram
                </a>
              </div>
            </div>

            {/* Quote card */}
            <div className="border border-[#c41e3a]/20 rounded-2xl p-8 bg-[#c41e3a]/[0.03]">
              <p className="text-2xl text-[#1a1520] leading-snug italic"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
                „Focul real dă gustul real."
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="w-8 h-px bg-[#c41e3a]"/>
                <span className="text-xs text-[#c41e3a] tracking-wider uppercase">Est. 2026 · Negrești-Oaș</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
