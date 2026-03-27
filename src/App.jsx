import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import EquipmentSection from './components/EquipmentSection'
import CalendarSection from './components/CalendarSection'
import CateringSection from './components/CateringSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <MenuSection />
      <EquipmentSection />
      <CalendarSection />
      <CateringSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
