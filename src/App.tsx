import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { Toaster } from 'sonner'
import { useOnline } from './hooks/useOnline'
import BottomNav from './components/BottomNav'
import OfflineBanner from './components/OfflineBanner'
import Alimentazione from './pages/Alimentazione'
import Allenamento from './pages/Allenamento'
import SessionePage from './pages/Allenamento/SessionePage'
import Settings from './pages/Settings'
import WorkoutPlanEditor from './pages/WorkoutPlanEditor'
import './index.css'

// ── Page wrapper: fade-in on route change ──────────────────────────
function PageTransition({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div key={pathname} className="page-transition" style={{ height: '100%' }}>
      {children}
    </div>
  )
}

// ── Inner app (needs router context) ──────────────────────────────
function AppInner() {
  const online = useOnline()

  return (
    <div style={{
      height: '100%',
      backgroundColor: 'var(--color-bg)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      // Push content down when offline banner is visible
      paddingTop: online ? 0 : 32,
      transition: 'padding-top 0.2s ease',
    }}>
      <OfflineBanner />

      <main style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        // Account for bottom nav + safe area
        paddingBottom: 'calc(80px + env(safe-area-inset-bottom))',
        WebkitOverflowScrolling: 'touch',
      }}>
        <PageTransition>
          <Routes>
            <Route path="/"                           element={<Navigate to="/alimentazione" replace />} />
            <Route path="/alimentazione"              element={<Alimentazione />} />
            <Route path="/allenamento"                element={<Allenamento />} />
            <Route path="/allenamento/sessione/:sessionId" element={<SessionePage />} />
            <Route path="/settings"                   element={<Settings />} />
            <Route path="/settings/scheda/:id"        element={<WorkoutPlanEditor />} />
          </Routes>
        </PageTransition>
      </main>

      <BottomNav />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
      <Toaster
        position="bottom-center"
        offset={88}
        toastOptions={{
          style: {
            backgroundColor: 'var(--color-surface-elevated)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 13,
          },
        }}
      />
    </BrowserRouter>
  )
}
