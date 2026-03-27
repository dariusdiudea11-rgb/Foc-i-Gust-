import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import EquipmentSection from './components/EquipmentSection'
import CalendarSection from './components/CalendarSection'
import CateringSection from './components/CateringSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import OasOrnament from './components/OasOrnament'

export default function App() {
  return (
    <div className="bg-[#faf3e8] min-h-screen">
      <Navbar />
      <Hero />
      <OasOrnament variant="light" />
      <AboutSection />
      <OasOrnament variant="dark" />
      <MenuSection />
      <OasOrnament variant="light" />
      <EquipmentSection />
      <OasOrnament variant="dark" />
      <CalendarSection />
      <OasOrnament variant="light" />
      <CateringSection />
      <OasOrnament variant="dark" />
      <ContactSection />
      <Footer />
    </div>
  )
}
