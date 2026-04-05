import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Flame, CookingPot, Zap, Tent, Thermometer, Utensils } from 'lucide-react'

const items = [
  { icon: Flame,       name: 'Grătar Weber Master-Touch 67cm (×2)',      desc: 'Două grătare pe cărbuni, email porțelanat, garanție 10 ani.' },
  { icon: CookingPot,  name: 'Friteză profesională dublă Popcat HGF-972', desc: 'Două cuve independente de 8 litri.' },
  { icon: Zap,         name: 'Generator inverter K&S KS 3300i',           desc: 'Generator silențios 3000W.' },
  { icon: Tent,        name: 'Cort profesional Expodom 3×6m',             desc: 'Impermeabil, oțel, pereți laterali.' },
  { icon: Thermometer, name: 'Ladă frigorifică Heinner 198L',             desc: 'Temperatură controlată, carne și băuturi.' },
  { icon: Utensils,    name: 'Cuțite profesionale F. Dick ProDynamic',    desc: 'Set profesional german.' },
]

function use3DTilt() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-60, 60], [8, -8]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(x, [-60, 60], [-8, 8]), { stiffness: 300, damping: 25 })

  const handleMouseMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }, [x, y])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return { rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

function EquipCard({ item, index, inView }) {
  const Icon = item.icon
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl p-8 hover:border-[#c41e3a]/25 hover:bg-white/[0.07] hover:shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all duration-500 cursor-default">
      <motion.div style={{ transform: 'translateZ(24px)' }}>
        <Icon size={48} className="text-[#c41e3a] mb-4 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2}/>
      </motion.div>
      <div className="w-12 h-0.5 bg-[#c41e3a]/50 mb-6"/>
      <h3 className="text-[#faf3e8] font-bold text-lg leading-snug mb-3" style={{ transform: 'translateZ(12px)' }}>{item.name}</h3>
      <p className="text-[#faf3e8]/50 text-sm leading-relaxed">{item.desc}</p>
    </motion.div>
  )
}

export default function EquipmentSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="echipament" className="relative py-32 px-6 bg-[#1a1520]">
      {/* Subtle red glow top right */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(196,30,58,0.07) 0%, transparent 65%)' }}/>

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

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
          {items.map((item, i) => (
            <EquipCard key={item.name} item={item} index={i} inView={inView}/>
          ))}
        </div>
      </div>
    </section>
  )
}
