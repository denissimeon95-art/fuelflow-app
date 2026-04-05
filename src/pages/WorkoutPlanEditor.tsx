import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ArrowLeft,
  Plus,
  Trash,
  DotsSixVertical,
  X,
  FloppyDisk,
} from '@phosphor-icons/react'
import { db } from '../db'
import type { WorkoutPlan, WorkoutSession, Exercise } from '../types'

// ── id helpers ─────────────────────────────────────────────────────

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

// ── types ──────────────────────────────────────────────────────────

interface EditableExercise extends Exercise {
  muscleInput: string // current tag input value
}

interface EditableSession extends Omit<WorkoutSession, 'exercises'> {
  exercises: EditableExercise[]
  expanded: boolean
}

// ── SortableExerciseRow ────────────────────────────────────────────

interface ExerciseRowProps {
  ex: EditableExercise
  sessionId: string
  onUpdate: (sessionId: string, exId: string, patch: Partial<EditableExercise>) => void
  onDelete: (sessionId: string, exId: string) => void
  onAddMuscle: (sessionId: string, exId: string) => void
  onRemoveMuscle: (sessionId: string, exId: string, muscle: string) => void
}

function SortableExerciseRow({ ex, sessionId, onUpdate, onDelete, onAddMuscle, onRemoveMuscle }: ExerciseRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ex.id })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div ref={setNodeRef} style={style}>
      <div style={{
        backgroundColor: 'var(--color-surface-elevated)',
        border: '1px solid var(--color-border)',
        borderRadius: 10,
        padding: '12px 12px 12px 8px',
        marginBottom: 8,
        display: 'flex',
        gap: 8,
      }}>
        {/* Drag handle */}
        <button
          {...attributes}
          {...listeners}
          style={{
            background: 'none', border: 'none', cursor: 'grab',
            color: 'var(--color-text-secondary)', padding: '2px 0',
            flexShrink: 0, touchAction: 'none',
          }}
        >
          <DotsSixVertical size={20} />
        </button>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
          {/* Name */}
          <input
            value={ex.name}
            onChange={e => onUpdate(sessionId, ex.id, { name: e.target.value })}
            placeholder="Nome esercizio"
            style={inputStyle}
          />

          {/* Muscle groups */}
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 4 }}>
              {ex.muscleGroups.map(m => (
                <span key={m} style={tagStyle} onClick={() => onRemoveMuscle(sessionId, ex.id, m)}>
                  {m} <X size={10} />
                </span>
              ))}
            </div>
            <input
              value={ex.muscleInput}
              onChange={e => onUpdate(sessionId, ex.id, { muscleInput: e.target.value })}
              onKeyDown={e => {
                if ((e.key === 'Enter' || e.key === ',') && ex.muscleInput.trim()) {
                  e.preventDefault()
                  onAddMuscle(sessionId, ex.id)
                }
              }}
              placeholder="Muscoli (Invio per aggiungere)"
              style={{ ...inputStyle, fontSize: 12 }}
            />
          </div>

          {/* Sets / Reps row */}
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Serie</label>
              <input
                type="number"
                min={1}
                value={ex.sets}
                onChange={e => onUpdate(sessionId, ex.id, { sets: Number(e.target.value) })}
                style={inputStyle}
              />
            </div>
            <div style={{ flex: 2 }}>
              <label style={labelStyle}>Ripetizioni</label>
              <input
                value={ex.reps}
                onChange={e => onUpdate(sessionId, ex.id, { reps: e.target.value })}
                placeholder="es. 8-10"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Notes */}
          <input
            value={ex.notes ?? ''}
            onChange={e => onUpdate(sessionId, ex.id, { notes: e.target.value })}
            placeholder="Note (opzionale)"
            style={{ ...inputStyle, fontSize: 12, color: 'var(--color-text-secondary)' }}
          />
        </div>

        {/* Delete exercise */}
        <button
          onClick={() => onDelete(sessionId, ex.id)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--color-danger)', padding: '2px 0', flexShrink: 0,
          }}
        >
          <Trash size={16} />
        </button>
      </div>
    </div>
  )
}

// ── WorkoutPlanEditor ──────────────────────────────────────────────

export default function WorkoutPlanEditor() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isNew = id === 'nuova'

  const [planName, setPlanName] = useState('')
  const [sessions, setSessions] = useState<EditableSession[]>([])
  const [loading, setLoading] = useState(!isNew)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  )

  // ── load existing plan ─────────────────────────────────────────
  useEffect(() => {
    if (isNew) return
    db.workoutPlans.get(Number(id)).then(plan => {
      if (!plan) { toast.error('Piano non trovato'); navigate('/settings'); return }
      setPlanName(plan.name)
      setSessions(plan.sessions.map(s => ({
        ...s,
        exercises: s.exercises.map(e => ({ ...e, muscleInput: '' })),
        expanded: true,
      })))
      setLoading(false)
    })
  }, [id])

  if (loading) return <div style={{ padding: 24, color: 'var(--color-text-secondary)' }}>Caricamento…</div>

  // ── mutations ──────────────────────────────────────────────────

  function addSession() {
    setSessions(prev => [...prev, {
      id: uid(),
      name: `Sessione ${prev.length + 1}`,
      exercises: [],
      expanded: true,
    }])
  }

  function deleteSession(sessionId: string) {
    setSessions(prev => prev.filter(s => s.id !== sessionId))
  }

  function toggleSession(sessionId: string) {
    setSessions(prev => prev.map(s =>
      s.id === sessionId ? { ...s, expanded: !s.expanded } : s
    ))
  }

  function updateSessionName(sessionId: string, name: string) {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, name } : s))
  }

  function addExercise(sessionId: string) {
    const newEx: EditableExercise = {
      id: uid(), name: '', muscleGroups: [],
      sets: 4, reps: '8-10', notes: '', muscleInput: '',
    }
    setSessions(prev => prev.map(s =>
      s.id === sessionId ? { ...s, exercises: [...s.exercises, newEx] } : s
    ))
  }

  function deleteExercise(sessionId: string, exId: string) {
    setSessions(prev => prev.map(s =>
      s.id === sessionId ? { ...s, exercises: s.exercises.filter(e => e.id !== exId) } : s
    ))
  }

  function updateExercise(sessionId: string, exId: string, patch: Partial<EditableExercise>) {
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, exercises: s.exercises.map(e => e.id === exId ? { ...e, ...patch } : e) }
        : s
    ))
  }

  function addMuscleTag(sessionId: string, exId: string) {
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? {
          ...s, exercises: s.exercises.map(e => {
            if (e.id !== exId) return e
            const tag = e.muscleInput.trim().replace(/,$/, '')
            if (!tag || e.muscleGroups.includes(tag)) return { ...e, muscleInput: '' }
            return { ...e, muscleGroups: [...e.muscleGroups, tag], muscleInput: '' }
          })
        }
        : s
    ))
  }

  function removeMuscleTag(sessionId: string, exId: string, muscle: string) {
    setSessions(prev => prev.map(s =>
      s.id === sessionId
        ? { ...s, exercises: s.exercises.map(e =>
            e.id === exId ? { ...e, muscleGroups: e.muscleGroups.filter(m => m !== muscle) } : e
          )}
        : s
    ))
  }

  function handleDragEnd(sessionId: string, event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    setSessions(prev => prev.map(s => {
      if (s.id !== sessionId) return s
      const oldIndex = s.exercises.findIndex(e => e.id === active.id)
      const newIndex = s.exercises.findIndex(e => e.id === over.id)
      return { ...s, exercises: arrayMove(s.exercises, oldIndex, newIndex) }
    }))
  }

  // ── save ───────────────────────────────────────────────────────

  async function handleSave() {
    if (!planName.trim()) { toast.error('Inserisci un nome per la scheda'); return }

    const cleanSessions: WorkoutSession[] = sessions.map(s => ({
      id: s.id,
      name: s.name || 'Sessione senza nome',
      exercises: s.exercises.map(({ muscleInput: _m, ...e }) => e),
    }))

    const plan: WorkoutPlan = {
      name: planName.trim(),
      createdAt: new Date().toISOString(),
      sessions: cleanSessions,
    }

    if (isNew) {
      const newId = await db.workoutPlans.add(plan as Parameters<typeof db.workoutPlans.add>[0])
      await db.appSettings.put({ key: 'activeWorkoutPlanId', value: String(newId) })
    } else {
      await db.workoutPlans.update(Number(id), plan)
    }

    toast.success(isNew ? 'Scheda creata e impostata come attiva' : 'Scheda aggiornata')
    navigate('/settings')
  }

  // ── render ─────────────────────────────────────────────────────

  return (
    <div style={{ paddingBottom: 100 }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0,
        backgroundColor: 'var(--color-bg)', zIndex: 10,
      }}>
        <button
          onClick={() => navigate('/settings')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
        >
          <ArrowLeft size={22} color="var(--color-text-primary)" />
        </button>
        <h1 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', flex: 1 }}>
          {isNew ? 'Nuova scheda' : 'Modifica scheda'}
        </h1>
      </div>

      <div style={{ padding: '20px 20px 0' }}>
        {/* Plan name */}
        <div style={{ marginBottom: 24 }}>
          <label style={{ ...labelStyle, display: 'block', marginBottom: 6 }}>Nome scheda</label>
          <input
            value={planName}
            onChange={e => setPlanName(e.target.value)}
            placeholder="es. Push/Pull/Legs"
            style={{ ...inputStyle, fontSize: 16, fontWeight: 600 }}
          />
        </div>

        {/* Sessions */}
        {sessions.map(session => (
          <div key={session.id} style={{ marginBottom: 16 }}>
            {/* Session header */}
            <div style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: session.expanded ? '12px 12px 0 0' : 12,
              padding: '12px 14px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <button
                onClick={() => toggleSession(session.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flex: 1, textAlign: 'left' }}
              >
                <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Sessione {sessions.indexOf(session) + 1}
                </p>
              </button>
              <input
                value={session.name}
                onChange={e => updateSessionName(session.id, e.target.value)}
                placeholder="Nome sessione"
                onClick={e => e.stopPropagation()}
                style={{ ...inputStyle, flex: 3, marginBottom: 0 }}
              />
              <button
                onClick={() => deleteSession(session.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-danger)', flexShrink: 0 }}
              >
                <Trash size={18} />
              </button>
            </div>

            {/* Session exercises */}
            {session.expanded && (
              <div style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderTop: 'none',
                borderRadius: '0 0 12px 12px',
                padding: '12px 14px',
              }}>
                <DndContext
                  sensors={sensors}
                  onDragEnd={e => handleDragEnd(session.id, e)}
                >
                  <SortableContext
                    items={session.exercises.map(e => e.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {session.exercises.map(ex => (
                      <SortableExerciseRow
                        key={ex.id}
                        ex={ex}
                        sessionId={session.id}
                        onUpdate={updateExercise}
                        onDelete={deleteExercise}
                        onAddMuscle={addMuscleTag}
                        onRemoveMuscle={removeMuscleTag}
                      />
                    ))}
                  </SortableContext>
                </DndContext>

                <button
                  onClick={() => addExercise(session.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    width: '100%', padding: '10px 12px',
                    borderRadius: 8, border: '1px dashed var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-secondary)',
                    fontSize: 13, fontWeight: 600,
                    fontFamily: 'inherit', cursor: 'pointer',
                    justifyContent: 'center',
                  }}
                >
                  <Plus size={14} />
                  Aggiungi esercizio
                </button>
              </div>
            )}
          </div>
        ))}

        {/* Add session */}
        <button
          onClick={addSession}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            width: '100%', padding: '14px',
            borderRadius: 12, border: '1px dashed var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-secondary)',
            fontSize: 14, fontWeight: 600,
            fontFamily: 'inherit', cursor: 'pointer',
            justifyContent: 'center', marginBottom: 16,
          }}
        >
          <Plus size={16} />
          Aggiungi sessione
        </button>
      </div>

      {/* Fixed save button */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        padding: '12px 20px 28px',
        backgroundColor: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border)',
        zIndex: 20,
      }}>
        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            width: '100%', padding: '14px',
            borderRadius: 12, border: 'none',
            backgroundColor: 'var(--color-accent)',
            color: '#0F0F11',
            fontSize: 15, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          <FloppyDisk size={18} />
          Salva scheda
        </button>
      </div>
    </div>
  )
}

// ── styles ─────────────────────────────────────────────────────────

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '8px 10px',
  borderRadius: 8,
  border: '1px solid var(--color-border)',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text-primary)',
  fontSize: 14,
  fontFamily: 'inherit',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--color-text-secondary)',
}

const tagStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 4,
  padding: '2px 8px',
  borderRadius: 100,
  backgroundColor: 'rgba(168,224,99,0.12)',
  border: '1px solid rgba(168,224,99,0.3)',
  color: 'var(--color-accent)',
  fontSize: 11, fontWeight: 600,
  cursor: 'pointer',
}
