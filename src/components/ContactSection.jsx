import { Phone, Mail, MapPin, Calendar } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="bg-[#111111] py-20 px-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Coloana 1 — Contact */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-[#f0ece4] text-lg mb-1"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Contactează-ne
          </h3>
          <a
            href="tel:+40700000000"
            className="flex items-center gap-3 text-[#7a7368] hover:text-[#e8a838] transition-colors text-sm"
          >
            <Phone size={16} strokeWidth={1.5} />
            +40 7XX XXX XXX
          </a>
          <a
            href="mailto:contact@focusgust.ro"
            className="flex items-center gap-3 text-[#7a7368] hover:text-[#e8a838] transition-colors text-sm"
          >
            <Mail size={16} strokeWidth={1.5} />
            contact@focusgust.ro
          </a>
        </div>

        {/* Coloana 2 — Social */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-[#f0ece4] text-lg mb-1"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Urmărește-ne
          </h3>
          <a
            href="#"
            className="flex items-center gap-3 text-[#7a7368] hover:text-[#e8a838] transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Facebook
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-[#7a7368] hover:text-[#e8a838] transition-colors text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            Instagram
          </a>
        </div>

        {/* Coloana 3 — Locatie */}
        <div className="flex flex-col gap-4">
          <h3
            className="text-[#f0ece4] text-lg mb-1"
            style={{ fontFamily: '"DM Serif Display", serif' }}
          >
            Locație
          </h3>
          <p className="flex items-start gap-3 text-[#7a7368] text-sm">
            <MapPin size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            Negrești-Oaș, Județul Satu Mare
          </p>
          <p className="flex items-start gap-3 text-[#7a7368] text-sm">
            <Calendar size={16} strokeWidth={1.5} className="shrink-0 mt-0.5" />
            Prezentări la târguri — vezi calendarul
          </p>
        </div>

      </div>
    </section>
  )
}
