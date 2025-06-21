// lib/estimates.ts
import { supabase } from '@/lib/supabase'
import type { Estimate } from '@/types'

export async function listEstimates(): Promise<Estimate[]> {
  const { data, error } = await supabase.from('estimates').select('*')
  if (error) throw error
  return data || []
}

export async function createEstimate(payload: Partial<Estimate>): Promise<Estimate> {
  const { data, error } = await supabase.from('estimates').insert(payload).select().single()
  if (error) throw error
  return data
}

export async function updateEstimate(id: string, updates: Partial<Estimate>): Promise<Estimate> {
  const { data, error } = await supabase.from('estimates').update(updates).eq('id', id).select().single()
  if (error) throw error
  return data
}

export async function deleteEstimate(id: string): Promise<void> {
  const { error } = await supabase.from('estimates').delete().eq('id', id)
  if (error) throw error
}
export const fetchEstimates = listEstimates;
