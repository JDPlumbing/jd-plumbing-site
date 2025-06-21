'use client'

import { useEffect, useState } from 'react'
import { Task } from '@/types'
import { listTasks, createTask, deleteTask } from '@/lib/tasks'
import TaskEditor from './TaskEditor'

export default function TasksTable() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await listTasks()
      setTasks(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    if (!newTitle) return
    setCreating(true)
    try {
        console.log('Creating task with:', {
  title: newTitle,
  status: 'todo',
  created_by: process.env.NEXT_PUBLIC_DRIPPY_AGENT_ID,
  assigned_to: process.env.NEXT_PUBLIC_JD_AGENT_ID,
})

      await createTask({ title: newTitle })
      setNewTitle('')
      refresh()
    } catch (e) {
      console.error('Task create failed:', e)
      console.error('Full details:', JSON.stringify(e, null, 2))

    } finally {
      setCreating(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      refresh()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  const inputClass = 'border rounded p-2 mr-2 bg-white text-black dark:bg-gray-800 dark:text-white'

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-2 dark:text-white">Create Task</h2>
        <input
          placeholder="Task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className={inputClass}
        />
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {creating ? 'Creating...' : 'Add Task'}
        </button>
      </div>

      {loading && <div>Loading tasks...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {tasks.length === 0 && !loading && <div className="dark:text-gray-300">No tasks yet.</div>}

      {tasks.map((task) => (
        <div
          key={task.id}
          className="border p-4 rounded shadow relative bg-white dark:bg-gray-800"
        >
          <button
            onClick={() => handleDelete(task.id)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            🗑 Delete
          </button>
          <h2 className="font-semibold text-lg dark:text-white">{task.title}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Status: <code>{task.status}</code>
          </p>
          <TaskEditor task={task} onUpdated={refresh} />
        </div>
      ))}
    </div>
  )
}
