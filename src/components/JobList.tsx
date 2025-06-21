'use client'

import { useEffect, useState } from 'react'
import { listJobs } from '@/lib/jobs'
import { Job } from '@/types'
import JobEditor from './JobEditor'

const JD_AGENT_ID = process.env.NEXT_PUBLIC_JD_AGENT_ID || '' // fallback if env not injected

export default function JobList() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function refresh() {
    setLoading(true)
    try {
      const data = await listJobs()
      setJobs(data)
    } catch (err: any) {
      setError(err.message || 'Error fetching jobs')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refresh()
  }, [])

  if (loading) return <div>Loading jobs...</div>
  if (error) return <div className="text-red-500">{error}</div>
  if (jobs.length === 0) return <div>No jobs found.</div>

  return (
    <div className="space-y-6">
      {jobs.map((job) => (
        <div key={job.id} className="border p-4 rounded shadow">
          <h2 className="font-semibold text-lg">{job.title}</h2>
          <p className="text-sm text-gray-600">{job.description || 'No description'}</p>
          <p className="text-sm">Status: <span className="font-mono">{job.status}</span></p>
          {job.quoted_price && (
            <p className="text-sm">Quoted: ${job.quoted_price}</p>
          )}
          <p className="text-xs text-gray-400">Created: {new Date(job.created_at).toLocaleString()}</p>

          {/* 🔧 Live editor for updates */}
          <JobEditor job={job} updated_by={JD_AGENT_ID} onRefresh={refresh} />
        </div>
      ))}
    </div>
  )
}
