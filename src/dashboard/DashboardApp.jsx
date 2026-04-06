import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth }    from './hooks/useAuth'
import { useTarguri } from './hooks/useTarguri'
import PinGate        from './auth/PinGate'
import DashboardLayout from './components/layout/DashboardLayout'
import Overview       from './pages/Overview'
import TarguriList    from './pages/TarguriList'
import TargDetail     from './pages/TargDetail'

export default function DashboardApp() {
  const { isAuthenticated, login, logout } = useAuth()
  const { targuri, addTarg, updateTarg, deleteTarg } = useTarguri()

  if (!isAuthenticated) {
    return <PinGate onLogin={login} />
  }

  return (
    <div className="dashboard-root" style={{ cursor: 'auto' }}>
      <Routes>
        <Route element={<DashboardLayout onLogout={logout} />}>
          <Route index element={<Overview targuri={targuri} />} />
          <Route path="targuri" element={
            <TarguriList targuri={targuri} onAdd={addTarg} onDelete={deleteTarg} />
          } />
          <Route path="targuri/:id" element={
            <TargDetail targuri={targuri} onUpdate={updateTarg} onDelete={deleteTarg} />
          } />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </div>
  )
}
