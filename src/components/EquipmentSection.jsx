import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Flame, CookingPot, Zap, Tent, Thermometer, Utensils } from 'lucide-react'

const items = [
  { icon: Flame,       name: 'Grătar Weber Master-Touch 67cm (×2)',      desc: 'Două grătare pe cărbuni, email porțelanat, garanție 10 ani.' },
  { icon: CookingPot,  name: 'Friteză profesională dublă Popcat HGF-972', desc: 'Două cuve independente de 8 litri.' },
  { icon: Zap,         name: 'Generator inverter K&S KS 3300i',           desc: 'Generator silențios 3000W.' },
  { icon: Tent,        name: 'Cort profesional Expodom 3×6m',             desc: 'Impermeabil, oțel, pereți laterali.' },
  { icon: Thermometer, name: 'Ladă frigorifică Heinner 198L',             desc: 'Temperatură controlată, carne și băuturi.' },
  { icon: Utensils,    name: 'Cuțite profesionale F. Dick ProDynamic',    desc: 'Set profesional german.' },
]

export default function EquipmentSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="echipament" className="relative py-32 px-6 bg-[#1a1520]">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Cu ce lucrăm</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#faf3e8]"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Echipament profesional
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="group bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8 hover:border-[#c41e3a]/20 hover:bg-white/[0.06] hover:-translate-y-1.5 hover:shadow-[0_25px_50px_rgba(0,0,0,0.4)] transition-all duration-500">
                <Icon size={48} className="text-[#c41e3a] mb-4" strokeWidth={1.2}/>
                <div className="w-12 h-0.5 bg-[#c41e3a]/50 mb-6"/>
                <h3 className="text-[#faf3e8] font-bold text-lg leading-snug mb-3">{item.name}</h3>
                <p className="text-[#faf3e8]/50 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
