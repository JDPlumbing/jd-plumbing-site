'use client'

import { useEffect, useState } from 'react'
import { listJobs } from '@/lib/jobs'
import type { Job } from '@/types'
import JobEditor from './JobEditor'




export default function JobsTable() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Job | null>(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await listJobs()
      setJobs(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  if (loading) return <p>Loading jobs...</p>

  return (
    <div className="p-4 border rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Jobs</h2>
        <button
          onClick={() =>
            setSelected({
              id: '',
              project_id: '',
              customer_id: '',
              status: 'pending',
              title: '',
              description: '',
              created_at: '',
              updated_at: '',
            } as Job)
          }
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          + New Job
        </button>
      </div>

      <table className="w-full text-left border">
        <thead>
          <tr className="border-b">
            <th className="p-2">ID</th>
            <th className="p-2">Project</th>
            <th className="p-2">Status</th>
            <th className="p-2">Start</th>
            <th className="p-2">End</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr
              key={job.id}
              className="border-t cursor-pointer hover:bg-gray-100"
              onClick={() => setSelected(job)}
            >
              <td className="p-2">{job.id.slice(0, 8)}...</td>
              <td className="p-2">{job.project_id || '-'}</td>
              <td className="p-2">{job.status}</td>
              <td className="p-2">{(job as any).start_date || '-'}</td>
              <td className="p-2">{(job as any).end_date || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <JobEditor
          job={selected}
          updated_by={process.env.NEXT_PUBLIC_JD_AGENT_ID || ''}
          onUpdated={() => {
            setSelected(null)
            load()
          }}
        />

      )}
    </div>
  )
}
