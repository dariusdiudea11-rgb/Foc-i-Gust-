import { Routes, Route } from 'react-router-dom'
import SiteApp from './site/SiteApp'
import DashboardApp from './dashboard/DashboardApp'

export default function App() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<DashboardApp />} />
      <Route path="/*" element={<SiteApp />} />
    </Routes>
  )
}
