// src/lib/jobs.ts
import { Job } from '@/types'
import { supabase } from '@/lib/supabase'


export async function listJobs(filters: {
  assigned_to?: string
  status?: string
} = {}) {
  const res = await fetch('/api/jobs/list', {
    method: 'POST',
    body: JSON.stringify(filters),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to fetch jobs')
  return data.jobs as Job[]
}

export async function updateJob(id: string, updated_by: string, updates: Partial<Job>) {
  const res = await fetch('/api/jobs/update', {
    method: 'PATCH',
    body: JSON.stringify({
      id,
      updated_by,
      updates
    }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Failed to update job')
  return data.job as Job
}
