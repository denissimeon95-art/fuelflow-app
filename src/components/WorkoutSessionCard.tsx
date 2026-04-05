import { useNavigate } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { CheckCircle } from '@phosphor-icons/react'
import { db } from '../db'
import type { WorkoutSession } from '../types'

interface Props {
  session: WorkoutSession
  workoutPlanId: number
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}

function uniqueMuscles(session: WorkoutSession): string[] {
  const set = new Set<string>()
  session.exercises.forEach(ex => ex.muscleGroups.forEach(m => set.add(m)))
  return Array.from(set).slice(0, 6)
}

export default function WorkoutSessionCard({ session, workoutPlanId }: Props) {
  const navigate = useNavigate()

  const completedToday = useLiveQuery(async () => {
    const log = await db.workoutLogs
      .where('[workoutPlanId+sessionId+date]')
      .equals([workoutPlanId, session.id, todayStr()])
      .first()
    return !!log
  }, [workoutPlanId, session.id])

  const muscles = uniqueMuscles(session)

  return (
    <button
      onClick={() => navigate(`/allenamento/sessione/${session.id}`)}
      style={{
        width: '100%',
        textAlign: 'left',
        background: 'var(--color-surface)',
        border: `1px solid ${completedToday ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 14,
        padding: '16px 16px 14px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        WebkitTapHighlightColor: 'transparent',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 3 }}>
            {session.name}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {session.exercises.length} esercizi · {session.exercises[0]?.sets ?? 4} serie cad.
          </p>
        </div>

        {completedToday && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            backgroundColor: 'rgba(168,224,99,0.12)',
            border: '1px solid var(--color-accent)',
            borderRadius: 8,
            padding: '4px 10px',
            flexShrink: 0,
            marginLeft: 8,
          }}>
            <CheckCircle size={14} color="var(--color-accent)" weight="fill" />
            <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--color-accent)' }}>
              Completato oggi
            </span>
          </div>
        )}
      </div>

      {/* Muscle tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {muscles.map(m => (
          <span key={m} style={{
            fontSize: 11,
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: 6,
            padding: '3px 8px',
          }}>
            {m}
          </span>
        ))}
      </div>
    </button>
  )
}
