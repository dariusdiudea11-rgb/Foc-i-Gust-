import { useRef, useCallback } from 'react'
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
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="echipament" className="relative py-32 px-6 bg-[#1a1520]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-px bg-[#c41e3a]" />
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Cu ce lucrăm</span>
          </div>
          <h2 className="text-[#faf3e8]"
            style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-1px', marginBottom: '16px' }}>
            Echipament profesional
          </h2>
          <p className="text-[#faf3e8]/40 text-base max-w-xl leading-relaxed">
            Investiție reală în calitate — fiecare piesă de echipament este aleasă pentru performanță și durabilitate.
          </p>
        </div>

        {/* Area-style grid — top border, no card bg */}
        <div ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                style={{ opacity: 1, transition: 'opacity 0.25s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.65'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                className="px-0 sm:px-6 pt-6 pb-10"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <Icon size={28} className="text-[#c41e3a]" strokeWidth={1.4} />
                <h3 style={{ color: '#faf3e8', fontWeight: 600, fontSize: '15px', marginTop: '18px', marginBottom: '8px', lineHeight: 1.35 }}>
                  {item.name}
                </h3>
                <p style={{ color: 'rgba(250,243,232,0.42)', fontSize: '13px', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
