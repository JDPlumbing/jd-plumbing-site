// lib/schedules.ts
import { supabase } from '@/lib/supabase'
import type { Schedule } from '@/types'

export async function listSchedules(): Promise<Schedule[]> {
  const { data, error } = await supabase.from('schedules').select('*')
  if (error) throw error
  return data || []
}

export async function createSchedule(payload: Partial<Schedule>): Promise<Schedule> {
  const { data, error } = await supabase
    .from('schedules')
    .insert(payload)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function updateSchedule(id: string, updates: Partial<Schedule>): Promise<Schedule> {
  const { data, error } = await supabase
    .from('schedules')
    .update(updates)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteSchedule(id: string): Promise<void> {
  const { error } = await supabase.from('schedules').delete().eq('id', id)
  if (error) throw error
}
export const fetchSchedules = listSchedules;