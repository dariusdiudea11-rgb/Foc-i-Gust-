import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Flame, Droplets, Zap, Shield, Thermometer, Utensils } from 'lucide-react'

const items = [
  {
    icon: Flame,
    name: 'Grătar Weber Master-Touch 67cm (×2)',
    desc: 'Două grătare pe cărbuni cu email porțelanat, garanție 10 ani. Cărbunii dau gustul, nu gazul.',
  },
  {
    icon: Droplets,
    name: 'Friteză profesională dublă Popcat HGF-972',
    desc: 'Două cuve independente de 8 litri pentru cartofi prăjiți aurii și crocanți.',
  },
  {
    icon: Zap,
    name: 'Generator inverter K&S KS 3300i',
    desc: 'Generator silențios de 3000W — alimentăm totul fără zgomot și fără întreruperi.',
  },
  {
    icon: Shield,
    name: 'Cort profesional Expodom 3×6m',
    desc: 'Cort impermeabil din oțel cu pereți laterali — soare sau ploaie, suntem pregătiți.',
  },
  {
    icon: Thermometer,
    name: 'Ladă frigorifică Heinner 198L',
    desc: 'Depozitare la temperatură controlată pentru carne și băuturi proaspete.',
  },
  {
    icon: Utensils,
    name: 'Cuțite profesionale F. Dick ProDynamic',
    desc: 'Set complet de cuțite profesionale germane pentru pregătire rapidă și precisă.',
  },
]

export default function EquipmentSection() {
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section id="echipament" className="bg-[#0d0d0d] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase mb-3">
            Cu ce lucrăm
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#f0ece4]"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Echipament profesional, gătit tradițional
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="group bg-[#1a1a1a] rounded-xl p-6 border border-transparent hover:border-[#c4882a]/40 hover:shadow-[0_0_24px_rgba(232,168,56,0.07)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-[60px] h-[60px] rounded-lg bg-[#0d0d0d] flex items-center justify-center mb-5 group-hover:shadow-[0_0_16px_rgba(232,168,56,0.15)] transition-shadow duration-300">
                  <Icon size={26} className="text-[#e8a838]" strokeWidth={1.5} />
                </div>
                <h3 className="text-[#f0ece4] font-semibold mb-2 leading-snug">
                  {item.name}
                </h3>
                <p className="text-[#7a7368] text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
