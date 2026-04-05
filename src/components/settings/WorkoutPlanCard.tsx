import { useLiveQuery } from 'dexie-react-hooks'
import { useNavigate } from 'react-router-dom'
import { Barbell, CalendarBlank, PencilSimple, Plus } from '@phosphor-icons/react'
import { db } from '../../db'

export default function WorkoutPlanCard() {
  const navigate = useNavigate()

  const setting = useLiveQuery(() =>
    db.appSettings.where('key').equals('activeWorkoutPlanId').first()
  )
  const plan = useLiveQuery(async () => {
    if (!setting) return null
    return db.workoutPlans.get(Number(setting.value))
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
              <Barbell size={20} color="var(--color-accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)' }}>
                {plan.name}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-accent)', marginTop: 2 }}>
                {plan.sessions.length} sessioni
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <CalendarBlank size={11} color="var(--color-text-secondary)" />
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
                  Creata il {new Date(plan.createdAt).toLocaleDateString('it-IT')}
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => navigate(`/settings/scheda/${plan.id}`)}
              style={outlineBtnStyle}
            >
              <PencilSimple size={14} />
              Modifica
            </button>
            <button
              onClick={() => navigate('/settings/scheda/nuova')}
              style={accentBtnStyle}
            >
              <Plus size={14} />
              Nuova scheda
            </button>
          </div>
        </>
      ) : (
        <>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 14 }}>
            Nessuna scheda allenamento attiva.
          </p>
          <button
            onClick={() => navigate('/settings/scheda/nuova')}
            style={accentBtnStyle}
          >
            <Plus size={14} />
            Crea scheda
          </button>
        </>
      )}
    </div>
  )
}

const baseBtnStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  gap: 6, flex: 1, padding: '10px',
  borderRadius: 8, fontSize: 13, fontWeight: 600,
  fontFamily: 'inherit', cursor: 'pointer',
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
