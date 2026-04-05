import { useNavigate } from 'react-router-dom'
import { CheckCircle } from '@phosphor-icons/react'
import type { ExerciseLog } from '../types'

interface Props {
  sessionName: string
  exerciseLogs: ExerciseLog[]
}

function totalVolume(logs: ExerciseLog[]): number {
  return logs.reduce((acc, el) =>
    acc + el.sets.reduce((s, set) => s + set.weight * set.reps, 0), 0
  )
}

export default function SessionCompleteScreen({ sessionName, exerciseLogs }: Props) {
  const navigate = useNavigate()
  const volume = totalVolume(exerciseLogs)

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      backgroundColor: 'var(--color-bg)',
      display: 'flex', flexDirection: 'column',
      overflowY: 'auto',
    }}>
      {/* Hero */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '60px 24px 32px', textAlign: 'center',
      }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          backgroundColor: 'rgba(168,224,99,0.12)',
          border: '2px solid var(--color-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 20,
        }}>
          <CheckCircle size={44} color="var(--color-accent)" weight="fill" />
        </div>

        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: 6 }}>
          Sessione completata!
        </h1>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>{sessionName}</p>

        {/* Volume stat */}
        <div style={{
          marginTop: 24,
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '14px 32px',
        }}>
          <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-accent)' }}>
            {volume.toLocaleString('it-IT')} kg
          </p>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
            Volume totale
          </p>
        </div>
      </div>

      {/* Exercise summary */}
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)',
          letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 2,
        }}>
          Riepilogo esercizi
        </p>

        {exerciseLogs.map(el => {
          const vol = el.sets.reduce((s, set) => s + set.weight * set.reps, 0)
          return (
            <div key={el.exerciseId} style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 10,
              padding: '12px 14px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {el.exerciseName}
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-accent)', fontWeight: 600 }}>
                  {vol} kg vol.
                </p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 10px' }}>
                {el.sets.map((s, i) => (
                  <span key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                    S{s.setNumber}: {s.weight}kg × {s.reps}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <div style={{ padding: '24px 20px 40px' }}>
        <button
          onClick={() => navigate('/allenamento')}
          style={{
            width: '100%', padding: '15px 0',
            backgroundColor: 'var(--color-accent)', color: '#0F0F11',
            border: 'none', borderRadius: 12,
            fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          Chiudi
        </button>
      </div>
    </div>
  )
}
