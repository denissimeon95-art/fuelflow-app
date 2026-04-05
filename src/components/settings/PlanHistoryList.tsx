import { useLiveQuery } from 'dexie-react-hooks'
import { toast } from 'sonner'
import { ClockCounterClockwise } from '@phosphor-icons/react'
import { db } from '../../db'

export default function PlanHistoryList() {
  const plans = useLiveQuery(() =>
    db.mealPlans.orderBy('createdAt').reverse().toArray()
  )
  const activeSetting = useLiveQuery(() =>
    db.appSettings.where('key').equals('activeMealPlanId').first()
  )

  if (!plans || plans.length === 0) return null

  const activeId = activeSetting ? Number(activeSetting.value) : null

  async function restore(id: number) {
    await db.appSettings.put({ key: 'activeMealPlanId', value: String(id) })
    // reset cycleStartDate to today
    await db.mealPlans.where('id').equals(id).modify({ cycleStartDate: new Date().toISOString().split('T')[0] })
    toast.success('Piano ripristinato e ciclo resettato a oggi')
  }

  return (
    <div>
      <p style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
        textTransform: 'uppercase', color: 'var(--color-text-secondary)',
        marginBottom: 8, paddingLeft: 4,
      }}>
        Piani precedenti
      </p>

      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {plans.map((plan, i) => {
          const isActive = plan.id === activeId
          const isLast = i === plans.length - 1
          return (
            <div
              key={plan.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
              }}
            >
              <ClockCounterClockwise size={18} color="var(--color-text-secondary)" style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{
                  fontSize: 14, fontWeight: 600,
                  color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {plan.name}
                  {isActive && ' ✓'}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  {new Date(plan.createdAt).toLocaleDateString('it-IT')}
                </p>
              </div>
              {!isActive && (
                <button
                  onClick={() => restore(plan.id!)}
                  style={{
                    padding: '6px 12px', borderRadius: 7,
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'transparent',
                    color: 'var(--color-text-primary)',
                    fontSize: 12, fontWeight: 600,
                    fontFamily: 'inherit', cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  Ripristina
                </button>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
