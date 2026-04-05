import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useLiveQuery } from 'dexie-react-hooks'
import { ArrowLeft, CheckCircle } from '@phosphor-icons/react'
import { db } from '../../db'
import type { ExerciseLog } from '../../types'
import ExerciseLogSheet from '../../components/ExerciseLogSheet'
import SessionCompleteScreen from '../../components/SessionCompleteScreen'

function todayStr() { return new Date().toISOString().split('T')[0] }

export default function SessionePage() {
  const { sessionId } = useParams<{ sessionId: string }>()
  const navigate = useNavigate()

  const [completedIds, setCompleted] = useState<Set<string>>(new Set())
  const [activeExId,   setActiveEx]  = useState<string | null>(null)
  const [logSheet,     setLogSheet]  = useState<string | null>(null)
  const [allLogs,      setAllLogs]   = useState<ExerciseLog[]>([])
  const [done,         setDone]      = useState(false)

  // Load workout plan + active plan id
  const planData = useLiveQuery(async () => {
    const setting = await db.appSettings.where('key').equals('activeWorkoutPlanId').first()
    if (!setting) return null
    const plan = await db.workoutPlans.get(Number(setting.value))
    if (!plan) return null
    const session = plan.sessions.find(s => s.id === sessionId)
    return session ? { plan, session } : null
  }, [sessionId])

  if (!planData) {
    return (
      <div style={{ padding: 24, color: 'var(--color-text-secondary)' }}>
        Sessione non trovata.
      </div>
    )
  }

  const { plan, session } = planData
  const exercises = session.exercises
  const completedCount = completedIds.size
  const progress = completedCount / exercises.length

  const activeExercise = exercises.find(e => e.id === (logSheet ?? activeExId)) ?? null

  async function handleSave(log: ExerciseLog) {
    const today = todayStr()
    const existing = await db.workoutLogs
      .where('[workoutPlanId+sessionId+date]')
      .equals([plan.id!, session.id, today])
      .first()

    if (existing?.id !== undefined) {
      const updated = existing.exerciseLogs.filter(el => el.exerciseId !== log.exerciseId)
      await db.workoutLogs.update(existing.id!, {
        exerciseLogs: [...updated, log],
      })
    } else {
      await db.workoutLogs.add({
        workoutPlanId: plan.id!,
        sessionId: session.id,
        sessionName: session.name,
        date: today,
        exerciseLogs: [log],
      })
    }

    const newCompleted = new Set(completedIds)
    newCompleted.add(log.exerciseId)
    setAllLogs(prev => [...prev.filter(l => l.exerciseId !== log.exerciseId), log])
    setCompleted(newCompleted)
    setLogSheet(null)

    // Advance to next uncompleted
    const nextEx = exercises.find(e => !newCompleted.has(e.id))
    if (nextEx) {
      setActiveEx(nextEx.id)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return <SessionCompleteScreen sessionName={session.name} exerciseLogs={allLogs} />
  }

  return (
    <>
      <div style={{ minHeight: '100%', backgroundColor: 'var(--color-bg)' }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '16px 20px 12px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <button
            onClick={() => navigate('/allenamento')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer', padding: 4,
              color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center',
            }}
          >
            <ArrowLeft size={22} />
          </button>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
              {session.name}
            </h1>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>
              {completedCount} / {exercises.length} completati
            </p>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ height: 3, backgroundColor: 'var(--color-border)', margin: '0 20px' }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            backgroundColor: 'var(--color-accent)',
            borderRadius: 2,
            transition: 'width 0.4s ease',
          }} />
        </div>

        {/* Exercise list */}
        <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {exercises.map(ex => {
            const isCompleted = completedIds.has(ex.id)
            const isActive    = ex.id === activeExId || (!activeExId && !isCompleted && exercises.find(e => !completedIds.has(e.id))?.id === ex.id)

            return (
              <div
                key={ex.id}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: `1px solid ${isActive ? 'var(--color-accent)' : isCompleted ? 'rgba(168,224,99,0.25)' : 'var(--color-border)'}`,
                  borderRadius: 12,
                  padding: '14px 16px',
                  opacity: isCompleted ? 0.6 : 1,
                  transition: 'all 0.2s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isActive ? 12 : 0 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {isCompleted && <CheckCircle size={16} color="var(--color-accent)" weight="fill" />}
                      <p style={{
                        fontSize: 15, fontWeight: 600,
                        color: isCompleted ? 'var(--color-text-secondary)' : 'var(--color-text-primary)',
                        textDecoration: isCompleted ? 'line-through' : 'none',
                      }}>
                        {ex.name}
                      </p>
                    </div>
                    <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 3 }}>
                      {ex.sets} serie · {ex.reps} reps · {ex.muscleGroups.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                {isActive && !isCompleted && (
                  <button
                    onClick={() => setLogSheet(ex.id)}
                    style={{
                      width: '100%', padding: '10px 0',
                      backgroundColor: 'var(--color-accent)', color: '#0F0F11',
                      border: 'none', borderRadius: 8,
                      fontSize: 13, fontWeight: 700, fontFamily: 'inherit', cursor: 'pointer',
                    }}
                  >
                    Inizia esercizio
                  </button>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <ExerciseLogSheet
        exercise={activeExercise}
        workoutPlanId={plan.id!}
        sessionId={session.id}
        onSave={handleSave}
        onClose={() => setLogSheet(null)}
      />
    </>
  )
}
