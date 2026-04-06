import { useLocation } from 'react-router-dom'

const TITLES = {
  '/dashboard':         'Prezentare generală',
  '/dashboard/targuri': 'Târguri',
}

export default function TopBar() {
  const { pathname } = useLocation()
  // match /dashboard/targuri/:id
  const title = TITLES[pathname]
    || (pathname.startsWith('/dashboard/targuri/') ? 'Detalii târg' : 'Dashboard')

  return (
    <div style={{
      height:     '56px',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      display:    'flex',
      alignItems: 'center',
      padding:    '0 24px',
      background: '#0f0f0f',
      flexShrink: 0,
    }}>
      <h1 style={{ fontSize: '15px', fontWeight: 600, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
        {title}
      </h1>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(196,30,58,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', color: '#c41e3a' }}>
          F
        </div>
      </div>
    </div>
  )
}
