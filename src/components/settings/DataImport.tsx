import { useRef } from 'react'
import { toast } from 'sonner'
import { UploadSimple } from '@phosphor-icons/react'
import { db } from '../../db'
import type { MealPlan, WorkoutPlan, WorkoutLog, AppSettings } from '../../types'

interface BackupFile {
  version: number
  mealPlans: MealPlan[]
  workoutPlans: WorkoutPlan[]
  workoutLogs: WorkoutLog[]
  appSettings: AppSettings[]
}

function isValidBackup(data: unknown): data is BackupFile {
  if (typeof data !== 'object' || data === null) return false
  const d = data as Record<string, unknown>
  return (
    Array.isArray(d.mealPlans) &&
    Array.isArray(d.workoutPlans) &&
    Array.isArray(d.workoutLogs) &&
    Array.isArray(d.appSettings)
  )
}

export default function DataImport() {
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      if (!isValidBackup(data)) {
        toast.error('File non valido: struttura non riconosciuta')
        return
      }

      // Strip existing IDs to let Dexie auto-assign new ones,
      // then restore appSettings as-is (they use keys not IDs)
      const stripId = <T extends { id?: number }>(arr: T[]) =>
        arr.map(({ id: _id, ...rest }) => rest) as T[]

      await db.transaction('rw', [db.mealPlans, db.workoutPlans, db.workoutLogs, db.appSettings], async () => {
        await db.mealPlans.clear()
        await db.workoutPlans.clear()
        await db.workoutLogs.clear()
        await db.appSettings.clear()

        await db.mealPlans.bulkAdd(stripId(data.mealPlans) as Parameters<typeof db.mealPlans.bulkAdd>[0])
        await db.workoutPlans.bulkAdd(stripId(data.workoutPlans) as Parameters<typeof db.workoutPlans.bulkAdd>[0])
        await db.workoutLogs.bulkAdd(stripId(data.workoutLogs) as Parameters<typeof db.workoutLogs.bulkAdd>[0])
        for (const s of data.appSettings) {
          await db.appSettings.put({ key: s.key, value: s.value })
        }
      })

      toast.success('Dati importati con successo')
      setTimeout(() => window.location.reload(), 800)
    } catch (err: any) {
      toast.error(err.message ?? 'Errore durante l\'importazione')
    }
  }

  return (
    <button
      onClick={() => inputRef.current?.click()}
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
      <UploadSimple size={20} color="var(--color-accent)" />
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          Importa dati
        </p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
          Ripristina da file JSON di backup
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".json"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </button>
  )
}
