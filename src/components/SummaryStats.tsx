interface Props {
  record: number
  recordDate: string
  avgLast4Weeks: number
  totalSessions: number
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { day: 'numeric', month: 'short' })
}

export default function SummaryStats({ record, recordDate, avgLast4Weeks, totalSessions }: Props) {
  const cards = [
    {
      label: 'Record',
      value: record > 0 ? `${record} kg` : '— kg',
      sub: record > 0 ? fmtDate(recordDate) : 'nessuno',
      pr: true,
    },
    {
      label: 'Media 4 sett.',
      value: avgLast4Weeks > 0 ? `${avgLast4Weeks} kg` : '— kg',
      sub: 'carico medio',
      pr: false,
    },
    {
      label: 'Sessioni',
      value: String(totalSessions),
      sub: 'totali',
      pr: false,
    },
  ]

  return (
    <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
      {cards.map((c, i) => (
        <div key={i} style={{
          flex: 1,
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 12,
          padding: '12px 10px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {c.pr && record > 0 && (
            <span style={{
              position: 'absolute', top: 8, right: 8,
              fontSize: 9, fontWeight: 800,
              color: '#0F0F11',
              backgroundColor: 'var(--color-accent)',
              borderRadius: 4,
              padding: '1px 5px',
              letterSpacing: '0.05em',
            }}>
              PR
            </span>
          )}
          <p style={{ fontSize: 10, color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: 4, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            {c.label}
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1.1, marginBottom: 2 }}>
            {c.value}
          </p>
          <p style={{ fontSize: 10, color: 'var(--color-text-secondary)' }}>
            {c.sub}
          </p>
        </div>
      ))}
    </div>
  )
}
