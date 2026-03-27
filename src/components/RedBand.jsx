import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function RedBand() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20])

  return (
    <div
      ref={ref}
      className="relative w-full py-16 md:py-24 bg-[#c41e3a] overflow-hidden"
      style={{ clipPath: 'polygon(0 8%, 100% 0%, 100% 92%, 0% 100%)' }}
    >
      <div className="flex items-center justify-center px-6">
        <motion.div style={{ y }} className="text-center">
          <p
            className="text-2xl md:text-5xl lg:text-6xl text-[#faf3e8] italic"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Tradiția care arde, gustul care rămâne.
          </p>
          <div className="w-20 h-px bg-[#faf3e8]/30 mx-auto mt-6" />
        </motion.div>
      </div>
    </div>
  )
}
