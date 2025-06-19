'use client'

import { useState } from 'react'
import { slugify } from '@/lib/slugify'

type Props = {
  onSaved: () => void
  schemaRefs?: string[]
}

export default function TrainingExampleEditor({ onSaved, schemaRefs = [] }: Props) {
  const [input, setInput] = useState('')
  const [expected, setExpected] = useState('')
  const [intent, setIntent] = useState('')
  const [grip, setGrip] = useState('')
  const [drip, setDrip] = useState('')
  const [scrip, setScrip] = useState('')
  const [notes, setNotes] = useState('')

  const save = async () => {
    const payload = {
      input,
      expected,
      intent,
      grip,
      drip,
      scrip,
      notes,
      schemaRefs, // <== now included in saved payload
      slug: slugify(input.slice(0, 30)),
      timestamp: new Date().toISOString(),
    }

    await fetch('/api/train', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setInput('')
    setExpected('')
    setIntent('')
    setGrip('')
    setDrip('')
    setScrip('')
    setNotes('')
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
      <div className="flex flex-wrap gap-2">
        <input
          className="p-2 bg-neutral-800 rounded"
          placeholder="Intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        />
        <input
          className="p-2 bg-neutral-800 rounded"
          placeholder="gripN"
          value={grip}
          onChange={(e) => setGrip(e.target.value)}
        />
        <input
          className="p-2 bg-neutral-800 rounded"
          placeholder="dripN"
          value={drip}
          onChange={(e) => setDrip(e.target.value)}
        />
        <input
          className="p-2 bg-neutral-800 rounded"
          placeholder="scripN"
          value={scrip}
          onChange={(e) => setScrip(e.target.value)}
        />
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
