import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import BottomNav from './components/BottomNav'
import Alimentazione from './pages/Alimentazione'
import Allenamento from './pages/Allenamento'
import Settings from './pages/Settings'
import './index.css'

export default function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          height: '100%',
          backgroundColor: 'var(--color-bg)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <main style={{ flex: 1, overflowY: 'auto', paddingBottom: 80 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/alimentazione" replace />} />
            <Route path="/alimentazione" element={<Alimentazione />} />
            <Route path="/allenamento" element={<Allenamento />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        <BottomNav />
      </div>
    </BrowserRouter>
  )
}
