import { useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const inputClass =
  'w-full bg-[#0d0d0d] border border-[#3a3a3a] rounded-lg px-4 py-3 text-[#f0ece4] text-sm placeholder:text-[#4a4a4a] focus:outline-none focus:border-[#e8a838] transition-colors duration-200'

const empty = {
  nume: '', telefon: '', email: '', data: '',
  persoane: '', locatie: '', mesaj: '',
}

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
    <section id="catering" className="bg-[#0d0d0d] py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase mb-3">
            Grătar la evenimentul tău
          </p>
          <h2
            className="text-3xl md:text-4xl text-[#f0ece4]"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Catering tradițional
          </h2>
        </div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-6"
          >
            <p className="text-[#f0ece4]/80 leading-relaxed text-[1.05rem]">
              Organizezi o petrecere, o nuntă, un botez sau un eveniment privat? Venim cu tot
              echipamentul și pregătim la fața locului. Meniu personalizat, preț pe persoană.
            </p>
            <p className="text-[#7a7368] text-sm">
              Minim 20 persoane. Răspundem în maxim 24h.
            </p>

            {/* Image placeholder */}
            <div className="aspect-[4/3] bg-[#1a1a1a] rounded-xl flex items-center justify-center border border-[#2a2a2a] mt-2">
              <p className="text-[#7a7368] text-xs text-center px-6 leading-relaxed">
                [POZĂ: Setup complet la un eveniment privat, cort, grătare, masă servire]
              </p>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
            className="bg-[#1a1a1a] rounded-xl p-8 border border-[#2a2a2a]"
          >
            <form onSubmit={submit} className="flex flex-col gap-4">
              <input
                name="nume"
                value={form.nume}
                onChange={handle}
                placeholder="Nume"
                required
                className={inputClass}
              />
              <input
                name="telefon"
                type="tel"
                value={form.telefon}
                onChange={handle}
                placeholder="Telefon"
                required
                className={inputClass}
              />
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                placeholder="Email"
                required
                className={inputClass}
              />
              <input
                name="data"
                type="date"
                value={form.data}
                onChange={handle}
                required
                className={inputClass}
              />
              <select
                name="persoane"
                value={form.persoane}
                onChange={handle}
                required
                className={inputClass}
              >
                <option value="" disabled>Număr persoane</option>
                <option value="20-30">20 – 30 persoane</option>
                <option value="30-50">30 – 50 persoane</option>
                <option value="50-100">50 – 100 persoane</option>
                <option value="100+">100+ persoane</option>
              </select>
              <input
                name="locatie"
                value={form.locatie}
                onChange={handle}
                placeholder="Locație eveniment"
                required
                className={inputClass}
              />
              <textarea
                name="mesaj"
                value={form.mesaj}
                onChange={handle}
                placeholder="Mesaj / cerințe speciale"
                rows={4}
                className={inputClass + ' resize-none'}
              />
              <button
                type="submit"
                className="w-full bg-[#e8a838] text-[#0d0d0d] font-bold py-3 rounded-lg hover:bg-[#f5c563] hover:shadow-[0_0_20px_rgba(232,168,56,0.3)] transition-all duration-200 mt-2"
              >
                Trimite cererea
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
