import type { WorkoutLog, SetLog } from '../types'

export interface ChartPoint {
  date: string        // ISO date
  maxWeight: number
  totalSets: number
  volume: number
}

export function getTotalVolume(sets: SetLog[]): number {
  return sets.reduce((acc, s) => acc + s.weight * s.reps, 0)
}

export function getMaxWeight(logs: WorkoutLog[], exerciseId: string): number {
  let max = 0
  for (const log of logs) {
    const el = log.exerciseLogs.find(el => el.exerciseId === exerciseId)
    if (!el) continue
    for (const s of el.sets) {
      if (s.weight > max) max = s.weight
    }
  }
  return max
}

export function getAverageWeightLastWeeks(
  logs: WorkoutLog[],
  exerciseId: string,
  weeks: number
): number {
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - weeks * 7)
  const cutoffStr = cutoff.toISOString().split('T')[0]

  const relevant = logs.filter(l => l.date >= cutoffStr)
  if (!relevant.length) return 0

  let total = 0
  let count = 0
  for (const log of relevant) {
    const el = log.exerciseLogs.find(el => el.exerciseId === exerciseId)
    if (!el) continue
    const max = Math.max(...el.sets.map(s => s.weight))
    if (max > 0) { total += max; count++ }
  }
  return count ? Math.round((total / count) * 10) / 10 : 0
}

export function isPR(log: WorkoutLog, allLogs: WorkoutLog[], exerciseId: string): boolean {
  const el = log.exerciseLogs.find(e => e.exerciseId === exerciseId)
  if (!el) return false
  const thisMax = Math.max(...el.sets.map(s => s.weight))
  const priorMax = allLogs
    .filter(l => l.date < log.date)
    .reduce((best, l) => {
      const e = l.exerciseLogs.find(e => e.exerciseId === exerciseId)
      if (!e) return best
      return Math.max(best, ...e.sets.map(s => s.weight))
    }, 0)
  return thisMax > priorMax
}

export function buildChartData(logs: WorkoutLog[], exerciseId: string): ChartPoint[] {
  return logs
    .filter(l => l.exerciseLogs.some(el => el.exerciseId === exerciseId))
    .sort((a, b) => a.date.localeCompare(b.date))
    .map(log => {
      const el = log.exerciseLogs.find(el => el.exerciseId === exerciseId)!
      return {
        date: log.date,
        maxWeight: Math.max(...el.sets.map(s => s.weight)),
        totalSets: el.sets.length,
        volume: getTotalVolume(el.sets),
      }
    })
}
