import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Carousel3D from './components/Carousel3D'
import AboutSection from './components/AboutSection'
import MenuSection from './components/MenuSection'
import EquipmentSection from './components/EquipmentSection'
import CalendarSection from './components/CalendarSection'
import CateringSection from './components/CateringSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import OasOrnament from './components/OasOrnament'
import WatermarkBand from './components/WatermarkBand'
import RedBand from './components/RedBand'
import CustomCursor from './components/CustomCursor'
import DashboardApp from './dashboard/DashboardApp'

function Site() {
  return (
    <div className="bg-[#faf3e8] min-h-screen">
      <CustomCursor />
      <Navbar />
      <Hero />
      <section id="carousel-3d">
        <Carousel3D />
      </section>
      <OasOrnament variant="light" />
      <AboutSection />
      <WatermarkBand variant="dark" text="FOCUL REAL DĂ GUSTUL REAL" />
      <MenuSection />
      <RedBand />
      <EquipmentSection />
      <WatermarkBand variant="dark" text="TRADIȚIA CARE ARDE GUSTUL CARE RĂMÂNE" />
      <CalendarSection />
      <OasOrnament variant="light" />
      <CateringSection />
      <OasOrnament variant="dark" />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardApp />} />
      <Route path="/*" element={<Site />} />
    </Routes>
  )
}
