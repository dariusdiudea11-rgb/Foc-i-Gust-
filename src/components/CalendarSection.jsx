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
  confirmed: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  pending:   'bg-[#c41e3a]/5 text-[#c41e3a] border border-[#c41e3a]/20',
}
const badgeLabel = {
  confirmed: 'Confirmat',
  pending:   'În așteptare',
}

export default function CalendarSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="calendar" className="relative py-32 px-6 bg-[#faf3e8]">
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px),
            repeating-linear-gradient(90deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px)
          `,
        }}/>

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Unde ne găsești</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#1a1520]"
            style={{ fontFamily: '"DM Serif Display", serif' }}>Sezon 2026</h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              className="group bg-white/80 border border-[#1a1520]/5 rounded-2xl p-6 hover:border-[#c41e3a]/20 hover:scale-[1.02] transition-all duration-300 cursor-default">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[#c41e3a] text-xl"
                  style={{ fontFamily: '"DM Serif Display", serif' }}>{ev.date}</span>
                <span className={`text-xs px-3 py-1 rounded-full ${badgeClass[ev.status]}`}>
                  {badgeLabel[ev.status]}
                </span>
              </div>
              <p className="text-[#1a1520] font-semibold text-lg leading-snug mb-2">{ev.name}</p>
              <div className="flex items-center gap-1.5 text-[#8a7e6d] text-sm">
                <MapPin size={13} strokeWidth={1.5}/>
                {ev.location}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-sm text-[#8a7e6d] text-center mt-12 leading-relaxed">
          Calendarul se actualizează pe parcursul sezonului.<br/>
          Urmărește-ne pe Facebook pentru noutăți.
        </p>
      </div>
    </section>
  )
}
