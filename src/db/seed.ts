import { db } from './index'
import { mockMealPlan, mockWorkoutPlan } from './mockData'

export async function seedIfEmpty() {
  const [mealCount, workoutCount] = await Promise.all([
    db.mealPlans.count(),
    db.workoutPlans.count(),
  ])

  if (mealCount === 0) {
    const id = await db.mealPlans.add(mockMealPlan as Parameters<typeof db.mealPlans.add>[0])
    await db.appSettings.put({ key: 'activeMealPlanId', value: String(id) })
  }

  if (workoutCount === 0) {
    const id = await db.workoutPlans.add(mockWorkoutPlan as Parameters<typeof db.workoutPlans.add>[0])
    await db.appSettings.put({ key: 'activeWorkoutPlanId', value: String(id) })
  }
}
