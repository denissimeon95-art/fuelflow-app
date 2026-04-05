import { toast } from 'sonner'
import { Export } from '@phosphor-icons/react'
import { db } from '../../db'

export default function DataExport() {
  async function handleExport() {
    try {
      const [mealPlans, workoutPlans, workoutLogs, appSettings] = await Promise.all([
        db.mealPlans.toArray(),
        db.workoutPlans.toArray(),
        db.workoutLogs.toArray(),
        db.appSettings.toArray(),
      ])

      const backup = {
        exportedAt: new Date().toISOString(),
        version: 1,
        mealPlans,
        workoutPlans,
        workoutLogs,
        appSettings,
      }

      const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      const date = new Date().toISOString().split('T')[0]
      a.href = url
      a.download = `fuelflow-backup-${date}.json`
      a.click()
      URL.revokeObjectURL(url)
      toast.success('Backup esportato')
    } catch {
      toast.error('Errore durante l\'esportazione')
    }
  }

  return (
    <button
      onClick={handleExport}
      style={{
        display: 'flex', alignItems: 'center', gap: 14,
        width: '100%', padding: '14px 16px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
    >
      <Export size={20} color="var(--color-accent)" />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Esporta dati (JSON)
        </p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
          Scarica backup di piani, log e impostazioni
        </p>
      </div>
    </button>
  )
}
