'use client'

import { useEffect, useState } from 'react'
import JournalEditor from '@/components/JournalEditor'

// Define the shape of a journal entry
type JournalEntry = {
  title: string
  body: string
  date: string
}

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    fetch('/api/journal')
      .then((res) => res.json())
      .then((data: JournalEntry[]) => setEntries(data))
  }, [])

  const submit = async () => {
    await fetch('/api/journal', {
      method: 'POST',
      body: JSON.stringify({
        title,
        body,
        date: new Date().toISOString(),
      }),
      headers: { 'Content-Type': 'application/json' },
    })

    setTitle('')
    setBody('')

    const res = await fetch('/api/journal')
    const updated: JournalEntry[] = await res.json()
    setEntries(updated)
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Journal</h1>

      <div className="space-y-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2"
        />

        <JournalEditor content={body} onChange={setBody} />

        <button
          onClick={submit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Entry
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {entries.map((entry, idx) => (
          <div key={idx} className="border p-4 rounded">
            <h2 className="text-xl font-semibold">{entry.title}</h2>
            <p className="text-sm text-gray-500">{entry.date}</p>
            <div
              className="mt-2 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: entry.body }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
