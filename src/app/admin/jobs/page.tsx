'use client'

import { useEffect, useState } from 'react'
import { Job } from '@/types'
import { listJobs, createJob, deleteJob } from '@/lib/jobs'
import JobEditor from '@/components/JobEditor'

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [newTitle, setNewTitle] = useState('')
  const [creating, setCreating] = useState(false)

  async function refresh() {
    setLoading(true)
    try {
      const data = await listJobs()
      setJobs(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate() {
    if (!newTitle) return
    setCreating(true)
    try {
      await createJob({ title: newTitle, status: 'todo' })
      setNewTitle('')
      refresh()
    } catch (e) {
      console.error('Job create failed:', e)
      console.error('Full details:', JSON.stringify(e, null, 2)) // ← Add this line
    } finally {
      setCreating(false)
    }
  }


  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this job?')) return
    try {
      await deleteJob(id)
      refresh()
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className="space-y-6">
      <div className="p-4 border rounded shadow bg-gray-50 dark:bg-gray-900">
        <h2 className="text-lg font-semibold mb-2">Add New Job</h2>
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Job title"
          className="border p-2 mr-2 rounded bg-white text-black dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleCreate}
          disabled={creating}
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          {creating ? 'Creating...' : 'Add Job'}
        </button>
      </div>

      {jobs.length === 0 && <div>No jobs found.</div>}

      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded shadow relative">
          <button
            onClick={() => handleDelete(job.id)}
            className="absolute top-2 right-2 text-red-500 text-sm"
          >
            🗑 Delete
          </button>
          <h2 className="font-semibold text-lg">{job.title}</h2>
          <p className="text-xs">Status: <code>{job.status}</code></p>
          <JobEditor job={job} onUpdated={refresh} />
        </div>
      ))}
    </div>
  )
}
