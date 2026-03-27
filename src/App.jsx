import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import EquipmentSection from './components/EquipmentSection'

function PlaceholderSection({ id, label }) {
  return (
    <section
      id={id}
      className="min-h-96 flex items-center justify-center border-t border-[#1a1a1a]"
    >
      <h2
        className="text-2xl text-[#7a7368] tracking-widest uppercase"
        style={{ fontFamily: '"DM Serif Display", serif' }}
      >
        {label}
      </h2>
    </section>
  )
}

export default function App() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <MenuSection />
      <EquipmentSection />
      <PlaceholderSection id="calendar"    label="Calendar" />
      <PlaceholderSection id="catering"    label="Catering" />
      <PlaceholderSection id="contact"     label="Contact" />
    </div>
  )
}
