import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MapPin } from 'lucide-react'

const events = [
  { date: '17-18 Mai',    name: 'Târgul de Primăvară', location: 'Negrești-Oaș', status: 'confirmed' },
  { date: '24-25 Mai',    name: 'Târgul Comunal',      location: 'Certeze',      status: 'confirmed' },
  { date: '7-8 Iunie',   name: 'Zilele Orașului',      location: 'Satu Mare',    status: 'pending'   },
  { date: '14 Iunie',    name: 'Târg tradițional',     location: 'Vama',         status: 'confirmed' },
  { date: '28-29 Iunie', name: 'Festivalul Oașului',   location: 'Negrești-Oaș', status: 'confirmed' },
  { date: '12-13 Iulie', name: 'Târg de vară',         location: 'Tășnad',       status: 'pending'   },
  { date: '26-27 Iulie', name: 'Zilele comunei',       location: 'Bixad',        status: 'pending'   },
  { date: '9-10 August', name: 'Târgul Mare',          location: 'Tur',          status: 'pending'   },
]

const badgeClass = {
  confirmed: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  pending:   'bg-amber-500/10 text-amber-400 border border-amber-500/20',
}
const badgeLabel = {
  confirmed: 'Confirmat',
  pending:   'În așteptare',
}

export default function CalendarSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="calendar" className="relative py-32 px-6 bg-[#080808]">

      {/* Grid background */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px)
          `,
        }} />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#e8a838]" />
            <span className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">Unde ne găsești</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#f0ece4]"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Sezon 2026
          </h2>
        </div>

        {/* Grid of event cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              className="group bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-2xl p-6 hover:border-[#e8a838]/30 hover:bg-white/[0.04] hover:scale-[1.02] transition-all duration-300 cursor-default"
            >
              {/* Top row: date + badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#e8a838] text-xl"
                  style={{ fontFamily: '"DM Serif Display", serif' }}>
                  {ev.date}
                </span>
                <span className={`text-xs px-3 py-1 rounded-full ${badgeClass[ev.status]}`}>
                  {badgeLabel[ev.status]}
                </span>
              </div>

              {/* Bottom row: name + location */}
              <p className="text-[#f0ece4] font-semibold text-lg leading-snug mb-2">
                {ev.name}
              </p>
              <div className="flex items-center gap-1.5 text-[#7a7368] text-sm">
                <MapPin size={13} strokeWidth={1.5} />
                {ev.location}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <p className="text-sm text-[#7a7368] text-center mt-12 leading-relaxed">
          Calendarul se actualizează pe parcursul sezonului.
          <br />Urmărește-ne pe Facebook pentru noutăți.
        </p>

      </div>
    </section>
  )
}
