'use client'

import { useState, useEffect } from 'react'
import JournalEditor from '@/components/JournalEditor'

export default function AdminJournalPage() {
  const [entries, setEntries] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [published, setPublished] = useState(false)
  const [visibility, setVisibility] = useState('internal')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/journal')
      .then((res) => res.json())
      .then((data) => setEntries(data))
  }, [])

  const resetForm = () => {
    setTitle('')
    setContent('')
    setPublished(false)
    setVisibility('internal')
    setEditingId(null)
  }

  const submit = async () => {
    const id = editingId || `${Date.now()}-${title.toLowerCase().replace(/\s+/g, '-')}`
    const entry = {
      id,
      title,
      content,
      published,
      visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await fetch('/api/journal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    })

    const res = await fetch('/api/journal')
    const updated = await res.json()
    setEntries(updated)
    resetForm()
  }

  const del = async (id: string) => {
    await fetch(`/api/journal?id=${id}`, { method: 'DELETE' })
    const res = await fetch('/api/journal')
    const updated = await res.json()
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

        <select
          value={visibility}
          onChange={(e) => setVisibility(e.target.value)}
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

        <JournalEditor content={content} onChange={setContent} />

        <div className="flex gap-2">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={submit}
          >
            {editingId ? 'Update Entry' : 'Save Entry'}
          </button>

          {editingId && (
            <button
              className="bg-neutral-600 text-white px-4 py-2 rounded"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Entries list */}
<div className="space-y-4 pt-8">
  {entries.map((entry) => (
    <div
      key={entry.id}
      className="border border-neutral-700 rounded p-4 bg-neutral-900"
    >
      <h2 className="font-bold text-white">{entry.title}</h2>

      {/* Status line */}
      <p className="text-sm text-gray-400">
        {entry.published ? 'Published' : 'Draft'} — {entry.visibility}
      </p>

      {/* Button row */}
      <div className="mt-2 flex gap-2">
        <button
          onClick={() => {
            setTitle(entry.title)
            setContent(entry.content)
            setPublished(entry.published)
            setVisibility(entry.visibility)
          }}
          className="bg-yellow-600 text-white px-3 py-1 rounded text-sm"
        >
          Edit
        </button>

        <button
          onClick={() => {
            if (confirm('Delete this entry?')) {
              fetch(`/api/journal?id=${entry.id}`, {
                method: 'DELETE',
              }).then(async () => {
                const res = await fetch('/api/journal')
                const updated = await res.json()
                setEntries(updated)
              })
            }
          }}
          className="bg-red-600 text-white px-3 py-1 rounded text-sm"
        >
          Delete
        </button>

        <a
          href={`/journal/${entry.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-700 text-white px-3 py-1 rounded text-sm"
        >
          Preview
        </a>
      </div>
    </div>
  ))}
</div>

    </div>
  )
}