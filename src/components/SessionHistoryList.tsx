import { useState } from 'react'
import { CaretDown, CaretUp } from '@phosphor-icons/react'
import type { WorkoutLog } from '../types'
import { getTotalVolume, isPR } from '../utils/progressUtils'

interface Props {
  logs: WorkoutLog[]
  exerciseId: string
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'short' })
    .replace(/^\w/, c => c.toUpperCase())
}

export default function SessionHistoryList({ logs, exerciseId }: Props) {
  const [expandedId, setExpanded] = useState<number | null>(null)

  const sorted = [...logs]
    .filter(l => l.exerciseLogs.some(el => el.exerciseId === exerciseId))
    .sort((a, b) => b.date.localeCompare(a.date))

  if (!sorted.length) {
    return (
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center', padding: '24px 0' }}>
        Nessuna sessione registrata
      </p>
    )
  }

  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)',
        letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10,
      }}>
        Storico sessioni
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {sorted.map(log => {
          const el = log.exerciseLogs.find(el => el.exerciseId === exerciseId)!
          const maxW   = Math.max(...el.sets.map(s => s.weight))
          const vol    = getTotalVolume(el.sets)
          const pr     = isPR(log, logs, exerciseId)
          const isOpen = expandedId === log.id

          return (
            <div key={log.id} style={{
              backgroundColor: 'var(--color-surface)',
              border: `1px solid ${pr ? 'rgba(168,224,99,0.3)' : 'var(--color-border)'}`,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
              {/* Row header — always visible */}
              <button
                onClick={() => setExpanded(isOpen ? null : (log.id ?? null))}
                style={{
                  width: '100%', textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 8,
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {fmtDate(log.date)}
                    </span>
                    {pr && (
                      <span style={{
                        fontSize: 9, fontWeight: 800, color: '#0F0F11',
                        backgroundColor: 'var(--color-accent)',
                        borderRadius: 3, padding: '1px 5px', letterSpacing: '0.05em',
                      }}>
                        PR
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {el.sets.length} serie
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      {maxW > 0 ? `${maxW} kg max` : 'Corpo libero'}
                    </span>
                    <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
                      Vol. {vol} kg
                    </span>
                  </div>
                </div>
                {isOpen
                  ? <CaretUp size={16} color="var(--color-text-secondary)" />
                  : <CaretDown size={16} color="var(--color-text-secondary)" />
                }
              </button>

              {/* Accordion detail */}
              {isOpen && (
                <div style={{
                  padding: '0 14px 12px',
                  borderTop: '1px solid var(--color-border)',
                }}>
                  {el.sets.map((s, i) => (
                    <div key={i} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '6px 0',
                      borderBottom: i < el.sets.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}>
                      <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                        Serie {s.setNumber}
                      </span>
                      <span style={{ fontSize: 13, color: 'var(--color-text-primary)', fontWeight: 500 }}>
                        {s.reps} reps × {s.weight > 0 ? `${s.weight} kg` : 'BW'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
