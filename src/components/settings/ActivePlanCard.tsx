import { useLiveQuery } from 'dexie-react-hooks'
import { ForkKnife, CalendarBlank, ArrowsClockwise } from '@phosphor-icons/react'
import { db } from '../../db'

interface Props {
  onChangePlan: () => void
}

export default function ActivePlanCard({ onChangePlan }: Props) {
  const setting = useLiveQuery(() =>
    db.appSettings.where('key').equals('activeMealPlanId').first()
  )
  const plan = useLiveQuery(async () => {
    if (!setting) return null
    return db.mealPlans.get(Number(setting.value))
  }, [setting])

  if (plan === undefined) return null

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: 16,
    }}>
      {plan ? (
        <>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 14 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              backgroundColor: 'rgba(168,224,99,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ForkKnife size={20} color="var(--color-accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {plan.name}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-accent)', marginTop: 2 }}>
                Ciclo di 5 giorni · {plan.days.length} giorni configurati
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <CalendarBlank size={11} color="var(--color-text-secondary)" />
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                  Caricato il {new Date(plan.createdAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          </div>

          <button onClick={onChangePlan} style={outlineBtnStyle}>
            <ArrowsClockwise size={14} />
            Cambia piano
          </button>
        </>
      ) : (
        <>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            Nessun piano alimentare attivo.
          </p>
          <button onClick={onChangePlan} style={accentBtnStyle}>
            Carica piano PDF
          </button>
        </>
      )}
    </div>
  )
}

const baseBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  width: '100%',
  padding: '10px',
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 600,
  fontFamily: 'inherit',
  cursor: 'pointer',
}

const outlineBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  border: '1px solid var(--color-border)',
  backgroundColor: 'transparent',
  color: 'var(--color-text-primary)',
}

const accentBtnStyle: React.CSSProperties = {
  ...baseBtnStyle,
  border: 'none',
  backgroundColor: 'var(--color-accent)',
  color: '#0F0F11',
}
