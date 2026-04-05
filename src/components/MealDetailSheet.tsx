import { useEffect, useRef } from 'react'
import type { Meal, FoodAlternative } from '../types'

interface Props {
  meal: Meal | null
  onClose: () => void
}

function sumMacros(alt: FoodAlternative) {
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

export default function MealDetailSheet({ meal, onClose }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)

  const isOpen = meal !== null

  // Swipe-down to close
  function handleTouchStart(e: React.TouchEvent) {
    startY.current = e.touches[0].clientY
  }
  function handleTouchEnd(e: React.TouchEvent) {
    if (startY.current === null) return
    const delta = e.changedTouches[0].clientY - startY.current
    if (delta > 60) onClose()
    startY.current = null
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 100,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.25s ease',
        }}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 101,
          backgroundColor: 'var(--color-surface)',
          borderRadius: '20px 20px 0 0',
          maxHeight: '85dvh',
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s cubic-bezier(0.32, 0.72, 0, 1)',
        }}
      >
        {/* Handle */}
        <div style={{ padding: '12px 0 4px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: 'var(--color-border)' }} />
        </div>

        {/* Header */}
        <div style={{
          padding: '8px 20px 16px',
          borderBottom: '1px solid var(--color-border)',
          flexShrink: 0,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)' }}>
            {meal?.name}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>
            {meal?.alternatives.length} alternative disponibili
          </p>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', padding: '16px 20px 32px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {meal?.alternatives.map((alt, idx) => {
            const macros = sumMacros(alt)
            const hasMacros = alt.foods.some(f => f.calories !== undefined)

            return (
              <div
                key={alt.id}
                style={{
                  backgroundColor: 'var(--color-surface-elevated)',
                  borderRadius: 12,
                  borderLeft: '3px solid var(--color-accent)',
                  overflow: 'hidden',
                }}
              >
                {/* Alt header */}
                <div style={{ padding: '12px 14px 8px' }}>
                  <span style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                  }}>
                    Alternativa {idx + 1}
                  </span>
                </div>

                {/* Food list */}
                <div style={{ padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {alt.foods.map((food, fi) => (
                    <div
                      key={fi}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        paddingBottom: 6,
                        borderBottom: fi < alt.foods.length - 1
                          ? '1px solid var(--color-border)'
                          : 'none',
                      }}
                    >
                      <span style={{ fontSize: 14, color: 'var(--color-text-primary)', flex: 1 }}>
                        {food.name}
                      </span>
                      <span style={{
                        fontSize: 13,
                        color: 'var(--color-text-secondary)',
                        fontVariantNumeric: 'tabular-nums',
                        marginLeft: 12,
                      }}>
                        {food.quantity}{food.unit}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Macro totals */}
                {hasMacros && (
                  <div style={{
                    display: 'flex',
                    gap: 8,
                    padding: '10px 14px 12px',
                    marginTop: 4,
                    borderTop: '1px solid var(--color-border)',
                  }}>
                    {[
                      { label: 'kcal', value: Math.round(macros.kcal) },
                      { label: 'P',    value: `${Math.round(macros.protein)}g` },
                      { label: 'C',    value: `${Math.round(macros.carbs)}g`   },
                      { label: 'G',    value: `${Math.round(macros.fat)}g`     },
                    ].map(m => (
                      <div key={m.label} style={{
                        flex: 1,
                        textAlign: 'center',
                        padding: '4px 0',
                        borderRadius: 6,
                        backgroundColor: 'var(--color-surface)',
                      }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-accent)' }}>
                          {m.value}
                        </div>
                        <div style={{ fontSize: 10, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
