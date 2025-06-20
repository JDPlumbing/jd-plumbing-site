'use client'

import { useState } from 'react'
import { slugify } from '@/lib/slugify'
import { schemaMap } from '@/schemas'

type Props = {
  onSaved: () => void
}

export default function TrainingExampleEditor({ onSaved }: Props) {
  const [input, setInput] = useState('')
  const [expected, setExpected] = useState('')
  const [intent, setIntent] = useState('')
  const [notes, setNotes] = useState('')
  const [schemaValues, setSchemaValues] = useState<Record<string, string>>({})

  const save = async () => {
    const payload = {
      input,
      expected,
      intent,
      notes,
      slug: slugify(input.slice(0, 30)),
      timestamp: new Date().toISOString(),
      ...schemaValues,
    }

    await fetch('/api/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setInput('')
    setExpected('')
    setIntent('')
    setNotes('')
    setSchemaValues({})
    onSaved()
  }

  return (
    <div className="border p-4 rounded bg-neutral-900 text-white space-y-2">
      <textarea
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Prompt input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <textarea
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Expected response"
        value={expected}
        onChange={(e) => setExpected(e.target.value)}
      />
      <input
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Intent"
        value={intent}
        onChange={(e) => setIntent(e.target.value)}
      />

      <div className="flex flex-wrap gap-2">
        {Object.keys(schemaMap).map((key) => (
          <input
            key={key}
            className="p-2 bg-neutral-800 rounded"
            placeholder={key}
            value={schemaValues[key] || ''}
            onChange={(e) =>
              setSchemaValues((prev) => ({
                ...prev,
                [key]: e.target.value,
              }))
            }
          />
        ))}
      </div>

      <textarea
        className="w-full p-2 bg-neutral-800 rounded"
        placeholder="Notes / rationale"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <button
        onClick={save}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        💾 Save Example
      </button>
    </div>
  )
}
