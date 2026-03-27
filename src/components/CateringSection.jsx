import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const fieldClass =
  'w-full bg-transparent border-b border-white/10 focus:border-[#e8a838] text-[#f0ece4] placeholder:text-[#4a4a4a] py-3 text-sm outline-none transition-colors duration-200'

const empty = {
  nume: '', telefon: '', email: '', data: '',
  persoane: '', locatie: '', mesaj: '',
}

const bullets = [
  'Meniu personalizat, preț pe persoană',
  'Minim 20 persoane',
  'Răspundem în maxim 24h',
]

export default function CateringSection() {
  const [form, setForm] = useState(empty)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  function handle(e) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    alert('Mulțumim! Te contactăm în maxim 24h.')
    setForm(empty)
  }

  return (
    <section id="catering" className="relative py-32 px-6 bg-black overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(120,60,0,0.07) 0%, transparent 65%)' }} />
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

        {/* Left — col 5 */}
        <motion.div
          className="md:col-span-5 flex flex-col gap-7"
          initial={{ opacity: 0, x: -36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#e8a838]" />
            <span className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">Evenimente private</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl text-[#f0ece4] leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Grătar la evenimentul tău
          </h2>

          <p className="text-[#f0ece4]/70 text-lg leading-relaxed">
            Organizezi o petrecere, o nuntă, un botez? Venim cu tot echipamentul și
            pregătim la fața locului.
          </p>

          {/* Bullets */}
          <ul className="flex flex-col gap-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[#f0ece4]/80 text-sm">
                <CheckCircle size={16} className="text-[#e8a838] shrink-0" strokeWidth={1.5} />
                {b}
              </li>
            ))}
          </ul>

          {/* Image placeholder */}
          <div className="aspect-[4/3] bg-[#1a1a1a] rounded-2xl flex items-center justify-center border border-white/[0.05] mt-2">
            <p className="text-[#7a7368] text-xs text-center px-6 leading-relaxed">
              [POZĂ: Setup catering la eveniment privat]
            </p>
          </div>
        </motion.div>

        {/* Right — form col 7 */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, x: 36 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        >
          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-2xl text-[#f0ece4] mb-8"
              style={{ fontFamily: '"DM Serif Display", serif' }}>
              Trimite o cerere
            </h3>

            <form onSubmit={submit} className="flex flex-col gap-6">

              {/* Nume + Telefon */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="nume" value={form.nume} onChange={handle}
                  placeholder="Nume" required className={fieldClass} />
                <input name="telefon" type="tel" value={form.telefon} onChange={handle}
                  placeholder="Telefon" required className={fieldClass} />
              </div>

              {/* Email + Data */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <input name="email" type="email" value={form.email} onChange={handle}
                  placeholder="Email" required className={fieldClass} />
                <input name="data" type="date" value={form.data} onChange={handle}
                  required className={fieldClass} />
              </div>

              {/* Nr persoane */}
              <div className="relative">
                <select name="persoane" value={form.persoane} onChange={handle}
                  required
                  className={fieldClass + ' appearance-none cursor-pointer'}>
                  <option value="" disabled>Număr persoane</option>
                  <option value="20-30">20 – 30 persoane</option>
                  <option value="30-50">30 – 50 persoane</option>
                  <option value="50-100">50 – 100 persoane</option>
                  <option value="100+">100+ persoane</option>
                </select>
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7368] pointer-events-none text-xs">▾</span>
              </div>

              {/* Locatie */}
              <input name="locatie" value={form.locatie} onChange={handle}
                placeholder="Locație eveniment" required className={fieldClass} />

              {/* Mesaj */}
              <textarea name="mesaj" value={form.mesaj} onChange={handle}
                placeholder="Mesaj / cerințe speciale" rows={3}
                className={fieldClass + ' resize-none'} />

              <button type="submit"
                className="mt-2 w-full bg-[#e8a838] text-black font-bold py-4 rounded-full text-sm uppercase tracking-wider hover:bg-[#f5c563] hover:shadow-[0_0_30px_rgba(232,168,56,0.3)] transition-all duration-300">
                Trimite cererea →
              </button>
            </form>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
