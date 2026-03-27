import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isPointer, setIsPointer] = useState(false)
  const [visible, setVisible] = useState(false)
  const rawX = useMotionValue(-100)
  const rawY = useMotionValue(-100)

  const x = useSpring(rawX, { stiffness: 500, damping: 40, mass: 0.3 })
  const y = useSpring(rawY, { stiffness: 500, damping: 40, mass: 0.3 })

  useEffect(() => {
    // Only activate on pointer:fine (desktop) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      setVisible(true)
    }

    const onOver = (e) => {
      const el = e.target.closest('button, a, [data-cursor="pointer"], input, select, textarea')
      setIsPointer(!!el)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
    }
  }, [rawX, rawY])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null
  }

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none hidden md:block"
      style={{
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        opacity: visible ? 1 : 0,
      }}
    >
      <motion.div
        animate={{
          width: isPointer ? 40 : 20,
          height: isPointer ? 40 : 20,
          backgroundColor: isPointer ? 'rgba(196,30,58,0.12)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        className="rounded-full border-2 border-[#c41e3a]"
      />
    </motion.div>
  )
}
