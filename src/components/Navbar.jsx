import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const links = [
  { label: 'Acasă',      id: 'hero' },
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

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#0d0d0d]/95 backdrop-blur-sm border-b border-[#1a1a1a]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="font-display text-xl text-[#e8a838] tracking-wide hover:text-[#f5c563] transition-colors"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Foc și Gust
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm text-[#7a7368] hover:text-[#f0ece4] transition-colors rounded-md hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-[#e8a838] p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Deschide meniu"
          >
            <Menu size={22} />
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-[#0d0d0d]/98 flex flex-col items-center justify-center"
          >
            <button
              className="absolute top-5 right-6 text-[#7a7368] hover:text-[#e8a838] transition-colors"
              onClick={() => setMenuOpen(false)}
              aria-label="Închide meniu"
            >
              <X size={28} />
            </button>

            <div className="flex flex-col items-center gap-8">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => { scrollTo(link.id); setMenuOpen(false) }}
                  className="text-2xl text-[#f0ece4] hover:text-[#e8a838] transition-colors"
                  style={{ fontFamily: '"DM Serif Display", serif' }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
