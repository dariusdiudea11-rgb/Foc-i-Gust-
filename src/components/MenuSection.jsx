import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { GlassWater, Droplets, Beer, Flame } from 'lucide-react'

const gratar = [
  { name: 'Mici tradițional (3 buc)',       price: 18, desc: '3 × 90g — rețetă de familie, vită și porc, pe cărbuni',    accent: 'from-[#8E1F1B]/20 to-[#C2611E]/10', img: 'https://images.pexels.com/photos/6025/pexels-photo-6025.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Ceafă de porc (150g)',            price: 14, desc: 'Ceafă marinată, gătită lent pe cărbuni',                   accent: 'from-[#6F1714]/20 to-[#8E1F1B]/10', img: 'https://images.pexels.com/photos/3997609/pexels-photo-3997609.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Piept de pui (150g)',             price: 16, desc: 'Piept suculent, condimentat tradițional',                  accent: 'from-[#8E1F1B]/15 to-[#D56E34]/10', img: 'https://images.pexels.com/photos/262945/pexels-photo-262945.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Cârnăciori tradiționali (3 buc)', price: 27, desc: '3 × 65g — condimente naturale, rețetă proprie',            accent: 'from-[#D56E34]/20 to-[#6F1714]/10', img: 'https://images.pexels.com/photos/1857730/pexels-photo-1857730.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { name: 'Aripioare la grătar (3 buc)',     price: 17, desc: '~330g — marinate în condimente de casă, pe jar',           accent: 'from-[#8E1F1B]/20 to-[#D56E34]/10', img: null },
]

const bauturi = [
  { icon: GlassWater, name: 'Cola / Fanta / Sprite', detail: '0.5L',  price: 10 },
  { icon: Droplets,   name: 'Apă Borsec',            detail: '0.5L',  price: 7  },
  { icon: Beer,       name: 'Ciucaș',                detail: '0.33L', price: 8  },
  { icon: Beer,       name: 'Timișoreana',            detail: '0.33L', price: 9  },
]

const combouri = [
  { name: 'Oșanul',    price: 32, items: 'Mici (3 buc) · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Flăcăul',   price: 27, items: 'Ceafă la grătar · Cartofi prăjiți · Bere' },
  { name: 'Gospodina', price: 30, items: 'Piept pui · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Masa Mare', price: 70, items: 'Mici (6 buc) · Ceafă · Cartofi x2 · 2 Beri', note: '2 persoane' },
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

function GratarCard({ item, index, inView }) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-[#FDFBF6]/80 border border-[#2E2A24]/5 rounded-2xl overflow-hidden hover:border-[#8E1F1B]/20 hover:shadow-[0_24px_48px_rgba(46,42,36,0.10)] transition-all duration-400 cursor-default">
      {/* Image */}
      <div className={`aspect-video overflow-hidden relative bg-gradient-to-br ${item.accent}`}>
        {item.img ? (
          <img
            src={item.img}
            alt={item.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
            <Flame size={36} className="text-[#8E1F1B]/30" strokeWidth={1}/>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"/>
      </div>
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-start justify-between gap-4">
          <span className="text-[#2E2A24] font-semibold text-lg leading-snug">{item.name}</span>
          <span
            className="text-[#8E1F1B] text-2xl shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontFamily: '"Bitter", serif' }}
          >{item.price} lei</span>
        </div>
        <p className="text-[#2E2A24]/40 text-sm mt-1">{item.desc}</p>
      </div>
    </motion.div>
  )
}

function ComboCard({ item, index, inView }) {
  const { rotateX, rotateY, handleMouseMove, handleMouseLeave } = use3DTilt()

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative border border-[#8E1F1B]/15 rounded-2xl p-6 hover:border-[#8E1F1B]/40 hover:shadow-[0_0_40px_rgba(142,31,27,0.12)] transition-all duration-300 bg-[#8E1F1B]/5 cursor-default">
      <span className="absolute top-4 right-4 bg-[#8E1F1B] text-white text-xs font-bold px-3 py-1 rounded-full">
        COMBO
      </span>
      <h3 className="text-2xl text-[#8E1F1B]" style={{ fontFamily: '"Bitter", serif', transform: 'translateZ(16px)' }}>
        {item.name}
        {item.note && <span className="text-[#6E6357] text-sm ml-2" style={{ fontFamily: '"Hanken Grotesk", sans-serif' }}>({item.note})</span>}
      </h3>
      <p className="text-[#2E2A24]/60 text-sm mt-2 mb-4">{item.items}</p>
      <p className="text-3xl text-[#2E2A24]" style={{ fontFamily: '"Bitter", serif' }}>
        {item.price} lei
      </p>
    </motion.div>
  )
}

export default function MenuSection() {
  const gratarRef   = useRef(null)
  const garniturRef = useRef(null)
  const bauturiRef  = useRef(null)
  const comboRef    = useRef(null)

  const gratarInView   = useInView(gratarRef,   { once: true, margin: '-60px' })
  const garniturInView = useInView(garniturRef, { once: true, margin: '-60px' })
  const bauturiInView  = useInView(bauturiRef,  { once: true, margin: '-60px' })
  const comboInView    = useInView(comboRef,    { once: true, margin: '-60px' })

  return (
    <section id="meniu" className="relative py-32 px-6 bg-[#F5EFE3]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(142,31,27,0.04) 0%, transparent 65%)' }}/>
        </div>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(46,42,36,0.025) 0px, rgba(46,42,36,0.025) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(46,42,36,0.025) 0px, rgba(46,42,36,0.025) 1px, transparent 1px, transparent 60px)
            `,
          }}/>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#8E1F1B]"/>
            <span className="text-xs tracking-[0.3em] text-[#8E1F1B] uppercase">Ce punem pe foc</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#2E2A24] mb-3"
            style={{ fontFamily: '"Bitter", serif' }}>Meniul nostru</h2>
          <p className="text-sm text-[#6E6357]">Toate prețurile includ pâine tradițională și muștar</p>
        </div>

        {/* Grătar */}
        <div ref={gratarRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" style={{ perspective: '1000px' }}>
          {gratar.map((item, i) => (
            <GratarCard key={item.name} item={item} index={i} inView={gratarInView}/>
          ))}
        </div>

        {/* Garnitură */}
        <motion.div ref={garniturRef}
          initial={{ opacity: 0, y: 24 }} animate={garniturInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-[#FDFBF6]/80 border border-[#2E2A24]/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-[#8E1F1B]/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(46,42,36,0.08)] transition-all duration-400 mb-16">
          <div className="sm:w-2/5 aspect-video sm:aspect-auto overflow-hidden relative bg-gradient-to-br from-[#D56E34]/15 to-[#8E1F1B]/8">
            <img
              src="https://images.pexels.com/photos/2962450/pexels-photo-2962450.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="Cartofi prăjiți"
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="sm:w-3/5 p-6 flex flex-col justify-center">
            <p className="text-[#6E6357] text-xs uppercase tracking-widest mb-2">Garnitură</p>
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#2E2A24] font-semibold text-lg">Cartofi pai (200g)</span>
              <span className="text-[#8E1F1B] text-2xl shrink-0"
                style={{ fontFamily: '"Bitter", serif' }}>10 lei</span>
            </div>
            <p className="text-[#2E2A24]/40 text-sm mt-1">Cartofi aurii, crocanți</p>
          </div>
        </motion.div>

        {/* Băuturi */}
        <div className="mb-16">
          <h3 className="text-[#2E2A24]/30 text-xs tracking-[0.25em] uppercase mb-6">— Băuturi —</h3>
          <div ref={bauturiRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bauturi.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div key={b.name}
                  initial={{ opacity: 0, y: 20 }} animate={bauturiInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#2E2A24]/5 border border-[#2E2A24]/5 rounded-xl p-5 text-center hover:border-[#8E1F1B]/20 hover:-translate-y-1 transition-all duration-300">
                  <Icon size={22} className="text-[#8E1F1B] mx-auto mb-3" strokeWidth={1.5}/>
                  <p className="text-[#2E2A24] text-sm font-medium leading-snug">{b.name}</p>
                  <p className="text-[#6E6357] text-xs mt-1 mb-3">{b.detail}</p>
                  <p className="text-[#8E1F1B] font-bold">{b.price} lei</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Combo-uri */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-px bg-[#8E1F1B]"/>
              <span className="text-xs tracking-[0.3em] text-[#8E1F1B] uppercase">Mai mult, mai bine</span>
            </div>
            <h3 className="text-3xl text-[#2E2A24]"
              style={{ fontFamily: '"Bitter", serif' }}>Combo-uri</h3>
          </div>
          <div ref={comboRef} className="grid grid-cols-1 md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
            {combouri.map((item, i) => (
              <ComboCard key={item.name} item={item} index={i} inView={comboInView}/>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
