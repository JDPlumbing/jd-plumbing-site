'use client'

import { useState } from 'react'
import type { Quote } from '@/types'
import { createQuote, updateQuote, deleteQuote } from '@/lib/quotes'

interface Props {
  initial?: Quote
  onClose: () => void
  onSave: () => void
}

export default function QuoteEditor({ initial, onClose, onSave }: Props) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    status: initial?.status || 'draft',
    total_amount: initial?.total_amount || 0,
    scope: initial?.scope || '',
    exclusions: initial?.exclusions || ''
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (initial?.id) {
      await updateQuote(initial.id, form)
    } else {
      await createQuote(form)
    }
    setSaving(false)
    onSave()
  }

  const handleDelete = async () => {
    if (initial?.id && confirm('Delete this quote?')) {
      await deleteQuote(initial.id)
      onSave()
    }
  }

  // ... rest of the JSX remains unchanged

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {initial?.id ? 'Edit Quote' : 'New Quote'}
        </h3>

        <label className="block mb-2">
          Title
          <input
            className="w-full border p-2"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </label>

        <label className="block mb-2">
          Status
          <select
            className="w-full border p-2"
            value={form.status}
            onChange={(e) =>
                setForm({ ...form, status: e.target.value as 'draft' | 'sent' | 'accepted' | 'rejected' })
              }

          >
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </label>

        <label className="block mb-2">
          Amount
          <input
            type="number"
            className="w-full border p-2"
            value={form.total_amount}
            onChange={(e) => setForm({ ...form, total_amount: parseFloat(e.target.value) })}
          />
        </label>

        <label className="block mb-2">
          Scope
          <textarea
            className="w-full border p-2"
            value={form.scope}
            onChange={(e) => setForm({ ...form, scope: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          Exclusions
          <textarea
            className="w-full border p-2"
            value={form.exclusions}
            onChange={(e) => setForm({ ...form, exclusions: e.target.value })}
          />
        </label>

        <div className="flex justify-between items-center">
          {initial?.id && (
            <button onClick={handleDelete} className="text-red-600">
              Delete
            </button>
          )}
          <div className="flex gap-2">
            <button onClick={onClose}>Cancel</button>
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-4 py-1 rounded"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}