import { ForkKnife } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'

export default function EmptyState() {
  const navigate = useNavigate()

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
      padding: '80px 32px',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64,
        height: 64,
        borderRadius: 16,
        backgroundColor: 'var(--color-surface-elevated)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <ForkKnife size={28} color="var(--color-text-secondary)" />
      </div>

      <div>
        <p style={{ color: 'var(--color-text-primary)', fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
          Nessun piano alimentare attivo
        </p>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, lineHeight: '20px' }}>
          Importa o crea un piano per iniziare a tracciare la tua alimentazione.
        </p>
      </div>

      <button
        onClick={() => navigate('/settings')}
        style={{
          marginTop: 8,
          padding: '12px 24px',
          backgroundColor: 'var(--color-accent)',
          color: '#0F0F11',
          border: 'none',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 600,
          fontFamily: 'inherit',
          cursor: 'pointer',
        }}
      >
        Vai alle impostazioni
      </button>
    </div>
  )
}
