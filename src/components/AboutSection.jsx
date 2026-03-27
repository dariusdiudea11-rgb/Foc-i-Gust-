import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

function OasSeparator() {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[200px] opacity-20 mx-auto mt-16"
      aria-hidden="true"
    >
      {[0, 32, 64, 96, 128, 160].map((x) => (
        <g key={x} transform={`translate(${x}, 0)`}>
          <path d="M16 1 L31 8 L16 15 L1 8 Z" stroke="#e8a838" strokeWidth="1" fill="none" />
          <circle cx="16" cy="8" r="1.5" fill="#e8a838" />
        </g>
      ))}
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

export default function AboutSection() {
  const textRef = useRef(null)
  const imgRef = useRef(null)
  const textInView = useInView(textRef, { once: true, margin: '-80px' })
  const imgInView = useInView(imgRef, { once: true, margin: '-80px' })

  return (
    <section id="despre" className="bg-[#0d0d0d] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-12 md:gap-16 items-center">

          {/* Text column */}
          <motion.div
            ref={textRef}
            variants={fadeUp}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
            className="flex flex-col gap-6"
          >
            <p className="text-xs tracking-[0.3em] text-[#e8a838] uppercase">
              Povestea noastră
            </p>

            <h2
              className="text-3xl md:text-4xl text-[#f0ece4] leading-snug"
              style={{ fontFamily: '"DM Serif Display", serif' }}
            >
              Din Țara Oașului,
              <br />
              pentru toată lumea
            </h2>

            <p className="text-[#f0ece4]/80 leading-relaxed">
              Suntem doi tineri din Țara Oașului care au crescut cu gustul micilor de la bunici.
              Am transformat rețetele de familie în ceva ce vrem să împărțim cu toată lumea —
              carne aleasă, pregătită pe cărbuni, cu dragoste și răbdare. Fiecare porție e
              făcută ca pentru ai noștri.
            </p>

            <p className="text-[#f0ece4]/80 leading-relaxed">
              Carnea vine exclusiv de la carmangeria familiei — rețete proprii de mici și
              cârnăciori pe care nu le găsești în comerț. Preparăm totul pe grătar pe cărbuni,
              nu pe gaz, nu pe electric. Focul real dă gustul real.
            </p>
          </motion.div>

          {/* Image column */}
          <motion.div
            ref={imgRef}
            variants={fadeUp}
            initial="hidden"
            animate={imgInView ? 'visible' : 'hidden'}
            transition={{ delay: 0.15 }}
            className="aspect-[4/5] bg-[#1a1a1a] rounded-lg flex items-center justify-center border border-[#2a2a2a]"
          >
            <p className="text-[#7a7368] text-xs text-center px-6 leading-relaxed">
              [POZĂ: Noi doi la stand, zâmbind, echipamentul în fundal]
            </p>
          </motion.div>

        </div>

        <OasSeparator />
      </div>
    </section>
  )
}
