import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../db'
import WorkoutSessionCard from '../../components/WorkoutSessionCard'

type Tab = 'sessioni' | 'progressi'

export default function Allenamento() {
  const [tab, setTab] = useState<Tab>('sessioni')

  const planData = useLiveQuery(async () => {
    const setting = await db.appSettings.where('key').equals('activeWorkoutPlanId').first()
    if (!setting) return null
    return db.workoutPlans.get(Number(setting.value))
  })

  return (
    <div>
      {/* Header */}
      <div style={{ padding: '16px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 16 }}>
          Allenamento
        </h1>

        {/* Tab switcher */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid var(--color-border)',
          marginBottom: 20,
        }}>
          {(['sessioni', 'progressi'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                borderBottom: `2px solid ${tab === t ? 'var(--color-accent)' : 'transparent'}`,
                padding: '8px 0 12px',
                fontSize: 14,
                fontWeight: tab === t ? 700 : 400,
                color: tab === t ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                fontFamily: 'inherit',
                cursor: 'pointer',
                textTransform: 'capitalize',
                marginBottom: -1,
                transition: 'all 0.15s',
              }}
            >
              {t === 'sessioni' ? 'Sessioni' : 'Progressi'}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div style={{ padding: '0 20px 20px' }}>
        {tab === 'sessioni' && (
          <>
            {!planData ? (
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
                Caricamento…
              </p>
            ) : (
              <>
                <p style={{
                  fontSize: 11, fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                  marginBottom: 12,
                }}>
                  {planData.name}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {planData.sessions.map(session => (
                    <WorkoutSessionCard
                      key={session.id}
                      session={session}
                      workoutPlanId={planData.id!}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {tab === 'progressi' && (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '60px 0', gap: 12, textAlign: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24,
            }}>
              📈
            </div>
            <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Progressi
            </p>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', maxWidth: 240 }}>
              Grafici e statistiche disponibili nel prossimo aggiornamento.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
