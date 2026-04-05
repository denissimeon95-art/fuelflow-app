import { useLiveQuery } from 'dexie-react-hooks'
import { toast } from 'sonner'
import { CalendarBlank } from '@phosphor-icons/react'
import { db } from '../../db'

export default function CycleStartDatePicker() {
  const setting = useLiveQuery(() =>
    db.appSettings.where('key').equals('activeMealPlanId').first()
  )
  const plan = useLiveQuery(async () => {
    if (!setting) return null
    return db.mealPlans.get(Number(setting.value))
  }, [setting])

  if (!plan) return null

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newDate = e.target.value
    if (!plan?.id) return
    await db.mealPlans.update(plan.id, { cycleStartDate: newDate })
    toast.success('Data inizio ciclo aggiornata')
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <CalendarBlank size={20} color="var(--color-accent)" />
        <div>
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>
            Inizio ciclo alimentare
          </p>
          <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
            {new Date(plan.cycleStartDate).toLocaleDateString('it-IT', {
              day: 'numeric', month: 'long', year: 'numeric'
            })}
          </p>
        </div>
      </div>

      <input
        type="date"
        value={plan.cycleStartDate}
        onChange={handleChange}
        style={{
          backgroundColor: 'var(--color-surface-elevated)',
          border: '1px solid var(--color-border)',
          borderRadius: 8,
          padding: '6px 10px',
          color: 'var(--color-text-primary)',
          fontSize: 13,
          fontFamily: 'inherit',
          cursor: 'pointer',
          colorScheme: 'dark',
        }}
      />
    </div>
  )
}
