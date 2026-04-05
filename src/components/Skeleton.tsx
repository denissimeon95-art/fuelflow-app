import type { CSSProperties } from 'react'

interface SkeletonProps {
  width?: string | number
  height?: number
  radius?: number
  style?: CSSProperties
}

export function Skeleton({ width = '100%', height = 16, radius = 6, style }: SkeletonProps) {
  return (
    <div style={{
      width,
      height,
      borderRadius: radius,
      backgroundColor: 'var(--color-surface-elevated)',
      animation: 'skeleton-pulse 1.4s ease-in-out infinite',
      ...style,
    }} />
  )
}

// Pre-built skeletons for common patterns
export function CardSkeleton({ height = 80 }: { height?: number }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <Skeleton width="60%" height={18} />
      <Skeleton width="40%" height={13} />
      {height > 80 && <Skeleton width="80%" height={13} />}
    </div>
  )
}

export function MealCardSkeleton() {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 12,
      padding: 16,
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Skeleton width={60} height={10} />
          <Skeleton width={120} height={16} />
        </div>
        <Skeleton width={40} height={22} radius={6} />
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <Skeleton width={70} height={20} radius={4} />
        <Skeleton width={50} height={20} radius={4} />
        <Skeleton width={50} height={20} radius={4} />
      </div>
    </div>
  )
}
