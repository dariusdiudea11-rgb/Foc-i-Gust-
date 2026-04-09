import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, Flame } from 'lucide-react'
import StaggerText from './ui/StaggerText'

const fieldClass =
  'w-full bg-transparent border-b border-white/10 focus:border-[#c41e3a] text-[#faf3e8] placeholder:text-[#7a7080] py-3 text-sm outline-none transition-colors duration-200'

const empty = { nume: '', telefon: '', email: '', data: '', persoane: '', locatie: '', mesaj: '' }

const bullets = [
  'Meniu personalizat, preț pe persoană',
  'Minim 20 persoane',
  'Răspundem în maxim 24h',
]

export default function CateringSection() {
  const [form, setForm] = useState(empty)
  const [submitted, setSubmitted] = useState(false)
  const ref    = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30])

  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => { setSubmitted(false); setForm(empty) }, 6000)
  }

  return (
    <section id="catering" className="relative py-32 px-6 bg-[#1a1520] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(ellipse at bottom left, rgba(196,30,58,0.06) 0%, transparent 65%)' }}/>
      </div>

      <div ref={ref} className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">

        <motion.div className="md:col-span-5 flex flex-col gap-7"
          initial={{ opacity: 0, x: -36 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-px bg-[#c41e3a]"/>
            <span className="text-xs tracking-[0.3em] text-[#c41e3a] uppercase">Evenimente private</span>
          </div>
          <h2 className="text-3xl md:text-4xl text-[#faf3e8] leading-tight"
            style={{ fontFamily: '"DM Serif Display", serif' }}>
            Grătar la evenimentul tău
          </h2>
          <p className="text-[#faf3e8]/70 text-lg leading-relaxed">
            Organizezi o petrecere, o nuntă, un botez? Venim cu tot echipamentul și pregătim la fața locului.
          </p>
          <ul className="flex flex-col gap-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[#faf3e8]/80 text-sm">
                <CheckCircle size={16} className="text-[#c41e3a] shrink-0" strokeWidth={1.5}/>
                {b}
              </li>
            ))}
          </ul>
          <div ref={imgRef} className="aspect-[4/3] bg-gradient-to-br from-[#c41e3a]/15 to-[#231e2a] rounded-2xl overflow-hidden border border-white/[0.05] mt-2 relative">
            <motion.div style={{ y: imgY }} className="absolute inset-0 flex items-center justify-center">
              <Flame size={48} className="text-[#c41e3a]/25" strokeWidth={0.8}/>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="md:col-span-7"
          initial={{ opacity: 0, x: 36 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="flex-1 flex flex-col items-center justify-center gap-6 text-center py-8">
                  <motion.div
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 20 }}>
                    <CheckCircle size={56} className="text-[#c41e3a]" strokeWidth={1.2}/>
                  </motion.div>
                  <div>
                    <h3 className="text-2xl text-[#faf3e8] mb-3"
                      style={{ fontFamily: '"DM Serif Display", serif' }}>Cererea a fost trimisă!</h3>
                    <p className="text-[#faf3e8]/60 text-sm leading-relaxed max-w-xs mx-auto">
                      Mulțumim! Te contactăm în maxim 24 de ore pentru a discuta detaliile evenimentului.
                    </p>
                  </div>
                  <div className="w-12 h-px bg-[#c41e3a]/40"/>
                  <p className="text-[#faf3e8]/30 text-xs">Negrești-Oaș · Țara Oașului</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }} className="flex flex-col gap-6">
                  <h3 className="text-2xl text-[#faf3e8]"
                    style={{ fontFamily: '"DM Serif Display", serif' }}>Trimite o cerere</h3>
                  <form onSubmit={submit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input name="nume" value={form.nume} onChange={handle} placeholder="Nume" aria-label="Nume" required className={fieldClass}/>
                      <input name="telefon" type="tel" value={form.telefon} onChange={handle} placeholder="Telefon" aria-label="Telefon" required className={fieldClass}/>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <input name="email" type="email" value={form.email} onChange={handle} placeholder="Email" aria-label="Email" required className={fieldClass}/>
                      <input name="data" type="date" value={form.data} onChange={handle} aria-label="Data evenimentului" required className={fieldClass}/>
                    </div>
                    <div className="relative">
                      <select name="persoane" value={form.persoane} onChange={handle} aria-label="Număr persoane" required
                        className={fieldClass + ' appearance-none cursor-pointer'}>
                        <option value="" disabled>Număr persoane</option>
                        <option value="20-30">20 – 30 persoane</option>
                        <option value="30-50">30 – 50 persoane</option>
                        <option value="50-100">50 – 100 persoane</option>
                        <option value="100+">100+ persoane</option>
                      </select>
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7a7080] pointer-events-none text-xs">▾</span>
                    </div>
                    <input name="locatie" value={form.locatie} onChange={handle} placeholder="Locație eveniment" aria-label="Locație eveniment" required className={fieldClass}/>
                    <textarea name="mesaj" value={form.mesaj} onChange={handle} placeholder="Mesaj / cerințe speciale" aria-label="Mesaj sau cerințe speciale" rows={3} className={fieldClass + ' resize-none'}/>
                    <button type="submit"
                      className="btn-stagger mt-2 w-full bg-[#c41e3a] text-white font-bold py-4 rounded-full text-sm uppercase tracking-wider hover:bg-[#9a1730] hover:shadow-[0_0_30px_rgba(196,30,58,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c41e3a] transition-all duration-300">
                      <StaggerText text="Trimite cererea →" />
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
