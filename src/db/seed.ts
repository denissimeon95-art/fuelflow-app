import { db } from './index'
import { mockMealPlan } from './mockData'

export async function seedIfEmpty() {
  const count = await db.mealPlans.count()
  if (count > 0) return

  const id = await db.mealPlans.add(mockMealPlan as Parameters<typeof db.mealPlans.add>[0])
  await db.appSettings.put({ key: 'activeMealPlanId', value: String(id) })
}
