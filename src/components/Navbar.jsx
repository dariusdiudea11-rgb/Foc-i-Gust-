import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import emblem from '../assets/brand/emblem.png'

const links = [
  { label: 'Meniu',    id: 'meniu' },
  { label: 'Catering', id: 'catering' },
  { label: 'Contact',    id: 'contact' },
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const reducedMotion = useReducedMotion()

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
        className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left bg-[#8E1F1B]"
        style={{ scaleX }}
      />

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#F5EFE3]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(46,42,36,0.05)]' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8E1F1B] focus-visible:ring-offset-2 rounded-sm">
            <motion.img
              src={emblem}
              alt=""
              aria-hidden="true"
              className="w-9 h-9 object-contain"
              animate={reducedMotion ? {} : { rotate: [0, -3, 3, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}/>
            <span className="text-2xl" style={{ fontFamily: '"Bitter", serif' }}>
              <span className="text-[#8E1F1B]">Foc </span>
              <span className="text-[#2E2A24]">și Gust</span>
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <button key={link.id} onClick={() => scrollTo(link.id)}
                className="relative text-sm tracking-wider uppercase text-[#2E2A24]/60 hover:text-[#8E1F1B] transition-colors duration-300 group py-1 focus-visible:outline-none focus-visible:text-[#8E1F1B]">
                {link.label}
                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#8E1F1B] group-hover:w-full group-focus-visible:w-full transition-all duration-300"/>
              </button>
            ))}
          </div>

          <button className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen(o => !o)} aria-label="Meniu">
            <span className={`block h-px w-6 bg-[#2E2A24] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}/>
            <span className={`block h-px w-6 bg-[#2E2A24] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}/>
            <span className={`block h-px w-6 bg-[#2E2A24] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}/>
          </button>
        </div>
        <div className="h-px w-full opacity-30"
          style={{ background: 'linear-gradient(to right, transparent, #8E1F1B, transparent)' }}/>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed inset-0 z-40 bg-[#2E2A24]/97 backdrop-blur-2xl flex flex-col items-center justify-center gap-2">
            {links.map((link, i) => (
              <motion.button key={link.id}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }} transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                className="text-4xl text-[#F5EFE3] hover:text-[#8E1F1B] transition-colors duration-300 py-3 px-8"
                style={{ fontFamily: '"Bitter", serif' }}>
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
