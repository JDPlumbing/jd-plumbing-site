// src/components/JobEditor.tsx
'use client'

import { useState } from 'react'
import { Job } from '@/types'
import { updateJob } from '@/lib/jobs'

type Props = {
  job: Job
  updated_by: string
  onRefresh: () => void
}

export default function JobEditor({ job, updated_by, onRefresh }: Props) {
  const [status, setStatus] = useState(job.status)
  const [price, setPrice] = useState(job.quoted_price || '')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    try {
      await updateJob(job.id, updated_by, {
        status,
        quoted_price: price ? Number(price) : undefined
      })
      onRefresh()
    } catch (err: any) {
      setError(err.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 mt-2">
      <label className="text-sm font-medium">Status</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border rounded p-1"
      >
        <option value="open">open</option>
        <option value="in_progress">in_progress</option>
        <option value="complete">complete</option>
        <option value="cancelled">cancelled</option>
      </select>

      <label className="text-sm font-medium">Quoted Price</label>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="border rounded p-1"
      />

      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-3 py-1 rounded disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save Changes'}
      </button>

      {error && <div className="text-red-500 text-sm">{error}</div>}
    </div>
  )
}
