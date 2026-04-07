import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'

const links = [
  { label: 'Meniu',      id: 'meniu' },
  { label: 'Echipament', id: 'echipament' },
  { label: 'Calendar',   id: 'calendar' },
  { label: 'Catering',   id: 'catering' },
  { label: 'Contact',    id: 'contact' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

function FlameIcon() {
  return (
    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 0C7 0 11 4.5 11 8C11 8 9.5 7 8.5 6C8.5 6 10 9 8 11.5C8 11.5 8 9.5 6.5 8.5C6.5 8.5 7.5 12 5 14C5 14 5.5 11 4 10.5C4 10.5 2 13 3.5 16C3.5 16 1 14.5 1 11.5C1 8.5 3 7 3 7C3 7 2.5 10 4 10.5C4 10.5 3 6.5 7 0Z"
        fill="#c41e3a"/>
      <path d="M7 13C7 13 8.5 14.5 8.5 16C8.5 17.5 7.5 19 6.5 19.5C6.5 19.5 7 18 6 17C6 17 5 18.5 5.5 19.5C5.5 19.5 4 18.5 4 16.5C4 14.5 5.5 13.5 7 13Z"
        fill="#e63950"/>
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#c41e3a]"
        style={{ scaleX }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#faf3e8]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(26,21,32,0.05)]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group">
            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
              <FlameIcon />
            </motion.div>
            <span className="text-2xl" style={{ fontFamily: '"DM Serif Display", serif' }}>
              <span className="text-[#c41e3a]">Foc </span>
              <span className="text-[#1a1520]">și Gust</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="relative text-sm tracking-wider uppercase text-[#1a1520]/60 hover:text-[#c41e3a] transition-colors duration-300 group py-1">
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#c41e3a] group-hover:w-full transition-all duration-300"/>
              </button>
            ))}
          </div>

          <button className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(o => !o)} aria-label="Meniu" aria-expanded={menuOpen}>
            <span className={`block h-px w-6 bg-[#1a1520] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
            <span className={`block h-px w-6 bg-[#1a1520] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
            <span className={`block h-px w-6 bg-[#1a1520] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
          </button>
        </div>
        <div className="h-px w-full opacity-30"
          style={{ background: 'linear-gradient(to right, transparent, #c41e3a, transparent)' }}/>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#1a1520]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-2">
            {links.map((link, i) => (
              <motion.button key={link.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }} transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                className="text-4xl text-[#faf3e8] hover:text-[#c41e3a] transition-colors duration-300 py-3 px-8"
                style={{ fontFamily: '"DM Serif Display", serif' }}>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
