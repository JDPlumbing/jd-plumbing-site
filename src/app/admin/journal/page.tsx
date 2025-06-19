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
  const [visibility, setVisibility] = useState<'internal' | 'login' | 'public'>('internal')
  const [published, setPublished] = useState(false)


  useEffect(() => {
    fetch('/api/journal')
      .then((res) => res.json())
      .then((data: JournalEntry[]) => setEntries(data))
  }, [])

  const submit = async () => {
    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
        date: new Date().toISOString(),
        visibility,
        published,
      }),
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
      <div className="space-y-2">
        <label className="block text-white">Visibility</label>
        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value as any)}
          className="w-full border p-2 bg-neutral-900 text-white"
        >
          <option value="internal">Internal Only</option>
          <option value="login">Login Required</option>
          <option value="public">Public</option>
        </select>

        <label className="flex items-center gap-2 mt-2 text-white">
          <input
            type="checkbox"
            checked={published}
            onChange={(e) => setPublished(e.target.checked)}
          />
          Published
        </label>
      </div>

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
