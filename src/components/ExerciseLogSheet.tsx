import { useState, useEffect, useRef } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { Plus } from '@phosphor-icons/react'
import { db } from '../db'
import type { Exercise, SetLog, ExerciseLog } from '../types'
import RecoveryTimer from './RecoveryTimer'

interface Props {
  exercise: Exercise | null
  workoutPlanId: number
  sessionId: string
  onSave: (log: ExerciseLog) => void
  onClose: () => void
}

function todayStr() {
  return new Date().toISOString().split('T')[0]
}


export default function ExerciseLogSheet({ exercise, workoutPlanId, sessionId, onSave, onClose }: Props) {
  const isOpen = exercise !== null
  const startY = useRef<number | null>(null)

  // Default sets from exercise definition
  const defaultSets = (): SetLog[] =>
    Array.from({ length: exercise?.sets ?? 4 }, (_, i) => ({
      setNumber: i + 1,
      reps: 0,
      weight: 0,
      unit: 'kg' as const,
      notes: '',
    }))

  const [sets, setSets] = useState<SetLog[]>(defaultSets)

  useEffect(() => {
    if (exercise) setSets(defaultSets())
  }, [exercise?.id])

  // Last workout data for this exercise
  const lastLog = useLiveQuery(async () => {
    if (!exercise) return null
    const logs = await db.workoutLogs
      .where('workoutPlanId').equals(workoutPlanId)
      .filter(l => l.sessionId === sessionId)
      .sortBy('date')
    // find the most recent log that has this exercise, excluding today
    const today = todayStr()
    const past = logs.filter(l => l.date < today)
    if (!past.length) return null
    const last = past[past.length - 1]
    return last.exerciseLogs.find(el => el.exerciseId === exercise.id) ?? null
  }, [exercise?.id, workoutPlanId, sessionId])

  function updateSet(idx: number, field: keyof SetLog, val: string | number) {
    setSets(prev => prev.map((s, i) => i === idx ? { ...s, [field]: val } : s))
  }

  function addSet() {
    setSets(prev => [...prev, { setNumber: prev.length + 1, reps: 0, weight: 0, unit: 'kg', notes: '' }])
  }

  function handleSave() {
    if (!exercise) return
    onSave({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      sets: sets.filter(s => s.reps > 0 || s.weight > 0),
    })
    onClose()
  }

  // Swipe down to close
  function handleTouchStart(e: React.TouchEvent) { startY.current = e.touches[0].clientY }
  function handleTouchEnd(e: React.TouchEvent) {
    if (startY.current === null) return
    if (e.changedTouches[0].clientY - startY.current > 80) onClose()
    startY.current = null
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const inputStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-surface-elevated)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    color: 'var(--color-text-primary)',
    fontSize: 16,
    fontFamily: 'inherit',
    fontWeight: 500,
    textAlign: 'center',
    padding: '10px 0',
    outline: 'none',
    width: '100%',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Sheet */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 101,
          backgroundColor: 'var(--color-surface)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '92dvh',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32,0.72,0,1)',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Header */}
        <div style={{ padding: '8px 20px 12px', flexShrink: 0 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>
            {exercise?.name}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {exercise?.muscleGroups.join(' · ')}
          </p>
          {exercise?.notes && (
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4, fontStyle: 'italic' }}>
              {exercise.notes}
            </p>
          )}
        </div>

        {/* Last workout banner */}
        {lastLog && (
          <div style={{
            margin: '0 20px 12px',
            backgroundColor: 'var(--color-surface-elevated)',
            borderRadius: 10,
            padding: '10px 14px',
            flexShrink: 0,
          }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 6, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Ultimo allenamento
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px' }}>
              {lastLog.sets.map((s, i) => (
                <span key={i} style={{ fontSize: 13, color: 'var(--color-text-primary)' }}>
                  {s.weight}kg × {s.reps}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Scrollable sets */}
        <div style={{ overflowY: 'auto', padding: '0 20px', flex: 1 }}>
          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
            {['', 'Reps', 'Kg', 'Note'].map((h, i) => (
              <p key={i} style={{ fontSize: 11, color: 'var(--color-text-secondary)', textAlign: 'center', fontWeight: 600 }}>
                {h}
              </p>
            ))}
          </div>

          {sets.map((set, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '48px 1fr 1fr 1fr', gap: 8, marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                  S{set.setNumber}
                </span>
              </div>
              <input
                type="number"
                inputMode="numeric"
                value={set.reps || ''}
                onChange={e => updateSet(idx, 'reps', Number(e.target.value))}
                placeholder="—"
                style={inputStyle}
              />
              <input
                type="number"
                inputMode="decimal"
                value={set.weight || ''}
                onChange={e => updateSet(idx, 'weight', Number(e.target.value))}
                placeholder="—"
                style={inputStyle}
              />
              <input
                type="text"
                inputMode="text"
                value={set.notes ?? ''}
                onChange={e => updateSet(idx, 'notes', e.target.value)}
                placeholder="Note"
                style={{ ...inputStyle, fontSize: 13 }}
              />
            </div>
          ))}

          {/* Add set */}
          <button
            onClick={addSet}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
              width: '100%', padding: '10px 0', marginTop: 4, marginBottom: 16,
              background: 'transparent',
              border: '1px dashed var(--color-border)',
              borderRadius: 8,
              color: 'var(--color-accent)',
              fontSize: 13, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            <Plus size={16} />
            Aggiungi serie
          </button>

          {/* Recovery timer */}
          <div style={{ marginBottom: 16 }}>
            <RecoveryTimer />
          </div>
        </div>

        {/* Save CTA */}
        <div style={{
          padding: '12px 20px 32px',
          borderTop: '1px solid var(--color-border)',
          flexShrink: 0,
          backgroundColor: 'var(--color-surface)',
        }}>
          <button
            onClick={handleSave}
            style={{
              width: '100%', padding: '15px 0',
              backgroundColor: 'var(--color-accent)', color: '#0F0F11',
              border: 'none', borderRadius: 12,
              fontSize: 15, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
            }}
          >
            Salva e continua →
          </button>
        </div>
      </div>
    </>
  )
}
