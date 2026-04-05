import { useState, useRef } from 'react'
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist'
import { toast } from 'sonner'
import { useOnline } from '../../hooks/useOnline'
import {
  FilePdf,
  SpinnerGap,
  CheckCircle,
  ArrowCounterClockwise,
  CaretDown,
  CaretRight,
} from '@phosphor-icons/react'
import { db } from '../../db'
import type { MealPlan } from '../../types'

// Configure PDF.js worker (Vite URL import)
GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).href

// ── helpers ────────────────────────────────────────────────────────

async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await getDocument({ data: arrayBuffer }).promise
  let fullText = ''
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const content = await page.getTextContent()
    fullText += content.items.map((item: any) => item.str).join(' ') + '\n'
  }
  return fullText
}

async function parsePlanWithClaude(rawText: string): Promise<MealPlan> {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('VITE_ANTHROPIC_API_KEY non configurata')

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4000,
      system: `Sei un assistente che estrae piani alimentari da testo. Rispondi SOLO con JSON valido, senza markdown, senza backtick, senza testo aggiuntivo. Schema richiesto: { name: string, cycleLength: 5, days: [{ dayNumber: number, meals: [{ id: string, name: string, timeOfDay: "colazione"|"pranzo"|"cena"|"spuntino", alternatives: [{ id: string, foods: [{ name: string, quantity: number, unit: string, calories?: number, protein?: number, carbs?: number, fat?: number }] }] }] }] }`,
      messages: [{ role: 'user', content: rawText }],
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Claude API error ${response.status}: ${err}`)
  }

  const data = await response.json()
  const text = data.content?.[0]?.text ?? ''

  try {
    return JSON.parse(text) as MealPlan
  } catch {
    throw new Error(`JSON non valido:\n${text}`)
  }
}

// ── sub-components ─────────────────────────────────────────────────

function DayAccordion({ day }: { day: MealPlan['days'][number] }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{
      border: '1px solid var(--color-border)',
      borderRadius: 10,
      overflow: 'hidden',
      marginBottom: 8,
    }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '12px 14px',
          background: 'var(--color-surface-elevated)',
          border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>
          Giorno {day.dayNumber} · {day.meals.length} pasti
        </p>
        {open
          ? <CaretDown size={16} color="var(--color-text-secondary)" />
          : <CaretRight size={16} color="var(--color-text-secondary)" />
        }
      </button>

      {open && (
        <div style={{ padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {day.meals.map(meal => (
            <div key={meal.id}>
              <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)', marginBottom: 4 }}>
                {meal.name}
              </p>
              {meal.alternatives[0]?.foods.map((food, i) => (
                <p key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginLeft: 8 }}>
                  · {food.name} {food.quantity}{food.unit}
                  {food.calories ? ` — ${food.calories} kcal` : ''}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── main component ─────────────────────────────────────────────────

type Step = 'upload' | 'parsing' | 'preview'

interface Props {
  onClose: () => void
}

export default function PDFUploadFlow({ onClose }: Props) {
  const online = useOnline()
  const [step, setStep] = useState<Step>('upload')
  const [dragOver, setDragOver] = useState(false)
  const [parsedPlan, setParsedPlan] = useState<MealPlan | null>(null)
  const [rawText, setRawText] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function processFile(file: File) {
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      toast.error('Seleziona un file PDF')
      return
    }
    if (!online) {
      toast.error('Connessione necessaria per analizzare il PDF con Claude')
      return
    }
    setStep('parsing')
    try {
      const text = await extractTextFromPDF(file)
      setRawText(text)
      const plan = await parsePlanWithClaude(text)
      setParsedPlan({ ...plan, createdAt: new Date().toISOString(), cycleStartDate: new Date().toISOString().split('T')[0] })
      setStep('preview')
    } catch (err: any) {
      toast.error(err.message ?? 'Errore durante il parsing')
      setStep('upload')
    }
  }

  async function handleConfirm() {
    if (!parsedPlan) return
    const id = await db.mealPlans.add(parsedPlan as Parameters<typeof db.mealPlans.add>[0])
    await db.appSettings.put({ key: 'activeMealPlanId', value: String(id) })
    toast.success('Piano salvato e impostato come attivo')
    onClose()
  }

  // ── Step 1: Upload ─────────────────────────────────────────────
  const uploadStep = (
    <div
      onDragOver={e => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => {
        e.preventDefault()
        setDragOver(false)
        const file = e.dataTransfer.files[0]
        if (file) processFile(file)
      }}
      onClick={() => fileInputRef.current?.click()}
      style={{
        border: `2px dashed ${dragOver ? 'var(--color-accent)' : 'var(--color-border)'}`,
        borderRadius: 14,
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        cursor: 'pointer',
        backgroundColor: dragOver ? 'rgba(168,224,99,0.05)' : 'transparent',
        transition: 'all 0.15s',
      }}
    >
      <FilePdf size={48} color="var(--color-accent)" />
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', textAlign: 'center' }}>
        Carica il PDF del tuo piano alimentare
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        Trascina qui o tocca per selezionare
      </p>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf"
        style={{ display: 'none' }}
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) processFile(file)
        }}
      />
    </div>
  )

  // ── Step 2: Parsing ────────────────────────────────────────────
  const parsingStep = (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      gap: 20, padding: '40px 20px',
    }}>
      <SpinnerGap size={48} color="var(--color-accent)" style={{ animation: 'spin 1s linear infinite' }} />
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
        Sto analizzando il piano...
      </p>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', textAlign: 'center' }}>
        Claude sta estraendo pasti e macros dal PDF
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )

  // ── Step 3: Preview ────────────────────────────────────────────
  const previewStep = parsedPlan && (
    <div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        marginBottom: 16, padding: '10px 14px',
        backgroundColor: 'rgba(168,224,99,0.08)',
        borderRadius: 10, border: '1px solid rgba(168,224,99,0.2)',
      }}>
        <CheckCircle size={18} color="var(--color-accent)" weight="fill" />
        <div>
          <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-accent)' }}>
            {parsedPlan.name}
          </p>
          <p style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>
            {parsedPlan.days.length} giorni estratti
          </p>
        </div>
      </div>

      <div style={{ maxHeight: '40vh', overflowY: 'auto', marginBottom: 16 }}>
        {parsedPlan.days.map(day => <DayAccordion key={day.dayNumber} day={day} />)}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={() => setStep('upload')}
          style={{
            flex: 1, padding: '12px', borderRadius: 10,
            border: '1px solid var(--color-border)',
            backgroundColor: 'transparent',
            color: 'var(--color-text-primary)',
            fontSize: 14, fontWeight: 600, fontFamily: 'inherit', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}
        >
          <ArrowCounterClockwise size={16} />
          Riprova
        </button>
        <button
          onClick={handleConfirm}
          style={{
            flex: 2, padding: '12px', borderRadius: 10,
            border: 'none', backgroundColor: 'var(--color-accent)',
            color: '#0F0F11', fontSize: 14, fontWeight: 700,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          Conferma e salva
        </button>
      </div>

      {rawText && (
        <details style={{ marginTop: 12 }}>
          <summary style={{ fontSize: 11, color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            Testo raw estratto (debug)
          </summary>
          <pre style={{
            fontSize: 10, color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-surface-elevated)',
            borderRadius: 8, padding: 10, marginTop: 6,
            overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-all',
            maxHeight: 200, overflowY: 'auto',
          }}>
            {rawText.slice(0, 1000)}{rawText.length > 1000 ? '...' : ''}
          </pre>
        </details>
      )}
    </div>
  )

  const titles: Record<Step, string> = {
    upload: 'Carica piano PDF',
    parsing: 'Analisi in corso',
    preview: 'Anteprima piano',
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={step !== 'parsing' ? onClose : undefined}
        style={{
          position: 'fixed', inset: 0,
          backgroundColor: 'rgba(0,0,0,0.65)',
          zIndex: 100,
        }}
      />

      {/* Sheet */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        backgroundColor: 'var(--color-surface)',
        borderTopLeftRadius: 20, borderTopRightRadius: 20,
        borderTop: '1px solid var(--color-border)',
        padding: '20px 20px 48px',
        zIndex: 101,
        maxHeight: '90vh',
        overflowY: 'auto',
      }}>
        {/* Handle */}
        <div style={{
          width: 40, height: 4, borderRadius: 2,
          backgroundColor: 'var(--color-border)',
          margin: '0 auto 20px',
        }} />

        <p style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 20 }}>
          {titles[step]}
        </p>

        {step === 'upload' && uploadStep}
        {step === 'parsing' && parsingStep}
        {step === 'preview' && previewStep}
      </div>
    </>
  )
}
