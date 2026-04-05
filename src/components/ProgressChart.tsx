import {
  ResponsiveContainer, XAxis, YAxis,
  CartesianGrid, Tooltip, Area, AreaChart,
} from 'recharts'
import type { ChartPoint } from '../utils/progressUtils'

interface Props {
  data: ChartPoint[]
}

function fmtAxisDate(iso: string) {
  const [, m, d] = iso.split('-')
  return `${d}/${m}`
}

function fmtFullDate(iso: string) {
  return new Date(iso).toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric', month: 'short' })
}

function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.length) return null
  const d = payload[0].payload as ChartPoint
  return (
    <div style={{
      backgroundColor: 'var(--color-surface-elevated)',
      border: '1px solid var(--color-border)',
      borderRadius: 8,
      padding: '10px 12px',
    }}>
      <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginBottom: 4 }}>
        {fmtFullDate(d.date)}
      </p>
      <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-accent)' }}>
        {d.maxWeight} kg
      </p>
      <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>
        {d.totalSets} serie · Vol. {d.volume} kg
      </p>
    </div>
  )
}

export default function ProgressChart({ data }: Props) {
  if (data.length < 2) {
    return (
      <div style={{
        height: 160,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 12,
        marginBottom: 20,
      }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Servono almeno 2 sessioni per il grafico
        </p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: '16px 4px 8px',
      marginBottom: 20,
    }}>
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top: 4, right: 16, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#A8E063" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#A8E063" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#2C2C35" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="date"
            tickFormatter={fmtAxisDate}
            tick={{ fontSize: 11, fill: '#8B8A96', fontFamily: 'DM Sans, sans-serif' }}
            axisLine={false}
            tickLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            tick={{ fontSize: 11, fill: '#8B8A96', fontFamily: 'DM Sans, sans-serif' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `${v}`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2C2C35', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="maxWeight"
            stroke="#A8E063"
            strokeWidth={2}
            fill="url(#accentGrad)"
            dot={{ fill: '#A8E063', r: 4, strokeWidth: 0 }}
            activeDot={{ fill: '#BEF07A', r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
