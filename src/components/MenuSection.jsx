import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { GlassWater, Droplets, Beer } from 'lucide-react'

const gratar = [
  { name: 'Mici tradițional (3 buc)',       price: 25, desc: 'Rețetă de familie, carne de vită și porc, pe cărbuni',   img: '[POZĂ: 3 mici pe grătar cu jar]' },
  { name: 'Ceafă de porc (200g)',            price: 30, desc: 'Ceafă marinată, gătită lent pe cărbuni',                 img: '[POZĂ: Felie de ceafă pe grătar]' },
  { name: 'Piept de pui (200g)',             price: 25, desc: 'Piept suculent, condimentat tradițional',                img: '[POZĂ: Piept de pui pe grătar]' },
  { name: 'Cârnăciori tradiționali (3 buc)', price: 20, desc: 'Condimente naturale, rețetă proprie',                    img: '[POZĂ: Cârnăciori rumeniți pe grătar]' },
]

const bauturi = [
  { icon: GlassWater, name: 'Cola / Fanta / Sprite', detail: '0.5L', price: 8 },
  { icon: Droplets,   name: 'Apă minerală / plată',  detail: '0.5L', price: 5 },
  { icon: Beer,       name: 'Bere Ciucaș / Timișoreana / Ciuc', detail: '0.33L', price: 10 },
]

const combouri = [
  { name: 'Oșanul',     price: 35, items: 'Mici (3 buc) · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Flăcăul',    price: 42, items: 'Ceafă la grătar · Cartofi prăjiți · Bere' },
  { name: 'Gospodina',  price: 38, items: 'Piept pui · Cartofi prăjiți · Suc 0.5L' },
  { name: 'Masa Mare',  price: 75, items: 'Mici (6 buc) · Ceafă · Cartofi x2 · 2 Beri', note: '2 persoane' },
]

function GratarCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden hover:border-[#e8a838]/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-400"
    >
      <div className="aspect-video flex items-center justify-center"
        style={{ background: 'linear-gradient(to bottom, rgba(120,60,0,0.1), black)' }}>
        <p className="text-[#7a7368] text-xs text-center px-4">{item.img}</p>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[#f0ece4] font-semibold text-lg leading-snug">{item.name}</span>
          <span className="text-[#e8a838] text-2xl shrink-0"
            style={{ fontFamily: '"DM Serif Display", serif' }}>{item.price} lei</span>
        </div>
        <p className="text-[#f0ece4]/50 text-sm mt-1">{item.desc}</p>
      </div>
    </motion.div>
  )
}

function ComboCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative border border-[#e8a838]/20 rounded-2xl p-6 hover:border-[#e8a838]/40 hover:shadow-[0_0_40px_rgba(232,168,56,0.15)] transition-all duration-300"
      style={{ background: 'linear-gradient(to bottom right, rgba(120,60,0,0.1), transparent)' }}
    >
      <span className="absolute top-4 right-4 bg-[#e8a838] text-black text-xs font-bold px-3 py-1 rounded-full">
        COMBO
      </span>
      <h3 className="text-2xl text-[#e8a838]" style={{ fontFamily: '"DM Serif Display", serif' }}>
        {item.name}
        {item.note && <span className="text-[#7a7368] text-sm ml-2" style={{ fontFamily: '"DM Sans", sans-serif' }}>({item.note})</span>}
      </h3>
      <p className="text-[#f0ece4]/60 text-sm mt-2 mb-4">{item.items}</p>
      <p className="text-3xl text-[#f0ece4]" style={{ fontFamily: '"DM Serif Display", serif' }}>
        {item.price} lei
      </p>
    </motion.div>
  )
}

export default function MenuSection() {
  const gratarRef  = useRef(null)
  const garniturRef = useRef(null)
  const bauturiRef = useRef(null)
  const comboRef   = useRef(null)

  const gratarInView  = useInView(gratarRef,  { once: true, margin: '-60px' })
  const garniturInView = useInView(garniturRef, { once: true, margin: '-60px' })
  const bauturiInView = useInView(bauturiRef, { once: true, margin: '-60px' })
  const comboInView   = useInView(comboRef,   { once: true, margin: '-60px' })

  return (
    <section id="meniu" className="relative py-32 px-6 bg-[#080808]">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[700px] h-[700px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,168,56,0.04) 0%, transparent 65%)' }} />
        </div>
        <div className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px),
              repeating-linear-gradient(90deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 60px)
            `,
          }} />
      </div>

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-px bg-[#e8a838]" />
            <span className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">Ce punem pe foc</span>
          </div>
          <h2 className="text-4xl md:text-5xl text-[#f0ece4] mb-3"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Meniul nostru
          </h2>
          <p className="text-sm text-[#7a7368]">Toate prețurile includ pâine tradițională și muștar</p>
        </div>

        {/* Grătar */}
        <div ref={gratarRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {gratar.map((item, i) => (
            <GratarCard key={item.name} item={item} index={i} inView={gratarInView} />
          ))}
        </div>

        {/* Garnitură — orizontal */}
        <motion.div
          ref={garniturRef}
          initial={{ opacity: 0, y: 24 }}
          animate={garniturInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="bg-white/[0.02] border border-white/[0.05] rounded-2xl overflow-hidden flex flex-col sm:flex-row hover:border-[#e8a838]/20 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-400 mb-16"
        >
          <div className="sm:w-2/5 aspect-video sm:aspect-auto flex items-center justify-center"
            style={{ background: 'linear-gradient(to bottom, rgba(120,60,0,0.1), black)' }}>
            <p className="text-[#7a7368] text-xs text-center px-4">[POZĂ: Cartofi prăjiți aurii]</p>
          </div>
          <div className="sm:w-3/5 p-6 flex flex-col justify-center">
            <p className="text-[#7a7368] text-xs uppercase tracking-widest mb-2">Garnitură</p>
            <div className="flex items-start justify-between gap-4">
              <span className="text-[#f0ece4] font-semibold text-lg">Cartofi prăjiți (porție)</span>
              <span className="text-[#e8a838] text-2xl shrink-0"
                style={{ fontFamily: '"DM Serif Display", serif' }}>15 lei</span>
            </div>
            <p className="text-[#f0ece4]/50 text-sm mt-1">Cartofi aurii, crocanți</p>
          </div>
        </motion.div>

        {/* Băuturi */}
        <div className="mb-16">
          <h3 className="text-[#f0ece4]/40 text-xs tracking-[0.25em] uppercase mb-6">— Băuturi —</h3>
          <div ref={bauturiRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {bauturi.map((b, i) => {
              const Icon = b.icon
              return (
                <motion.div
                  key={b.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={bauturiInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 text-center hover:border-[#e8a838]/20 transition-all duration-300"
                >
                  <Icon size={22} className="text-[#e8a838] mx-auto mb-3" strokeWidth={1.5} />
                  <p className="text-[#f0ece4] text-sm font-medium leading-snug">{b.name}</p>
                  <p className="text-[#7a7368] text-xs mt-1 mb-3">{b.detail}</p>
                  <p className="text-[#e8a838] font-bold">{b.price} lei</p>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Combo-uri */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-px bg-[#e8a838]" />
              <span className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">Mai mult, mai bine</span>
            </div>
            <h3 className="text-3xl text-[#f0ece4]"
              style={{ fontFamily: '"DM Serif Display", serif' }}>Combo-uri</h3>
          </div>
          <div ref={comboRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {combouri.map((item, i) => (
              <ComboCard key={item.name} item={item} index={i} inView={comboInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
