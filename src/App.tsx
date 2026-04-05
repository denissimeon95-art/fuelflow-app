import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import BottomNav from './components/BottomNav'
import Alimentazione from './pages/Alimentazione'
import Allenamento from './pages/Allenamento'
import SessionePage from './pages/Allenamento/SessionePage'
import Settings from './pages/Settings'
import WorkoutPlanEditor from './pages/WorkoutPlanEditor'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div style={{
        height: '100%',
        backgroundColor: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}>
        <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/alimentazione" replace />} />
            <Route path="/alimentazione" element={<Alimentazione />} />
            <Route path="/allenamento" element={<Allenamento />} />
            <Route path="/allenamento/sessione/:sessionId" element={<SessionePage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/scheda/:id" element={<WorkoutPlanEditor />} />
          </Routes>
        </main>
        <BottomNav />
      </div>

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
