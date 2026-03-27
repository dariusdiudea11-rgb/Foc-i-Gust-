import { Phone, Mail, MapPin } from 'lucide-react'

const cards = [
  { icon: Phone,  label: '+40 7XX XXX XXX',         href: 'tel:+40700000000' },
  { icon: Mail,   label: 'contact@focusgust.ro',     href: 'mailto:contact@focusgust.ro' },
  { icon: MapPin, label: 'Negrești-Oaș, Satu Mare',  href: null },
]

function FbIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6 bg-[#faf3e8]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl text-[#1a1520] mb-12"
          style={{ fontFamily: '"DM Serif Display", serif' }}>
          Contactează-ne
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          {cards.map(({ icon: Icon, label, href }) => {
            const inner = (
              <div className="bg-white/80 border border-[#1a1520]/5 rounded-2xl p-6 flex flex-col items-center gap-3 hover:border-[#c41e3a]/30 hover:bg-white transition-all duration-300 w-full">
                <Icon size={22} className="text-[#c41e3a]" strokeWidth={1.5}/>
                <span className="text-[#1a1520]/70 text-sm">{label}</span>
              </div>
            )
            return href
              ? <a key={label} href={href} className="flex-1">{inner}</a>
              : <div key={label} className="flex-1">{inner}</div>
          })}
        </div>

        <div className="flex items-center justify-center gap-6">
          <a href="#" className="flex items-center gap-2 text-[#8a7e6d] hover:text-[#c41e3a] transition-colors duration-300 text-sm">
            <FbIcon/> Facebook
          </a>
          <a href="#" className="flex items-center gap-2 text-[#8a7e6d] hover:text-[#c41e3a] transition-colors duration-300 text-sm">
            <IgIcon/> Instagram
          </a>
        </div>
      </div>
    </section>
  )
}
