'use client'

import { useState } from 'react'
import { Task } from '@/types'
import { updateTask } from '@/lib/tasks'

export default function TaskEditor({
  task,
  onUpdated
}: {
  task: Task
  onUpdated: () => void
}) {
  const [title, setTitle] = useState(task.title)
  const [status, setStatus] = useState(task.status)
  const [saving, setSaving] = useState(false)

  async function save() {
    setSaving(true)
    try {
      await updateTask(task.id, { title, status })
      onUpdated()
    } catch (e) {
      console.error(e)
    } finally {
      setSaving(false)
    }
  }

  const inputClass =
    'border rounded p-2 w-full bg-white text-black dark:bg-gray-800 dark:text-white'

  return (
    <div className="mt-2 space-y-2">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={inputClass}
        placeholder="Task title"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value as Task['status'])}
        className={inputClass}
        >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
        <option value="cancelled">Cancelled</option>
        </select>

      <button
        onClick={save}
        disabled={saving}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        {saving ? 'Saving...' : 'Save'}
      </button>
    </div>
  )
}
