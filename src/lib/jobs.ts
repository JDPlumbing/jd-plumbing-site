// lib/jobs.ts
import { supabase } from '@/lib/supabase'
import type { Job } from '@/types'

export async function listJobs(): Promise<Job[]> {
  const { data, error } = await supabase.from('jobs').select('*')
  if (error) throw error
  return data || []
}

export async function createJob(payload: Partial<Job>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateJob(id: string, updates: Partial<Job>): Promise<Job> {
  const { data, error } = await supabase
    .from('jobs')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteJob(id: string): Promise<void> {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) throw error
}
