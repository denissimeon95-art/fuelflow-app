export type TimeOfDay = 'colazione' | 'pranzo' | 'cena' | 'spuntino'
export type WeightUnit = 'kg' | 'lbs'

export interface FoodItem {
  name: string
  quantity: number
  unit: string
  calories?: number
  protein?: number
  carbs?: number
  fat?: number
}

export interface FoodAlternative {
  id: string
  foods: FoodItem[]
}

export interface Meal {
  id: string
  name: string
  timeOfDay: TimeOfDay
  alternatives: FoodAlternative[]
}

export interface DayPlan {
  dayNumber: number
  meals: Meal[]
}

export interface MealPlan {
  id?: number
  name: string
  createdAt: string
  cycleStartDate: string
  cycleLength: 5
  days: DayPlan[]
}

export interface Exercise {
  id: string
  name: string
  muscleGroups: string[]
  sets: number
  reps: string
  notes?: string
}

export interface WorkoutSession {
  id: string
  name: string
  exercises: Exercise[]
}

export interface WorkoutPlan {
  id?: number
  name: string
  createdAt: string
  sessions: WorkoutSession[]
}

export interface SetLog {
  setNumber: number
  reps: number
  weight: number
  unit: WeightUnit
  notes?: string
}

export interface ExerciseLog {
  exerciseId: string
  exerciseName: string
  sets: SetLog[]
}

export interface WorkoutLog {
  id?: number
  workoutPlanId: number
  sessionId: string
  sessionName: string
  date: string
  exerciseLogs: ExerciseLog[]
}

export interface AppSettings {
  id?: number
  key: string
  value: string
}
