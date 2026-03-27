import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

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

const badge = {
  confirmed: 'bg-emerald-900/50 text-emerald-400 border border-emerald-700',
  pending:   'bg-amber-900/30 text-amber-400 border border-amber-700',
}
const badgeLabel = {
  confirmed: 'Confirmat',
  pending:   'În așteptare',
}

export default function CalendarSection() {
  const listRef = useRef(null)
  const inView = useInView(listRef, { once: true, margin: '-60px' })

  return (
    <section id="calendar" className="bg-[#111111] py-24 px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase mb-3">
            Unde ne găsești
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#f0ece4] mb-3"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Calendar Sezon 2026
          </h2>
          <p className="text-sm text-[#7a7368]">Județul Satu Mare și împrejurimi</p>
        </div>

        {/* Timeline */}
        <div ref={listRef} className="relative">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[#e8a838]/20 hidden sm:block" />

          <div className="flex flex-col gap-4">
            {events.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: 'easeOut' }}
                className="flex items-start gap-5 sm:gap-6"
              >
                {/* Dot */}
                <div className="hidden sm:flex shrink-0 w-[15px] h-[15px] rounded-full bg-[#e8a838] mt-4 border-2 border-[#111111] ring-2 ring-[#e8a838]/30" />

                {/* Card */}
                <div className="flex-1 bg-[#1a1a1a] rounded-xl px-5 py-4 border border-[#2a2a2a] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <span
                      className="text-[#e8a838] font-bold text-lg leading-none"
                      style={{ fontFamily: '"DM Serif Display", serif' }}
                    >
                      {ev.date}
                    </span>
                    <span className="text-[#f0ece4] font-semibold text-sm">{ev.name}</span>
                    <span className="text-[#7a7368] text-xs">{ev.location}</span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-medium shrink-0 w-fit ${badge[ev.status]}`}>
                    {badgeLabel[ev.status]}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Note */}
        <p className="text-sm text-[#7a7368] text-center mt-10 leading-relaxed">
          Calendarul se actualizează pe parcursul sezonului.
          <br />Urmărește-ne pe Facebook pentru noutăți.
        </p>

      </div>
    </section>
  )
}
