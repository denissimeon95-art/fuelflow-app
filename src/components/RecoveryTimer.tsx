import { useState, useEffect, useRef, useCallback } from 'react'
import { Timer } from '@phosphor-icons/react'

const PRESETS = [60, 90, 120, 180]
const SIZE = 72
const STROKE = 6
const R = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * R

export default function RecoveryTimer() {
  const [open, setOpen]         = useState(false)
  const [selected, setSelected] = useState(90)
  const [remaining, setRemaining] = useState<number | null>(null)
  const [flashing, setFlashing]   = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const start = useCallback((secs: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setRemaining(secs)
    intervalRef.current = setInterval(() => {
      setRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(intervalRef.current!)
          // vibrate & flash
          navigator.vibrate?.([200, 100, 200])
          setFlashing(true)
          setTimeout(() => setFlashing(false), 1500)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }, [])

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  const isRunning = remaining !== null && remaining > 0
  const progress  = remaining !== null ? remaining / selected : 0
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  const fmtTime = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`

  return (
    <div>
      {/* Toggle button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'transparent',
          border: `1px solid ${isRunning ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: 8,
          padding: '7px 14px',
          color: isRunning ? 'var(--color-accent)' : 'var(--color-text-secondary)',
          fontSize: 13,
          fontWeight: 500,
          fontFamily: 'inherit',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}
      >
        <Timer size={16} weight={isRunning ? 'fill' : 'regular'} />
        {isRunning ? fmtTime(remaining!) : 'Recupero'}
      </button>

      {/* Panel */}
      {open && (
        <div style={{
          marginTop: 10,
          backgroundColor: 'var(--color-surface-elevated)',
          border: `1px solid ${flashing ? 'var(--color-accent)' : 'var(--color-border)'}`,
          borderRadius: 12,
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
          transition: 'border-color 0.3s',
        }}>
          {/* Preset buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {PRESETS.map(s => (
              <button
                key={s}
                onClick={() => setSelected(s)}
                style={{
                  padding: '5px 12px',
                  borderRadius: 7,
                  border: `1px solid ${selected === s ? 'var(--color-accent)' : 'var(--color-border)'}`,
                  background: selected === s ? 'rgba(168,224,99,0.12)' : 'transparent',
                  color: selected === s ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                  fontSize: 13,
                  fontWeight: selected === s ? 700 : 400,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                {s}s
              </button>
            ))}
          </div>

          {/* SVG circle countdown */}
          <div style={{ position: 'relative', width: SIZE, height: SIZE }}>
            <svg width={SIZE} height={SIZE} style={{ transform: 'rotate(-90deg)' }}>
              {/* Track */}
              <circle
                cx={SIZE / 2} cy={SIZE / 2} r={R}
                fill="none"
                stroke="var(--color-border)"
                strokeWidth={STROKE}
              />
              {/* Progress */}
              <circle
                cx={SIZE / 2} cy={SIZE / 2} r={R}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={STROKE}
                strokeLinecap="round"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={dashOffset}
                style={{ transition: 'stroke-dashoffset 1s linear' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 16,
              fontWeight: 700,
              color: remaining === 0 ? 'var(--color-accent)' : 'var(--color-text-primary)',
            }}>
              {remaining !== null ? fmtTime(remaining) : fmtTime(selected)}
            </div>
          </div>

          {/* Start / Reset */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => start(selected)}
              style={{
                padding: '8px 20px',
                backgroundColor: 'var(--color-accent)',
                color: '#0F0F11',
                border: 'none',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 700,
                fontFamily: 'inherit',
                cursor: 'pointer',
              }}
            >
              {isRunning ? 'Ricomincia' : 'Avvia'}
            </button>
            {remaining !== null && (
              <button
                onClick={() => { if (intervalRef.current) clearInterval(intervalRef.current); setRemaining(null) }}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  border: '1px solid var(--color-border)',
                  borderRadius: 8,
                  color: 'var(--color-text-secondary)',
                  fontSize: 13,
                  fontFamily: 'inherit',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
