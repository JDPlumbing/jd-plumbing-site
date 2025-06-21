'use client'

import { useState } from 'react'
import type { Estimate } from '@/types'
import { createEstimate, updateEstimate, deleteEstimate } from '@/lib/estimates'

interface Props {
  initial: Partial<Estimate>
  onClose: () => void
  onSave: () => void
}

export default function EstimateEditor({ initial, onClose, onSave }: Props) {
  const [form, setForm] = useState<{
    title: string
    total_amount: number
    scope: string
    exclusions: string
    verified: boolean
  }>({
    title: initial?.title ?? '',
    total_amount: initial?.total_amount ?? 0,
    scope: initial?.scope ?? '',
    exclusions: initial?.exclusions ?? '',
    verified: initial?.verified ?? false,
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (initial?.id) {
      await updateEstimate(initial.id, form)
    } else {
      await createEstimate(form)
    }
    setSaving(false)
    onSave()
  }

  const handleDelete = async () => {
    if (initial?.id && confirm('Delete this estimate?')) {
      await deleteEstimate(initial.id)
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {initial?.id ? 'Edit Estimate' : 'New Estimate'}
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
          Amount
          <input
            type="number"
            className="w-full border p-2"
            value={form.total_amount}
            onChange={(e) =>
              setForm({ ...form, total_amount: parseFloat(e.target.value) || 0 })
            }
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

        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            className="mr-2"
            checked={form.verified}
            onChange={(e) => setForm({ ...form, verified: e.target.checked })}
          />
          Verified for quote?
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
