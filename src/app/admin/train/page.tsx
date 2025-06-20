'use client'

import { useEffect, useState } from 'react'
import TrainingExampleEditor from '@/components/TrainingExampleEditor'

type TrainingExample = {
  input: string
  expected: string
  intent: string
  notes: string
  schemas: string[]
  timestamp: string
}

export default function TrainPage() {
  const [examples, setExamples] = useState<TrainingExample[]>([])

  const load = async () => {
    const res = await fetch('/api/train')
    const data = await res.json()
    setExamples(data.examples || [])
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <div className="p-6 space-y-8 text-white">
      <h1 className="text-3xl font-bold">🧠 Model Training Playground</h1>

      <TrainingExampleEditor onSaved={load} />

      <div className="space-y-4">
        {examples.map((ex, i) => (
          <div key={i} className="border border-neutral-700 rounded p-4 bg-neutral-800 space-y-2">
            <div className="text-sm text-gray-400">{ex.timestamp}</div>
            <div>
              <span className="font-semibold">Intent:</span> {ex.intent}
            </div>
            <div>
              <span className="font-semibold">Input:</span>{' '}
              <pre className="bg-neutral-900 p-2 rounded overflow-x-auto">{ex.input}</pre>
            </div>
            <div>
              <span className="font-semibold">Expected:</span>{' '}
              <pre className="bg-neutral-900 p-2 rounded overflow-x-auto">{ex.expected}</pre>
            </div>
            <div>
              <span className="font-semibold">Schemas:</span>{' '}
              <span className="text-blue-300">{ex.schemas?.join(', ')}</span>
            </div>
            {ex.notes && (
              <div>
                <span className="font-semibold">Notes:</span>{' '}
                <pre className="bg-neutral-900 p-2 rounded overflow-x-auto">{ex.notes}</pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
