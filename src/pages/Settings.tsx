import { useState } from 'react'
import { ForkKnife, Barbell, Gear } from '@phosphor-icons/react'
import ActivePlanCard from '../components/settings/ActivePlanCard'
import PDFUploadFlow from '../components/settings/PDFUploadFlow'
import PlanHistoryList from '../components/settings/PlanHistoryList'
import WorkoutPlanCard from '../components/settings/WorkoutPlanCard'
import CycleStartDatePicker from '../components/settings/CycleStartDatePicker'
import DataExport from '../components/settings/DataExport'
import DataImport from '../components/settings/DataImport'

// ── section layout helpers ─────────────────────────────────────────

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
      {icon}
      <p style={{
        fontSize: 11, fontWeight: 700,
        letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'var(--color-text-secondary)',
      }}>
        {children}
      </p>
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: 'var(--color-border)', margin: '28px 0' }} />
}

// ── main component ─────────────────────────────────────────────────

export default function Settings() {
  const [showPDFFlow, setShowPDFFlow] = useState(false)

  return (
    <>
      <div style={{ padding: '16px 20px 48px' }}>

        {/* Header */}
        <h1 style={{
          fontSize: 22, fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 28,
        }}>
          Impostazioni
        </h1>

        {/* ── Sezione 1: Piano Alimentare ───────────────── */}
        <section>
          <SectionTitle icon={<ForkKnife size={14} color="var(--color-text-secondary)" />}>
            Piano Alimentare
          </SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ActivePlanCard onChangePlan={() => setShowPDFFlow(true)} />
            <CycleStartDatePicker />
            <PlanHistoryList />
          </div>
        </section>

        <Divider />

        {/* ── Sezione 2: Scheda Allenamento ─────────────── */}
        <section>
          <SectionTitle icon={<Barbell size={14} color="var(--color-text-secondary)" />}>
            Scheda Allenamento
          </SectionTitle>

          <WorkoutPlanCard />
        </section>

        <Divider />

        {/* ── Sezione 3: App ────────────────────────────── */}
        <section>
          <SectionTitle icon={<Gear size={14} color="var(--color-text-secondary)" />}>
            App
          </SectionTitle>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <DataExport />
            <DataImport />
          </div>
        </section>
      </div>

      {/* PDF Upload Flow (bottom sheet) */}
      {showPDFFlow && (
        <PDFUploadFlow onClose={() => setShowPDFFlow(false)} />
      )}
    </>
  )
}
