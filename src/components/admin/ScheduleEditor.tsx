'use client'

import { useState } from 'react'
import { createSchedule, updateSchedule, deleteSchedule } from '@/lib/schedules'
import type { Schedule } from '@/types'

interface Props {
  initial: Schedule
  onClose: () => void
  onSave: () => void
}

interface ScheduleForm {
  title: string
  type: 'visit' | 'inspection' | 'call' | 'meeting'
  scheduled_for: string
  person_id: string
  project_id: string
}

export default function ScheduleEditor({ initial, onClose, onSave }: Props) {
  // ✅ Extract all defaults up front so TS stops whining
  const {
    title = '',
    type = 'visit',
    scheduled_for = '',
    person_id = '',
    project_id = ''
  } = initial

  const [form, setForm] = useState<ScheduleForm>({
    title,
    type,
    scheduled_for: scheduled_for.slice(0, 10),
    person_id,
    project_id
  })

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      if (initial?.id) {
        await updateSchedule(initial.id, form)
      } else {
        await createSchedule(form)
      }
      onSave()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (initial?.id && confirm('Delete this schedule?')) {
      await deleteSchedule(initial.id)
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {initial?.id ? 'Edit Schedule' : 'New Schedule'}
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
          Type
          <select
            className="w-full border p-2"
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as ScheduleForm['type'] })}
          >
            <option value="visit">Visit</option>
            <option value="inspection">Inspection</option>
            <option value="call">Call</option>
            <option value="meeting">Meeting</option>
          </select>
        </label>

        <label className="block mb-2">
          Date
          <input
            type="date"
            className="w-full border p-2"
            value={form.scheduled_for}
            onChange={(e) => setForm({ ...form, scheduled_for: e.target.value })}
          />
        </label>

        <label className="block mb-2">
          Person ID (optional)
          <input
            className="w-full border p-2"
            value={form.person_id}
            onChange={(e) => setForm({ ...form, person_id: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          Project ID (optional)
          <input
            className="w-full border p-2"
            value={form.project_id}
            onChange={(e) => setForm({ ...form, project_id: e.target.value })}
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
