import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../db'
import SummaryStats from '../../components/SummaryStats'
import ProgressChart from '../../components/ProgressChart'
import SessionHistoryList from '../../components/SessionHistoryList'
import {
  getMaxWeight,
  getAverageWeightLastWeeks,
  buildChartData,
} from '../../utils/progressUtils'

export default function ProgressiPage() {
  const [selectedExId, setSelectedExId] = useState<string>('')

  const data = useLiveQuery(async () => {
    const setting = await db.appSettings.where('key').equals('activeWorkoutPlanId').first()
    if (!setting) return null
    const plan = await db.workoutPlans.get(Number(setting.value))
    if (!plan) return null
    const logs = await db.workoutLogs.where('workoutPlanId').equals(plan.id!).toArray()
    return { plan, logs }
  })

  // Set default exercise once data loads
  const firstExId = data?.plan.sessions[0]?.exercises[0]?.id ?? ''
  const effectiveExId = selectedExId || firstExId

  if (!data) {
    return <p style={{ color: 'var(--color-text-secondary)', fontSize: 14, padding: '24px 0' }}>Caricamento…</p>
  }

  const { plan, logs } = data
  const chartData    = buildChartData(logs, effectiveExId)
  const record       = getMaxWeight(logs, effectiveExId)
  const recordLog    = [...logs]
    .filter(l => l.exerciseLogs.some(el => el.exerciseId === effectiveExId))
    .sort((a, b) => b.date.localeCompare(a.date))
    .find(l => {
      const el = l.exerciseLogs.find(e => e.exerciseId === effectiveExId)
      return el && Math.max(...el.sets.map(s => s.weight)) === record
    })
  const avg4w        = getAverageWeightLastWeeks(logs, effectiveExId, 4)
  const totalSessions = logs.filter(l =>
    l.exerciseLogs.some(el => el.exerciseId === effectiveExId)
  ).length

  return (
    <div style={{ padding: '0 20px 20px' }}>
      {/* Exercise selector */}
      <div style={{ marginBottom: 16 }}>
        <p style={{
          fontSize: 11, fontWeight: 700, color: 'var(--color-text-secondary)',
          letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 8,
        }}>
          Esercizio
        </p>
        <select
          value={effectiveExId}
          onChange={e => setSelectedExId(e.target.value)}
          style={{
            width: '100%',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 10,
            padding: '12px 14px',
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            fontFamily: 'inherit',
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238B8A96' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
            paddingRight: 36,
            cursor: 'pointer',
          }}
        >
          {plan.sessions.map(session => (
            <optgroup key={session.id} label={session.name}>
              {session.exercises.map(ex => (
                <option key={ex.id} value={ex.id}>{ex.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* Summary stats */}
      <SummaryStats
        record={record}
        recordDate={recordLog?.date ?? ''}
        avgLast4Weeks={avg4w}
        totalSessions={totalSessions}
      />

      {/* Chart */}
      <ProgressChart data={chartData} />

      {/* Session history */}
      <SessionHistoryList logs={logs} exerciseId={effectiveExId} />
    </div>
  )
}
