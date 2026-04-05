import type { Meal } from '../types'

const TIME_LABELS: Record<string, string> = {
  colazione: 'Colazione',
  spuntino:  'Spuntino',
  pranzo:    'Pranzo',
  cena:      'Cena',
}

function firstAltMacros(meal: Meal) {
  const alt = meal.alternatives[0]
  if (!alt) return null
  return alt.foods.reduce(
    (acc, f) => ({
      kcal:    acc.kcal    + (f.calories ?? 0),
      protein: acc.protein + (f.protein  ?? 0),
      carbs:   acc.carbs   + (f.carbs    ?? 0),
      fat:     acc.fat     + (f.fat      ?? 0),
    }),
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )
}

interface Props {
  meal: Meal
  onClick: () => void
}

export default function MealCard({ meal, onClick }: Props) {
  const macros = firstAltMacros(meal)

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        textAlign: 'left',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        padding: 16,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.07em',
            textTransform: 'uppercase',
            color: 'var(--color-text-secondary)',
            marginBottom: 3,
          }}>
            {TIME_LABELS[meal.timeOfDay] ?? meal.timeOfDay}
          </p>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {meal.name}
          </h3>
        </div>
        <span style={{
          fontSize: 11,
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-surface-elevated)',
          borderRadius: 6,
          padding: '3px 8px',
          flexShrink: 0,
          marginLeft: 8,
          marginTop: 2,
        }}>
          {meal.alternatives.length} alt.
        </span>
      </div>

      {/* Macro pills */}
      {macros && (
        <div style={{ display: 'flex', gap: 8 }}>
          {[
            { label: `${Math.round(macros.kcal)} kcal`, accent: true },
            { label: `P ${Math.round(macros.protein)}g` },
            { label: `C ${Math.round(macros.carbs)}g` },
            { label: `G ${Math.round(macros.fat)}g` },
          ].map((m, i) => (
            <span key={i} style={{
              fontSize: 11,
              fontWeight: m.accent ? 700 : 500,
              color: m.accent ? 'var(--color-accent)' : 'var(--color-text-secondary)',
              backgroundColor: m.accent ? 'rgba(168,224,99,0.10)' : 'transparent',
              borderRadius: 4,
              padding: m.accent ? '2px 6px' : '2px 0',
            }}>
              {m.label}
            </span>
          ))}
        </div>
      )}
    </button>
  )
}
