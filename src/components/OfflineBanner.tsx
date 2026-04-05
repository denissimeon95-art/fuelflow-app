import { useOnline } from '../hooks/useOnline'

export default function OfflineBanner() {
  const online = useOnline()
  if (online) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: 32,
      backgroundColor: '#FBBF24',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      zIndex: 999,
      fontSize: 12,
      fontWeight: 700,
      color: '#0F0F11',
      letterSpacing: '0.02em',
    }}>
      <span style={{ fontSize: 14 }}>⚡</span>
      Sei offline — le funzionalità locali restano attive
    </div>
  )
}
