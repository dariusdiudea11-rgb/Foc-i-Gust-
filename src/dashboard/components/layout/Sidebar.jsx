import { NavLink } from 'react-router-dom'

const NAV = [
  { to: '/dashboard',         label: 'Prezentare generală', icon: '◈' },
  { to: '/dashboard/targuri', label: 'Târguri',             icon: '⊞' },
]

export default function Sidebar({ onLogout, collapsed, onToggle }) {
  return (
    <aside style={{
      width:      collapsed ? '56px' : '220px',
      minHeight:  '100vh',
      background: '#111',
      borderRight:'1px solid rgba(255,255,255,0.06)',
      display:    'flex',
      flexDirection: 'column',
      transition: 'width 0.25s ease',
      overflow:   'hidden',
      flexShrink: 0,
    }}>
      {/* Logo row */}
      <div style={{ padding: collapsed ? '18px 0' : '18px 16px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.06)', minHeight: '60px' }}>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '18px', flexShrink: 0, padding: collapsed ? '0 18px' : '0', lineHeight: 1 }}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        {!collapsed && (
          <span style={{ fontFamily: '"DM Serif Display", serif', fontSize: '15px', color: '#c41e3a', whiteSpace: 'nowrap', overflow: 'hidden' }}>
            Foc și Gust
          </span>
        )}
      </div>

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV.map(({ to, label, icon }) => (
          <NavLink key={to} to={to} end={to === '/dashboard'}
            style={({ isActive }) => ({
              display:      'flex',
              alignItems:   'center',
              gap:          '10px',
              padding:      collapsed ? '10px 0' : '10px 16px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              textDecoration: 'none',
              fontSize:     '13px',
              fontWeight:   isActive ? 600 : 400,
              color:        isActive ? '#c41e3a' : 'rgba(255,255,255,0.5)',
              background:   isActive ? 'rgba(196,30,58,0.08)' : 'transparent',
              borderLeft:   isActive ? '2px solid #c41e3a' : '2px solid transparent',
              transition:   'all 0.15s',
              whiteSpace:   'nowrap',
            })}>
            <span style={{ fontSize: '16px', flexShrink: 0 }}>{icon}</span>
            {!collapsed && label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div style={{ padding: collapsed ? '12px 0' : '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button
          onClick={onLogout}
          title="Deconectare"
          style={{
            width:          '100%',
            display:        'flex',
            alignItems:     'center',
            gap:            '10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            background:     'none',
            border:         'none',
            cursor:         'pointer',
            color:          'rgba(255,255,255,0.3)',
            fontSize:       '13px',
            padding:        collapsed ? '8px 0' : '8px 0',
            transition:     'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#c41e3a'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.3)'}
        >
          <span style={{ fontSize: '16px', flexShrink: 0 }}>⏻</span>
          {!collapsed && 'Deconectare'}
        </button>
      </div>
    </aside>
  )
}
