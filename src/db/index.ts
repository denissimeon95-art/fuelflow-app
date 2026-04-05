import Dexie, { type Table } from 'dexie'
import type { MealPlan, WorkoutPlan, WorkoutLog, AppSettings } from '../types'

class FuelFlowDB extends Dexie {
  mealPlans!: Table<MealPlan>
  workoutPlans!: Table<WorkoutPlan>
  workoutLogs!: Table<WorkoutLog>
  appSettings!: Table<AppSettings>

  constructor() {
    super('FuelFlowDB')
    this.version(1).stores({
      mealPlans: '++id, name, createdAt',
      workoutPlans: '++id, name, createdAt',
      workoutLogs: '++id, workoutPlanId, sessionId, date',
      appSettings: '++id, &key',
    })
  }
}

export const db = new FuelFlowDB()
