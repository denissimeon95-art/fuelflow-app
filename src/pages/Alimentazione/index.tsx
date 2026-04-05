import { useState, useEffect } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '../../db'
import type { Meal, MealPlan, DayPlan } from '../../types'
import MealCard from '../../components/MealCard'
import MealDetailSheet from '../../components/MealDetailSheet'
import EmptyState from '../../components/EmptyState'

// ── helpers ───────────────────────────────────────────────────────

function formatDate(d: Date): string {
  return d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })
    .replace(/^\w/, c => c.toUpperCase())
}

function calcCycleDay(plan: MealPlan): number {
  const start = new Date(plan.cycleStartDate)
  start.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const diff = Math.floor((today.getTime() - start.getTime()) / 86_400_000)
  return (((diff % 5) + 5) % 5) + 1
}

function dayMacros(day: DayPlan) {
  let kcal = 0, protein = 0, carbs = 0, fat = 0
  for (const meal of day.meals) {
    const alt = meal.alternatives[0]
    if (!alt) continue
    for (const f of alt.foods) {
      kcal    += f.calories ?? 0
      protein += f.protein  ?? 0
      carbs   += f.carbs    ?? 0
      fat     += f.fat      ?? 0
    }
  }
  return { kcal: Math.round(kcal), protein: Math.round(protein), carbs: Math.round(carbs), fat: Math.round(fat) }
}

// Canonical meal display order
const MEAL_ORDER = ['Colazione', 'Spuntino Mattina', 'Pranzo', 'Spuntino Pomeriggio', 'Cena']
function sortMeals(meals: Meal[]): Meal[] {
  return [...meals].sort((a, b) => {
    const ai = MEAL_ORDER.indexOf(a.name)
    const bi = MEAL_ORDER.indexOf(b.name)
    if (ai === -1 && bi === -1) return 0
    if (ai === -1) return 1
    if (bi === -1) return -1
    return ai - bi
  })
}

// ── component ─────────────────────────────────────────────────────

export default function Alimentazione() {
  const activeIdSetting = useLiveQuery(() =>
    db.appSettings.where('key').equals('activeMealPlanId').first()
  )
  const activePlan = useLiveQuery(async () => {
    if (!activeIdSetting) return undefined
    return db.mealPlans.get(Number(activeIdSetting.value))
  }, [activeIdSetting])

  const today = new Date()
  const cycleDay = activePlan ? calcCycleDay(activePlan) : 1

  const [viewDay, setViewDay]       = useState<number | null>(null)
  const [selectedMeal, setSelected] = useState<Meal | null>(null)

  // Sync viewDay to real cycle day when plan loads
  useEffect(() => {
    if (activePlan) setViewDay(calcCycleDay(activePlan))
  }, [activePlan?.id])

  if (activeIdSetting === undefined || activePlan === undefined) {
    return <div style={{ padding: 24, color: 'var(--color-text-secondary)', fontSize: 14 }}>Caricamento…</div>
  }
  if (!activePlan) return <EmptyState />

  const currentViewDay = viewDay ?? cycleDay
  const dayPlan = activePlan.days.find(d => d.dayNumber === currentViewDay)
  const meals   = dayPlan ? sortMeals(dayPlan.meals) : []
  const macros  = dayPlan ? dayMacros(dayPlan) : null

  return (
    <>
      <div style={{ padding: '16px 20px 0' }}>

        {/* ── Header ──────────────────────────────── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Alimentazione
          </h1>
          <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
            {formatDate(today)}
          </span>
        </div>

        {/* ── Cycle day banner ─────────────────────── */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <div>
            <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Ciclo attivo
            </p>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', marginTop: 2 }}>
              Giorno <span style={{ color: 'var(--color-accent)' }}>{cycleDay}</span> di 5
            </p>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[1,2,3,4,5].map(d => (
              <div key={d} style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: d === cycleDay ? 'var(--color-accent)' : 'var(--color-border)',
                transition: 'background-color 0.2s',
              }} />
            ))}
          </div>
        </div>

        {/* ── Macro summary card ───────────────────── */}
        {macros && (
          <div style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: '14px 16px',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 16,
          }}>
            {[
              { label: 'Kcal',     value: macros.kcal     },
              { label: 'Proteine', value: `${macros.protein}g` },
              { label: 'Carbo',    value: `${macros.carbs}g`   },
              { label: 'Grassi',   value: `${macros.fat}g`     },
            ].map((m, i) => (
              <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                <p style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: 'var(--color-accent)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {m.value}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* ── Week navigator ───────────────────────── */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          {[1,2,3,4,5].map(d => {
            const isActive = d === currentViewDay
            return (
              <button
                key={d}
                onClick={() => setViewDay(d)}
                style={{
                  flex: 1,
                  height: 36,
                  borderRadius: 8,
                  border: `1px solid ${isActive ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  backgroundColor: isActive ? 'var(--color-accent)' : 'transparent',
                  color: isActive ? '#0F0F11' : 'var(--color-text-secondary)',
                  fontSize: 13,
                  fontWeight: isActive ? 700 : 500,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                G{d}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Meal list ───────────────────────────────── */}
      <div style={{ padding: '0 20px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {meals.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)', fontSize: 14 }}>
            Nessun pasto per questo giorno.
          </p>
        ) : (
          meals.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onClick={() => setSelected(meal)}
            />
          ))
        )}
      </div>

      {/* ── Detail sheet ────────────────────────────── */}
      <MealDetailSheet
        meal={selectedMeal}
        onClose={() => setSelected(null)}
      />
    </>
  )
}
