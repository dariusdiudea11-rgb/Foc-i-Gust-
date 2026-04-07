import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { GlassWater, Droplets, Beer } from 'lucide-react'

const gratar = [
  { name: 'Mici tradițional (3 buc)',       price: 25, desc: 'Rețetă de familie, carne de vită și porc, pe cărbuni',   img: '[POZĂ: 3 mici pe grătar cu jar]' },
  { name: 'Ceafă de porc (200g)',            price: 30, desc: 'Ceafă marinată, gătită lent pe cărbuni',                 img: '[POZĂ: Felie de ceafă pe grătar]' },
  { name: 'Piept de pui (200g)',             price: 25, desc: 'Piept suculent, condimentat tradițional',                img: '[POZĂ: Piept de pui pe grătar]' },
  { name: 'Cârnăciori tradiționali (3 buc)', price: 20, desc: 'Condimente naturale, rețetă proprie',                    img: '[POZĂ: Cârnăciori rumeniți pe grătar]' },
]

const bauturi = [
  { icon: GlassWater, name: 'Cola / Fanta / Sprite',               detail: '0.5L',  price: 8 },
  { icon: Droplets,   name: 'Apă minerală / plată',                detail: '0.5L',  price: 5 },
  { icon: Beer,       name: 'Bere Ciucaș / Timișoreana / Ciuc',    detail: '0.33L', price: 10 },
]

const combouri = [
  { name: 'Oșanul',    price: 35, items: 'Mici (3 buc) · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Flăcăul',   price: 42, items: 'Ceafă la grătar · Cartofi prăjiți · Bere' },
  { name: 'Gospodina', price: 38, items: 'Piept pui · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Masa Mare', price: 75, items: 'Mici (6 buc) · Ceafă · Cartofi x2 · 2 Beri', note: '2 persoane' },
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
      className="group bg-white/80 border border-[#1a1520]/5 rounded-2xl overflow-hidden hover:border-[#c41e3a]/20 hover:shadow-[0_24px_48px_rgba(26,21,32,0.10)] transition-all duration-400 cursor-default">
      {/* Image */}
      <div className="aspect-video overflow-hidden relative bg-[#1a1520]/5">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-110">
          <p className="text-[#8a7e6d] text-xs text-center px-4">{item.img}</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"/>
      </div>
      <div className="p-6" style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-start justify-between gap-4">
          <span className="text-[#1a1520] font-semibold text-lg leading-snug">{item.name}</span>
          <span
            className="text-[#c41e3a] text-2xl shrink-0 transition-transform duration-300 group-hover:translate-x-1"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >{item.price} lei</span>
        </div>
        <p className="text-[#1a1520]/40 text-sm mt-1">{item.desc}</p>
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
      className="relative border border-[#c41e3a]/15 rounded-2xl p-6 hover:border-[#c41e3a]/40 hover:shadow-[0_0_40px_rgba(196,30,58,0.12)] transition-all duration-300 bg-[#c41e3a]/5 cursor-default">
      <span className="absolute top-4 right-4 bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full">
        COMBO
      </span>
      <h3 className="text-2xl text-[#c41e3a]" style={{ fontFamily: '"DM Serif Display", serif', transform: 'translateZ(16px)' }}>
        {item.name}
        {item.note && <span className="text-[#8a7e6d] text-sm ml-2" style={{ fontFamily: '"DM Sans", sans-serif' }}>({item.note})</span>}
      </h3>
      <p className="text-[#1a1520]/60 text-sm mt-2 mb-4">{item.items}</p>
      <p style={{ fontFamily: '"DM Serif Display", serif', fontSize: '30px', margin: 0, background: 'linear-gradient(90deg, #c41e3a, #e63950, #27ae60)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
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
    <section id="meniu" className="relative py-32 px-6 bg-[#faf3e8]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(196,30,58,0.04) 0%, transparent 65%)' }}/>
        </div>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(26,21,32,0.025) 0px, rgba(26,21,32,0.025) 1px, transparent 1px, transparent 60px)
            `,
          }}/>
      </div>

      <div className="relative max-w-5xl mx-auto">
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Ce punem pe foc</span>
          </div>
          <h2 className="text-[#1a1520] mb-8"
            style={{ fontFamily: '"DM Serif Display", serif', fontSize: 'clamp(40px, 6vw, 72px)', letterSpacing: '-1px' }}>Meniul nostru</h2>
          <p className="text-sm text-[#8a7e6d]">Toate prețurile includ pâine tradițională și muștar</p>
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
          className="bg-white/80 border border-[#1a1520]/5 rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-[#c41e3a]/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(26,21,32,0.08)] transition-all duration-400 mb-16">
          <div className="sm:w-2/5 aspect-video sm:aspect-auto flex items-center justify-center bg-[#1a1520]/5">
            <p className="text-[#8a7e6d] text-xs text-center px-4">[POZĂ: Cartofi prăjiți aurii]</p>
          </div>
          <div className="sm:w-3/5 p-6 flex flex-col justify-center">
            <p className="text-[#8a7e6d] text-xs uppercase tracking-widest mb-2">Garnitură</p>
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#1a1520] font-semibold text-lg">Cartofi prăjiți (porție)</span>
              <span className="text-[#c41e3a] text-2xl shrink-0"
                style={{ fontFamily: '"DM Serif Display", serif' }}>15 lei</span>
            </div>
            <p className="text-[#1a1520]/40 text-sm mt-1">Cartofi aurii, crocanți</p>
          </div>
        </motion.div>

        {/* Băuturi */}
        <div className="mb-16">
          <h3 className="text-[#1a1520]/30 text-xs tracking-[0.25em] uppercase mb-6">— Băuturi —</h3>
          <div ref={bauturiRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bauturi.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div key={b.name}
                  initial={{ opacity: 0, y: 20 }} animate={bauturiInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-[#1a1520]/5 border border-[#1a1520]/5 rounded-xl p-5 text-center hover:border-[#c41e3a]/20 hover:-translate-y-1 transition-all duration-300">
                  <Icon size={22} className="text-[#c41e3a] mx-auto mb-3" strokeWidth={1.5}/>
                  <p className="text-[#1a1520] text-sm font-medium leading-snug">{b.name}</p>
                  <p className="text-[#8a7e6d] text-xs mt-1 mb-3">{b.detail}</p>
                  <p className="text-[#c41e3a] font-bold">{b.price} lei</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Combo-uri */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-px bg-[#c41e3a]"/>
              <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Mai mult, mai bine</span>
            </div>
            <h3 className="text-3xl text-[#1a1520]"
              style={{ fontFamily: '"DM Serif Display", serif' }}>Combo-uri</h3>
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
