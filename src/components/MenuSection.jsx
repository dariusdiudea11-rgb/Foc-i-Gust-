import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const gratar = [
  {
    name: 'Mici tradițional (3 buc)',
    price: 25,
    desc: 'Rețetă de familie, carne de vită și porc, preparați pe cărbuni',
    img: '[POZĂ: 3 mici pe grătar cu urme de jar]',
  },
  {
    name: 'Ceafă de porc la grătar (200g)',
    price: 30,
    desc: 'Ceafă marinată, gătită lent pe cărbuni',
    img: '[POZĂ: Felie de ceafă pe grătar]',
  },
  {
    name: 'Piept de pui la grătar (200g)',
    price: 25,
    desc: 'Piept de pui suculent, condimentat tradițional',
    img: '[POZĂ: Piept de pui pe grătar]',
  },
  {
    name: 'Cârnăciori tradiționali (3 buc)',
    price: 20,
    desc: 'Cârnăciori cu condimente naturale, rețetă proprie',
    img: '[POZĂ: Cârnăciori pe grătar rumeniți]',
  },
]

const garnituri = [
  {
    name: 'Cartofi prăjiți (porție)',
    price: 15,
    desc: 'Cartofi aurii, crocanți',
    img: '[POZĂ: Cartofi prăjiți aurii]',
  },
]

const bauturi = [
  { name: 'Cola / Fanta / Sprite', detail: '0.5L', price: 8 },
  { name: 'Apă minerală / plată', detail: '0.5L', price: 5 },
  { name: 'Bere (Ciucaș / Timișoreana / Ciuc)', detail: 'sticlă 0.33L', price: 10 },
]

const combouri = [
  {
    name: 'Oșanul',
    price: 35,
    items: 'Mici (3 buc) · Cartofi prăjiți · Suc 0.5L',
  },
  {
    name: 'Flăcăul',
    price: 42,
    items: 'Ceafă la grătar · Cartofi prăjiți · Bere',
  },
  {
    name: 'Gospodina',
    price: 38,
    items: 'Piept pui la grătar · Cartofi prăjiți · Suc 0.5L',
  },
  {
    name: 'Masa Mare',
    price: 75,
    items: 'Mici (6 buc) · Ceafă · Cartofi x2 · 2 Beri',
    note: '2 persoane',
  },
]

function ProductCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="group bg-[#1a1a1a] rounded-xl overflow-hidden border border-transparent hover:border-[#c4882a] hover:shadow-[0_0_24px_rgba(232,168,56,0.08)] transition-all duration-300"
    >
      <div className="aspect-video bg-[#0d0d0d] flex items-center justify-center">
        <p className="text-[#7a7368] text-xs text-center px-4">{item.img}</p>
      </div>
      <div className="p-5">
        <h3 className="text-[#f0ece4] font-semibold mb-1">{item.name}</h3>
        <p className="text-[#7a7368] text-sm mb-4 leading-relaxed">{item.desc}</p>
        <p className="text-[#e8a838] text-xl font-bold text-right">{item.price} lei</p>
      </div>
    </motion.div>
  )
}

function DrinkCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
      className="bg-[#1a1a1a] rounded-xl p-4 border border-transparent hover:border-[#c4882a] transition-all duration-300 flex items-center justify-between gap-4"
    >
      <div>
        <p className="text-[#f0ece4] font-medium text-sm">{item.name}</p>
        <p className="text-[#7a7368] text-xs mt-0.5">{item.detail}</p>
      </div>
      <p className="text-[#e8a838] font-bold text-lg shrink-0">{item.price} lei</p>
    </motion.div>
  )
}

function ComboCard({ item, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      className="relative bg-[#1a1a1a] rounded-xl p-6 border border-[#e8a838]/30 hover:border-[#e8a838]/60 hover:shadow-[0_0_28px_rgba(232,168,56,0.1)] transition-all duration-300"
    >
      <span className="absolute top-4 right-4 text-[10px] font-bold tracking-widest text-[#0d0d0d] bg-[#e8a838] px-2 py-0.5 rounded-sm">
        COMBO
      </span>
      <h3
        className="text-[#e8a838] text-xl mb-1"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        {item.name}
        {item.note && (
          <span className="text-[#7a7368] text-sm ml-2 font-sans">({item.note})</span>
        )}
      </h3>
      <p className="text-[#7a7368] text-sm leading-relaxed mb-4">{item.items}</p>
      <p className="text-[#f0ece4] text-2xl font-bold">{item.price} lei</p>
    </motion.div>
  )
}

function SectionBlock({ children, title }) {
  return (
    <div className="mb-12">
      {title && (
        <h3
          className="text-[#f0ece4]/40 text-xs tracking-[0.25em] uppercase mb-6"
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}

export default function MenuSection() {
  const gratarRef = useRef(null)
  const garnituriBauturiRef = useRef(null)
  const combouriRef = useRef(null)

  const gratarInView = useInView(gratarRef, { once: true, margin: '-60px' })
  const gbInView = useInView(garnituriBauturiRef, { once: true, margin: '-60px' })
  const combouriInView = useInView(combouriRef, { once: true, margin: '-60px' })

  return (
    <section id="meniu" className="bg-[#111111] py-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase mb-3">
            Ce punem pe foc
          </p>
          <h2
            className="text-4xl text-[#f0ece4] mb-4"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Meniul nostru
          </h2>
          <p className="text-sm text-[#7a7368]">
            Toate prețurile includ pâine tradițională și muștar
          </p>
        </div>

        {/* Grătar */}
        <SectionBlock title="— Grătar —">
          <div ref={gratarRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {gratar.map((item, i) => (
              <ProductCard key={item.name} item={item} index={i} inView={gratarInView} />
            ))}
          </div>
        </SectionBlock>

        {/* Divider */}
        <div className="border-t border-[#2a2a2a] my-10" />

        {/* Garnituri + Băuturi */}
        <div ref={garnituriBauturiRef}>
          <SectionBlock title="— Garnituri —">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {garnituri.map((item, i) => (
                <ProductCard key={item.name} item={item} index={i} inView={gbInView} />
              ))}
            </div>
          </SectionBlock>

          <div className="border-t border-[#2a2a2a] my-10" />

          <SectionBlock title="— Băuturi —">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {bauturi.map((item, i) => (
                <DrinkCard key={item.name} item={item} index={i} inView={gbInView} />
              ))}
            </div>
          </SectionBlock>
        </div>

        {/* Divider */}
        <div className="border-t border-[#2a2a2a] my-12" />

        {/* Combouri */}
        <div>
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase mb-3">
              Mai mult, mai bine
            </p>
            <h2
              className="text-3xl text-[#f0ece4]"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Combo-uri
            </h2>
          </div>
          <div ref={combouriRef} className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {combouri.map((item, i) => (
              <ComboCard key={item.name} item={item} index={i} inView={combouriInView} />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
