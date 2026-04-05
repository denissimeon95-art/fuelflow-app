import { NavLink } from 'react-router-dom'
import { ForkKnife, Barbell, Gear } from '@phosphor-icons/react'

const tabs = [
  { to: '/alimentazione', label: 'Alimentazione', Icon: ForkKnife },
  { to: '/allenamento', label: 'Allenamento', Icon: Barbell },
  { to: '/settings', label: 'Settings', Icon: Gear },
]

export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        backgroundColor: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 50,
      }}
    >
      {tabs.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          style={({ isActive }) => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            minWidth: 44,
            minHeight: 44,
            color: isActive ? 'var(--color-accent)' : 'var(--color-text-secondary)',
            textDecoration: 'none',
            fontSize: 11,
            fontWeight: 500,
            transition: 'color 0.15s ease',
          })}
        >
          <Icon size={24} weight="regular" />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
