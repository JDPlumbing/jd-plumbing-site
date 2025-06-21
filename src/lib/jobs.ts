import { supabase } from './supabase'
import { Job } from '@/types'

export async function listJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data || []
}

export async function createJob(input: Partial<Job>) {
  const { error } = await supabase.from('jobs').insert([input])
  if (error) throw error
}

export async function updateJob(id: string, updates: Partial<Job>) {
  const { error } = await supabase.from('jobs').update(updates).eq('id', id)
  if (error) throw error
}

export async function deleteJob(id: string) {
  const { error } = await supabase.from('jobs').delete().eq('id', id)
  if (error) throw error
}
