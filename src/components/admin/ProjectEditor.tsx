'use client'
import { useState } from 'react'
import { createProject, updateProject, deleteProject } from '@/lib/projects'

export default function ProjectEditor({ initial, onClose, onSave }) {
  const [form, setForm] = useState({
    title: initial?.title || '',
    status: initial?.status || 'planning',
    start_date: initial?.start_date || '',
    end_date: initial?.end_date || '',
    description: initial?.description || ''
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    if (initial?.id) {
      await updateProject(initial.id, form)
    } else {
      await createProject(form)
    }
    setSaving(false)
    onSave()
  }

  const handleDelete = async () => {
    if (initial?.id && confirm('Delete this project?')) {
      await deleteProject(initial.id)
      onSave()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">
          {initial?.id ? 'Edit Project' : 'New Project'}
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
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          >
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="complete">Complete</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </label>

        <label className="block mb-2">
          Start Date
          <input
            type="date"
            className="w-full border p-2"
            value={form.start_date}
            onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          End Date
          <input
            type="date"
            className="w-full border p-2"
            value={form.end_date}
            onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          />
        </label>

        <label className="block mb-4">
          Description
          <textarea
            className="w-full border p-2"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
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